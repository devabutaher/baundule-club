"use client";

import { createContext } from "react";
import UserContext from "../context/UserContext";
import QueryProvider from "./QueryProvider";

const AllContext = createContext();

const AllProvider = ({ children }) => {
  return (
    <AllContext.Provider>
      <QueryProvider>
        <UserContext>{children}</UserContext>
      </QueryProvider>
    </AllContext.Provider>
  );
};

export default AllProvider;
