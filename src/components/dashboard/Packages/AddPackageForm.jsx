"use client";

import { districtData } from "@/data/districtData";
import { divisionData } from "@/data/divisionData";
import { MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddPackageForm = () => {
  const [divisionID, setDivisionID] = useState(6);
  const [filteredDistrict, setFilteredDistrict] = useState(districtData);

  useEffect(() => {
    const result = districtData.filter(
      (district) => district.division_id === divisionID
    );

    setFilteredDistrict(result);
  }, [divisionID]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(data) {
    console.table(data);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="flex gap-2 md:gap-4">
          <TextField
            {...register("name", {
              required: "*package name is required",
              min: { value: 2, message: "*invalid package name" },
              max: { value: 20, message: "*invalid package name" },
            })}
            label="Package Name *"
            id="name"
            fullWidth
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("category", {
              required: "*category is required",
            })}
            label="Category *"
            id="category"
            fullWidth
            select
            error={errors.category ? true : false}
            helperText={errors.category?.message}
          >
            {[
              {
                name: "Beach",
              },
              {
                name: "Forest",
              },
              {
                name: "Mountain",
              },
              {
                name: "Water fall",
              },
            ].map((category, i) => (
              <MenuItem key={i} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField
            label="Duration *"
            type="number"
            id="duration"
            fullWidth
            {...register("duration", {
              required: "*duration is required",
              min: { value: 1, message: "*invalid duration" },
            })}
            error={errors.duration ? true : false}
            helperText={errors.duration?.message}
          />
          <TextField
            {...register("price", {
              required: "*price is required",
              min: { value: 1, message: "*invalid price" },
            })}
            error={errors.price ? true : false}
            helperText={errors.price?.message}
            label="Price"
            type="number"
            id="price"
            fullWidth
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField
            label="Min Members *"
            type="number"
            id="min-members"
            fullWidth
            {...register("minMembers", {
              required: "*min members is required",
              min: { value: 1, message: "*invalid min members" },
            })}
            error={errors.minMembers ? true : false}
            helperText={errors.minMembers?.message}
          />
          <TextField
            label="Max Members *"
            type="number"
            id="max-members"
            fullWidth
            {...register("maxMembers", {
              required: "*max members is required",
              min: { value: 1, message: "*invalid max members" },
            })}
            error={errors.maxMembers ? true : false}
            helperText={errors.maxMembers?.message}
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField
            {...register("division", {
              required: "*division is required",
            })}
            label="Division *"
            id="division"
            fullWidth
            select
            error={errors.division ? true : false}
            helperText={errors.division?.message}
          >
            {divisionData.map((division) => (
              <MenuItem
                onClick={() => setDivisionID(division.id)}
                key={division.id}
                value={division.name}
              >
                {division.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register("district", {
              required: "*district is required",
            })}
            label="District "
            id="district"
            fullWidth
            select
            error={errors.district ? true : false}
            helperText={errors.district?.message}
          >
            {filteredDistrict.map((district) => (
              <MenuItem key={district.id} value={district.name}>
                {district.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField
            {...register("tourLocation", {
              required: "*tour location is required",
              min: { value: 4, message: "*invalid tour location" },
            })}
            label="Tour Location *"
            id="name"
            fullWidth
            error={errors.tourLocation ? true : false}
            helperText={errors.tourLocation?.message}
          />
          <TextField
            {...register("mapUrl", {
              required: "*map url is required",
            })}
            label="Map URL *"
            id="name"
            fullWidth
            error={errors.mapUrl ? true : false}
            helperText={errors.mapUrl?.message}
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <TextField
            {...register("description")}
            label="Description"
            id="name"
            fullWidth
            multiline
            rows={4}
          />
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
