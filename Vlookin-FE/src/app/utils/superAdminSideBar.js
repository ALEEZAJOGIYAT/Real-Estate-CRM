import { FaThList, FaWarehouse } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { getItem } from "./functions";

export const superAdminSidebar = [
  getItem("Super Admin", "1", <FaWarehouse />, [
    getItem("Add User", "addSuperAdminUser", <HiUserAdd />),
    getItem("List User", "listSuperAdminUser", <FaThList />),
  ]),
  getItem("Maintenance", "2", <FaWarehouse />, [
    getItem("List Comaplaints", "complaints", <FaThList />),
  ]),
  getItem("Tenants", "4", <FaWarehouse />, [
    getItem("List Tenants", "tenantlist", <FaThList />),
  ]),
  getItem("Building", "5", <FaWarehouse />, [
    getItem("List Buildings", "building", <FaThList />),
    getItem("List Apartments", "listApartment", <FaThList />),
  ])
];
