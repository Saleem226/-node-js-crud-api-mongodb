const UserModal = require('../modals/userModal')
var ObjectId = require('mongodb').ObjectId;
class UserController {
  static find = async (req, res) => {

    try {
      const users = await UserModal.find()
      console.log("hello")
      res.send(users)

    } catch (error) {
      res.send("Unable to Access")
    }

  }

  static findOne = async (req, res) => {

    try {
      const { id } = req.params
      var o_id = new ObjectId(id);
      const user = await UserModal.findById(o_id)
      if (user) {
        res.send(user)
      } else {
        res.send("no user with the given id exists")
      }
    } catch (error) {
      res.status(404).send("ID is not Valid")
    }
  }

  static insert = async (req, res) => {

    try {
      const { name, email, username, bio } = req.body
      const alreadyUser = await UserModal.find({ $or: [{ email: email }, { username: username }] })

      if (!alreadyUser.length == 0) {
        res.send("Email or username already exists")
      } else {

        const newUser = new UserModal({
          name: name,
          email: email,
          username: username,
          bio: bio
        })

        await newUser.save()
        res.send("User added successfully")

      }
    } catch (error) {
      res.status(404).send("Unable to add")
    }

  }
  static update = async (req, res) => {
    try {
      const { id } = req.params
      var o_id = new ObjectId(id);
      const { name, email, username, bio } = req.body
      const user = await UserModal.findById(o_id)
      if (user) {
        const alreadyUser = await UserModal.find({ $or: [{ email: email }, { username: username }] })
        if (!alreadyUser.length == 0) {
          res.send("Email or username already exists")
        } else {
          await UserModal.findByIdAndUpdate(
            { _id: o_id },
            {
              name: name,
              email: email,
              username: username,
              bio: bio
            }
          );
          res.send("UPDATED SUCCESSFULLY");
        }
      } else {
        res.send("no user with the given id exists")
      }
    } catch (error) {
      console.log(error)
      res.status(404).send("Unable to update")
    }
  }
  static delete = async (req, res) => {
    try {
      const {id} = req.params
      var o_id = new ObjectId(id);
      const user = await UserModal.findById(o_id);
      if (user) {
        const deletedUser = await UserModal.findByIdAndDelete(o_id);
        res.send("User Deleted Successfully")
      } else {
        res.send("no user with the given id exists")
      }
    } catch (error) {
      console.log(error)
      res.status(404).send(error.message)
    }
  }
  
}




module.exports = UserController