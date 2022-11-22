var express = require('express');
var router = express.Router();
const UserController=require('../controllers/userController')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/',UserController.find)
router.get('/:id',UserController.findOne)
router.post('/',UserController.insert)
router.put('/:id',UserController.update)
router.delete(':/id',UserController.delete)




module.exports = router;
