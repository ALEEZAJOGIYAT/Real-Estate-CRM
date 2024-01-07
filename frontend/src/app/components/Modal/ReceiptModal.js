import React from 'react'
import './style.css'
import { Button, Form, Input, Radio, DatePicker, Modal, Select, Row, Col, Dropdown } from 'antd';
import { useState } from 'react';
import BuildingDropDown from '../DropDown';
import moment from 'moment'
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from "react-icons/bs"
import { apiRoutes, routePaths } from '../../routes/config';
import ReceiptTable from '../Table/receiptTable';
import { useNavigate } from 'react-router';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReceiptModal = ({ open, setOpen, route, onCancel,  tenantAccount, tenantName }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [formLayout, setFormLayout] = useState('vertical');
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [dates, setDates] = useState([]);
    const [receiptData, setReceiptData] = useState({
        parkingPrice: "",
        flatNo: "",
        periodOfContract: "",
        receiptDetails: "",
        total: "",
        // tenantAccount: "",
        tenantName: ""
    })

    const [tableData, setTableData] = useState([
        // Initially, you can start with an empty array or pre-existing data
        {
          chequeDate: "",
          chequeNo: "",
          Amount: "",
          bankName: "",
          depositBank: "",
          drawnBank: "",
          debitAccount: "",
        },
      ]);
    
    const [roles, setRoles] = useState([
        { "roleId": 0, "name": "Cheque Return" },
        { "roleId": 1, "name": "Cheque Reverse" },
    ]);

    const formItemLayout = {
        labelCol: {
            span: 20,
        },
        wrapperCol: {
            span: 30,
        },
    };


    const handleInputChange = (e) => {
        setReceiptData({ ...receiptData, [e.target.name]: e.target.value });

    };

    const handleDateChange = (value) => {
        setDates(value?.map(item => {
            return moment(item?.$d).format('DD-MM-YYYY')
        }))
    };

    const SaveReceipt = () => {
        let url = apiRoutes.postReceipt;
        // buildingId,
        // flatNo,
        // tenantAccount,

        // parkingPrice,
        // periodOfContract,
        // receiptDetails,
        // total,
        // duration,
  
        axios.post(url, {
            ...receiptData,
            tenantAccount:tenantAccount,
            buildingId: selectedBuilding,
            duration: {
                from: dates[0],
                to: dates[1]
            },
            receiptTable: tableData,
        })
        .then((res) => {
            console.log(res.data)
            if(res?.data?.success == 200){
                setOpen(false)
                navigate(routePaths.Tenant.listTenant)
            }
        })
        .catch((e) => toast.error(e))
    }

    const generateItemsForRoles = (roles) => {
        return roles.map((role) => ({
          key: role.roleId.toString(), // Use a unique key for each role
          label: (
            <a key={role.roleId} target="_blank" rel="noopener noreferrer" >
              {role.name}
            </a>
          ),
        }));
      };
      
      const items = generateItemsForRoles(roles);

    return (
        <div className='receipt-modal'>
            <Modal
                style={{
                    top: 50,
                }}
                width={1000}
                open={open}
                onCancel={onCancel}
                cancelButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                okButtonProps={{
                    style: {
                        visibility: 'hidden'
                    }
                }}
            >
                <div>
                    <div className='receipt-header'>
                        <h2>Receipt Voucher</h2>
                    </div>
                    <div className='receipt-voucher-info-container'>
                        <div className='date_section'>
                            <strong>Date</strong>
                            <p>{new Date().toLocaleDateString()}</p></div>
                        <div className='receipt-header-voucher'>
                            <br />
                            <strong>Voucher No</strong>
                            {/* it should be unique */}
                            <p>23445324349</p> 
                        </div>
                    </div>
                    <div className='receipt-body'>
                        <div className='receipt-body-left'>
                            <Form
                                {...formItemLayout}
                                layout={formLayout}
                                form={form}
                                initialValues={{
                                    layout: formLayout,
                                }}
                            >
                                <Form.Item label="Building Code">
                                    {/* todo show only building name which was selcted while creating tenenat and it should be disbaled*/}
                                    <BuildingDropDown setSelectedBuilding={setSelectedBuilding} />
                                </Form.Item>
                                <Form.Item label="Receipt Details">
                                    <Input.TextArea showCount
                                        value={receiptData.receiptDetails}
                                        name='receiptDetails'
                                        onChange={handleInputChange} />
                                </Form.Item>
                                <Row gutter={10}>
                                    <Col md={12}>
                                        {/* todo show only flat name which was selcted while creating tenenat and it should be disbaled*/}
                                        <Form.Item
                                            label="Flat No"
                                        >
                                            <Input placeholder="Flat No"
                                                value={receiptData.flatNo}
                                                name="flatNo"
                                                onChange={handleInputChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            label="Period of Contract"
                                        >
                                            <Input placeholder="Period of contract"
                                                value={receiptData.periodOfContract}
                                                name="periodOfContract"
                                                onChange={handleInputChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label="Period Range">
                                    <RangePicker onChange={handleDateChange} />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='receipt-body-right'>
                            <Form
                                {...formItemLayout}
                                layout={formLayout}
                                form={form}
                                initialValues={{
                                    layout: formLayout,
                                }}
                            >
                                <Form.Item label="Tenant A/C">
                                    <Row gutter={10}>
                                        <Col md={8}>
                                            <Input 
                                                placeholder="Tenant Id"
                                                value={tenantAccount}
                                                name="tenantAccount"
                                                disabled = {true} />
                                        </Col>
                                        <Col md={16}>
                                            <Input 
                                                placeholder="Tenant Name"
                                                value={tenantName}
                                                name="tenantName"
                                                disabled = {true}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label="Tenant Rent">
                                    <Input placeholder="Tenant Rent"
                                        value={receiptData.total}
                                        name='total'
                                        onChange={handleInputChange} />
                                </Form.Item>
                                <Form.Item label="F.A.S Date">
                                    <Input placeholder="F.A.S Date" />
                                </Form.Item>
                                <Form.Item label="Parking Charges">
                                    <Input placeholder="Parking Charges"
                                        value={receiptData.parkingPrice}
                                        name='parkingPrice'
                                        onChange={handleInputChange} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div >
                        <br />
                        <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                                arrow={{
                                    pointAtCenter: true,
                                }}
                            >
                                <Button shape='circle'                                
                                 style={{marginLeft:'90%'}}
                                    ><BsThreeDotsVertical /></Button>
                        </Dropdown>
                        {<ReceiptTable tableData={tableData} setTableData={setTableData} handleSubmit={SaveReceipt}/>}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReceiptModal
