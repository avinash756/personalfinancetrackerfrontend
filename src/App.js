import React, { useEffect } from 'react';
import { SignedIn,useAuth,useUser, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import { Switch,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import AddExpense from './components/addExpense';

import "./App.css";

import Home from './components/Home';
import ShowingTransactions from './components/showTransactions';
import ShowingVisually from './components/showVisually';
import Footer from './components/footer';
import UpdateFrequency from './components/updateFrequency';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const { isSignedIn} = useAuth();

  const {user,isLoaded} = useUser();

  useEffect(()=>{
    

   const initUser=async()=>{
    if(isSignedIn&&isLoaded&&user){

      const clerkId=user.id;
    const email=user.primaryEmailAddress?.emailAddress;

      try{
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/init`,{
        clerkId,
        email,
        frequency:"daily"
      })

    }
    catch(error){
      console.error("User init failed",error);

    }
    }


   }

   if(isSignedIn){
    initUser();
   }


  },[isSignedIn,user,isLoaded])




  return (
   <div className='layout'>
    

      <div className={`nav-bar ${isSignedIn?'row-layout':'column-layout'}`}>

      <h1 className='heading-app'>Personal Finance Tracker</h1>

    
      <SignedOut>
        <SignInButton className="custom-signin"/>
      </SignedOut>
   


   
           <SignedIn>
        <UserButton />
      </SignedIn>
 

      </div>
 

      <div className='main'>
          <ToastContainer  position="top-center"/>
      <SignedIn>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/add-expense" component={AddExpense}/>
        <Route exact path="/show-transactions" component={ShowingTransactions}/>
        <Route exact path="/show-visually" component={ShowingVisually}/>
        <Route exact path="/update-frequency" component={UpdateFrequency}/>
      </Switch>
      </SignedIn>
      


      </div>

      
      {
        isSignedIn&& 
        <Footer/>
      }

      



      

    </div>


 
  );
}

export default App;
