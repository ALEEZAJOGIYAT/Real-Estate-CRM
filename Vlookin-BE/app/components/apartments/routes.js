const express = require('express')
const router = express.Router()
const apartmentController = require('./apartmentController')
router.get('/', apartmentController.getApartment )
router.get('/apartment-details', apartmentController.apartmentWithDetails )
router.post('/', apartmentController.addApartment)
router.patch('/', apartmentController.updateApartment )
router.delete('/', apartmentController.deleteApartment)
module.exports= router