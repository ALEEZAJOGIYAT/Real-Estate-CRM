import React, { useState } from "react";
import { Select } from "antd";

const {Option} = Select;


export const RolesSelector = ({handleChange, value}) => {
    const [roles, setRoles] = useState([
        {"roleId": 0,"name":"admin"},
        {"roleId":1,"name":"superAdmin"},
        {"roleId":2,"name":"tenant"},
        {"roleId":3,"name":"maintenance"},
        {"roleId":4,"name":"visitor"}

    ]);

    return(
        <div>
            <Select
                placeholder="Select your role"
                onChange={handleChange}
                value={value}
                className='building_selector'
                >
                {roles?.map((role) => (
                    <Option key={role.roleId} value={role.name}>
                        {role.name}
                    </Option>
                ))}
            </Select>
        </div>
    )
}