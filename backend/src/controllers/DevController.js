const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } }, // $ne => not equal
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    let response;

    try {
      response = await axios.get(`https://api.github.com/users/${username}`);
    } catch (err) {
      return res.status(404).json({ error: 'user does not exist on github' });
    }

    const { name, bio, avatar_url: avatar } = response.data;

    try {
      const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
      });

      return res.json(dev);
    } catch (err) {
      return res.status(400).json({ error: 'user does not have a name' });
    }
  }
};

// the controller can hold the following methods:
// INDEX, SHOW, STORE, UPDATE, DELETE
// nothing else!!
