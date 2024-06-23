module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        isUnique: true,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: 'Invalid email' },
        },
      },
      encryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Users.associate = (models) => {
      Users.hasMany(models.Questions);
    }

    return Users;
  };
  