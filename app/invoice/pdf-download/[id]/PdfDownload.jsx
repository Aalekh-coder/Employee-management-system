"use client";
import InvoicePdfTemplate from "@/components/pdf/InvoicePdfTemplate";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const PdfDownload = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);

  // async function name(params) {
    
  // }

  // useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <div className="animate-pulse">loading...</div>
      ) : (
        <div style={{ width: "80vw", height: "100vh", overflow: "hidden" }}>
          <PDFViewer
            style={{ height: "100%", width: "90%", overflow: "hidden" }}
          >
            <InvoicePdfTemplate />
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default PdfDownload;
