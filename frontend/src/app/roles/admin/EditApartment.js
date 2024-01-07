import React from 'react'
import AdminDashboard from './dashboard';
import EditApartmentForm from '../../components/Form/EditApartmentForm';

const EditApartment = () => {

    return (
        <div>
            <AdminDashboard data = {<EditApartmentForm />} />
        </div>
    )
}

export default EditApartment
