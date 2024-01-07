const Maintenance = require('./maintenanceSchema')

async function addComplaint({
    category,
    description,
    complaintId,
    createdBy,
    tenantId,
    status,
    imageList,
    buildingId
}) {
  try {
    let newComplaint = Maintenance.create({
      category,
      description,
      complaintId,
      createdBy,
      tenantId,
      status,
      images: imageList,
      buildingId
    });
    return newComplaint;
  } catch (err) {
    throw err;
  }
}

async function maintenanceCount({ tenantId, buildingId, flatNo }) {
  try {
    let maintenanceCount = await Maintenance.count({ tenantId })
    return maintenanceCount;
  } catch (err) {
    throw err;
  }
} 
async function getComplaints({all, id, tenantId, buildingId}){
  try {
    let where = {};
    let response;
    if (id) {
      where._id = id;
    }
    if(tenantId) {
      console.log(tenantId);
      where.tenantId = tenantId
    }

    if (buildingId) {
      where.buildingId = buildingId;
      let projection = {tenantId : 1, category: 1, status:1, complaintId:1}
      response = await Maintenance.find(where, projection);
      return response;
    }

    if (all) {
      response = await Maintenance.find(where).populate('tenantId', ['tenantName','contact', 'flatNo', 'email']);
      return response;
    }

    if(tenantId) {
      response = await Maintenance.find(where);
      console.log(response.length, 'length')
      return response;
    }

    response = await Maintenance.findOne(where).populate("tenantId", [
      "tenantName",
      "contact",
      "flatNo",
      "email",
    ]);
    return response

  } catch (err) {
    throw err
  }

}
async function updateComplaint({
  id,
  category,
  description,
  createdBy,
  tenantId,
  status,
}) {
  try {
    let response = await Maintenance.findOneAndUpdate(
      { _id: id },
      {
        category,
        description,
        createdBy,
        tenantId,
        status,
      },
      { runValidators: true}
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteComplaint({id}){
  try {
    let response ;
    if(id){
      response = await Maintenance.findOneAndDelete({_id: id})
    }else{
       response = await Maintenance.deleteMany()
    }
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addComplaint,
  maintenanceCount,
  getComplaints,
  updateComplaint,
  deleteComplaint,
};
