import React, { useState } from 'react'
import SideBar from '../../components/Layouts/SideBar'
import TenateForm from '../../components/Form/TenateForm';
import { getItem } from '../../utils/functions';
import { FaBuilding, FaThList, FaWarehouse } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';
import { RiWalkFill } from 'react-icons/ri';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { Cookies } from 'react-cookie';


const DashboardScr = () => {
    const cookies = new Cookies();
    const role = cookies.get("role"); 
    const userName = cookies.get('name');
  
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const items = [
        getItem('Tenant', '1', <FaWarehouse />,
            [getItem('Add Tenant', 'addtenant', <HiUserAdd />),
            getItem('List Tenant', 'tenantlist', <FaThList />)])
    ];

    const adminItems = [
        getItem('Visitor', 'add_visitor', <RiWalkFill />),
        getItem('Tenant', '2', <FaWarehouse />,
            [getItem('Add Tenant', 'addtenant', <HiUserAdd />),
            getItem('List Tenant', 'tenantlist', <FaThList />)]),
        getItem('Building', '3', <FaBuilding />,
            [getItem('Add building', 'addbuilding', <BsBuildingFillAdd />),
            getItem('List building', 'listbuilding', <FaThList />),
            getItem('Add Appartment', 'addApartment', <BsBuildingFillAdd />)
            ]),
        getItem('Appartment', '4', <MdApartment />,
            [getItem('List Appartment', 'listApartment', <FaThList />)]),
    ]

    return (
        <div>
            <SideBar children={<TenateForm showDrawer={showDrawer} role={role}/> } items={adminItems} role={role ? role : ''} userName={userName ? userName : ''}  showDrawer={showDrawer} open={open} setOpen={setOpen}/>
        </div>
    )
}

export default DashboardScr;
