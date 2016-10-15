'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sequelburger = sequelize.define('sequelburger', {
    burger_name: DataTypes.STRING,
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'sequelburgers',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Sequelburger.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Sequelburger;
};