import CategoryTable from "@/components/Dashboard/Categories/CategoryTable";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between gap-2 py-8">
        <h1 className="text-4xl font-semibold">
          All <span className="text-lime-600">Categories</span>
        </h1>
        <Link
          href={"/dashboard/add-category"}
          className="px-4 py-2 text-lg text-white rounded bg-lime-600"
        >
          Add Category
        </Link>
      </div>
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
