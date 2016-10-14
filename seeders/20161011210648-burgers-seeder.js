'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sequelburgers', [{
      burger_name: "veggie",
      devoured: "0",
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
  },{
      burger_name: "guacamole",
      devoured: "0",
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
  }, {
      burger_name: "bleu",
      devoured: "0",
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
  }]);
},

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sequelburgers', null, {});
  }
};
