import React from 'react'
import AdminDashboard from './dashboard';
import EditBuildingForm from '../../components/Form/EditBuilding';

const EditBuilding = () => {

    return (
        <div>
            <AdminDashboard data = {<EditBuildingForm />} />
        </div>
    )
}

export default EditBuilding
