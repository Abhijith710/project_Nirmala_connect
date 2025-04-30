import React from 'react';
import Header from '../components/News/Header';
// import Filters from '../components/News/Filters';
// import { FaGraduationCap, FaUserCircle, FaSearch } from 'react-icons/fa';
// import NewsHeader from '; // adjust path as needed
// import NewsBoard from './NewsBoard'; // assuming you're rendering the board below the header

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
      {/* <Filters /> */}



      
       {/* Content Area
//       <div
//         style={{
//           flex: 1,
//           padding: '24px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//         }}
//       >
//         <NewsBoard />
//       </div> */}

      {/* Optional Footer */}
       {/* <footer
        style={{
           backgroundColor: '#000000', // Black
           color: '#FFFFFF',
           textAlign: 'center',
           padding: '12px',
           fontSize: '14px',
         }}
       >
         © 2025 Nirmala Connect | Computer Science Dept.
       </footer>  */}
    </div>
   );  
 };

export default Newspage;






