"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
