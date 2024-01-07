import React from 'react'
import AppartmentForm from '../../components/Form/AppartmentForm';
import AdminDashboard from './dashboard';

const AddAppartment = () => {
    return (
        <div>
            <AdminDashboard data = {<AppartmentForm title={'Add Appartment Details'} />} />
        </div>
    )
}

export default AddAppartment;
