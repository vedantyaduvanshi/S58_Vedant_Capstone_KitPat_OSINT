import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { ColorRing } from 'react-loader-spinner'

export default function Register() {
  const navigate = useNavigate();
  const [Step, setStep] = useState(3);
  const [Loading, setOnLoading] = useState(false);
  const onLoinClick = () => {
    setOnLoading(true);
  };
  return (
    <>
      <Navbar />
      <div id="RegisterPage">
        <h2>Sign Up</h2>
        <h3>Powerful Stuff few clicks away</h3>
        <div id="RegisterBox">
          <h4>Get Started with KitPat !</h4>
          <div id="Step1Title">
            · Start by generating a random account number.
          </div>
          {
            Step === 0 &&
            <button id="buttontoGenrate" onClick={onLoinClick}>
            {!Loading && <div>Generate account number</div>}
            {Loading && (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#000000", "", "#080808", "#1a1919", "#2e2d2d"]}
              />
            )}
          </button>
          }

          <div id="Step2Title" style={{color: Step >= 1 ? "white" : "rgba(255, 255, 255, 0.89)",marginTop: Step >= 1 ? "10px" : "20px",fontSize: Step >= 1 ? "19px" : "17px"}}>· Saving your account number.</div>
          <div id="Step3Title" style={{color: Step >=2 ? "white" : "rgba(255, 255, 255, 0.781);",marginTop:Step >=2 ? "10px" : "20px",fontSize: Step >=2 ? "19px" : "14px;"}}>· Accepting the Terms and Conditions.</div>
          <div id="Step4Title" style={{color: Step >=3 ? "white" : "rgba(255, 255, 255, 0.781);",marginTop:Step >=3 ? "10px" : "20px",fontSize: Step >=3 ? "19px" : "14px;"}} >· LogIn to your account.</div>
          <div id="AlreadyAccount">
            <div id="alreadyline">Already have an Account ? </div>
            <div
              id="alreadybutton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
