/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
import axios from 'axios';
import UserMongo from '../schemas/UserMongo';
import { getSelectedProfilesToFollow } from '../Util/GetDialyFollows';

import CheckNewMatches from '../services/ProfilesMatchedService';

class DialyFollowController {
  async create(req, res) {
    const user = await UserMongo.findById(req.userPk);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    let {
      targetProfiles,
      targetHashtags,
      whoFollowedBySystem,
      whoIFollow,
      whoFollowMe,
      allProfilesAlreadySystemInteracted,
    } = user;

    if (!whoFollowedBySystem) {
      whoFollowedBySystem = new Map();
    }
    if (!allProfilesAlreadySystemInteracted) {
      allProfilesAlreadySystemInteracted = [];
    }

    // Variáveis para receber resultados caso exista registro para target profiles ou hashtags
    let dataByTargetProfiles;
    let dataByTargetHashtags;

    // Método para TARGET PROFILES
    if (targetProfiles && targetProfiles.size > 0) {
      const profilesByTargetProviders = await getSelectedProfilesToFollow(
        targetProfiles,
        whoIFollow,
        whoFollowMe,
        allProfilesAlreadySystemInteracted
      );

      // Atualizando perfis interagidos que foram selecionados
      allProfilesAlreadySystemInteracted =
        profilesByTargetProviders.allProfilesAlreadySystemInteracted;

      // Adicionando perfis para tratar depois
      dataByTargetProfiles = profilesByTargetProviders.providerAndProfiles;
    }

    // Método para TARGET HASHTAGS
    if (targetHashtags && targetHashtags.size > 0) {
      const profilesByHashtags = await getSelectedProfilesToFollow(
        targetHashtags,
        whoIFollow,
        whoFollowMe,
        allProfilesAlreadySystemInteracted
      );

      // Atualizando perfis interagidos que foram selecionados
      allProfilesAlreadySystemInteracted =
        profilesByHashtags.allProfilesAlreadySystemInteracted;

      dataByTargetHashtags = profilesByHashtags.providerAndProfiles;
    }

    // Populando variável para salvar no banco se conseguir enviar dados para API python
    const profilesSelectedToFollowDialy = {
      providerTarget: dataByTargetProfiles,
      providerHashtag: dataByTargetHashtags,
      data: new Date(),
    };

    // Variável para salvar todos userIds em um único array para enviar ao Python
    let allProfilesToFollowToday = [];

    // Concatenando os targetPrifiles
    if (dataByTargetProfiles) {
      dataByTargetProfiles.forEach(data => {
        allProfilesToFollowToday = allProfilesToFollowToday.concat(
          data.profiles
        );
      });
    }

    /*  // Concatenando os taretHashtags
    if (dataByTargetHashtags) {
      dataByTargetProfiles.forEach(data => {
        allProfilesToFollowToday = allProfilesToFollowToday.concat(
          data.profiles
        );
      });
    } */

    // Preparando objeto para Api Python reconhecer a origem e os perfis
    const dataFollowToPythonApi = {
      userId: String(req.userPk),
      profiles: allProfilesToFollowToday,
      token: req.token,
    };

    // Código para enviar lista para API Java, desativado pq to tentando fazer follow pelo python
    const response = await axios.post(
      `${process.env.BASE_URL}/followDialy`,
      dataFollowToPythonApi
    );

    if (response.status === 200) {
      // Marcando status do bot
      user.statusOperationFollowDialy = true;

      // Atualizando no banco os dados
      await UserMongo.findOneAndUpdate(
        { _id: user._id },
        { profilesSelectedToFollowDialy, allProfilesAlreadySystemInteracted }
      );
      return res.json(allProfilesToFollowToday);
    }

    return res.json(allProfilesToFollowToday);
  }

  // ###############################################################################################
  async updateSafra(req, res) {
    try {
      const user = await UserMongo.findById(req.userPk);

      const { profilesSelectedToFollowDialy, whoFollowedBySystem } = user;

      const { providerTarget, providerHashtag } = profilesSelectedToFollowDialy;

      const { safra } = req.body;

      for (let followedUserId of safra) {
        // Checando se está na lista de perfis targets
        const existsInTargetProfile = providerTarget.filter(x => {
          if (x.profiles.includes(followedUserId)) {
            return x.provider;
          }
        });

        // Se encontrou na lista de targetProfiles, crio novo registro e coloco no Map
        if (existsInTargetProfile) {
          const linkFollow = {
            provider: existsInTargetProfile[0].provider,
            data: new Date(),
          };
          whoFollowedBySystem.set(followedUserId, linkFollow);
        } else {
          // Só venho para cá se o userId não estiver na lista acima
          // Checando se está na lista de Hashtags provider
          const existsInTargetHashtag = providerHashtag.filter(x => {
            if (x.profiles.includes(followedUserId)) {
              return x.provider;
            }
          });
          const linkFollow = {
            provider: existsInTargetHashtag[0].provider,
            data: new Date(),
          };
          whoFollowedBySystem.set(followedUserId, linkFollow);
        }
      }

      await UserMongo.findOneAndUpdate(
        { _id: String(req.userPk) },
        { whoFollowedBySystem }
      );

      console.log('Parcial salva com sucesso');

      CheckNewMatches(user);

      return res.status(200).json({ message: 'Ok' });
    } catch (error) {
      console.log('Erro ao salvar parcial');
      console.log(error);
      return res.status(400).json({ error: 'Erro ao salvar parcial' });
    }
  }
}

export default new DialyFollowController();
