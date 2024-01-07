const express = require('express')
const router = express.Router()
const maintenanceController = require('./maintenanceController.js')
const { uploadFiles } = require("../../middleware/multer.js");


router.post('/addComplaint', maintenanceController.addComplaint)
router.get('/getComplaint', maintenanceController.getComplaints)
router.patch('/updateComplaint', maintenanceController.updateComplaint)
router.delete('/deleteComplaint', maintenanceController.deleteComplaint)

module.exports = router