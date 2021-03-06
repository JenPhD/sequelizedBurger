var models = require('../models');
var express = require('express');
var router = express.Router();

// =================================================================
// Routes
// =================================================================
//Use the Sequelburger model to find all burgers,
//and use the include option to grab info from the User model.
//This will show the burger and the user who created it 
router.get('/', function (req, res) {
	models.Sequelburger.findAll({
		include: [ models.User ]	
		//then...
	}).then(function(sequelburgers) {
		//grab the user info from our req.
		//This info gets saved to req via the users-controller.js file
		res.render('index', { 
          username: req.session.username,
			     user_id: req.session.user_id,
			    email: req.session.user_email,
      		logged_in: req.session.logged_in,
      		sequelburgers: sequelburgers
      	})
	})
});

//Use the Sequelburger model to create a burger based on what's 
//passed in req.body (name, devoured, user_id)
router.post('/create', function (req, res) {
  models.Sequelburger.create({
    burger_name: req.body.burger_name,
  	devoured: req.body.devoured,
    user_id: req.session.user_id
  })
  // connect the .create to this .then
  .then(function() {
    res.redirect('/');
  })
});

// Use the Sequelburger model to update a burger's devoured status
// based on the boolean passed in req.body.devoured
// and the id of the burger (as passed in the url)
router.put('/update/:id', function (req, res) {
	models.Sequelburger.update(
  	{
    devoured: req.body.devoured  
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/burgers');
  })
});

//Use the Sequelburger model to delete a burger
//based on the id passed in the url
router.delete('/delete/:id', function(req,res) {
 models.Sequelburger.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  })
});

module.exports = router;
