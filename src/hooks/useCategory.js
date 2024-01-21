import { getCategories } from "@/utils/api/category";
import { useQuery } from "react-query";

const useCategory = () => {
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  return { categories, isLoading, refetch };
};

export default useCategory;
