import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isAuth,
    component:Componet,
    ...rest
})=>{

    return (

        <Route  { ...rest } 
                component = { (props) => (
                    (isAuth)
                    ? (<Redirect to="/" />)
                    : <Componet {...props} />

                )}
                />

    )
}

PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}