import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCredentials } from "../../api/credentialsApi";

export const getCredentials = createAsyncThunk(
  "credentials/getCredentials",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCredentials();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCredentials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unable to load credentials";
      });
  }
});

export const { clearCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;