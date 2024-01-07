import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ComplaintForm from "../../components/Form/ComplaintForm";
import Profile from "../../components/Form/userProfileForm";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomAlert } from "../../components/Alert";
import { useMediaQuery } from "react-responsive";
import { getItem } from '../../utils/functions';
import { FaThList, FaWarehouse, FaBuilding } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { BiMessageError } from 'react-icons/bi';
import { MdOutlineDomainDisabled } from 'react-icons/md';
import { routePaths } from '../../routes/config';
import MobileHeader from '../../components/Header/MobileHeader';
import SideBar from "../../components/Layouts/SideBar";
import { Cookies, useCookies } from "react-cookie";


const UserProfile = () => {
  const cookie = new Cookies()
  const [tenantData, setTenantData] = useState([]);
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
  const [cookies, setCookies, removeCookie] = useCookies();

  const getUsers = async (tenantId) => {
    axios
      .get(`http://195.35.45.131:4000/tenant?id=${tenantId}`)
      .then((response) => {
        setTenantData(response.data.data);
        setCookies("buildingId", response.data.data.buildingId._id);           // your token
    })
      .catch((e) => toast.error(e));
  };

  useEffect(() => {
    let tenantId = cookie.get('userId');
    getUsers(tenantId);
  }, []);

  return (
    <div>
      <SideBar children={<Profile data={tenantData} showDrawer={showDrawer}/>} 
     role = {'tenant'} userName= {tenantData.tenantName} items={items} showDrawer={showDrawer} open={open} setOpen={setOpen}/>
      <CustomAlert />
    </div>
  );
};

export default UserProfile;
