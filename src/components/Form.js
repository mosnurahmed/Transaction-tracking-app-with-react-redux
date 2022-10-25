import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, fetchTransaction, updateTransaction } from "../features/transaction/transactionSlice";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMod, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.transaction);

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction({
        id: editing?.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    setEditMode(false)
    reset();
  };

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  useEffect(() => {
    const { amount, type, name, id } = editing;
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
    dispatch(fetchTransaction({}));
  }, [editing, dispatch]);
  const cancelHandler = () => {
    reset();
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMod ? updateHandler : createHandler}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter title"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              required
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              required
              onChange={(e) => setType("expense")}
            />
            <label for="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amount"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          {editMod ? " Edit Transaction" : "Add Transaction"}
        </button>
        {editMod && (
          <button className="btn cancel_edit" onClick={cancelHandler}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;
