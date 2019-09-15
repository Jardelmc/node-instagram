/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import randomstring from 'randomstring';
import PromotionalCodeMongo from '../schemas/PromotionalCodeMongo';

export async function getNewCode() {
  let code = randomstring.generate(4);
  code = code.toUpperCase();

  const codeExists = await PromotionalCodeMongo.findById(code).lean();

  if (!codeExists) {
    return code;
  }
  getNewCode();
}
