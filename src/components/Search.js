function Search({ input, searchHandler, setType, type,setInput }) {
  return (
    <div className="search">
      <div className="searchBar">
        <form className="searchForm" onSubmit={searchHandler}>
          <input className="searchBox"
           type="search" name="search"
            placeholder="title search"
             value={input}
             onChange ={(e) => setInput(e.target.value)}
              />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="checkBox">
        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              required
              onChange={() => setType("income")}
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
              onChange={() => setType("expense")}
            />
            <label for="transaction_type">Expense</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
