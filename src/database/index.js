import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
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
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
    });
  }
}

export default new Database();
