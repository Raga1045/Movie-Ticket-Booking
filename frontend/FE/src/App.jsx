import React, { useState, useEffect } from "react";
import  {BrowserRouter as BR , Routes , Route} from "react-router-dom";

import Home from "./pages/Home";
import MovieReview from "./pages/MovieReview";
import Showtime from "./pages/Showtime";
import SeatSelection from "./pages/SeatSelection";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Payment from "./pages/Payment";


function App() {

  return (
     <div style={{ backgroundColor: "#0f0f00",  minHeight: "100vh"  }}>
        <BR>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/movie/:id" element={<MovieReview/>}/>
             <Route path="/showtime/:id" element={<Showtime/>}/>
             <Route path="/seatselection/:id" element={<SeatSelection/>}/>
             <Route path="/signup" element={<SignUp/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/payment/:id" element={<Payment/>}/>
          </Routes>
        </BR>
     </div>
     
  );
}

export default App
