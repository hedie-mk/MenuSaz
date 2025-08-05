import { useState, useEffect } from "react";
import { useGetProductQuery, useUpdateProductMutation } from "../../../features/Products/productTable/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LucideImageDown } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  price: z
    .string()
    .min(1, "قیمت الزامی است")
    .regex(/^[0-9]+$/, "قیمت باید عدد باشد"),
  discountedPrice: z
    .string()
    .regex(/^[0-9]*$/, "فقط عدد وارد شود")
    .optional()
    .or(z.literal("")),
  description: z.string().min(1, "توضیح الزامی است"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id as string);
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      discountedPrice: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        price: data.price?.toString() || "",
        discountedPrice: data.discountedPrice?.toString() || "",
        description: data.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formValues: ProductFormData) => {
    const formData = new FormData();
    formData.append("id", id as string); 
    formData.append("name", formValues.name);
    formData.append("price", formValues.price);
    formData.append("discountedPrice", formValues.discountedPrice || "");
    formData.append("description", formValues.description);
    if (photo) formData.append("photo", photo);

    try {
      await updateProduct(formData as any).unwrap();
      alert("محصول با موفقیت ویرایش شد");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("خطا در ویرایش محصول");
    }
  };
  if(!data) return (
    <div className="w-20 h-20 bg-red-600 text-white">
        <p>آیتم یافت نشد</p>
    </div>
  );
  return (
    <div className="relative min-h-35 flex flex-wrap justify-center items-center mt-7 px-4 py-4 rounded-xl border-2 border-yellow-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl grid grid-cols-2 gap-2"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#CAA200] mb-3">ویرایش محصول</h2>

          <label className="block text-sm font-medium text-gray-400 pb-2">
            نام محصول<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 text-[#0C1086]"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <div className="flex gap-2 mb-1">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 pb-2">
                قیمت اصلی<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("price")}
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 text-[#0C1086]"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 pb-2">
                قیمت با تخفیف
              </label>
              <input
                type="text"
                {...register("discountedPrice")}
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 text-[#0C1086]"
              />
              {errors.discountedPrice && (
                <p className="text-red-500 text-sm">{errors.discountedPrice.message}</p>
              )}
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-400 pb-2">
            توضیحات محصول<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            className="w-full h-25 bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 text-[#0C1086]"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        </div>

        <div className="px-4">
          <label className="block text-sm font-medium text-gray-400 mb-2 mt-10">
            عکس محصول
          </label>
          <div className="md:w-70 md:h-70 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
            {data?.photo ? (
              <img
                src={photo ? URL.createObjectURL(photo) : data.photo}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400">
                <LucideImageDown className="text-gray-500" />
              </span>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="col-span-2 flex justify-center items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-50 transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full font-bold"
          >
            {isLoading ? "در حال ثبت..." : "ویرایش محصول"}
          </button>
        </div>
      </form>
    </div>
  );
}
