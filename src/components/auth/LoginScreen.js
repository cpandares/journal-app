import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import {  startLoginWithEmail, startWithGoogleLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm"


export const LoginScreen = ()=>{

    const dispatch = useDispatch();

    const [values, handleInputChange  ] = useForm({
        email:'test@test.com',
        password:'123456'
    });

    const { loading } = useSelector( state => state.ui );

    const { email,password } = values;

    const handleLogin = (e)=>{
        e.preventDefault();
       // console.log(email,password);

        dispatch(startLoginWithEmail(email,password));
    }

    const handleLoginWithGoogle = ()=>{

        dispatch(startWithGoogleLogin());

    }

    return (
        <div>
           <h3 className="auth__title">Login</h3>

           <form onSubmit = { handleLogin }>

                <input type="text" placeholder="email" name="email" className="auth__input" value={ email } onChange ={ handleInputChange } autoComplete="off"/>
                <input type="password" placeholder="password" name="password" value={ password } onChange ={ handleInputChange } className="auth__input" />

                <button type="submit" className="btn btn-primary btn-block"  disabled={ loading }> 
                    Login
                </button>

                <hr />

                <div className="auth__social_networks">
                    
                    <p>Login with social networks</p>

                    <div onClick = { handleLoginWithGoogle }
                        className="google-btn"
                     

                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                    
                </div>

                <Link   
                        to="/auth/register"
                        className="link"
                        >   

                    Create New Account
                
                </Link>
           </form>
        </div>
    )

}