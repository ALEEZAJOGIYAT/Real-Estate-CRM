import React from 'react'
import BuildingForm from '../../components/Form/BuildingForm';
import AdminDashboard from './dashboard';

const AddBuilding = () => {
    console.log('add building');
    return (
        <div>
            <AdminDashboard data = {<BuildingForm />} />
        </div>
    )
}

export default AddBuilding
