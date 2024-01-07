import { Button } from 'antd'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { ExportOutlined } from '@ant-design/icons';
import './style.css';

const MobileHeader = ({showDrawer, route}) => {
    const navigate = useNavigate() 
    const handleLogout = () => {
        navigate(route);
    }
  return (
    <div className='mb_header_container'>
       <div className='mobile_header' onClick={showDrawer}>
         <FiMenu/>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
            <Button type="text" className='logoutBtn'
            onClick={handleLogout}
            >
                Logout
            </Button>
            <ExportOutlined />
        </div>
    </div>
  )
}

export default MobileHeader
