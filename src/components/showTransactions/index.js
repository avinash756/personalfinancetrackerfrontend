import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "@clerk/clerk-react";

import { TbTransactionRupee } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { IoMdArrowBack } from "react-icons/io";



import "./index.css";

function ShowingTransactions(){
    const [transactions,setTransactions]=useState([]);
    const[loading,setLoading]=useState(true);
     
     const { getToken } = useAuth();

    useEffect(()=>{
 
        const fetchingTransactions=async()=>{
            const api=`${process.env.REACT_APP_API_URL}/api/transactions`
              const token=await getToken();
            try{
            const response=await axios.get(api,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("response:",response.data)
            setTransactions(response.data.transactions);
            setLoading(false);

        }
        catch(error){
            console.error("Error:",error);
            setLoading(true);
        }

        }

        fetchingTransactions()

    },[getToken])

    const deleteTransaction=async(id)=>{
          
            const api=`${process.env.REACT_APP_API_URL}/api/transactions/${id}`
            const token=await getToken();
            try{
            const response=await axios.delete(api,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("response:",response.data)
            const filteredRemovedTransactions=transactions.filter((each)=>each._id!==id);
            setTransactions(filteredRemovedTransactions);
          

        }
        catch(error){
            console.error("Error:",error);
        }

        

    }
    return(

        <div className="new-transactions">

            <Link to="/" className="home-button">Home&nbsp;<IoMdArrowBack /></Link>
           
           <br/>
           <br/>
           <br/>
           
            {
                loading===true?<div className="spinner"><ClipLoader color="#36d7b7" loading={loading} size={50} /></div>:
            
            <div>
           <h2 className="new-transaction-heading">New Transactions
            
            <div>
            Expenses: <TbTransactionRupee />{transactions.reduce((expense,actual)=>expense+actual.amount,0)}
            </div>
            </h2>
            {
                transactions.map((each)=>
                <div className="each-transaction" key={each._id}>
                    <p>Amount: ₹{each.amount}</p>
                    <p>Category: {each.category}</p>
                    <p>Date: {new Date(each.date).toDateString()}</p>
                    <p>Description: {each.description}</p>
                    <p>Note: {each.note}</p>
                    <button onClick={()=>deleteTransaction(each._id)}>Delete transaction &nbsp; <MdDeleteForever /></button>
                </div>)
            }
            </div>
            }


        </div>
    )
}

export default ShowingTransactions;