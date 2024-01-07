import React, { useState, useEffect } from "react";
import { Button, Col, Input, Radio, Row } from "antd";
import { CustomButton, CustomOutlineButton } from "../Button";
import "./style.css";
import { useNavigate, useParams } from "react-router";
import { Header } from "../Header";
import { routePaths } from "../../routes/config";
import OTPmodal from "../Modal/OTPmodal";
import { toast } from "react-toastify";
import axios from "axios";
import { CustomAlert } from "../Alert";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../Header/MobileHeader";
import BuildingDropDown from "../DropDown";

const EditTenantForm = ({ title, showDrawer }) => {
  const { id } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    buildingName: "",
    flatNo: "",
    mobileNo: "",
    officeNo: "",
    nationality: "",
  });

  const [selectedBuilding, setSelectedBuilding] = useState("");

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const onSave = () => {
    console.log("click");
    setModalOpen(true);
  };
  const onCancel = () => {
    setModalOpen(false);
  };

  const handleBuildingChange = (value) => {
    setSelectedBuilding(value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const url = `http://195.35.45.131:4000/tenant?id=${id}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Methods", "PATCH");

    const data = {
      name: inputs.tenantName,
      email: inputs.email,
      buildingName: inputs.buildingName,
      flatNo: inputs.flatNo,
      officeNo: inputs.officeNo,
      nationality: inputs.nationality,
      contact: inputs.mobileNo,
    };

    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.status == 200) {
        toast.success("Tenant Edited Successfully");
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
      .get(`http://195.35.45.131:4000/tenant?id=${id}`)
      .then((res) => {
        setInputs({
          name: res.data.data.tenantName,
          email: res.data.data.email,
          buildingName: res.data.data.buildingName,
          flatNo: res.data.data.flatNo,
          officeNo: res.data.data.officeNo,
          nationality: res.data.data.nationality,
          comment: "",
          mobileNo: res.data.data.contact,
        });
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
            title={"Edit Tenant Details"}
            subtitle={"welcome to tenant panel"}
            route={routePaths.Admin.login}
          />
        )}
        <div className="mb_form_heading">
          <h2>Edit Tenant Details</h2>
          <p className="headerText">welcome to tenant panel</p>
        </div>
      </div>
      <div className="edit-body">
        <Row>
          <Col md={10} sm={16}>
            <Input
              placeholder="Full name"
              className="form_input"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              className="form_input"
              name="email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <div>
              <Input
                placeholder="Mobile No."
                className="form_input"
                name="mobileNo"
                value={inputs.mobileNo}
                onChange={handleChange}
              />

              <Input
                placeholder="Nationality"
                className="form_input"
                name="nationality"
                value={inputs.nationality}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col offset={isMobile ? 0 : 4} md={10} sm={16}>
            <BuildingDropDown
                setSelectedBuilding={setSelectedBuilding}
                />
            <Input
              placeholder="Flat no"
              className="form_input"
              name="flatNo"
              value={inputs.flatNo}
              onChange={handleChange}
            />
            <Input
              placeholder="Office No. "
              className="form_input"
              name="officeNo"
              value={inputs.officeNo}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <div className="addform_btn">
          <CustomButton
            buttonName={"Save"}
            bgColor={"#4A0D37"}
            color={"#F8F8F8"}
            handleClick={handleSave}
          />
        </div>
        <CustomAlert />
      </div>
    </>
  );
};

export default EditTenantForm;
