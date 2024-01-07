const express = require("express");
const router = express.Router();
const buildingController = require('./buildingController')

router.post('/', buildingController.createBuilding)
router.get('/', buildingController.getBuilding)
router.patch('/', buildingController.updateBuilding)
router.delete('/', buildingController.deleteBuilding)
router.get('/details', buildingController.getSelectedBuildingDetails)
module.exports = router