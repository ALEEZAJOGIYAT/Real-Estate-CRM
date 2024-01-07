import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileHeader from '../Header/MobileHeader'
import { routePaths } from '../../routes/config'

const AdminForm = ({ showDrawer }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    return (
        <div>
            {isMobile ? <MobileHeader route={routePaths.Admin.login} showDrawer={showDrawer} /> : ""}
        </div>
    )
}

export default AdminForm
