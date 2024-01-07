import { Modal } from 'antd'
import React, {useState} from 'react'
import './style.css'
import { CustomButton } from '../Button'
import axios from 'axios'
import { toast } from 'react-toastify'

const OTPmodal = ({open, onCancel, setReceiptModal, setModalOpen}) => {

  const [otpValues, setOtpValues] = useState({
    digit1:'',
    digit2:'',
    digit:'',
    digit4:''
  })


  const handleVerify = async () => {
    setModalOpen(false)
    setReceiptModal(true)
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // };
    // let url = `195.35.45.131:4000/tenant/verify-otp?id=${props.tenantAccount}&OTP=12`;
    // try {
    //   await axios
    //   .get(url,config)
    //   .then((response) => {
    //       if (response?.data?.status == 200) {
    //         props.setReceiptModal(true)
              
    //       } 
    //   }).catch((error)=>{
    //       toast.error(error.response.data.message)
    //   });

    // } catch (error) {
    //     toast.error('erooooooo')        
    // }
}


  return (
    <>
      <Modal
        centered
        open={open}
        // onOk={onOk}
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
        <div className='modal_container'>
          <h2>Please enter the OTP to verify your account</h2>
          <p>A OTP is send to your email</p>
          <div className='otp_input_grp'>
            <input type='text' minLength={1} maxLength={1} />
            <input type='text' minLength={1} maxLength={1} />
            <input type='text' minLength={1} maxLength={1} />
            <input type='text' minLength={1} maxLength={1} />
          </div>
          <p className='resend'>Didn't receive OTP?<a className='resend_link'>Resend OTP</a></p>
          <CustomButton handleClick={handleVerify}  buttonName={'Verify'} bgColor={'#4A0D37'} color={'#F8F8F8'} />
        </div>
      </Modal>
    </>
  )
}

export default OTPmodal
