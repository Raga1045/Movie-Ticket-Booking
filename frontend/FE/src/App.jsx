import  {BrowserRouter as BR , Routes , Route} from "react-router-dom";
import Home from "./pages/Home";
import MovieReview from "./pages/MovieReview";
import Showtime from "./pages/Showtime";
import SeatSelection from "./pages/SeatSelection";
import Login from "./pages/Login";
import Payment from "./pages/Payment";


function App() {
  

  return (
    <body style={{backgroundColor:"#0f0f00"}}>
     <div>
        <BR>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/movie/:id" element={<MovieReview/>}/>
             <Route path="/showtime" element={<Showtime/>}/>
             <Route path="/seatselection" element={<SeatSelection/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/payment" element={<Payment/>}/>
          </Routes>
        </BR>
     </div>
     </body>
  );
}

export default App
