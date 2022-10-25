import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Search from "../Search";

function TransactionLi() {
  const { transactions, isLoading, isError } = useSelector((state) => state.transaction);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setParPage] = useState(6);
  // console.log(typeof transactions);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");

  // console.log({
  //   input,
  //   type
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransaction({ type }));
  }, [dispatch, type]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(fetchTransaction({ input }));
  };

  let content = null;

  if (isLoading) content = <p>Loading..</p>;

  if (!isLoading && isError) content = <p className="error">There was an Error</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions
      .slice((currentPage - 1) * perPage, currentPage * perPage)
      .map((transaction) => <Transaction transaction={transaction} key={transaction.id} />);
  }
  let totalPage = Math.ceil(transactions.length / perPage);

  return (
    <div className="listContainer">
      <Search input={input} searchHandler={searchHandler} setInput={setInput} setType={setType} type={type} />
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} key={currentPage} totalPage={totalPage} />
    </div>
  );
}

export default TransactionLi;
