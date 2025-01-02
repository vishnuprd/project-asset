const express = require('express');
const router = express.Router();
const {
  createScrap,
  getScrap,
  getScrapById,
  updateScrap,
  deleteScrap,
} = require('../controllers/scrap.controllers.js');


router.post('/', createScrap);
router.get('/', getScrap);
router.get('/:id', getScrapById);
router.put('/:id', updateScrap);
router.delete('/:id', deleteScrap);

module.exports = router;