import React, { useState, useEffect } from "react";
import { apiRoutes, routePaths } from "../../routes/config";
import CusTable from "../../components/Table/Table";
import axios from "axios";
import { CustomAlert } from "../../components/Alert";
import { useNavigate } from "react-router";
import SideBar from "../../components/Layouts/SideBar";
import { FaEye } from "react-icons/fa";
import ViewCompliantModal from "../../components/Modal/ViewCompliantModal";
import { FaThList, FaWarehouse } from "react-icons/fa";
import { getItem } from "../../utils/functions";
import { Cookies } from "react-cookie";

export const MaintenanceListComplaint = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const role = cookies.get("role"); 
  const userName = cookies.get('name');
  const buildingId = cookies.get('buildingId');
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      complaintTitle: "",
      fullName: "",
      description: "",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [complaints, setComplaint] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const showDrawer = () => {
    setOpen(true);
  };

  const handleView = (record) => {
    setVisibleModal(true);
    setComplaint(record);
  };

  const columns = [
    {
      title: "Complaint Id",
      dataIndex: "complaintId",
      key: "complaintId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Name",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: 'CLOSED',
          value: 'CLOSED',
        },
        {
          text: 'SUBMITTED',
          value: 'SUBMITTED',
        },
        {
          text: '	IN PROGRESS',
          value: '	IN PROGRESS',
        },
        {
          text: 'HOLD',
          value: 'HOLD',
        },
      ],
      ellipsis: true,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="icon">
          <FaEye onClick={() => handleView(record)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    console.log(buildingId, 'BASJD')
    axios
      .get(`${apiRoutes.getComplaints}?buildingId=${buildingId}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const filteredData = data.filter((item) =>
    item?.complaintId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const items = [
    getItem("Maintenance", "1", <FaWarehouse />, [
      getItem("List Complaints", "maintenanceList", <FaThList />),
    ]),
  ];

  return (
    <div>
      <SideBar
        children={
          <CusTable
            columns={columns}
            data={filteredData ? filteredData : data}
            heading={"Complaint List"}
            subHeading={"maintenance panel"}
            loading={loading}
            route={routePaths.Admin.login}
            showDrawer={showDrawer}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
        showDrawer={showDrawer}
        open={open}
        setOpen={setOpen}
        items={items}
        role = {role}
        userName = {userName}

      />
      <CustomAlert />
      <ViewCompliantModal
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        data={complaints}
        path={routePaths.Maintenance.complaintList}
      />
    </div>
  );
};
