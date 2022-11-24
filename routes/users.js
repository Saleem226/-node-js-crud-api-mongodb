var express = require('express');
var router = express.Router();
const UserController=require('../controllers/userController')



router.get('/',UserController.find)
router.get('/:id',UserController.findOne)
router.post('/',UserController.insert)
router.put('/:id',UserController.update)
router.delete('/:id',UserController.delete)




module.exports = router;
