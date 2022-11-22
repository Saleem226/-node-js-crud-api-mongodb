const UserModal = require('../modals/userModal')
var ObjectId = require('mongodb').ObjectId;
class UserController {

  static async find(req, res) {

    try {
      const users = await UserModal.find()
      console.log("hello")
      res.send(users)

    } catch (error) {
      res.send("Unable to Access")
    }

  }

  static async findOne(req, res) {

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

  static async insert(req, res) {

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

  static async update(req, res) {
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
          const updatedResult = await UserModal.findByIdAndUpdate(
            { _id: o_id },
            {
              name: name,
              email: email,
              username: username,
              bio: bio
            }
          )
          (updatedResult)? res.send("UPDATED SUCCESSFULLY"):res.send("Hello by");
        }
      } else {
        res.send("no user with the given id exists")
      }
    } catch (error) {
      res.status(404).send("Unable to update")
    }
  }


  static async delete(req, res) {
    try {
      const { id } = req.params
      var o_id = new ObjectId(id);
      const user = await UserModal.findById(o_id)
      if (user) {

        const deletedUser = await UserModal.findByIdAndDelete(o_id)
        res.send("User Deleted Successfully")

      } else {
        res.send("no user with the given id exists")
      }
    } catch (error) {
      res.status(404).send("Unable to delete")
    }
  }


}

module.exports = UserController