import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SoldItems() {

  const navigate = useNavigate();
  const [items, setItems] = useState(null); 
  const token = localStorage.getItem("token");
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.name;
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/items/sold", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
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

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  const Additem = () => {
    navigate("/seller");
  }
  const handleitems = () => {
    navigate("/Myitems");
  }

  return (
    <div className="seller-container">
      <div className="seller-header">
        <p>Welcome, {username}!</p>
        <div className="seller-header-nav">
          <button onClick={Additem}>Add Item</button>
          <button onClick={handleitems}>My Items</button>
          <button disabled style={{ background: "#ccc" }}>Sold Items</button>
        </div>
        <div className="seller-header-right">
          
          <button className="seller-header-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="buyer-wrapper">
        <h2>Sold Items</h2>

        {/* Loading State */}
        {items === null && (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}

        {/* No Items */}
        {items !== null && items.length === 0 && (
          <p style={{ color: "#800080", textAlign: "center" }}>
            No Sold Items
          </p>
        )}

        {/* Items */}
        {items !== null && items.length > 0 && (
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

                <p style={{ color: "red", fontWeight: "bold" }}>
                  SOLD
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SoldItems;