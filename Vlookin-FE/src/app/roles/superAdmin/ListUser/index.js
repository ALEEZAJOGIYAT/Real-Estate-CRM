import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import SideBar from "../../../components/Layouts/SideBar";
import { DeleteModal } from "../../../components/Modal";
import CusTable from "../../../components/Table/Table";
import { CustomAlert } from "../../../components/Alert";
import { superAdminSidebar } from "../../../utils/superAdminSideBar";
import { apiRoutes, routePaths } from "../../../routes/config";
import { EditOutlined } from "@ant-design/icons";
import SuperAdminCompliantModal from "../../../components/Modal/SuperAdminComplaintModal";
import { Cookies } from "react-cookie";

export const ListUser = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const role = cookies.get("role"); 
  const userName = cookies.get('name');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      userName: "",
      email: "",
      role: "",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [complaints, setComplaint] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };

  const handleEdit = (record) => {
    navigate(`/superAdmin/editUser/${record._id}`);
    localStorage.setItem("buildingData", record);
  };

  const handleDelete = async (record) => {
    try {
      const url = `http://195.35.45.131:4000/user?id=${record._id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      toast.success("User Deleted Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleView = (record) => {
    setVisibleModal(true);
    setComplaint(record);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
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
      .get(apiRoutes.getUsers)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const filteredData = data.filter((item) =>
    item?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SideBar
        children={
          <CusTable
            columns={columns}
            data={filteredData ? filteredData : data}
            heading={"Complaint List"}
            subHeading={"Super Admin Panel"}
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
        items={superAdminSidebar}
        role = {role}
        userName = {userName}
      />
      <CustomAlert />
      <SuperAdminCompliantModal
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        data={complaints}
      />
    </div>
  );
};
