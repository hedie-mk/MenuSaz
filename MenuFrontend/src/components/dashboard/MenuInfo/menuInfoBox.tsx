import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LucideImageDown } from "lucide-react";
import { useGetMenuInfoQuery , useUpdateMenuInfoMutation} from "../../../features/MenuInfo/MenuInfoApi";
import { toast } from "react-toastify";

const menuInfoSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  address: z.string().optional(),
  workHour: z.string().optional(),
  phoneNumber : z.string().optional(),
  siteDescription : z.string().optional().describe("اینجا بهتره تبلیغی از کافه باشه"),
  socialMedia : z.string().optional(),
});
type MenuInfoFormData = z.infer<typeof menuInfoSchema>;


export default function MenuInfoBox(){

    const { data , isLoading } = useGetMenuInfoQuery();
    const [updateMenuInfo] = useUpdateMenuInfoMutation();
    const [photo, setPhoto] = useState<File | null>(null);
    
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm<MenuInfoFormData>({
    resolver: zodResolver(menuInfoSchema),
    defaultValues: {
        name: "",
        siteDescription: "",
        address: "",
        workHour: "",
        phoneNumber: "",
        socialMedia: ""
    },
    });

    useEffect(() => {
    if (data) {
        reset({
        name: data.name || "",
        siteDescription: data.siteDescription || "",
        address: data.address || "",
        workHour: data.workHour || "",
        phoneNumber : data.phoneNumber || "" ,
        socialMedia : data.socialMedia || "",
        });
    }
    }, [data, reset]);


    const onSubmit = async (formValues: MenuInfoFormData) => {
        const formData = new FormData();
        formData.append("id", data?.id as string); 
        formData.append("name", formValues.name);
        formData.append("address", formValues.address || "");
        formData.append("workHour", formValues.workHour || "");
        formData.append("phoneNumber", formValues.phoneNumber || "");
        formData.append("siteDescription", formValues.siteDescription || "");
        formData.append("socialMedia", formValues.socialMedia || "");

        if (photo) formData.append("logo", photo);

        try {
        await updateMenuInfo(formData as any).unwrap();
        toast.success("محصول با موفقیت ویرایش شد");
        } catch (err) {
        console.error("Error updating product:", err);
        toast.error("خطا در ویرایش محصول");
        }
    };


    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 w-full items-center space-x-5">
            <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    نام کافه<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("name")}
                    className="w-full text-lg bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 font-BNazanin"
                />
                {errors.name && <p className="text-red-500 text-sm font-BNazanin">{errors.name.message}</p>}

                <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    آدرس<span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register("address")}
                    className="w-full text-lg bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 font-BNazanin"
                />
                {errors.address && <p className="text-red-500 text-sm font-BNazanin">{errors.address.message}</p>}
                <div className="flex flex-col sm:flex-row gap-1">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                            شماره تماس
                        </label>
                        <input
                            type="text"
                            {...register("phoneNumber")}
                            dir="ltr"
                            className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 font-BNazanin"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm font-BNazanin">{errors.phoneNumber.message}</p>} 
                    </div>
                    <div className="flex-1.5">
                        <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                            ساعت کاری<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("workHour")}
                            className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 font-BNazanin"
                        />
                        {errors.workHour && <p className="text-red-500 text-sm font-BNazanin">{errors.workHour.message}</p>}
                    </div>
                </div>
                <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    لینک اینستگرام
                </label>
                <input
                    type="text"
                    {...register("socialMedia")}
                    className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 font-BNazanin"
                />
                {errors.socialMedia && <p className="text-red-500 text-sm font-BNazanin">{errors.socialMedia.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-400 pb-2 font-BTitr">
                    توضیحات سایت<span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register("siteDescription")}
                    className="w-full text-lg bg-[#D9D9D9] rounded-lg px-3 py-2 mb-1 h-20 font-BNazanin"
                />
                {errors.siteDescription && <p className="text-red-500 text-sm font-BNazanin">{errors.siteDescription.message}</p>}

                <label className="block text-sm font-medium text-gray-400 mb-2 font-BTitr">
                    لوگو کافه
                </label>
                <div className="w-full md:max-w-[200px] aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                    {data?.logo ? (
                    <img
                        src={photo ? URL.createObjectURL(photo) : data?.logo}
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
            <div className="sm:col-span-2 flex justify-end items-end mt-3">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-50 transition-all duration-300 font-BTitr bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full font-bold"
                >
                    ویرایش اطلاعات منو
                </button>
            </div>
        </form>
    )
}