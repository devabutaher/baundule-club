"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const AddPackageForm = () => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-4">
        <div className="flex gap-2 md:gap-4">
          <TextField label="Name" id="name" fullWidth />
          <TextField label="Name" id="name" fullWidth />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField label="Name" id="name" fullWidth />
          <TextField label="Name" id="name" fullWidth />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField label="Name" id="name" fullWidth />
          <TextField label="Name" id="name" fullWidth />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded border-lime-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-lg text-white rounded bg-lime-600"
          >
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackageForm;
