import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { apiRoutes } from "../../routes/config";
import axios from "axios";
import "./style.css";

const { Option } = Select;

const ApartmentsDropdown = ({
  value,
  // handleChange,
  placeholder,
  disabled,
  setSelectedApartment,
  buildingId = ''
}) => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    // Fetch building data from the API and update state
    if(buildingId){
      fetchSingleApartmentData(buildingId)
    }else{
      fetchApartmentData();
    }
  }, [buildingId]);

  const fetchSingleApartmentData = async(buildingId) =>
  {
    try{
      axios.get(`http://195.35.45.131:4000/apartment?buildingId=${buildingId}`).then((response) => {
        const data = response.data.data;
        console.log(data);
        setApartments(data);
      });

    }catch(error){
      console.error("Error fetching apartment data:", error);
    }

  }

  const fetchApartmentData = async () => {
    try {
      axios.get(apiRoutes.getApartment).then((response) => {
        if(response?.data.data.length > 0){
          const data = response?.data.data;
          setApartments(data);
        }
      });
    } catch (error) {
      console.error("Error fetching apartment data:", error);
    }
  };

  const handleChange = (value) => {
    console.log(value);
    setSelectedApartment(value);
  };

  return (
    <Select
      placeholder={placeholder ? placeholder : "Select an Apartment"}
      onChange={handleChange}
      className="building_selector"
      disabled={disabled && disabled}
    >
      {apartments?.map((apartment) => (
        <Option key={apartment._id} value={apartment._id} disabled={apartment.reserved}>
          {apartment.flatNo} - Floor: {apartment.floorNo}
        </Option>
      ))}
    </Select>
  );
};

export default ApartmentsDropdown;
