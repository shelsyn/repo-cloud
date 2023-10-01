
import { Outlet , Navigate } from 'react-router-dom';

const PrivateRoutes = ({auth}) => {
    return (
        auth.isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes