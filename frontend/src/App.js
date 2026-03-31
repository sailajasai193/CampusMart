import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Seller from "./seller";  
import Buyer  from "./Buyer";
import SorB from "./sell_or_buy";
import Login from "./login";
import Myitems from "./Myitems";
import VerifyOtp from "./VerifyOtp";
import SoldItems from "./solditems";
import RecommendPrice from "./RecommendPrice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
         <Route path="/sorb" element={<SorB />} /> 
         <Route path="/seller" element={<Seller />} /> 
         <Route path="/buyer" element={<Buyer/>} />
         <Route path="/Myitems" element={<Myitems />} />
         <Route path="/solditems" element={<SoldItems/>} />
         <Route path="/recommend" element={<RecommendPrice/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;