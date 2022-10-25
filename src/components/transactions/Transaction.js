import React from "react";
import editImage from "../../asset/images/edit.svg";
import deleteImage from "../../asset/images/delete.svg";
import { useDispatch } from "react-redux";
import { activeEditing, deleteTransaction } from "../../features/transaction/transactionSlice";
import { useMatch, useNavigate } from "react-router-dom";

function Transaction({ transaction }) {
  const { name, amount, type, id } = transaction;
  const dispatch = useDispatch();
  const match =useMatch("/")
  const navigate =useNavigate()

  const editHandler =()=>{
    dispatch(activeEditing(transaction))
    if(!match){
      navigate("/")
    }
   
    
  }
 
  return (
    <li className={`transaction ${type}`}>
      <p>{name} </p>
      <div className="right">
        <p>৳ {amount} </p>
        <button className="link">
          <img className="icon" src={editImage} alt="edit"  onClick={editHandler}/>
        </button>
        <button className="link">
          <img className="icon" src={deleteImage} onClick={() => dispatch(deleteTransaction(id))} alt="delete" />
        </button>
      </div>
    </li>
  );
}

export default Transaction;
