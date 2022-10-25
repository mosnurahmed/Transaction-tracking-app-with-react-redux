import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, editTransaction, getTransaction, removeTransaction } from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};
export const fetchTransaction = createAsyncThunk("transaction/fetchTransaction", async ({input,type}) => {
  const transaction = await getTransaction(input,type);
  return transaction;
});
export const createTransaction = createAsyncThunk("transaction/createTransaction", async (data) => {
  const transaction = await addTransaction(data);
  return transaction;
});
export const updateTransaction = createAsyncThunk("transaction/updateTransaction", async ({data, id}) => {
  const transaction = await editTransaction(data, id);
  return transaction;
});
export const deleteTransaction = createAsyncThunk("transaction/deleteTransaction", async (id) => {
  const transaction = await removeTransaction(id);
  return transaction;
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    activeEditing: (state, action) => {
      state.editing = action.payload;
    },
    inactiveEditing:(state)=>{
      state.editing ={}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      }) //Create
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      }) //Update
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updateIndex = state.transactions.findIndex((ind) => ind.id === action.payload.id);
        state.transactions[updateIndex] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      }) //Delete
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions =state.transactions.filter((t) => t.id !== action.meta.arg)
        console.log(state.transactions)
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      });
  },
});

export default transactionSlice.reducer;
export const {activeEditing,inactiveEditing} = transactionSlice.actions
