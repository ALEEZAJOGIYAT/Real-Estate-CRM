import React from 'react';
import { getItem } from '../../utils/functions';
import EditTenantForm from '../../components/Form/EditTenantForm';
import SideBar from '../../components/Layouts/SideBar';
import { FaBuilding, FaThList, FaWarehouse } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';
import { RiWalkFill } from 'react-icons/ri';
import { BsBuildingFillAdd } from 'react-icons/bs';


export const EditTenant = () => {
    const items = [
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
    ];

    return(
        <div>
            <SideBar children={<EditTenantForm title={'Edit Tenant Details'} />} items={items} />
        </div>
    )
}