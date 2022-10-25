import React from 'react'
import Balance from "../components/Balance"
import Form from "../components/Form"
import Transactions from '../components/transactions/Transactions'

function Home() {
  return (
   <>
   <Balance/>
   <Form/>
   <Transactions/>
   </>
  )
}

export default Home