module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define('Questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      que: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      generatedAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
    
    Questions.associate = (models) => {
      Questions.belongsTo(models.Users);
    }

    return Questions;
  };
  