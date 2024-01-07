import React from 'react'
import AdminDashboard from './dashboard';
import { EditForm } from '../../components/Form/editUserForm';

const AddUsers = () => {

    return (
        <div>
            <AdminDashboard data = {<EditForm />} />
        </div>
    )
}

export default AddUsers
