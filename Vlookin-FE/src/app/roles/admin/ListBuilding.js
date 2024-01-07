import React, { useState, useEffect } from "react";
import { apiRoutes, routePaths } from "../../routes/config";
import CusTable from "../../components/Table/Table";
import axios from "axios";
import { DeleteModal } from "../../components/Modal";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CustomAlert } from "../../components/Alert";
import { useNavigate } from "react-router";
import SideBar from "../../components/Layouts/SideBar";
import { adminSidebar } from "../../utils/roleSidebar";
import { Cookies } from "react-cookie";

export const ListBuilding = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const role = cookies.get("role"); 
  const userName = cookies.get('name');
  const userId = cookies.get("userId")

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };

  const handleEdit = (record) => {
    navigate(`/admin/editBuilding/${record._id}`);
    localStorage.setItem("buildingData", record);
  };

  const handleDelete = async (record) => {
    try {
      const url = `http://195.35.45.131:4000/building?id=${record._id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      toast.success("Building Deleted Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    {
      title: "Owner Name",
      dataIndex: "fullName",
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
    },
    {
      title: "Building Code",
      dataIndex: "buildingCode",
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
    },
    {
      title: "Floors",
      dataIndex: "floorCount",
    },
    {
      title: "Parkings",
      dataIndex: "parkingCount",
    },    
    {
      title: "Real Estate",
      dataIndex: "realEstateName",
    },
    {
      title: "Update",
      key: "Update",
      render: (_, record) => (
        <div className="icon">
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteModal handleDelete={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiRoutes.getSelectedBuilding}userId=${userId}`)
      .then((res) => {
        setData(res.data.data.map((row ) => (
          { 
            fullName: row.fullName,
            buildingName: row.buildingName, 
            buildingCode: row.buildingCode,
            landmark:row.landmark,
            floorCount:row.floorCount,
            parkingCount:row.parkingCount,
            realEstateName:row.realEstateId.name,
            _id: row._id
            }
          )));
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);


  const filteredData = data.filter((item) =>
    item?.buildingName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SideBar
        children={
          <CusTable
            columns={columns}
            data={filteredData ? filteredData : data}
            heading={"View Buildings"}
            subHeading={"admin panel"}
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
        items={adminSidebar}
        role = {role}
        userName = {userName}
      />
      <CustomAlert />
    </div>
  );
};
