import { FaThList, FaWarehouse, FaBuilding } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { MdApartment, MdOutlineDomainDisabled } from 'react-icons/md';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { BiMessageError } from 'react-icons/bi';
import { getItem } from './functions';

export const adminSidebar = [
    getItem('Tenant', '2', <FaWarehouse />,
        [getItem('Add Tenant', 'addtenant', <HiUserAdd />),
        getItem('List Tenant', 'tenantlist', <FaThList />)]),
    getItem('Building', '3', <FaBuilding />,
        [getItem('Add building', 'addbuilding', <BsBuildingFillAdd />),
        getItem('List building', 'listbuilding', <FaThList />),
        getItem('Add Appartment', 'addApartment', <BsBuildingFillAdd />),
        ]),
    getItem('Appartment', '4', <MdApartment />,
        [getItem('List Appartment', 'listApartment', <FaThList />)]),
    getItem('Maintenance', '5', <MdOutlineDomainDisabled />,
        [getItem('List Complaints', 'adminListComplaint', <BiMessageError />)]),
];