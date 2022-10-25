import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

function Transactions() {
  const dispatch = useDispatch();
  // Store
  const { transactions, isLoading, isError } = useSelector((state) => state.transaction);
  // State
  const [view, setView] = useState([]);
  // Const
  let content = null;
  let limit = 5;
  // Effects
  useEffect(() => {
    dispatch(fetchTransaction({}));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isError) {
      const len = transactions.length;
      setView(transactions.slice(len > 5 ? len - limit : 0, len));
    }
  }, [transactions]);

  if (!isLoading && !isError && transactions?.length === 0) content = <p>No transactions Found</p>;
  console.log(view);
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <>
            {isError && <p>Error</p>}
            {!isError && !view.length && <p>No Data</p>}
            {!isError &&
              view.length &&
              view.map((item) => (
                <ul>
                  {" "}
                  <Transaction key={item.id} transaction={item} />
                </ul>
              ))}
          </>
        )}

        {view.length === limit && (
          <Link to={`/transaction`}>
            <p>View All</p>
          </Link>
        )}
      </div>
    </>
  );
}

export default Transactions;
