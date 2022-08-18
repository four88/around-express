const path = require('path')
const router = require('express').Router();
const getDataFromFile = require('../helper/readFile')

const cardPath = path.join(__dirname, '../data/cards.json')

// set controller
// for get all cards data
const getCards = (req, res) => {
  getDataFromFile(cardPath)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send(err))
}

router.get('/cards', getCards)

module.exports = router

