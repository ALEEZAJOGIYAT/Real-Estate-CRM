import { Col, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import './style.css'
import { Header } from "../Header";
import { routePaths } from "../../routes/config";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../Header/MobileHeader";


export const EditForm = ({ showDrawer }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            <div>
                {isMobile ? <MobileHeader route={routePaths.Visitor.login} showDrawer={showDrawer} /> :
                    <Header title={'Add User Details'} subtitle={'welcome to admin panel'} route={routePaths.Admin.login} />
                }
                <div className='mb_form_heading'>
                    <h2>Add User Details</h2>
                    <p className='headerText'>welcome to admin panel</p>
                </div>
            </div>
            <div className="body">
                <Row >
                    <Col md={10} sm={16}>
                        <Input
                            placeholder="Username"
                            className="form_input"
                        />
                        <Input
                            placeholder="Email"
                            className="form_input"
                        />
                        <div>
                            <h2>User Onboarding</h2>
                            <Input
                                placeholder="ID"
                                className="form_input" />
                        </div>
                    </Col>
                    <Col offset={isMobile ? 0 : 6} md={10} sm={16}>
                        <Input
                            placeholder="Mobile No."
                            className="form_input" />
                        <p>Category of user</p>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Management</Radio>
                            <Radio value={2}>Staff</Radio>
                        </Radio.Group>
                        <Input
                            placeholder="Password"
                            className="form_input" />
                    </Col>
                </Row>
            </div>
        </>
    )

}