
import { useEffect, useState } from "react";
import {
   
    Switch,
    Route,
    BrowserRouter as Router,
      
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from "./AuthRouter";

import { firebase } from '../firebase/firebase-config';

import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import {  startLoadingNotes } from "../actions/notes";
  
export const AppRouter = ()=>{

  const dispatch = useDispatch();

  //Cheking state loggin
  const [ cheking, setCheking ] = useState( true )

  //validando rutas privada y ´publicas

  const [ loggedIn, setLoggedIn ] = useState(false)

  useEffect(()=>{

   firebase.auth().onAuthStateChanged( async (user)=>{

     if(user?.uid){

       dispatch(login(user.uid, user.displayName))
       setLoggedIn(true)

      
      dispatch(startLoadingNotes(user.uid))


     }else{
       setLoggedIn(false)
     }

     setCheking(false );

   } )

  },[dispatch, setLoggedIn,setCheking ])

  if(cheking){
    return(
      <h1>wait....</h1>
    )
  }

    return (
        
      <Router>
            <Switch>
                <div>
                    <PublicRoute
                         path="/auth" 
                         isAuth = { loggedIn }
                         component = { AuthRouter } 
                         
                         />

                    <PrivateRoute
                           exact path="/" 
                           isAuth = { loggedIn }
                           component = { JournalScreen } 
                           />
                </div>
            </Switch>
            
      </Router>  
    )

}