//TOTAL 5 ROLES
//ADMIN // ADD TENANTS/USERS, ADD BUILDINGS, APARTMENTS, RECEIPT VOUCHERS
//SUPER ADMIN // HAS ACCESS OF ALL THE FLOWS
//USER -> TENANT -> LAUNCH COMLAINTS/ SEE STATUS OF COMPLAINTS
//STAFF/VISITOR -> ADD/ LIST VISITO
//MAINTENANCE ->
//just check

const admin = {
  login: "/login",
  dashboard: "/admin/dashboard",
  addUser: "/admin/addUser",
  listUser: "/admin/listUser",
  listBuilding: "/admin/listBuilding",
  listAppartment: "/admin/listApartment",
  addbuilding: "/admin/addBuilding",
  addAppartment: "/admin/addAppartment",
  editBuilding: "/admin/editBuilding/:id",
  editApartment: "/admin/editApartment/:id",
  adminListComplaint: "/admin/adminlistcomplaint",
  myBuilding : "/admin/myBuildings"
};

const superAdmin = {
  login: "/superAdmin/login",
  addUser: "/superAdmin/addUser",
  editUser: "/superAdmin/editUser/:id",
  listUser: "/superAdmin/listUser",
  building: "/superAdmin/building",
  maintenance: "/superAdmin/maintenance/complaints",
  visitor: "/superAdmin/visitor",
  tenant: "/superAdmin/tenant",
  apartment: "/superAdmin/apartment",
  addReceipt: "/superAdmin/addReceipt",
  listReceipt: "/superAdmin/listReceipt",
  accountsDirectory: "/superAdmin/accountsDirectory",
  bankPaymentVoucher: "/superAdmin/bankPaymentVoucher",
  journalVoucher: "/superAdmin/journalVoucher",
  tenancyExpiryList: "/superAdmin/tenancyExpiryList",
};

// tenant is a role assigned to the user afterwards by the admin
const tenant = {
  login: "/tenant/login",
  dashboard: "/tenant/dashboard",
  listTenant: "/tenant/list",
  editTenant: "/tenant/edit/:id",
};

const maintenance = {
  dashboard: "/maintenance/dashboard",
  complaintList: "/maintenance/complaints",
};

const visitor = {
  login: "/visitor/login",
  dashboard: "/visitor/dashboard",
  listVisitor: "/visitor/list",
  editVisitor: "/visitor/edit/:id",
  receipt: "/visitor/receipt",
};

// user is not the same as admin
const user = {
  dashboard: "/user/dashboard",
  complaintForm: "/user/complaint-form",
  complaintList: "/user/complaint-list",
  receiptList: "/user/receipts",
};

const upkeeper = {
  login: "upkeeper/login",
};

const home = {
  home: "/",
};

export const apiRoutes = {
  postUser: "http://195.35.45.131:4000/auth/login",
  getUsers: "http://195.35.45.131:4000/user?all=true",
  createUsers: "http://195.35.45.131:4000/user",
  createVisitor: "http://195.35.45.131:4000/visitor/createVisit",
  getVisitor: `http://195.35.45.131:4000/visitor?all=true`,
  deleteVisitor: "http://195.35.45.131:4000/visitor/",
  getTenant: "http://195.35.45.131:4000/tenant?",
  postTenant: "http://195.35.45.131:4000/tenant",
  getBuilding: "http://195.35.45.131:4000/building?all=true",
  getApartment: "http://195.35.45.131:4000/apartment?all=true",
  createBuilding: "http://195.35.45.131:4000/building",
  createApartment: "http://195.35.45.131:4000/apartment",
  getComplaints: "http://195.35.45.131:4000/maintenance/getComplaint",
  createComplaints: "http://localhost:4000/maintenance/addComplaint",
  getReceipts: "http://195.35.45.131:4000/receipt?all=true",
  createRealEstate: "http://195.35.45.131:4000/realEstate",
  getRealEstate: "http://195.35.45.131:4000/realEstate?all=true",
  getSelectedBuilding: "http://195.35.45.131:4000/building?",
  postReceipt : "http://195.35.45.131:4000/receipt",
  myBuilding: "http://195.35.45.131:4000/building/details",
  getSelectedApartment: "http://195.35.45.131:4000/apartment?",

};

export const routePaths = {
  Home: home,
  Admin: admin,
  SuperAdmin: superAdmin,
  Tenant: tenant,
  Upkeeper: upkeeper,
  Visitor: visitor,
  Maintenance: maintenance,
  User: user,
};
