import React from "react";
import { useNavigate } from "react-router-dom";
const EmptyCart = ({ btnText, messageText }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "70%",
        marginTop: "80px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h6 style={{color:'gray', fontWeight:400 , fontSize: '1rem'}}>{messageText}</h6>
      <button className=" btn btn-outline-danger" onClick={() => navigate("/")}>
        {btnText}
      </button>
    </div>
  );
};

export default EmptyCart;
