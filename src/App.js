import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TransactionList from "./pages/TransactionList";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaction" element={<TransactionList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
