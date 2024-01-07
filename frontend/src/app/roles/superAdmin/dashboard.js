import React, { useState } from "react";
import SideBar from "../../components/Layouts/SideBar";
import { AddSuperAdminUser } from "./AddUser";
import { superAdminSidebar } from "../../utils/superAdminSideBar";
import { Cookies } from "react-cookie";

const SuperAdminDashboard = () => {
  const cookies = new Cookies();
  const role = cookies.get("role"); 
  const userName = cookies.get('name');
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div>
      <SideBar
        children={<AddSuperAdminUser showDrawer={showDrawer} />}
        items={superAdminSidebar}
        role={role ?? '' }
        userName={userName ?? ""}
        showDrawer={showDrawer}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default SuperAdminDashboard;
