import axios from "axios";
import { useState} from "react";
import {Link} from "react-router-dom";

import { useAuth,useUser } from "@clerk/clerk-react";

import QrScanner from "../qrScanner";

import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";
import { IoMdArrowBack } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"; 

import moment from "moment-timezone";


import "./index.css";

function AddExpense(){

    const { getToken} = useAuth();
    const { user } = useUser();



     const [showScanner, setShowScanner] = useState(false);
     const [upiLink, setUpiLink] = useState("");
     const [loading,setLoading]= useState(false);

  const getGreetings=()=>{

    const hours=new Date().getHours();
    if(hours<12) return "Good Morning";
    if(hours<17) return "Good Afternoon";
    return "Good Evening";
  }

  const greeting=getGreetings();
  
  const handleScanSuccess = (data) => {
    if (data.startsWith("upi://pay")) {
      setUpiLink(data);
      setShowScanner(false);

      
    const url = new URL(data);
    const params = new URLSearchParams(url.search);

    const amount = params.get("am") || "";
    const note = params.get("tn") || "";
    const categoryGuess = note.toLowerCase().includes("grocer") ? "Groceries" : "";



     setFormData(prev => ({
      ...prev,
      amount,
      type: "expense",
      category: categoryGuess,
      description: note,
      date: moment().tz("Asia/Kolkata").toISOString(), // today’s date (YYYY-MM-DD)
      note
    }));







     

    } else {
      toast.error("Not a valid UPI QR code");
    }
  };

  const handleUpiRedirect = () => {
    window.location.href = upiLink;
  };



    const [formData,setFormData]=useState({
        amount:"",
        type:"expense",
        category:"",
        description:"",
        note:""

    })

   const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}))
    };



const details=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const api=`${process.env.REACT_APP_API_URL}/api/transactions`;
    const token=await getToken();
    try{

      const payload = {
      ...formData,
      date: moment().tz("Asia/Kolkata").toISOString(), // ensures accurate datetime
          };


        await axios.post(api,payload,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        
        
        setLoading(false);
        if(formData.type==="income"){
          toast.success("Income Added!")
        }
        else if(formData.type==="expense"){
        toast.success("Expense Added!");
        }

    
    setFormData({   
        amount:"",
        type:"expense",
        category:"",
        description:"",
        note:""})
    }
    catch(error){
        console.error("Error",error);
        toast.error("Failed to add expense!");
        setLoading(false);
    }

   

}




    return(

        <div className="add-expense-bg">
            <Link to="/" className="home-button">Home&nbsp;<IoMdArrowBack /></Link>
                  
            <h2 className="greeting-user"> {greeting} {user?.fullName || "User"} 👋</h2>

                <div>
                <button className={showScanner===false?"Show-scanner-button":"Close-scanner-button"} onClick={() => setShowScanner(!showScanner)}>
                     {showScanner ? "Close Scanner" : "Scan UPI QR"}
                </button>
                </div>

      {showScanner && <QrScanner onScanSuccess={handleScanSuccess} />}

      {upiLink && (
        <div>
          <p>Scanned UPI Link: <code>{upiLink}</code></p>
          <button onClick={handleUpiRedirect}>Open in UPI App</button>
        </div>
      )}


        {
          loading===true?<div className="spinner"><ClipLoader color="#36d7b7" loading={loading} size={50} /></div>
        :

            <form onSubmit={details}>
              <input onChange={handleChange} name="amount" value={formData.amount} type="number" placeholder="Enter the amount" required/>
                            
                            <p><strong>Choose Type:</strong></p>
              <div className="type-toggle">
                <label className={`radio-option ${formData.type === "expense" ? "selected-expense" : ""}`}>
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={formData.type === "expense"}
                    onChange={handleChange}
                  />
                  <FaArrowDown className="icon" />
                  Expense
                </label>
                <label className={`radio-option ${formData.type === "income" ? "selected-income" : ""}`}>
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={formData.type === "income"}
                    onChange={handleChange}
                  />
                  <FaArrowUp className="icon" />
                  Income
                </label>
              </div>


              <input onChange={handleChange} name="category" value={formData.category} type="text" placeholder="Enter the category"/>
              <textarea onChange={handleChange} name="description" value={formData.description}  placeholder="Enter the description"/>
              <input onChange={handleChange} name="note" value={formData.note} type="text" placeholder="Enter the note"/>

              <button type="submit">Submit</button>

            </form>
        }

       
        </div>
    )
}

export default AddExpense;