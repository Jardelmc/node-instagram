/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { getNewCode } from './GenerateAleatoryCode';
import PromotionalCodeMongo from '../schemas/PromotionalCodeMongo';

function randomMessage(lengthListMessage) {
  if (lengthListMessage === 0) {
    return 0;
  }
  return Math.trunc(Math.random() * (lengthListMessage - 0) + 0);
}

export async function sendWelcomeMessage(newMatchers, messages, userPk) {
  let newPromotionalCode;
  const promorionalCodeArray = [];

  const malote = [];

  for (const userId of newMatchers) {
    // Pegando uma mensagem aleatória dentre as cadastradas
    let selectedMessage = messages[randomMessage(messages.length)];

    // Só vai trabalhar com o código se existir necessidade
    if (selectedMessage.includes('CODE')) {
      // Pegando novo código único
      const code = await getNewCode();
      // Subistituindo o código na mensagem
      selectedMessage = selectedMessage.replace('CODE', code);

      // Crio um novo objeto para salvar no banco
      newPromotionalCode = {
        _id: code,
        profileTargetPk: userId,
        profileMasterPk: userPk,
        message: selectedMessage,
      };
      // Adiciono ao array para salvar todos de uma vez depois
      promorionalCodeArray.push(newPromotionalCode);
    }

    // Montando objeto para envio de direct
    const newDirectModel = { userId, message: selectedMessage };

    malote.push(newDirectModel);
  }

  // Se tiver algum registro com código associado, vai salvar no banco
  if (promorionalCodeArray.length > 0) {
    await PromotionalCodeMongo.create(promorionalCodeArray);
  }

  // Enviando remessa
  if (malote.length > 0) {
    const response = await axios.post(`${process.env.BASE_URL}/sendDirect`, {
      malote,
      userId: userPk,
    });

    if (response.status === 200) {
      return 'Ok';
    }
  } else {
    console.log('Sem novos seguidores');
    return 'Ok';
  }

  return 'fail';
}
