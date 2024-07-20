import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import advisorReducer from "../features/advisor/advisorSlice";
import sliderReducer from "../features/slider/sliderSlice";
import programReducer from "../features/program/programSlice";
import postReducer from "../features/post/postSlice";
import newsReducer from "../features/news/newsSlice";
import subscriberReducer from "../features/subscriber/subscriberSlice";
import ecReducer from "../features/ec/ecSlice";
import organizationReducer from "../features/organization/organizationSlice";
import galleryReducer from "../features/gallery/gallerySlice";
import roleReducer from "../features/role/roleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    advisor: advisorReducer,
    slider: sliderReducer,
    program: programReducer,
    post: postReducer,
    news: newsReducer,
    subscriber: subscriberReducer,
    ecs: ecReducer,
    organizations: organizationReducer,
    gallery: galleryReducer,
    role: roleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
  devTools: false,
});

// export store
export default store;
