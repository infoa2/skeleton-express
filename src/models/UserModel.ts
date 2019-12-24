// eslint-disable-next-line no-unused-vars
import { Model, Sequelize, DataTypes } from 'sequelize';
import { Password } from '@infoa2/nodesdk';

export default class UserModel extends Model {
  public name!: string;
  public email!: string;
  public readonly password!: string;
  public password_hash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static configure(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      { sequelize, tableName: 'users' }
    );

    this.addHook('beforeSave', async (user: UserModel) => {
      if (user.password) {
        user.password_hash = await Password.bcrypt.create(user.password);
      }
    });

    return this;
  }

  // static associate(models) {}

  // static findByEmail(email) {...}

  checkPassword(password: string) {
    return Password.bcrypt.verify(password, this.password_hash);
  }
}
