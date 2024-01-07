import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "../components/Login";
import { routePaths } from "./config";
import { ListUser } from "../roles/superAdmin/ListUser";
import DashboardScr from "../roles/Tenant/DashboardScr";
import ListTenant from "../roles/Tenant/ListTenant";
import { ListAppartment } from "../roles/admin/ListApartment";
import { ListBuilding } from "../roles/admin/ListBuilding";
import AdminDashboard from "../roles/admin/dashboard";
import AddAppartment from "../roles/admin/AddAppartment";
import { EditTenant } from "../roles/Tenant/EditTenant";
import AddBuilding from "../roles/admin/AddBuilding";
import AddUsers from "../roles/admin/AddUser";
import EditBuilding from "../roles/admin/EditBuilding";
import EditApartment from "../roles/admin/EditApartment";
import AddComplaint from "../roles/User/AddComplaint";
import { ListComplaint } from "../roles/User/ListComplaint";
import MaintanceDashboard from "../roles/Maintenance/Dashboard";
import { AdminListComplaint } from "../roles/admin/AdminListComplaint";
import { MaintenanceListComplaint } from "../roles/Maintenance/MaintenanceListComplaint";
import SuperAdminDashboard from "../roles/superAdmin/dashboard";
import UserProfile from "../roles/User/UserProfile";
import { Cookies } from "react-cookie";


const WebRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  console.log(token, cookies, "cookies in route file debugging");

  return (
    <>
      <Router>
        <Routes>
          <Route path={routePaths.Admin.login} exact element={<Login />} />

          <Route
            path={routePaths.Admin.dashboard}
            exact
            element={
               <AdminDashboard /> 
            }
          />
          <Route
            path={routePaths.Admin.addUser}
            exact
            element={ <AddUsers /> }
          />
          <Route
            path={routePaths.Admin.listUser}
            exact
            element={ <ListUser /> }
          />
          <Route
            path={routePaths.Admin.listAppartment}
            exact
            element={
               <ListAppartment /> 
            }
          />
          <Route
            path={routePaths.Admin.listBuilding}
            exact
            element={ <ListBuilding /> }
          />
          <Route
            path={routePaths.Admin.addAppartment}
            exact
            element={ <AddAppartment /> }
          />
          <Route
            path={routePaths.Admin.addbuilding}
            exact
            element={ <AddBuilding /> }
          />
          <Route
            path={routePaths.Admin.editBuilding}
            exact
            element={ <EditBuilding /> }
          />
          <Route
            path={routePaths.Admin.editApartment}
            exact
            element={ <EditApartment /> }
          />
          <Route
            path={routePaths.Admin.adminListComplaint}
            exact
            element={
               <AdminListComplaint /> 
            }
          />

          {/* Tenant Routes */}

          <Route
            path={routePaths.Tenant.dashboard}
            exact
            element={ <DashboardScr /> }
          />
          <Route
            path={routePaths.Tenant.listTenant}
            exact
            element={ <ListTenant /> }
          />
          <Route
            path={routePaths.Tenant.editTenant}
            exact
            element={ <EditTenant /> }
          />

          {/* User  Route*/}

          <Route
            path={routePaths.User.dashboard}
            exact
            element={ <UserProfile /> }
          />
          <Route
            path={routePaths.User.complaintForm}
            exact
            element={ <AddComplaint /> }
          />
          <Route
            path={routePaths.User.complaintList}
            exact
            element={ <ListComplaint /> }
          />

          {/* Maintenance  Route*/}

          <Route
            path={routePaths.Maintenance.dashboard}
            exact
            element={
               <MaintanceDashboard /> 
            }
          />
          <Route
            path={routePaths.Maintenance.complaintList}
            exact
            element={
                <MaintenanceListComplaint />
            }
          />

          {/* SuperAdmin  Route*/}

          <Route
            path={routePaths.SuperAdmin.addUser}
            exact
            element={
               <SuperAdminDashboard /> 
            }
          />

        </Routes>
      </Router>
    </>
  );
};

export default WebRoutes;
