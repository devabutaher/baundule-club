"use client";

import React, { createContext } from "react";
import UserContext from "../context/UserContext";
import QueryProvider from "./QueryProvider";
import PackageProvider from "../context/PackageContext";

const AllContext = createContext();

const AllProvider = ({ children }) => {
  return (
    <AllContext.Provider>
      <QueryProvider>
        <UserContext>
          <PackageProvider>{children}</PackageProvider>
        </UserContext>
      </QueryProvider>
    </AllContext.Provider>
  );
};

export default AllProvider;
