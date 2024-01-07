import React, { useState } from 'react'
import { EditSuperAdminUser } from '../../components/Form/EditSuperAdminUserForm';
import SideBar from '../../components/Layouts/SideBar'
import { superAdminSidebar } from '../../utils/superAdminSideBar';

const EditSuperAdmin = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const role = localStorage.getItem('superadminRole');
    const userName = localStorage.getItem('adminName');

    return (
        <div>
            <SideBar children={<EditSuperAdminUser showDrawer={showDrawer} />} items={superAdminSidebar} role={role ? role : ''} userName={userName ? userName : ''} showDrawer={showDrawer} open={open} setOpen={setOpen} />
        </div>
    )
}

export default EditSuperAdmin;


