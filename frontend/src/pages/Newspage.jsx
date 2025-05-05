import React from 'react';
import Header from '../components/News/Header';
// import { FaGraduationCap, FaUserCircle, FaSearch } from 'react-icons/fa';

const Newspage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF', // Khaki background
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <Header />
    </div>
   );  
 };

export default Newspage;






