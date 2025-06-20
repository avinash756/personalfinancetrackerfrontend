import {useState,useEffect} from "react";
import { Link } from "react-router-dom";


import {useUser } from '@clerk/clerk-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdArrowBack } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";

import "./index.css";

function UpdateFrequency(){
    
    const[frequency,setFrequency]=useState("daily");
    const[loading,setLoading]=useState(false);
      const {user} = useUser();



     useEffect(()=>{
        if (!user?.id) return;
        setLoading(true);
   const getUserFrequency=async()=>{
      

      const clerkId=user.id;

      try{
      const res=await axios.get(`${process.env.REACT_APP_API_URL}/api/users/get-frequency`,{
        params: { clerkId }
      })

      
      setFrequency(res.data.frequency);
      setLoading(false);
    }
    catch(error){
      console.error("User Frequency failed",error);
      

    }
    


   }

  
    getUserFrequency();
   


  },[user?.id])


    console.log(frequency);

    const submitFrequency=async(e)=>{
         e.preventDefault();
         if(frequency==="") return;


        const clerkId=user.id;
        
        try{
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/update-frequency`,
            {
                clerkId,
                frequency
            });
         toast.success("Frequency updated sucessfully!");
         

        }
        catch(error){
            console.error("Update frquency error:",error);
             toast.error("Update frequency error");
        }

    }

    return(

        <div>
            {
                
          loading===true?<div className="spinner"><ClipLoader color="#36d7b7" loading={loading} size={50} /></div>
       
            :
             
            <div className="frequency-update-bg">
           

            <form className="update-frequency-form" onSubmit={submitFrequency}>
                     <Link to="/" className="home-button">Home&nbsp;<IoMdArrowBack /></Link>
            <h3 className="frequency-heading">You will receive messages to your Gmail</h3>
            {frequency && (
            <p>Current Frequency: <strong>{frequency.toUpperCase()}</strong></p>
            )}
            <label htmlFor="frequency-select">Choose frequency:</label><br/>
            <select id="frequency-select" value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
                <option value="">Select Frequency</option>
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
            </select>
            <br/>
            <br/>
            <button type="submit">Submit</button>
            </form>

            </div>
            }

        </div>
    )
}

export default UpdateFrequency;