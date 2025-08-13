const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname, "../data/users.json");
const User = require('../models/users');
const Card = require('../models/cards');

const getUsers = (req, res)=>{
  User.find({})
  .orFail()
  .then(users => res.json(users))
  .catch(next);
}
const getCards = (req, res)=>{
  Card.find({})
  .orFail()
  .then((cards)=>{console.log(cards)})
  .then(cards => res.json(cards))
  .catch(next);
}

const getUser = (req,res)=>{
  const { id } = req.params;
  User.findById(id)
  .orFail()
  .then(user => res.json(user))
  .catch(next);
}

const createUser = (req, res)=>{
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .orFail()
  .then(user => res.json(user))
    .catch(next);
}

const updateUser = (req, res)=>{
  const {name, about, avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about, avatar}, {new: true})
  .orFail()
  .then(user => res.json(user))
  .catch(next);
}

const updateAvatar = (req, res)=>{
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true})
  .orFail()
  .then(user => res.json(user))
  .catch(next);
}

const createCard = (req, res)=>{
  const {name, link} = req.body;
  Card.create({name, link})
  .orFail()
  .then(card => res.json(card))
    .catch(next);
}

const deleteCard = (req, res)=>{
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
  .orFail()
  .then(card => res.json(card))
  .catch(next);
}

const likeCard = (req, res)=>{
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {$addToSet: {likes: req.user._id}}, {new: true})
  .orFail()
  .then(card => res.json(card))
  .catch(next);
}

const dislikeCard = (req, res)=>{
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {$pull: {likes: req.user._id}}, {new: true})
  .orFail()
  .then(card => res.json(card))
  .catch(next);
}

module.exports = {getUsers, getCards,getUser, createUser, createCard, deleteCard, updateUser, updateAvatar, likeCard, dislikeCard}