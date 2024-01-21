import UpdateCategoryForm from "@/components/Dashboard/Categories/UpdateCategoryForm";

const UpdateCategoryPage = () => {
  return (
    <div className="px-2 py-10 space-y-8 md:px-4">
      <h1 className="text-4xl font-semibold text-center">
        Update <span className="text-lime-600">Category</span>
      </h1>
      <UpdateCategoryForm />
    </div>
  );
};

export default UpdateCategoryPage;
