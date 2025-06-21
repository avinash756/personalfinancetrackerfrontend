
import { useEffect,useState,useRef } from "react";
import {Link} from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";


import { IoDownload } from "react-icons/io5";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import axios from "axios";

import TransactionPieChart from "../pieChart";
import BarChartComponent from "../barChart";
import LineChartComponent from "../lineChart";
import { IoMdArrowBack } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import Lottie from "lottie-react";

import financeAnimation from "../animations/financeAnimation.json";


import "./index.css";

function ShowingVisually(){

  const[loading,setLoading]=useState(true);

  const reportRef = useRef();

 const downloadPDF = () => {
  const input = reportRef.current;
  html2canvas(input, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('Transaction_Report.pdf');
  });
};



     const [transactions,setTransactions]=useState([]);

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
    return(

        <div className="visual-bg" ref={reportRef}>

           <Link to="/" className="home-button">Home&nbsp;<IoMdArrowBack /></Link>
        
        {
          loading===true?<div className="spinner"><ClipLoader color="#36d7b7" loading={loading} size={50} /></div>
        :
          <div>
        {transactions.length===0? 
        <div className="lottie-animation">
        <div style={{ width: 300, height: 300 }}>
        <Lottie animationData={financeAnimation} loop={true} />
         </div>
           <p className="empty-expeses-para" style={{ fontSize: "16px", color: "#444" }}>
        Add your expenses to see your spending visualized here!
      </p>
         </div>:

        <div>
          <div className="download-bg">
            <h4 className="visual-summary-heading">Visual Summary of Your Transactions</h4>
            <div>
              <button className="download-pdf-button" onClick={downloadPDF}>Download Report as PDF &nbsp; <IoDownload /></button>
            </div>
           </div> 

           <div className="download-bg-sm">
            <h4 className="visual-summary-heading">Visual Summary of Your Transactions</h4>
            <div>
              <button className="download-pdf-button" onClick={downloadPDF}>Download Report as PDF  &nbsp; <IoDownload /></button>
            </div>
           </div> 


           
            <h4 className="pie-chart-heading">Pie Chart (Spending by Category)</h4>
            <div className="TransactionPieChart">
       
         {
            <TransactionPieChart transactions={transactions}/>
         }
         </div> 

            <h4 className="bar-chart-heading">Bar Chart (Expenses by Category)</h4>
         {
            <BarChartComponent data={transactions}/>
         }
            <h4 className="line-chart-heading">Line Chart (Spending Over Time)</h4>
         {
            <LineChartComponent data={transactions}/>
         }

         <h4 className="transactions-history">Transactions Table</h4>
         <table className="transaction-table">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
              {
                transactions.map((tx)=><tr key={tx._id}>
                    <td>₹{tx.amount}</td>
                    <td>{tx.category}</td>
                    <td>{tx.description}</td>
                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                </tr>)
              }
            </tbody>
         </table>

         </div>

            }

          </div>



        }

        </div>
    )
}

export default ShowingVisually;