const express = require('express');
const users = require('../../database');
const router = express.Router();
const uuid = require('uuid');

router.get('/', (req, res) => {
  res.json({
    users
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!users.some((u) => u.id === id)) {
    return res.status(400).json({
      message: `no users found with if id of ${id}`
    });
  }
  res.json({
    users: users.filter((u) => u.id === id)
  });
});

router.post('/', (req, res) => {
  const newUser = {
    ...req.body,
    id: uuid.v4()
  };
  console.log(req.body)
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({
      message: "Please include an name and email"
    })
  }
  users.push(newUser);
  res.redirect('/');
});

module.exports = router;
