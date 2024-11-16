import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PDF() {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    if (!input) return;

    html2canvas(input, { useCORS: true, allowTaint: false })
      .then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4", true);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Maintain aspect ratio
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(
          imgData,
          "JPEG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("Refund_Details.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", fontWeight: "bold" }}>
        PDF Viewer
      </h1>
      <iframe
        title="PDF Viewer"
        width="100%"
        height="600"
        src="https://docs.google.com/gview?url=https://example.com/document.pdf&embedded=true"
      />
      <div
        className="container mt-5 border p-5"
        ref={pdfRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          color: "#333",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <div
          className="row mb-4"
          style={{ borderBottom: "2px solid #007bff", paddingBottom: "20px" }}
        >
          <div
            className="col-md-6"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={
                "https://res.cloudinary.com/demo/image/upload/v12345678/sample.jpg"
              }
              alt="Refund Logo"
              height={80}
              width={80}
              crossOrigin="anonymous"
              style={{ borderRadius: "50%" }}
            />
            <h2
              style={{
                marginLeft: "15px",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Refund Details
            </h2>
          </div>
          <div className="col-md-6 text-end">
            <h2 style={{ color: "#007bff", fontWeight: "bold" }}>
              Transaction Summary
            </h2>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="row mb-4" style={{ lineHeight: "1.8", color: "#555" }}>
          <div className="col">
            <p>
              <strong>Refund ID:</strong> 12345
            </p>
            <p>
              <strong>Product Name:</strong> Awesome Product
            </p>
            <p>
              <strong>Amount:</strong> $200
            </p>
            <p>
              <strong>Date:</strong> September 25, 2023
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className="row"
          style={{ borderTop: "2px solid #007bff", paddingTop: "20px" }}
        >
          <div className="col-md-6">
            <p style={{ color: "#888", fontStyle: "italic" }}>
              Thank you for your business!
            </p>
          </div>
          <div className="col-md-6 text-end">
            <p style={{ fontSize: "12px", color: "#888" }}>
              For any issues, contact{" "}
              <a href="mailto:support@example.com" style={{ color: "#007bff" }}>
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="row text-center mt-5">
        <button
          className="btn btn-primary"
          onClick={downloadPDF}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
