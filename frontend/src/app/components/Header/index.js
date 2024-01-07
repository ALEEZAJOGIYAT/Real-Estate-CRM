import React from "react";
import { ExportOutlined } from '@ant-design/icons';
import './style.css';
import { Button } from "antd";
import { useNavigate } from "react-router";


export const Header = ({title, subtitle, route}) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate(route);
    }
    return(
        <div className="header">
        <div>
            <h2>{title}</h2>
            <p className='headerText'>{subtitle}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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