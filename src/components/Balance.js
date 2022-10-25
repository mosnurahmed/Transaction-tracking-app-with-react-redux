import React from "react";
import { useSelector } from "react-redux";

function Balance() {
  const { transactions } = useSelector((state) => state.transaction);
  let amount = 0;
  transactions.map((t) => {
    if (t.type === "income") {
      amount += Number(t.amount);
      // console.log(typeof amount);
    } else {
      amount -= Number(t.amount);
    }
    return t;
  });

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{amount}</span>
      </h3>
    </div>
  );
}

export default Balance;
