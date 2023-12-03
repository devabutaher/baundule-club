import { getPackages } from "@/utils/api/package";
import React, { createContext } from "react";
import { useQuery } from "react-query";

export const PackageContext = createContext();
const PackageProvider = ({ children }) => {
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: () => getPackages(),
  });

  const value = {
    packages,
  };

  return (
    <PackageContext.Provider value={value}>{children}</PackageContext.Provider>
  );
};

export default PackageProvider;
