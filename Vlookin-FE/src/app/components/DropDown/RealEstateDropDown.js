import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { apiRoutes } from "../../routes/config";
import axios from "axios";
import "./style.css";

const { Option } = Select;

const RealEstateDropDown = ({
  value,
  // handleChange,
  placeholder,
  disabled,
  setSelectedRealEstate,
  disableSelected
}) => {

  const [realEstate, setRealEstate] = useState([]);

  useEffect(() => {
    // Fetch building data from the API and update state
    fetchRealEstate();
  }, []);

  const fetchRealEstate = async () => {
    try {
      axios.get(apiRoutes.getRealEstate).then((response) => {
        const data = response.data.data;
        setRealEstate(data);
    });
    } catch (error) {
      console.error("Error fetching real estates:", error);
    }
  };

  const handleChange = (value) => {
    console.log(value);
    setSelectedRealEstate(value);
  };

  return (
    <Select
      placeholder={placeholder ? placeholder : "Choose Real Estate"}
      onChange={handleChange}
      className="building_selector"
      disabled={disabled && disabled}
    >
      {realEstate?.map((realEstate) => (
        <Option 
          key={realEstate._id} 
          value={realEstate._id} 
          disabled={disableSelected ? realEstate.reserved : false}>
          {realEstate.name} - {realEstate.code}
        </Option>
      ))}
    </Select>
  );
};

export default RealEstateDropDown;
