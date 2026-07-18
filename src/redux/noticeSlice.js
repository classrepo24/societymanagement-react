import { createSlice } from "@reduxjs/toolkit";
import noticesData from "../data/notices.json";

const initialState = {
  notices: JSON.parse(localStorage.getItem("notices")) || noticesData,
};

const noticeSlice = createSlice({
  name: "notices",
  initialState,

  reducers: {
    setNotices(state, action) {
      state.notices = action.payload;
      localStorage.setItem("notices", JSON.stringify(action.payload));
    },

    addNotice(state, action) {
      state.notices.push(action.payload);
      localStorage.setItem("notices", JSON.stringify(state.notices));
    },

    updateNotice(state, action) {
      state.notices = state.notices.map((notice) =>
        notice.id === action.payload.id ? action.payload : notice
      );

      localStorage.setItem("notices", JSON.stringify(state.notices));
    },

    deleteNotice(state, action) {
      state.notices = state.notices.filter(
        (notice) => notice.id !== action.payload
      );

      localStorage.setItem("notices", JSON.stringify(state.notices));
    },


    updateNoticeStatus(state) {
  const now = new Date();

  state.notices = state.notices.map((notice) => {
    // Scheduled -> Published
    if (
      notice.status === "Scheduled" &&
      notice.scheduledAt &&
      new Date(notice.scheduledAt) <= now
    ) {
      return {
        ...notice,
        status: "Published",

        publishDate: now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        publishTime: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    }

    // Published -> Expired
    if (
      notice.status === "Published" &&
      notice.expiryAt &&
      new Date(notice.expiryAt) <= now
    ) {
      return {
        ...notice,
        status: "Expired",

        expiredDate: now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        expiredTime: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    }

    return notice;
  });

  localStorage.setItem("notices", JSON.stringify(state.notices));
},
  },
});

export const {
  setNotices,
  addNotice,
  updateNotice,
  deleteNotice,
  updateNoticeStatus
} = noticeSlice.actions;

export default noticeSlice.reducer;