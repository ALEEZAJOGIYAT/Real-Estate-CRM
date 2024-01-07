import React, { useState } from 'react'
import { Col, Input, Row, Form } from "antd";
import { CustomButton } from '../Button';
import './style.css';
import { Header } from '../Header';
import OTPmodal from '../Modal/OTPmodal';
import { apiRoutes, routePaths } from '../../routes/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CustomAlert } from '../Alert';
import BuildingDropDown from '../DropDown';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '../Header/MobileHeader';
import ReceiptModal from '../Modal/ReceiptModal';
import ApartmentsDropdown from '../DropDown/apartmentDropDown';
import { Cookies } from 'react-cookie';

const TenateForm = ({ showDrawer }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [modalOpen, setModalOpen] = useState(false);
    const cookie = new Cookies()

    const [inputs, setInputs] = React.useState({
        name: '',
        email: '',
        buildingNo: '',
        flatNo: '',
        mobileNo: '',
        officeNo: '',
        nationality: '',
        joiningDate:'' , 
        creationDate:'',
        password:''
    });

    const [receiptModal, setReceiptModal] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [buildingSelected, setBuildingSelected] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState('');
    const [tenantAccount , setTenantAccount] = useState('');
    const [tenantName , setTenantName] = useState('');

    const handleChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const onCancel = () => {
        setModalOpen(false)
        setReceiptModal(false)
    }

    const handleSave = (event) => {
        event.preventDefault();
        if (inputs.name && inputs.email && selectedBuilding && selectedApartment && inputs.mobileNo
            && inputs.nationality && inputs.officeNo) {
                createTenant(inputs);
        } else {
            toast.error('Complete Form')
        }
    }

    const createTenant = async (inputs) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let url = apiRoutes.postTenant;
        const createdBy = cookie.get("userId")
        try {
            await axios
                .post(url,
                    {
                        tenantName: inputs.name,
                        email: inputs.email,
                        buildingId: selectedBuilding,
                        apartmentId: selectedApartment,
                        contact: inputs.mobileNo,
                        officeNo: inputs.officeNo,
                        createdBy: createdBy,
                        nationality: inputs.nationality,
                        joiningDate:  inputs.joiningDate,
                        creationDate: inputs.creationDate,
                        password:inputs.password
                    }
                    , config)
                .then((response) => {
                    if (response?.data?.status == 200) {
                        setTenantAccount(response?.data?.data._id);
                        setTenantName(response?.data?.data.tenantName)
                        setModalOpen(true)
                                                
                    } 
                }).catch((error)=>{
                    toast.error(error.response.data.message)
                });
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <div>
                {isMobile ? <MobileHeader route={routePaths.Visitor.login} showDrawer={showDrawer} /> :
                    <Header title={'Add Tenant Details'} subtitle={'welcome to tenant panel'} route={routePaths.Admin.login} />
                }
                <div className='mb_form_heading'>
                    <h2>Add Tenant Details</h2>
                    <p className='headerText'>welcome to tenant panel</p>
                </div>
            </div>
            <div className="body">
                <Row >
                    <Col md={10} sm={16}>
                        <Input
                            placeholder="Full name"
                            className="form_input"
                            name='name'
                            value={inputs.name}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Email"
                            className="form_input"
                            name='email'
                            type='email'
                            value={inputs.email}
                            onChange={handleChange}

                        />
                        <Input
                            placeholder="Password"
                            className="form_input"
                            name='password'
                            type='password'
                            value={inputs.password}
                            onChange={handleChange}

                        />
                        <div>
                            <Input
                                placeholder="Mobile No."
                                className="form_input"
                                name='mobileNo'
                                value={inputs.mobileNo}
                                onChange={handleChange}
                            />
                            <Input
                                placeholder="Nationality"
                                className="form_input"
                                name='nationality'
                                value={inputs.nationality}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                    <Col offset={isMobile ? 0 : 4} md={10} sm={16}>
                        <label style={{ color: '#4A0D37' }}>Building Name</label>
                        <BuildingDropDown setSelectedBuilding={setSelectedBuilding} isBuildingSelected = {setBuildingSelected}
                        />
                        {buildingSelected && 
                            <ApartmentsDropdown  setSelectedApartment={setSelectedApartment} buildingId={selectedBuilding}/>
                        }
                        <Input
                            placeholder="Office No. "
                            className="form_input"
                            name='officeNo'
                            value={inputs.officeNo}
                            onChange={handleChange}
                        />
                        <Form.Item
                                name='creationDate'
                            >
                            <label style={{color:'#4A0D37'}}>Creation Date</label>
                            <Input
                                placeholder="Creation Date"
                                className="visitor_form_input"
                                // className="form_input"
                                name='creationDate'
                                type='date'
                                value={inputs.creationDate}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                                name='joiningDate'
                            >
                            <label style={{color:'#4A0D37'}}>Joining Date</label>
                                <Input
                                placeholder="Joining Date"
                                className="visitor_form_input"
                                // className="form_input"
                                name='joiningDate'
                                type='date'
                                value={inputs.joiningDate}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <CustomButton handleClick={handleSave} buttonName={'Save'} bgColor={'#4A0D37'} color={'#F8F8F8'} />
            </div>
            {/* for receipt modal testing */}
            <OTPmodal open={modalOpen} onCancel={onCancel} tenantAccount={tenantAccount}
            setModalOpen={setModalOpen}
            />
            <CustomAlert />
        </>
    )
}

export default TenateForm;
