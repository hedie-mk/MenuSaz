import { useState, useEffect } from "react";
import { useGetProductQuery, useUpdateProductMutation } from "../../../features/Products/productApi";
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LucideImageDown } from "lucide-react";
import { toast } from "react-toastify";


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
  categoryName : z.string().optional(),
  categoryId: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id as string);
  const { data : categories } = useGetCategoriesQuery();
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
      categoryName : "",
      categoryId: ""
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        price: data.price?.toString() || "",
        discountedPrice: data.discountedPrice?.toString() || "",
        description: data.description || "",
        categoryName: data.categoryName || "",
        categoryId: data.categoryId || ""
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
    formData.append("categoryId" , formValues.categoryId || "")
    if (photo) formData.append("photo", photo);

    try {
      await updateProduct(formData as any).unwrap();
      toast.success("محصول با موفقیت ویرایش شد");
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("خطا در ویرایش محصول");
    }
  };


  if(!data && !isLoading) return (
    <div className="flex justify-center items-center rounded-3xl w-50 h-30 bg-red-600/80 text-white mt-20">
        <p className="font-BTitr">آیتم یافت نشد</p>
    </div>
  );
  return (
    <div className="relative min-h-35 flex flex-wrap justify-center items-center mt-7 px-4 py-4 rounded-xl border-2 border-yellow-400">
      {isLoading 
      ? (<h3>در حال دریفات اطلاعات</h3>) 
      : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            <div className="">
              <h2 className="text-2xl font-bold text-[#CAA200] font-BTitr mb-3">ویرایش محصول</h2>

              <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                نام محصول<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 text-[#0C1086] font-BNazanin"
              />
              {errors.name && <p className="text-red-500 text-sm font-BNazanin">{errors.name.message}</p>}

              <div className="flex gap-2 mb-1">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    قیمت اصلی<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("price")}
                    className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 text-[#0C1086] font-BNazanin"
                  />
                  {errors.price && <p className="text-red-500 text-sm font-BNazanin">{errors.price.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    قیمت با تخفیف
                  </label>
                  <input
                    type="text"
                    {...register("discountedPrice")}
                    className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 text-[#0C1086] font-BNazanin"
                  />
                  {errors.discountedPrice && (
                    <p className="text-red-500 text-sm font-BNazanin">{errors.discountedPrice.message}</p>
                  )}
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                توضیحات محصول<span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                className="w-full h-25 bg-[#D9D9D9] rounded-lg px-3 py-2 font-BNazanin mb-1 text-[#0C1086]"
              />
              {errors.description && <p className="text-red-500 text-sm font-BNazanin">{errors.description.message}</p>}


              <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                دسته‌بندی
              </label>
              <select
                {...register("categoryId")}
                className="w-full bg-[#D9D9D9] rounded-lg px-3 py-2 mb-3 text-gray-600 font-BNazanin"
              >
                <option value="">انتخاب دسته</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="px-4">
              <label className="block text-sm font-medium text-gray-400 mb-2 mt-10 font-BTitr">
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

            <div className="md:col-span-2 flex justify-center items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-50 transition-all duration-300 font-BTitr bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full font-bold"
              >
                {isLoading ? "در حال ثبت..." : "ویرایش محصول"}
              </button>
            </div>
          </form>
        </>
      )}

    </div>
  );
}
