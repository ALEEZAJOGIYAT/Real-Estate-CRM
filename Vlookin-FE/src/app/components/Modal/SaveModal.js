import React from 'react';
import { Space, Button, Modal } from 'antd';
import './style.css';
import { Icons } from '../../../assets';
import { useNavigate } from 'react-router';

export const SaveModal = ({open, setOpen, route}) => {
    const navigate = useNavigate()

    const handleCancel = () => {
        setOpen(false);    
        navigate(route)
    }

      return(
        <div>
            <Space wrap>
                <Modal
                    open={open}
                    footer = { null}
                    onCancel={handleCancel}
                    >
                    <div className='modal-body'>
                        <p className='saved-successfully'>Saved Successfully</p>
                        <img src = {Icons.checkedIcon}></img>
                    </div>
                </Modal>
              </Space>
        </div>
    )
}