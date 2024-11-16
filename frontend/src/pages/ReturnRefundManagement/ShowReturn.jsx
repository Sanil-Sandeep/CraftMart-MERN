import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const ShowReturn = () => {
  const [records, setReturn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/records/${id}`);
        console.log(response.data);
        setReturn(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load return details. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Add Business Name
    doc.setFontSize(24);
    doc.setFont("Poppins", "bold");
    doc.text("CraftMart", 14, 22);
  
    // Add report title
    doc.setFontSize(18);
    doc.setFont("Poppins", "bold");
    doc.text("Refund Details Report", 14, 32);
  
    // Add report generation date
    const reportDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setFont("Poppins", "normal");
    doc.text(`Date: ${reportDate}`, 14, 42);
  
    // Add a line break before the details section
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(10, 45, 200, 45);
  
    // Details of the refund
    const refundDetails = [
      ["Refund ID", records._id],
      ["Product ID", records.pid],
      ["Product Name", records.productName],
      ["Description", records.description],
      ["Create Time", new Date(records.createdAt).toLocaleString()],
      ["Last Update Time", new Date(records.updatedAt).toLocaleString()],
    ];
  
    // Add the refund details to the PDF using autoTable
    doc.autoTable({
      startY: 50,
      head: [["Field", "Details"]],
      body: refundDetails,
      theme: "grid",
      headStyles: {
        fillColor: "#330D0F",
        textColor: "#FFFFFF",
        font: "Poppins",
        fontSize: 12,
      },
      bodyStyles: {
        font: "Poppins",
        fontSize: 10,
      },
      margin: { left: 10, right: 10 },
      columnStyles: {
        0: { cellWidth: 50, halign: "left" }, // Field column
        1: { cellWidth: 140, halign: "left" }, // Details column
      },
    });
  
    // Add image if available
    if (records.uploadImage) {
      const img = new Image();
      img.src = records.uploadImage;
  
      img.onload = function () {
        const imgWidth = 50; // Fixed width
        const imgHeight = 50; // Fixed height
        const imgX = 14;
        const imgY = doc.previousAutoTable.finalY + 10; // Place image after the table
        doc.addImage(img, "JPEG", imgX, imgY, imgWidth, imgHeight);
  
        // Save the PDF after the image has been added
        doc.save("Refund_Details_Report.pdf");
      };
    } else {
      // Save the PDF if there's no image to add
      doc.save("Refund_Details_Report.pdf");
    }
  };  

  return (
    <div>
      <Header />
      <div className="p-4 bg-[#fff] min-h-screen">
        <h1 className="text-3xl my-4 text-[#5e362e] font-bold">Show Return</h1>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <div
              ref={pdfRef}
              className="flex flex-col bg-[#fffaf4] border-2 border-[#5e362e] rounded-xl w-[60%] p-8 shadow-md mx-auto"
            >
              {/* New Heading for Refund Details */}
              <h2 className="text-2xl text-center font-bold text-[#5e362e] mb-6">
                Refund Details
              </h2>

              {/* Container Content */}
              <div className="flex flex-row">
                {/* Left Side - Text Fields */}
                <div className="w-2/3 pr-8">
                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      ID:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {records._id}
                    </span>
                  </div>

                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      PID:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {records.pid}
                    </span>
                  </div>

                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      Product Name:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {records.productName}
                    </span>
                  </div>

                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      Description:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {records.description}
                    </span>
                  </div>

                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      Create Time:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {new Date(records.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="m-4 flex items-center">
                    <span className="text-xl font-medium text-[#7a7a7a] mr-4">
                      Last Update Time:
                    </span>
                    <span className="text-lg text-[#5e362e]">
                      {new Date(records.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-1/3 flex justify-center items-center">
                  {records.uploadImage ? (
                    <img
                      src={records.uploadImage} // Use Cloudinary URL directly
                      alt="Product"
                      className="h-48 w-48 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = "fallback-image-url.png"; // Set a fallback image if needed
                      }}
                    />
                  ) : (
                    <span className="text-lg text-[#5e362e]">
                      No Image Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={downloadPDF}
                className="bg-[#5e362e] text-white py-2 px-4 rounded-full hover:bg-[#3e241e] transition duration-300"
              >
                Download PDF
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShowReturn;
