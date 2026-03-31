import { useState } from "react";
import './seller.css';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode"

function Seller() {
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.name;
  }

  const [formData, setFormData] = useState({
    itemName: "",
    personName: "",   
    description: "",
    price: "",
    contactNumber: "",
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData,image:e.target.files[0]});
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
  const handleRecommend =()=>{
    navigate("/recommend")
  }
   const handleback =()=>{
    navigate("/sorb")
   }
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("itemName", formData.itemName);
  data.append("personName", formData.personName);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("contactNumber", formData.contactNumber);
  data.append("image", formData.image);
 try{
  const res = await fetch("http://localhost:5000/api/items/add", {
    method: "POST",
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
    body: data
  });

  const result = await res.json();
  alert(result.message);

  if (res.ok) {
    setFormData({
      itemName: "",
      personName: "",
      description: "",
      price: "",
      contactNumber: "",
      image: null
    });
  }
   document.querySelector('input[type="file"]').value = "";
}
  catch(err){
    console.error("Error:",err);
    alert("Error adding item");
  }
};   

  return (
   <div className="seller-container">
  <div className="seller-header">
    <p>Welcome, {username}!</p>

    <div className="seller-header-nav">
      <button disabled style={{ background: "#ccc" }}>Add Item</button>
      <button onClick={handleitems}>My Items</button>
      <button onClick={solditems}>Sold Items</button>
      <button onClick={handleRecommend}> Get Recommended Price</button>
    </div>

    <div className="seller-header-right">
      <button className="seller-header-btn" onClick={handleback}>  &lt; Go Back</button>
      <button className="seller-header-btn" onClick={handleLogout}>Logout</button>
    </div>
  </div>

  <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        placeholder="Item name"
        required
      />

      <input
        type="text"
        name="personName"
        value={formData.personName}
        onChange={handleChange}
        placeholder="Your full Name"
        required
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Item description"
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="price"
        required
      />

      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        required
      />
    <button type="submit" className="seller-form-btn">Submit</button>
  </form>
</div>
  );
}

export default Seller;