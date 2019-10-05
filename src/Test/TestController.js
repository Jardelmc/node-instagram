import { subDays, format } from 'date-fns';
import UserMongo from '../app/schemas/UserMongo';
import { decrypt, encrypt } from '../app/Util/EncryptDecryptUtil';

class TestController {
  async getMongo(req, res) {
    const data = new Date();

    const user = await UserMongo.findById(1978473999).lean();

    const payload = 1;

    // const data = await UserMongo.findById(req.body.id).lean();

    return res.json(formattedData);
  }
}

export default new TestController();
