import React, { useState } from "react";
import { Space, Modal, Row, Col, Dropdown, message, Form, Input } from "antd";
import { useMediaQuery } from "react-responsive";
import { IoMdArrowDropdown } from "react-icons/io";

import "./style.css";
import { CustomButton } from "../Button";
import { async } from "q";
import { toast } from "react-toastify";
import { routePaths } from "../../routes/config";

const ViewCompliantModal = ({ visibleModal, setVisibleModal, data, path }) => {
  const [status, setStatus] = useState("In Progress");
  const [input, setInput] = useState({
    assignee: "",
    assignTo: "",
  });
  const items = [
    {
      label: "IN PROGRESS",
      key: "IN PROGRESS",
    },
    {
      label: "HOLD",
      key: "HOLD",
    },
    {
      label: "PENDING",
      key: "PENDING",
    },
    {
      label: "CLOSED",
      key: "CLOSED",
    },
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const handleMenuClick = (e) => {
    setStatus(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const url = `http://195.35.45.131:4000/maintenance/updateComplaint?id=${data._id}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Methods", "PATCH");

    const postData = {
      status: status,
      assignTo: input.assignee,
      assignee: input.assignee,
    };

    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(postData),
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.status == 200) {
        toast.success("Complaint Updated Successfully");
        setVisibleModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

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
            <h2 className="complaint-heading">{data.complaintId}</h2>
            <Row>
              <Col md={13} sm={16}>
                <h3 className="desc">Description</h3>
                <p>{data.description}</p>
                {path == routePaths.Maintenance.complaintList ? (
                  <p></p>
                ) : (
                  <Form layout="vertical">
                    <Form.Item
                      label="Assignee"
                      className="form_input_modal"
                      rules={[
                        { required: true, message: "Please enter assignee" },
                      ]}
                    >
                      <Input
                        placeholder="Assignee"
                        name="assignee"
                        value={input.assignee}
                        onChange={handleChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Assign To"
                      className="form_input_modal"
                      rules={[
                        { required: true, message: "Please enter assign to" },
                      ]}
                    >
                      <Input
                        placeholder="Assign To"
                        name="assignTo"
                        value={input.assignTo}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Form>
                )}
              </Col>
              <Col offset={isMobile ? 0 : 4} md={7} sm={16}>
                <div className="status-dropdown">
                  <Dropdown.Button
                    menu={menuProps}
                    trigger={["click"]}
                    icon={<IoMdArrowDropdown />}
                  >
                    {status}
                  </Dropdown.Button>
                </div>
                <div className="update-btn">
                  <CustomButton
                    handleClick={handleUpdate}
                    buttonName={"Update"}
                    bgColor={"#4A0D37"}
                    color={"#F8F8F8"}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </Space>
    </div>
  );
};

export default ViewCompliantModal;
