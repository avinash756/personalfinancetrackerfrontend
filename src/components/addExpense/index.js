import axios from "axios";
import { useState} from "react";
import {Link} from "react-router-dom";

import { useAuth,useUser } from "@clerk/clerk-react";

import QrScanner from "../qrScanner";

import { toast } from 'react-toastify';

import ClipLoader from "react-spinners/ClipLoader";
import { IoMdArrowBack } from "react-icons/io";

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
      note,
      description: note,
      category: categoryGuess,
      date: new Date().toISOString().split("T")[0], // today’s date (YYYY-MM-DD)
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
        category:"",
        description:"",
        date:"",
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
        await axios.post(api,formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        
        
        setLoading(false);
        toast.success("Expense Added!");

    
    setFormData({   
        amount:"",
        category:"",
        description:"",
        date:"",
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
              <input onChange={handleChange} name="category" value={formData.category} type="text" placeholder="Enter the category"/>
              <textarea onChange={handleChange} name="description" value={formData.description}  placeholder="Enter the description"/>
              <input onChange={handleChange} name="date" value={formData.date} type="date"/>
              <input onChange={handleChange} name="note" value={formData.note} type="text" placeholder="Enter the note"/>

              <button type="submit">Submit</button>

            </form>
        }

       
        </div>
    )
}

export default AddExpense;