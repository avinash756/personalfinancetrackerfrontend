import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

import HomeCarousel from '../carousel';


function Home() {
  return (
    <div>
    
    <div>
      
      
      <HomeCarousel/>

      <div className='home-buttons'>
      <Link to="/add-expense"><button className="add-expense-button">Add expense</button></Link>
      <Link to="/show-transactions">
      <button className='show-transactions'>Show transactions</button></Link>
      <Link to="show-visually">
      <button className="show-visually">Show visually</button></Link>
       <Link to="/update-frequency">
      <button className="update-frequency-button">Update Frequency</button></Link>
      </div>
     
    </div>


        <div className='scroll-message'>
      <p>You are signed in. You can now access your dashboard, add expenses, view stats, etc.</p>
      </div>


   
    </div>
  );
}

export default Home;
