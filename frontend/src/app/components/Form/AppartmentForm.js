import React, { useState } from 'react'
import {  Col, Form, Input, Radio, Row } from "antd";
import { CustomButton } from '../Button';
import './style.css';
import { Header } from '../Header';
import { apiRoutes, routePaths } from '../../routes/config';
import CounterBtn from '../CounterBtn/CounterBtn';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '../Header/MobileHeader';
import { ApartmentModal } from '../Modal/ApartmentModal';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AppartmentForm = ({ title, showDrawer }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const navigate = useNavigate()
    const { TextArea } = Input;
    const [inputs, setInputs] = React.useState({
        floorNo : '',
        apartmentNo : '',
        furnished : '',
        rent : '',
        area:'',
        comments: '',
        apartmentName:"",
    });
    const [bed, setBed] = useState('')
    const [pantry, setPantry] = useState('')
    const [laundry, setLaundry] = useState('')
    const [bathroom, setBathroom] = useState('')
    const [dining, setDining] = useState('')
    const [living, setLiving] = useState('')
    const [open, setOpen] = useState ( false );
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [balcony, setBalcony] = useState(false);
    const [apartmentType, setApartmentType] = useState("");
    // const [flatNos, setFlatNos] = useState('')

    const handleRadioChange = (e) => {
        setInputs({furnished: e.target.value});
    };

    const handleBalcony = (e) => {
        setBalcony(e.target.value);
    }

    const handleApartment = (e) =>{
        setApartmentType(e.target.value);
    }


    const handleChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setOpen(true);
    }


    const addApartment = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            let url = apiRoutes.createApartment;
        
            const apartmentNamesArray = inputs.apartmentName.split(',').map(name => name.trim());
            console.log(inputs.apartmentName, apartmentNamesArray.length,apartmentNamesArray, 'checking apartments');

            // const values = inputs.apartmentName.split(',').map(item => item.trim());
            // setFlatNos(flatNos, flatNos.push(...values));
            // console.log(flatNos,' flat numberssss')
            let data = {
                "buildingId":selectedBuilding,
                "apartmentType":apartmentType,
                "area": inputs.area,
                "rent": inputs.rent,
                "furnished": inputs.furnished,
                "isStudio": false,
                "balcony": balcony,         
                "comments": inputs.comments,
                "floorNo": inputs.floorNo,
                "rooms":{
                    "bedRoom": bed,
                    "dining": dining,
                    "laundry": laundry,
                    "bath": bathroom
                },
                "flatNo": apartmentNamesArray,
                "noOfApartments": parseInt(inputs.apartmentNo)
            };
            console.log('data', data)
            await axios.post(url,
                data,
                config)
                .then((response) => {
                    if (response.data.status == 200) {
                        toast.success('Apartment Created Successfully')
                        navigate(routePaths.Admin.listAppartment);
                    } 
                });    
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const onCancel = () => {
        setOpen(false)
    }


    return (
        <>
            <div>
                {isMobile ? <MobileHeader route={routePaths.Visitor.login} showDrawer={showDrawer} /> :
                    <Header title={'Add Appartment Details'} subtitle={'welcome to admin panel'} route={routePaths.Admin.login} />
                }
                <div className='mb_form_heading'>
                    <h2>Add Appartment Details</h2>
                    <p className='headerText'>welcome to admin panel</p>
                </div>
            </div>
            <div className="body">
                <Row >
                    <Col md={10} sm={16}>
                        <div style={{ marginTop: '15px' }}>

                            <p className='form_label'>Appartment Type</p>
                            <Form.Item
                                name="radio-button"
                                className='form_radio_inputs'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please pick an item!',
                                    },
                                ]}
                            >
                                <Radio.Group  buttonStyle="solid"></Radio.Group>
                                <Radio.Group onChange={handleApartment} >
                                    <Radio.Button className="radio_btn" value="Residential">Residential</Radio.Button>
                                    <Radio.Button className="radio_btn" value="Commercial">Commercial</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className='btn_grp_container'>
                            <p className='form_label'>Number of Rooms</p>
                            <div className='appart_form_counter_group1'>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Bedroom</p>
                                    <CounterBtn placeholder='Bed' state={bed} setState={setBed} />
                                </div>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Living</p>
                                    <CounterBtn placeholder='Living' state={living} setState={setLiving} />
                                </div>
                            </div>
                            <div className='appart_form_counter_group1'>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Pantry</p>
                                    <CounterBtn placeholder='Pantry' state={pantry} setState={setPantry} />
                                </div>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Laundary</p>
                                    <CounterBtn placeholder='Laundry' state={laundry} setState={setLaundry} />
                                </div>
                            </div>
                            <div className='appart_form_counter_group1'>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Dining</p>
                                    <CounterBtn placeholder='Dining' state={dining} setState={setDining} />                            
                                </div>
                                <div className='appart_form_counter_group'>
                                    <p className='form_label'>Bathroom</p>
                                    <CounterBtn placeholder='Bathroom' state={bathroom} setState={setBathroom} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col offset={isMobile ? 0 : 4} md={10} sm={18}>
                        <Input
                            placeholder="Area"
                            className="apartment_form_input"
                            name='area'
                            value={inputs.area}
                            onChange={handleChange}
                            
                        />
                        <div style={{ marginTop: '15px' }}>

                            <p className='form_label'>Furnished</p>
                            <Form.Item
                                name="radio-button"
                                className='form_radio_inputs'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please pick an item!',
                                    },
                                ]}
                            >  
                                <Radio.Group buttonStyle="solid"></Radio.Group>
                                <Radio.Group onChange={handleRadioChange}>
                                    <Radio.Button className='radio_btn' value="Semi-Furnished">Semi-Furnished</Radio.Button>
                                    <Radio.Button className='radio_btn' value="Not Furnished">Not Furnished</Radio.Button>
                                    <Radio.Button className='radio_btn' value="Full-Furnished">Full-Furnished</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div style={{ marginTop: '15px' }}>

                            <p className='form_label'>Balcony</p>
                            <Form.Item
                                name="radio-button"
                                className='form_radio_inputs'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please pick an item!',
                                    },
                                ]}
                            >
                                <Radio.Group defaultValue='Yes' buttonStyle="solid"></Radio.Group>
                                <Radio.Group onChange={handleBalcony} defaultValue='true'>
                                    <Radio.Button className='radio_btn' value="true">Yes</Radio.Button>
                                    <Radio.Button className='radio_btn' value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <Input
                            placeholder="Rent"
                            className="apartment_form_input"
                            name='rent'
                            value={inputs.rent}
                            onChange={handleChange}
                        />
                        <br/> <br/>
                        <div>
                            <TextArea 
                                rows={4} 
                                placeholder="Comment" 
                                name='comments'
                                value={inputs.comments}
                                onChange={handleChange}
                            />
                        </div>

                    </Col>
                </Row>
                <br/> 
                <div>                    
                    <CustomButton handleClick={handleSave} buttonName={'Save'} bgColor={'#4A0D37'} color={'#F8F8F8'}  />
                    <ApartmentModal open={open} onCancel = {onCancel} setSelectedBuilding={setSelectedBuilding} 
                         handleChange = {handleChange}
                        handleSave = {addApartment} data = {inputs}
                        />
                </div>
            </div>
        </>
    )
}

export default AppartmentForm
