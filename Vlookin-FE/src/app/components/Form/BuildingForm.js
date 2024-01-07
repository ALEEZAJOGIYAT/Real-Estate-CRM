import React, { useState } from 'react'
import { Form, Col, Input, Row, Button } from "antd";
import { CustomButton } from '../Button';
import './style.css';
import { Header } from '../Header';
import { apiRoutes, routePaths } from '../../routes/config';
import CounterBtn from '../CounterBtn/CounterBtn';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { CustomAlert } from '../Alert';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '../Header/MobileHeader';
import { AddRealEstateModal } from '../Modal/RealEstateModal';
import RealEstateDropDown from '../DropDown/RealEstateDropDown';
import { Cookies } from 'react-cookie';

const BuildingForm = ({showDrawer}) => {
    const cookie = new Cookies()
    const userId = cookie.get("userId");
    const { TextArea } = Input;
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        bed: '',
        bathroom: '',
        pantry: '',
        living: '',
        dining: '',
        laundry: '',
        ownerName:'',
        buildingName:'',
        location:'',
        facilities:''
    });

    const [floor, setFloor] = useState('');
    const [parkingFloor, setParkingFloor] = useState('');
    const [open, setOpen] = useState(false);
    const [realEstateAdded, setRealEstateAdded] = useState(false);
    const [selectedRealEstate, setSelectedRealEstate] = useState('');


    const handleChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSave = (e) =>{
        e.preventDefault();
        console.log(inputs.facilities)
        try {
            if(inputs.buildingName && inputs.ownerName && inputs.location && inputs.watchMan){
                const res = addBuilding(inputs);
            }else{
                toast.error('Complete Form')
            }            
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const addBuilding = async (inputs) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let url = apiRoutes.createBuilding;
        try {
            console.log("realEstateCode", selectedRealEstate);
            await axios
            .post( url,
                {
                    "buildingName": inputs.buildingName,
                    "floorCount": floor,
                    "parkingCount": parkingFloor,
                    "watchman" : inputs.watchMan,
                    "landmark": inputs.location,
                    "fullName" : inputs.ownerName,
                    "realEstateId" : selectedRealEstate,
                    "userId": userId
                 } ,config)
            .then((response) => {
                if(response.data.status == 200){
                    toast.success('Building Created Successfully')
                    navigate(routePaths.Admin.addAppartment);
                }else{
                    toast.error('Something went wrong')
                }
            });                
        } catch (error) {
            toast.error(error)
        }
    };

    const onCancel = () => {
        setOpen(false)
    }

    const openRealEstateModal = ()=>{
        setOpen(true)
    }


    return (
        <>
            <div>
            {isMobile ? <MobileHeader route={routePaths.Admin.login} showDrawer={showDrawer} /> :
                   <Header title={'Add Building Details'} subtitle={'welcome to admin panel'} route={routePaths.Admin.login} />
                }
                <div className='mb_form_heading'>
                    <h2>Add Building Details</h2>
                    <p className='headerText'>welcome to admin panel</p>
                </div>
            </div>
            <div className="body">
                <Row >
                    <Col md={10} sm={16}>
                        {realEstateAdded ? <RealEstateDropDown
                         setSelectedRealEstate={setSelectedRealEstate} disableSelected={true}/> :
                        <Button 
                            variant='contained'
                            onClick={openRealEstateModal}
                            style ={{backgroundColor:'#4A0D37', color: '#F8F8F8'}}
                        >
                            Add Real Estate
                        </Button>
                        }
                        <div style={{ marginTop: '15px' }}>
                            <Form.Item
                                rules={
                                    [{ required: true, message: "Please enter Name" }]
                                }
                            >
                                <Input
                                    placeholder="Owner name"
                                    className="form_input"
                                    name='ownerName'
                                    value={inputs.ownerName}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <p className='form_label'>No of floors</p>
                            <CounterBtn placeholder='Count of floor' state={floor} setState={setFloor} />
                            <Form.Item
                                rules={
                                    [{ required: true, message: "Please enter watchman Name" }]
                                }
                            >
                                <Input
                                    placeholder="Watchman"
                                    className="form_input"
                                    name='watchMan'
                                    value={inputs.watchMan}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </div>


                    </Col>
                    <Col offset={isMobile ? 0 : 4} md={10} sm={16}>
                        <div style={{ marginTop: '15px' }}>
                        <Form.Item
                                rules={
                                    [{ required: true, message: "Please enter Building Name" }]
                                }
                            >
                                <Input
                                    placeholder="Building name"
                                    className="form_input"
                                    name='buildingName'
                                    value={inputs.buildingName}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <p className='form_label'>No of parking floors</p>
                            <CounterBtn placeholder='Count of floor' state={parkingFloor} setState={setParkingFloor} />
                            <Form.Item
                                rules={
                                    [{ required: true, message: "Please enter landamark" }]
                                }
                            >
                                <Input
                                    placeholder="Popular location"
                                    className="form_input"
                                    name='location'
                                    value={inputs.location}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <div className='addform_btn'>
                <CustomButton handleClick={handleSave} buttonName={'Save'} bgColor={'#4A0D37'} color={'#F8F8F8'} />
                <AddRealEstateModal open={open} onCancel={onCancel} setRealEstateAdded={setRealEstateAdded}/>
                <CustomAlert/>
                </div>
            </div>
        </>
    )
}

export default BuildingForm
