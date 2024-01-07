import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Layouts/SideBar'
import { getItem } from '../../utils/functions';
import { FaThList, FaWarehouse, FaBuilding } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { routePaths } from '../../routes/config';
import MobileHeader from '../../components/Header/MobileHeader';
import { useMediaQuery } from 'react-responsive';
import { BiMessageError } from 'react-icons/bi';
import { MdOutlineDomainDisabled } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Cookies } from 'react-cookie';

const Dashboard = ({ data, tenantData }) => {
    const cookies = new Cookies();
    const role = cookies.get("role"); 
    const userName = cookies.get('name');
  
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };


    const items = [
        getItem('Tenant', '1', <FaWarehouse />,
            [getItem('Add Complaint', 'addcomplaint', <HiUserAdd />),
            getItem('List Complaint', 'complaintlist', <FaThList />)]),
        getItem('Receipts', '2', <MdOutlineDomainDisabled />,
        [getItem('List Receipts', 'receiptList', <BiMessageError />)]
        ),
    ];
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })


    return (
        <div>
            {isMobile ? <MobileHeader route={routePaths.Admin.login} showDrawer={showDrawer} /> :
                <SideBar children={data} items={items} data = {tenantData} open={open} role={role} userName={userName}/>
            }
        </div>
    )
}

export default Dashboard;
