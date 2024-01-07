import React, { useEffect, useState } from "react";
import {
  Space,
  Modal,
  Row,
  Radio,
  Col,
  Dropdown,
  message,
  Form,
  Input,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { IoMdArrowDropdown } from "react-icons/io";
import TextArea from "antd/es/input/TextArea";
import "./style.css";
import { CustomButton } from "../Button";
import { async } from "q";
import { toast } from "react-toastify";
import { routePaths } from "../../routes/config";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { CustomAlert } from "../Alert";

const VisitorModal = ({ visibleModal, setVisibleModal, data, path, id }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    comment: "",
    contact: "",
    maxRooms: "",
    date: "",
    followUp: "",
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleEdit = () => {
    setEditStatus(true);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const handleUpdate = async (event, data) => {
    event.preventDefault();
    const url = `http://195.35.45.131:4000/visitor?id=${data._id}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Methods", "PATCH");

    const postData = {
      visitorName: inputs.name,
      email: inputs.email,
      contact: inputs.contact,
      date: inputs.date,
      buildingName: null,
      flatNo: null,
      followUp: inputs.followUp,
    };

    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(postData),
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.status == 200) {
        setVisibleModal(false);
        toast.success("Visitor Updated Successfully");
      } else {
        setVisibleModal(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setVisibleModal(false);
      toast.error("Network Error");
    }
  };

  const getUsers = (data) => {
    console.log(id);
    axios
      .get(`http://195.35.45.131:4000/visitor?id=${id}`)
      .then((res) => {
        console.log(res.data.data.visitorName);
        const date = new Date(res.data.data[0].visitDate)
          .toISOString()
          .split("T")[0];
        setInputs({
          name: res.data.data.visitorName,
          email: res.data.data.email,
          comment: res.data.data.comments,
          contact: res.data.data.contact,
          maxRooms: "",
          date: date,
        });
      })
      .catch((e) => toast.error(e));
  };

  useEffect(() => {
    getUsers(data);
  }, []);

  return (
    <div>
      <Space wrap>
        <Modal
          centered
          open={visibleModal}
          footer={null}
          width={650}
          onCancel={handleCancel}
        >
          <div className="modal-body">
            <h2 className="complaint-heading">Visitor Details</h2>
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
                <Input
                  placeholder="Date"
                  className="form_input"
                  name="date"
                  value={inputs.date}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Follow-up by"
                  className="form_input"
                  name="followUp"
                  value={inputs.followUp}
                  onChange={handleChange}
                />
              </Col>
              <Col offset={isMobile ? 0 : 4} md={10} sm={16}>
                <Input
                  placeholder="Mobile No."
                  className="form_input"
                  name="mobileNo"
                  value={inputs.contact}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Max Rooms"
                  className="form_input"
                  name="maxRooms"
                  value={inputs.maxRooms}
                  onChange={handleChange}
                />
                <div>
                  <h3> Deal Status</h3>
                  <Radio.Group>
                    <Radio value={1}>Management</Radio>
                    <Radio value={2}>Staff</Radio>
                  </Radio.Group>
                </div>
                <br />
                <TextArea
                  placeholder="Comments"
                  className="form_input"
                  name="comment"
                  value={inputs.comment}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <div style={{ float: "center" }}>
                  <CustomButton
                    handleClick={(event) => handleUpdate(event, data)}
                    buttonName={"Update"}
                    bgColor={"#4A0D37"}
                    color={"#F8F8F8"}
                  />
                </div>
              </Col>
              {/* <CustomAlert/> */}
            </Row>
          </div>
        </Modal>
      </Space>
    </div>
  );
};

export default VisitorModal;
