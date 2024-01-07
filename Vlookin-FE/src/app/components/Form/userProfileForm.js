import React from 'react'
import './profile.css';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { RiMailFill, RiUser2Line, RiPhoneFill } from 'react-icons/ri';
import { Col } from 'antd';
import MobileHeader from '../Header/MobileHeader';
import { routePaths } from '../../routes/config';
import { Button } from 'antd'
import avatar from '../../../assets/images/avatar.jpg'


const Profile = ({ title, showDrawer, data }) => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const handleLogout = () => {
        navigate(routePaths.Admin.login);
    }

    return (
        <div>
            {isMobile ? <MobileHeader route={routePaths.Admin.login} showDrawer={showDrawer} /> :
            <div className='profileLogoutBtn'>
                <Button type="text" 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        }
            <div className="container">
                <div className='profileHeader'>
                    <h2>Profile</h2>
                </div>
                <div  class="profile">
                    <header class="profile-head">
                        <div class="details">
                            <img src={avatar} alt="John Doe" class="profile-pic"/>
                            <h1 class="heading">{data.tenantName}</h1>
                            <div class="location">       
                                <p>{data.officeNo}</p>
                            </div>
                            <div class="stats">
                                <Col
                                    // span={10}
                                    offset={isMobile ? 0 : 4}
                                    md={10} sm={16}>
                                    <div class="col-4" >
                                        <h4><RiUser2Line/></h4>
                                        <p>{data.role ?? 'tenant'}</p>
                                    </div>
                                    <div class="col-4" >
                                        <h4><RiMailFill /></h4>
                                        <p>{data.email}</p>
                                    </div>
                                    <div class="col-4" >
                                        <h4><RiPhoneFill/></h4>
                                        <p>{data.contact}</p>
                                    </div>
                                    </Col>
                            </div>
                        </div>
                    </header>
                </div>
            </div>            
        </div>
    )
}

export default Profile
