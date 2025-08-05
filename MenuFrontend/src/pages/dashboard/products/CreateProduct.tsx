import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../../features/Products/productTable/productApi";
import { useState } from "react";
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
  categoryId: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const categories = [
    { id: "1", name: "دسته ۱" },
    { id: "2", name: "دسته ۲" },
    { id: "3", name: "دسته ۳" },
  ];

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discountedPrice", data.discountedPrice || "");
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId || "");
    if (photo) formData.append("photo", photo);

    try {
      await createProduct(formData as any).unwrap();
      alert("محصول با موفقیت ثبت شد");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error creating product:", err);
      alert("خطا در ثبت محصول");
    }
  };

  return (
    <div className="relative min-h-35 flex flex-wrap justify-center items-center mt-7 px-4 py-4 rounded-xl border-2 border-yellow-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl grid grid-cols-2 gap-2"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#CAA200] mb-3">ساخت محصول</h2>

          <label className="block text-sm font-medium text-gray-400 pb-2">
            نام محصول<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1"
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
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2"
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
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2"
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
            className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

          <label className="block text-sm font-medium text-gray-400 pb-2">
            دسته‌بندی
          </label>
          <select
            {...register("categoryId")}
            className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-3 text-gray-600"
          >
            <option value="">انتخاب دسته</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="px-4">
          <label className="block text-sm font-medium text-gray-400 mb-2 mt-10">
            عکس محصول
          </label>
          <div className="md:w-70 md:h-70 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
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
            {isLoading ? "در حال ثبت..." : "ثبت محصول"}
          </button>
        </div>
      </form>
    </div>
  );
}
