import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm";

import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { registerWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = ()=>{

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui)

    const [values, handleInputChange] = useForm({
       name:'Cesar',
       email:'test@test.com',
       password:'123456',
       password2:'123456'
    });

    const {name,email,password,password2} = values;

    const handleSubmit = (e)=>{
        e.preventDefault();
      

        if(isValidForm()){
           dispatch(registerWithEmailPassword(email,password,name));
        }
    }

    const isValidForm = ()=>{

        if(name.trim().length === 0){
           // console.log('Name is required');
            dispatch(setError('Name is required'));
            return false;
        }else if( !validator.isEmail(email) ){
           // console.log('Email is no valid');
            dispatch(setError('Email is invalid'));
            return false;
        }else if( password !==password2 || password.length < 5 ){
            dispatch(setError('password to short or no equal'));
           // console.log('password to short or no equal');
            return false;
        }

        dispatch(removeError());
        return true;
    }
    return (
        <div>
        <h3 className="auth__title">Register</h3>

        <form onSubmit= { handleSubmit }>

            { 
                msgError &&              
                (<div className="auth__alert-error">
                  {msgError}
                </div>)
            }   
             <input type="text" placeholder="name" name="name" className="auth__input" value= {name} onChange = {handleInputChange} autoComplete="off"/>
             <input type="text" placeholder="email" name="email" className="auth__input"  value= {email} onChange = {handleInputChange}  autoComplete="off"/>
             <input type="password" placeholder="Password" name="password" className="auth__input"  value= {password} onChange = {handleInputChange}  autoComplete="off"/>
         
             <input type="password" placeholder="confirm password" name="password2"  value= {password2} onChange = {handleInputChange}  className="auth__input" />

             <button type="submit" className="btn btn-primary btn-block"> 
                 Register
             </button>

             <hr />

             <div className="auth__social_networks">
               
                                 
             </div>

             <Link   
                     to="/auth/login"
                     className="link"
                     >   

                Already Register?
             
             </Link>
        </form>
     </div>
    )

}