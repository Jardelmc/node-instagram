/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { getNewCode } from './GenerateAleatoryCode';
import PromotionalCodeMongo from '../schemas/PromotionalCodeMongo';
import WelcomeMessageMongo from '../schemas/WelcomeMessagesMongo';

function randomMessage(lengthListMessage) {
  if (lengthListMessage === 0) {
    return 0;
  }
  return Math.trunc(Math.random() * (lengthListMessage - 0) + 0);
}

const promorionalCodeArray = [];

export async function sendWelcomeMessage(newMatchers, userLogin, userPk) {
  const { messages } = await WelcomeMessageMongo.findById(userPk).lean();

  for (const [key, value] of newMatchers) {
    const code = await getNewCode();

    let selectedMessage = messages[randomMessage(messages.length)];

    selectedMessage = selectedMessage.replace('CODE', code);

    const newPromotionalCode = {
      _id: code,
      profileTargetPk: key,
      profileMasterPk: userPk,
      message: selectedMessage,
    };

    promorionalCodeArray.push(newPromotionalCode);
  }

  await PromotionalCodeMongo.create(promorionalCodeArray);

  const response = await axios.post(
    `${process.env.BASE_URL}/sendwelcomemessage/${userLogin}`,
    promorionalCodeArray
  );

  if (response.body.message === 'Ok') {
    return 'Ok';
  }
  return 'fail';
}
