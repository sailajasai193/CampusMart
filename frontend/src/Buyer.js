import { useState, useEffect } from "react";
 import "./Buyer.css";
import {useNavigate} from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

function Buyer() {
  const navigate=useNavigate()
  const [items, setItems]=useState([]);
  const [search,setSearch]=useState("");
    const token = localStorage.getItem("token");
     let username = "";
     if (token) {
       const decoded = jwtDecode(token);
       username = decoded.name;
     }

      const handleback =()=>{
    navigate("/sorb")
   }

 useEffect(() => {
  const url =
    search === ""
      ? "http://localhost:5000/api/items/allitems"
      : `http://localhost:5000/api/searchItem/search?q=${search}`;

  fetch(url, {
    headers: {
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => {

      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }

    })
    .catch(err => {
      console.log(err);
      setItems([]);
    });

}, [search]);

   const handleLogout = () => {
     localStorage.clear();
     navigate("/");   
    }

return (
   <div className="seller-container">

      <div className="seller-header">
        <p>Welcome, {username}!</p>
        <div className="seller-header-right">
           
          <input type="text"  placeholder="Search items..." className="seller-header-search" value={search}
  onChange={(e)=>setSearch(e.target.value)}/>
                <button className="seller-header-btn" onClick={handleback}>  &lt; Go Back</button>
          <button  className="seller-header-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

  <div className="buyer-wrapper">
    <h2>Available Items</h2>

    <div className="buyer-grid">
      {items.map((item) => (
        <div key={item._id} className="buyer-container">
          <h3>{item.itemName}</h3>
          <p><b>PersonName:</b> {item.personName}</p>
          <p><b>Description:</b> {item.description}</p>
          <p><b>Price:</b> ₹{item.price}</p>
          <p><b>Contact:</b> {item.contactNumber}</p>
          <a href="https://wa.me/9277829178" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
  <FaWhatsapp size={20} color="green" />
  <span style={{ color: "green", fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}>
    Chat on WhatsApp
  </span>
</a>
          <img 
            src={`http://localhost:5000/uploads/${item.image}`} 
            alt={item.itemName}
          />
        </div>
      ))}
    </div>
  </div>
  </div>
);
}

export default Buyer;