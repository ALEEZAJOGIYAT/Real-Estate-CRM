import React, { useState } from 'react'
import SideBar from '../../components/Layouts/SideBar'
import { getItem } from '../../utils/functions';
import { FaThList, FaWarehouse, FaBuilding } from 'react-icons/fa';
import { routePaths } from '../../routes/config';
import MobileHeader from '../../components/Header/MobileHeader';
import { useMediaQuery } from 'react-responsive';
import { Cookies } from 'react-cookie';

const MaintanceDashboard = ({ data }) => {
    const cookies = new Cookies();
    const role = cookies.get("role"); 
    const userName = cookies.get('name');
  
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const items = [
        getItem('Maintenance', '1', <FaWarehouse />,
            [getItem('List Complaints', 'maintenanceList', <FaThList />)]
            ),
    ];
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

    return (
        <div>
            {isMobile ? <MobileHeader route={routePaths.Admin.login} showDrawer={showDrawer} /> :
                <SideBar 
                    children={data} 
                    items={items} 
                    role={role ?? '' }
                    userName={userName ?? ""} 
                    open={open}         
                    showDrawer={showDrawer}
                    setOpen={setOpen}/>
            }
        </div>
    )
}

export default MaintanceDashboard;
