import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        instagram_pk: Sequelize.BIGINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;
