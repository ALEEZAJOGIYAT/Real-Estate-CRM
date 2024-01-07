import React,{useState} from 'react'
import { Modal, Input } from 'antd'
import './style.css'
import { CustomButton } from '../Button'
import { apiRoutes, routePaths } from '../../routes/config'
import { toast } from 'react-toastify'
import { CustomAlert } from '../Alert'
import axios from 'axios'

export const AddRealEstateModal = ({open, setOpen, onCancel, setRealEstateAdded}) => {

    const [inputs, setInputs] = useState({
        realEstateName: '',
        code:''
    })

    const handleChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            if(inputs.realEstateName){
                const res = addRealEstate(inputs);
            }else{
                toast.error('Complete Form')
            }            
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const addRealEstate = async (inputs) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let url = apiRoutes.createRealEstate;
        try {
            await axios
            .post( url,
                {
                    "name": inputs.realEstateName
                 } ,config)
            .then((response) => {
                if(response.data.status == 200){
                    toast.success('Real Estate Created Successfully')
                    onCancel();
                    setRealEstateAdded(true);
                }else{
                    toast.error('Something went wrong')
                }
            });                
        } catch (error) {
            toast.error(error)
        }
    };


    return(
        <div>
            <Modal
                centered
                open={open}
                onCancel={onCancel}
                okButtonProps={{
                style: {
                    display: "none",
                },
                }}
                cancelButtonProps={{
                style: {
                    display: "none",
                },
                }}
            >
                <div className='building_modal'>
                    <h6>Real Estate Name</h6>
                    <Input name='realEstateName' onChange={handleChange} value={inputs.name} style={{width:'50%'}}/>
                    <br/>
                    <CustomButton handleClick={handleSave} buttonName={'Save'} bgColor={'#4A0D37'} color={'#F8F8F8'} />                    
                </div>
            </Modal>
            <CustomAlert/>
        </div>
    )
}