const RealEstate = require("./realEstateSchema");

async function addRealEstate({
  name,
  code,
}) {
  try {
    let newRealEstate = RealEstate.create({
      name,
      code,
    });

    return newRealEstate;
  } catch (err) {
    throw err;
  }
}

async function getRealEstate({all, id}){
  try {
    let where = {};
    let response;
    if (all) {
      response = await RealEstate.find();
      return response;
    }
    if (id) {
      where._id = id;
    }
    response = await RealEstate.findOne(where)
    return response

  } catch (err) {
    throw err
  }

}
async function updateRealEstate({
  id,
  name,
}) {
  try {
    let response = await RealEstate.findOneAndUpdate(
      { _id: id },
      {
        name,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteRealEstate({id, all}){
  try {
    if(all) {
      let response = await RealEstate.deleteMany()
      return response  
    }
    let response = await RealEstate.findOneAndDelete({_id: id})
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addRealEstate,
  getRealEstate,
  updateRealEstate,
  deleteRealEstate
};
