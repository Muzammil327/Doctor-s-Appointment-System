"use client";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/app/redux/store";
import { login } from "@/app/redux/slices/doctoruserSlice";

 function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
export default LayoutProvider