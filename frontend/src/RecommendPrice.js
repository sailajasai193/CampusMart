import "./RecommendPrice.css";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from 'react-router-dom';


function RecommendPrice(){
     const navigate=useNavigate();
    const token = localStorage.getItem("token");
    let username = "";
    if (token) {
        const decoded = jwtDecode(token);
        username = decoded.name;
    }

    const [product,setProduct] = useState("");
    const [years,setYears] = useState("0.5");
    const [condition,setCondition] = useState("");
    const [price,setPrice] = useState(null);

    const getPrice = async () => {
     
    const res = await fetch("http://localhost:5000/api/recommend",{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
    product,
    years_used:years,
    condition
    })
    });

    const data = await res.json();
    setPrice(data.predicted_price);
    };
     const handleitems=()=>{
    navigate("/Myitems")
  }
  const solditems=()=>{
    navigate("/solditems")
  }
   const handleLogout = () => {
     localStorage.clear();
     navigate("/");   
   }
   const handleback =()=>{
    navigate("/seller")
   }
  const handleseller=()=>{
    navigate("/seller")
  }

return(

    <div className="seller-container">
  <div className="seller-header">
    <p>Welcome, {username}!</p>

    <div className="seller-header-nav">
      <button onClick={handleseller}>Add Item</button>
      <button onClick={handleitems}>My Items</button>
      <button onClick={solditems}>Sold Items</button>
      
      <button disabled style={{ background: "#ccc" }}> Get Recommended Price</button>
    </div>

    <div className="seller-header-right">
       <button className="seller-header-btn" onClick={handleback}>Go Back</button>
      <button className="seller-header-btn" onClick={handleLogout}>Logout</button>
    </div>
  </div>

        
        <div className="recommend-container">
        <div className="recommend-card">
        <h2>AI Price Recommendation</h2>
        <label>Item</label>
        <select onChange={(e)=>setProduct(e.target.value)}>
        <option>Select Item</option>
        <option value="calculator">Calculator</option>
        <option value="laptop">Laptop</option>
        <option value="cycle">Cycle</option>
        <option value="tablet">Tablet</option>
        <option value="mouse">Mouse</option>
        <option value="extension_board">ExtensionBoard</option>
        <option value="power_bank">Powerbank</option>
        <option value="drawing_board">DrawingBoard</option>
        <option value="scientific_calculator">ScientificCalculator</option>
        <option value="drafter">Drafter</option>
        <option value="engineering-book">EngineeringBook</option>
        </select>

        <label>Years Used</label>
        <select onChange={(e)=>setYears(e.target.value)}>
        <option value="0.5">6 months</option>
        <option value="1">1 year</option>
         <option value="1.5">1.5 years</option>
        <option value="2">2 years</option>
        <option value="2.5">2.5 years</option>
        <option value="3">3 years</option>
        </select>

        <label>Condition</label>
       <select onChange={(e)=>setCondition(e.target.value)}>

        <option value="">Select Condition</option>
        <option value="poor">Poor</option>
        <option value="fair">Fair</option>
        <option value="good">Good</option>
        <option value="very_good">Very Good</option>
        <option value="excellent">Excellent</option>

        </select>

        <button className="price-btn" onClick={getPrice}>
        Get Price
        </button>

        {price && (
        <div className="price-result">
        Recommended Price: ₹{price}
        </div>
        )}

        </div>
        </div>
   </div>
)

}

export default RecommendPrice;