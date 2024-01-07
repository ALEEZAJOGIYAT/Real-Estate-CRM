const express = require("express");
const router = express.Router();
const realEstateController = require('./realEstateController')

router.post('/', realEstateController.createRealEstate)
router.get('/', realEstateController.getRealEstate)
router.patch('/', realEstateController.updateRealEstate)
router.delete('/', realEstateController.deleteRealEstate)
module.exports = router