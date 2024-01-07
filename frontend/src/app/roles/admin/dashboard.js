import React, { useState } from 'react'
import SideBar from '../../components/Layouts/SideBar'
import { useMediaQuery } from 'react-responsive';
import { adminSidebar } from '../../utils/roleSidebar';
import { Cookies } from 'react-cookie';

const AdminDashboard = ({ data }) => {
    const cookies = new Cookies();
    const role = cookies.get("role"); 
    const userName = cookies.get('name');
  
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    return (
        <div>
            <SideBar children={data} items={adminSidebar} role={role} userName = {userName} showDrawer={showDrawer} open={open} setOpen={setOpen} />
        </div>
    )
}

export default AdminDashboard;
