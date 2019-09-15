import { subDays, format } from 'date-fns';
import UserMongo from '../app/schemas/UserMongo';
import { decrypt, encrypt } from '../app/Util/EncryptDecryptUtil';

class TestController {
  async getMongo(req, res) {
    let data = new Date();

    data = subDays(data, 4);

    const formattedData = format(data, "yyyy'-'MM'-'dd");

    // const data = await UserMongo.findById(req.body.id).lean();

    return res.json(formattedData);
  }
}

export default new TestController();
