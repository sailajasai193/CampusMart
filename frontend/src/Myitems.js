import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from 'react-router-dom';

function Myitems(){
    const navigate=useNavigate();
    const [items,setItems] = useState([]);
    const token = localStorage.getItem("token");
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.name;
  }
  const solditems=()=>{
    navigate("/solditems")
  }

useEffect(()=>{
        fetch("http://localhost:5000/api/items/all",{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=>res.json())
        .then(data => {
       console.log(data);

    if (Array.isArray(data)) {
      setItems(data);
    } else {
      setItems([]);
    }
  });
},[]);

const handleLogout = () => {
     localStorage.clear();
     navigate("/");   
}
 
  const handleadditem =()=>{
    navigate("/seller");
  }

  const markSold = (id) => {

    fetch(`http://localhost:5000/api/items/sold/${id}`,{
        headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
        method:"PUT"
    })
    .then(res=>res.json())
    .then(()=>{
        setItems(prevItems =>
        prevItems.map(item =>
            item._id === id ? {...item, soldStatus:true} : item
        )
        );
    });

}
return (
    <div className="seller-container">

      <div className="seller-header">
        <p>Welcome, {username}!</p>

        <div className="seller-header-nav">
          <button onClick={handleadditem}>Add Item</button>
          <button disabled style={{ background: "#ccc" }}>My Items</button>
          <button onClick={solditems}>Sold Items</button>
        </div>

        <div className="seller-header-right">
          
          <button  className="seller-header-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>


      <div className="buyer-wrapper">
        <h2>Your Items</h2>
        {items.length === 0 ? (
          <p style={{ color: " #800080", fontFamily: "Arial" ,textAlign:"center"}}>No items present</p>
        ) : (
          <div className="buyer-grid">
            {items.map((item) => (
              <div key={item._id} className="buyer-container">

                <h3>{item.itemName}</h3>
                <p><b>Person Name:</b> {item.personName}</p>
                <p><b>Description:</b> {item.description}</p>
                <p><b>Price:</b> ₹{item.price}</p>
                <p><b>Contact:</b> {item.contactNumber}</p>
             
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.itemName}
                />
                 <button style={{borderRadius:"5px",height:"30px",border:"0.5px solid black",backgroundColor:"rgb(252, 4, 4)",color:"white"}} disabled={item.soldStatus} onClick={() => markSold(item._id)}>{item.soldStatus ? "Sold" : "Mark as Sold"}</button>
              </div>
            ))}
          </div>

        )}

      </div>

    </div>
  );
}
export default Myitems;