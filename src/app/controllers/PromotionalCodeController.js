import { differenceInDays } from 'date-fns';

import PromotionalCodeMongo from '../schemas/PromotionalCodeMongo';

class PromotionalCodeController {
  async getCodeData(req, res) {
    const { code } = req.body;

    const codeData = await PromotionalCodeMongo.findById(code).lean();

    if (!codeData) {
      return res.status(200).json({ error: 'Código não encontrado' });
    }

    // Se a data da geração do código for maior que 10 dias, vai marcar que não está mais disponível
    if (differenceInDays(new Date(), codeData.createdAt) > 10) {
      if (codeData.avaliable) {
        codeData.avaliable = false;
        await PromotionalCodeMongo.findOneAndUpdate({ _id: code }, codeData);
        return res.status(200).json({ error: 'Este código expirou' });
      }
      return res.status(200).json({ error: 'Este código expirou' });
    }
    // Se código tem menos que 10 dias e ainda está disponível
    if (codeData.avaliable) {
      return res.status(200).json(codeData);
    }
    return res.status(200).json({ error: 'O código já foi utilizado' });
  }
}

export default new PromotionalCodeController();
