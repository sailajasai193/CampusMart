import { useNavigate } from "react-router-dom";
import './sell_or_buy.css'
import {jwtDecode} from "jwt-decode";

function SorB() {
  const navigate = useNavigate();
   const token = localStorage.getItem("token");
     let username="";
     if (token) {
       const decoded=jwtDecode(token);
       username = decoded.name;
     }
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/");
  }
  return (

    <div className="seller-container">

      <div className="seller-header">
        <p>Welcome, {username}!</p>
        <div className="seller-header-right">
          <button  className="seller-header-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    <div className="container">
      <button 
        onClick={() => navigate("/seller")}
        className="btn"
      >
        Seller
      </button>

      <button 
        onClick={() => navigate("/buyer")}
        className="btn"
      >
        Buyer
      </button>
    </div>
    </div>
  );
}

export default SorB;