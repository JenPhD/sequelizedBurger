'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sequelburger = sequelize.define('sequelburger', {
    burger_name: DataTypes.STRING,
    devoured: { type: DataTypes.BOOLEAN, defaultValue: false},
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'sequelburgers',

    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Sequelburger.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Sequelburger;
};