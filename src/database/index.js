import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  /* mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://mongodb:mongodb@cluster0-cq7ls.mongodb.net/test',
      {
        useNewUrlParser: true,
      }
    );
  } */

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/instagram4bussines',
      {
        useNewUrlParser: true,
      }
    );
  }
}

export default new Database();
