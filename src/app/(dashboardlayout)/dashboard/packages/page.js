import PackageTable from "@/components/dashboard/Packages/PackageTable";
import Link from "next/link";

const PackagesPage = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between gap-2 py-8">
        <h1 className="text-4xl font-semibold">
          All <span className="text-lime-600">Packages</span>
        </h1>
        <Link
          href={"/dashboard/add-package"}
          className="px-4 py-2 text-lg text-white rounded bg-lime-600"
        >
          Add Package
        </Link>
      </div>
      <PackageTable />
    </div>
  );
};

export default PackagesPage;
