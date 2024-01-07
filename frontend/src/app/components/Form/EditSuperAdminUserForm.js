import React, { useState, useEffect } from "react";
import SideBar from "../Layouts/SideBar";
import { Col, Dropdown, Form, Input, Layout, Radio, Row, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../Header/MobileHeader";
import { routePaths } from "../../routes/config";
import { Header } from "../Header";
import { IoMdArrowDropdown } from "react-icons/io";
import { CustomButton } from "../Button";
import { toast } from "react-toastify";
import { CustomAlert } from "../Alert";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export const EditSuperAdminUser = ({ showDrawer }) => {
  const { id } = useParams();

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [gender, setGender] = useState(1);
  const [category, setCategory] = useState("tenant");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    userId: "",
    contact: "",
  });
  const [allowSubUsers, setAllowSubUsers] = useState(false);
  const [allowMultipleBuildings, setAllowMultipleBuildings] = useState(false);

  const onChange = (e) => {
    setGender(e.target.value);
    setAllowSubUsers(e.target.value);
  };

  const handleMultipleBuildings = (e) => {
    setAllowMultipleBuildings(e.target.value);
  };

  const handleSubUsers = (e) => {
    setAllowSubUsers(e.target.value);
  };

  const items = [
    {
      label: "Tenant",
      key: "tenant",
    },
    {
      label: "Visitor",
      key: "visitor",
    },
    {
      label: "Admin",
      key: "admin",
    },
    {
      label: "User",
      key: "user",
    },
  ];

  const handleMenuClick = (e) => {
    setCategory(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: [e.target.value] });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const url = `http://195.35.45.131:4000/user?id=${id}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Methods", "PATCH");

    const data = {
      userName: inputs.name,
      email: inputs.email,
      contact: inputs.contact,
      password: inputs.password,
      role: inputs.role,
      allowSubUsers: allowSubUsers,
      allowMultipleBuildings: allowMultipleBuildings,
      gender: gender,
      userId: inputs.userId,
    };
    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.status == 200) {
        toast.success("User Created Successfully");
        navigate(routePaths.Tenant.listTenant);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  const getUsers = async () => {
    axios
      .get(`http://195.35.45.131:4000/user?id=${id}`)
      .then((res) => {
        setInputs({
          name: res.data.data.userName,
          email: res.data.data.email,
          role: res.data.data.role,
          contact: res.data.data.contact,
          password: res.data.data.password,
          userId: res.data.data.userId,
        });
        setGender(res.data.data.gender);
        setAllowMultipleBuildings(res.data.data.allowMultipleBuildings);
        setAllowSubUsers(res.data.data.allowSubUsers);
      })
      .catch((e) => toast.error(e));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        {isMobile ? (
          <MobileHeader
            route={routePaths.Visitor.login}
            showDrawer={showDrawer}
          />
        ) : (
          <Header
            title={"Add User Details"}
            subtitle={"welcome to Super Admin panel"}
            route={routePaths.Admin.login}
          />
        )}
        <div className="mb_form_heading">
          <h2>Add User Details</h2>
          <p className="headerText">welcome to Super admin panel</p>
        </div>
      </div>
      <div className="body">
        <Row>
          <Col md={10} sm={16}>
            <Input
              placeholder="Username"
              className="form_input"
              name="name"
              value={inputs.name}
              onChange={handleInputs}
            />
            <Input
              placeholder="Email"
              className="form_input"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
            />
            <Input
              placeholder="Password"
              className="form_input"
              name="password"
              value={inputs.password}
              onChange={handleInputs}
            />
            <Input
              placeholder="User Id"
              className="form_input"
              name="userId"
              value={inputs.userId}
              onChange={handleInputs}
            />
          </Col>
          <Col offset={isMobile ? 0 : 4} md={10} sm={16}>
            <Form.Item>
              <Input
                placeholder="Contact"
                className="form_input"
                name="contact"
                value={inputs.contact}
                onChange={handleInputs}
              />
              <div>
                <p>Gender</p>
                <Radio.Group onChange={onChange} value={gender}>
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                </Radio.Group>
              </div>

              <Dropdown.Button
                menu={menuProps}
                trigger={["click"]}
                icon={<IoMdArrowDropdown />}
              >
                {category}
              </Dropdown.Button>
              <br />
              <br />
              <p style={{ color: "#4A0D37" }}>Allow Sub Users</p>
              <Radio.Group onChange={handleSubUsers} value={allowSubUsers}>
                <Radio value={"true"}>True</Radio>
                <Radio value={"false"}>False</Radio>
              </Radio.Group>
              <br />
              <br />

              <p style={{ color: "#4A0D37" }}>Allow Multiple Buildings Users</p>
              <Radio.Group
                onChange={handleMultipleBuildings}
                value={allowMultipleBuildings}
              >
                <Radio value={"true"}>True</Radio>
                <Radio value={"false"}>False</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <div className="addform_btn">
          <CustomButton
            handleClick={handleSave}
            buttonName={"Save"}
            bgColor={"#4A0D37"}
            color={"#F8F8F8"}
          />
        </div>
        <CustomAlert />
      </div>
    </>
  );
};
