import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './verifyOtp.css'


function VerifyOtp(){

      const [otp,setOtp]=useState("")
      const navigate=useNavigate()
      const email=localStorage.getItem("otpEmail")
      const API = process.env.REACT_APP_API_URL;
      const handleSubmit=async(e)=>{

            e.preventDefault()
            const response=await fetch(`${API}/auth/verify-otp`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({email,otp})
          })
          const data=await response.json()
          alert(data.message)
          if(response.ok){
            localStorage.setItem("token",data.token)
            navigate("/sorb")
          }
    }

      return(

        <div className="otp-div">
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
        <input placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} />
        <button className="otp-btn">Verify</button>
        </form>
        </div>
      )

}

export default VerifyOtp