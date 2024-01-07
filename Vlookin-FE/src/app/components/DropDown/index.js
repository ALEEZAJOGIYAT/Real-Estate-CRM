import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { apiRoutes } from "../../routes/config";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { CustomAlert } from "../Alert";
import { Cookies } from "react-cookie";

const { Option } = Select;

const BuildingDropDown = ({
  value,
  // handleChange,
  placeholder,
  disabled,
  setSelectedBuilding,
  realEstateId,
  isBuildingSelected,
  className
  // setSelectedBuildingName
}) => {

  const cookies = new Cookies();
  const role = cookies.get("role");
  const userId = cookies.get("userId");

  const [buildingData, setBuildingData] = useState([]);
  const [disableBuilding, SetDisableBuilding] = useState(false);


  useEffect(() => {
    // Fetch building data from the API and update state
    fetchBuildingData();
  }, []);

  const fetchBuildingData = async () => {
    try {
        const url = role == 'admin' ? `${apiRoutes.getSelectedBuilding}userId=${userId}` : apiRoutes.getBuilding;
        axios.get(url).then((response) => {
          const data = response.data.data;
          if(data.length == 0){
            toast.error('Create building first')
            SetDisableBuilding(true)
          }
          if(data.length > 0){
              setBuildingData(data);        
            }  
        });

    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  const handleChange = (value, option) => {
    setSelectedBuilding(value);    
    if(isBuildingSelected){
      isBuildingSelected(true)
      // setSelectedBuildingName(option.children); // Storing building name
    }
  };

  return (
    <div>
    <Select
      placeholder={placeholder ? placeholder : "Select a building"}
      onChange={handleChange}
      // value={value}
      className={className ? className :"building_selector"}
      disabled={disabled ? disabled : disableBuilding}
    >
      {buildingData?.map((building) => (
        <Option key={building._id} value={building._id}>
          {building.buildingName} - {building.buildingCode}
        </Option>
      ))}
    </Select>
    <CustomAlert/>
    </div>
  );
};

export default BuildingDropDown;
