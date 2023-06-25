import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import EmailVerificationPopup from './EmailVerificationPopup';


const Dashboard = () => {
  return (
    <section className='wel'>
      <div className='header-container'>
        <h1>Welcome to the Dashboard</h1>
        <p className='complete-details'>
          Please complete your contact details.
          <Link to="/contact">Complete Now</Link>
        </p>
      </div>
      <EmailVerificationPopup />
    </section>
  );
};

export default Dashboard; 
