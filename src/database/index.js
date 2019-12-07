import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import PaymentMethod from '../app/models/PaymentMethod';

import databaseConfig from '../config/database';

const models = [User, Registration, Student, Plan, PaymentMethod];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(
      model => model.init(this.connection),
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
