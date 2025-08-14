const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname, "../data/users.json");
const User = require('../models/users');
const Card = require('../models/cards');

const getUsers = (req, res, next)=>{
  User.find({})
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(users => res.json(users))
  .catch(next);
}
const getCards = (req, res, next)=>{
  Card.find({})
  .orFail()//controlador de errores global esta en app.js como middleware
  .then((cards)=>{console.log(cards)})
  .then(cards => res.json(cards))
  .catch(next);
}

const getUser = (req,res, next)=>{
  const { id } = req.params;
  User.findById(id)
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(user => res.json(user))
  .catch(next);
}

const createUser = (req, res, next)=>{
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then(user => res.json(user))
  .catch(next);
}

const updateUser = (req, res, next)=>{
  const {name, about, avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about, avatar}, {new: true})
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(user => res.json(user))
  .catch(next);
}

const updateAvatar = (req, res, next)=>{
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true})
  .orFail()
  .then(user => res.json(user))
  .catch(next);
}

const createCard = (req, res, next)=>{
  const {name, link} = req.body;
  Card.create({name, link})
  .then(card => res.json(card))
    .catch(next);
}

const deleteCard = (req, res, next)=>{
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(card => res.json(card))
  .catch(next);
}

const likeCard = (req, res, next)=>{
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {$addToSet: {likes: req.user._id}}, {new: true})
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(card => res.json(card))
  .catch(next);
}

const dislikeCard = (req, res, next)=>{
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {$pull: {likes: req.user._id}}, {new: true})
  .orFail()//controlador de errores global esta en app.js como middleware
  .then(card => res.json(card))
  .catch(next);
}

module.exports = {getUsers, getCards,getUser, createUser, createCard, deleteCard, updateUser, updateAvatar, likeCard, dislikeCard}