import UpdatePackageForm from "@/components/Dashboard/Packages/UpdatePackageForm";

const UpdatePackagePage = () => {
  return (
    <div className="px-2 py-10 space-y-8 md:px-4">
      <h1 className="text-4xl font-semibold text-center">
        Update <span className="text-lime-600">Package</span>
      </h1>
      <UpdatePackageForm />
    </div>
  );
};

export default UpdatePackagePage;
