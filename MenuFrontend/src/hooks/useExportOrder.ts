import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export const useExportOrder = (elementId : any, fileName = "order-list") =>{

    const downloadPDF = useCallback(async () => {
        try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error("Element not found:", elementId);
            return;
        }

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4"); // portrait, millimeters, A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${fileName}-${Date.now()}.pdf`);
        } catch (error) {
        console.error("Error generating PDF:", error);
        }
    }, [elementId, fileName]);


    const shareOrder = useCallback(async () => {
        try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error("Element not found:", elementId);
            return;
        }

        const canvas = await html2canvas(element, { scale: 2 });
        const blob : any = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
        );

        const file = new File([blob], `${fileName}-${Date.now()}.png`, { type: "image/png" });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({
            files: [file],
            title: "لیست سفارش من",
            text: "این سفارش رو برات می‌فرستم.",
            });
        } else {
            alert("مرورگر شما از اشتراک‌گذاری مستقیم پشتیبانی نمی‌کند.");
        }
        } catch (error) {
        console.error("Error sharing:", error);
        }
    }, [elementId, fileName]);
return { downloadPDF , shareOrder};

}