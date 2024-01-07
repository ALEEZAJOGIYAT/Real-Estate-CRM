const apartmentModel = require("./apartmentModel");

async function addApartment(req, res) {
  try {
    let {
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      floorNo,
      comments,
      flatNo,
      noOfApartments,
    } = req.body;
    console.log(req.body, 'requess')
    //to verify if apartment is already added to record
    if ( flatNo.length !== noOfApartments) {
      console.log(flatNo.length, noOfApartments, 'chhh')
      throw Error("Please provide a flat number for each flat record")
    }
    let checkFlatExistence = await apartmentModel.getApartment({
      buildingId,
      all: true,
    });
    let arrayOfExistingFlats = [];
    arrayOfExistingFlats = checkFlatExistence.map((elem) => {
      return elem.flatNo;
    });

    let apartmentArray = [];
    for (let i = 0; i < noOfApartments; i++) {
      if (arrayOfExistingFlats.includes(flatNo[i])) {
        throw Error(
          `Apartment number ${flatNo[i]} already exists in this building.`
        );
      }

      apartmentArray.push({
        buildingId: buildingId,
        apartmentType: apartmentType,
        area: area,
        rent: rent,
        furnished: furnished,
        isStudio: isStudio,
        balcony: balcony,
        rooms: rooms,
        floorNo: floorNo,
        comments: comments,
        flatNo: flatNo[i],
      });
    }
    let newApartment = await apartmentModel.addApartment(apartmentArray);
    res.status(200).send({
      status: 200,
      message: "Apartment Successfully Added",
      data: newApartment,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function getApartment(req, res) {
  try {
    let { id,  buildingId,  all } = req.query;
    let result = await apartmentModel.getApartment({ id, buildingId , all });

    res.status(200).send({
      status: 200,
      message: "Apartment Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}
async function updateApartment(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      floorNo,
      comments,
      flatNo,
    } = req.body;

    let updatedApartment = await apartmentModel.updateApartment({
      id,
      buildingId,
      apartmentType,
      area,
      rent,
      furnished,
      isStudio,
      balcony,
      rooms,
      floorNo,
      comments,
      flatNo
      
    });
    return res.status(200).send({
      message: "Apartment Updated Succesfully",
      status: 200,
      data: updatedApartment,
    });
  } catch (err) {
    res.status(500).send({
      message: "Update failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteApartment(req, res) {
  try {
    let { id } = req.query;

    let deletedApartment = await apartmentModel.deleteApartment({ id });
    return res.status(200).send({
      message: "Apartment Deleted Succesfully",
      status: 200,
      data: deletedApartment,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function apartmentWithDetails(req,res){
  try {

    let { apartmentId } = req.query
    let response = await apartmentModel.apartmentWithBuildingAndTenant({id: apartmentId})
    res.status(200).send({
      message: "Details fetched",
      data: response
    })
  } catch (err) {
    res.status(500).send({
      message: "failed to get apaetment details",
      error: err.message
    })
  }
}

module.exports = {
  addApartment,
  getApartment,
  updateApartment,
  deleteApartment,
  apartmentWithDetails,
};
