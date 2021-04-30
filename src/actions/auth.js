import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2'

import { types } from '../types/types';
import { noteLogout } from './notes';

import { finishLoading, startLoading } from './ui';



export const startLoginWithEmail = (email, password)=>{
    return (dispatch)=>{

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then( ({user}) =>{
            dispatch(finishLoading());
            
            dispatch(
                login(user.uid, user.displayName)
            )
         } ).catch(e =>{
             console.log(e);
             dispatch(finishLoading());
             Swal.fire('Error',e.message,'error')
         })
    
        //dispatch( login(1321,'Enrique') )
            
    

    }
}

export const registerWithEmailPassword = (email,password,name)=>{

    return(dispatch)=>{

        firebase.auth().createUserWithEmailAndPassword(email,password)      
            .then(async ({user}) =>{

               await user.updateProfile({displayName:name})
                console.log(user);

                dispatch(
                    login(user.uid, user.displayName)
                )
            } ).catch(err =>{
               
                Swal.fire('Error',err.message,'error')
            })

        
    }

}

export const startWithGoogleLogin = ()=>{

    return ( dispatch ) =>{
        firebase.auth().signInWithPopup( googleAuthProvider )
                .then( ({user}) =>{
                   dispatch(
                       login(user.uid, user.displayName)
                   )
                } )
    }


}

export const login = ( uid, displayName )=>({

        type: types.login,
        payload:{
            uid,
            displayName
            
        }


});


export const startLogout = ()=>{
    return async( dispatch)=>{
       await firebase.auth().signOut();

       
       dispatch(logout)
       dispatch(noteLogout())
    } 
}

export const logout = () => ({
    type : types.logout 
})
