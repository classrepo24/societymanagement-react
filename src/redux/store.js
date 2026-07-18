import { configureStore } from "@reduxjs/toolkit";

import visitorsReducer from "./visitorsSlice";
import staffReducer from "./staffSlice";
import noticeReducer from "./noticeSlice";

export const store = configureStore({
  reducer: {
    visitors: visitorsReducer,
    staff: staffReducer,
    notices: noticeReducer,
  },
});