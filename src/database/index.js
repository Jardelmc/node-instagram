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
    const uri = process.env.MONGO_URL_MAIN;
    this.mongoConnection = mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }
}

export default new Database();
