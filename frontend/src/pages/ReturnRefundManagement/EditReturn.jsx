import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const EditReturn = () => {
  const [pid, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState(""); // To store the existing image URL from backend
  const [uploadImage, setUploadImage] = useState(null); // Handle new file input
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/records/${id}`)
      .then((response) => {
        const data = response.data;
        setID(data.pid);
        setProductName(data.productName);
        setDescription(data.description);
        setCurrentImage(data.uploadImage); // Store the image URL from the server
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.log(error);
      });
  }, [id]);

  // Function to restrict Product Name and Description to English letters only
  const handleTextChange = (e, setter) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Allow only letters (both uppercase and lowercase)
    if (regex.test(value)) {
      setter(value);
    }
  };

  // Function to restrict PID to numbers only
  const handleIDChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/; // Allow only numbers
    if (regex.test(value)) {
      setID(value);
    }
  };

  const handleEditReturn = () => {
    // Validation to ensure all fields are filled
    if (!pid || !productName || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("pid", pid);
    formData.append("productName", productName);
    formData.append("description", description);

    // Append new image file only if it's selected
    if (uploadImage) {
      formData.append("uploadImage", uploadImage);
    }

    setLoading(true);

    axios
      .put(`http://localhost:5555/records/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then(() => {
        setLoading(false);
        navigate("/records");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console for details.");
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
      if (file.size > fileSizeLimit) {
        alert("File size should be less than 5MB");
        return;
      }
      setUploadImage(file);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-[#fff] min-h-screen p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#562d2d] my-4">
          Edit Complain
        </h1>
        {loading && <Spinner />}
        <div className="flex bg-white shadow-md border-2 border-[#b37d4e] rounded-lg w-[700px] p-6 space-x-8">
          {/* Left Column */}
          <div className="flex flex-col w-1/2">
            <div className="my-4">
              <label className="text-lg font-semibold text-[#562d2d]">
                Product ID
              </label>
              <input
                type="text"
                value={pid}
                onChange={handleIDChange} // Validation for numbers only
                className="border-2 border-[#b37d4e] px-4 py-2 w-full rounded-lg"
              />
            </div>

            <div className="my-4">
              <label className="text-lg font-semibold text-[#562d2d]">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => handleTextChange(e, setProductName)} // Validation for letters only
                className="border-2 border-[#b37d4e] px-4 py-2 w-full rounded-lg"
              />
            </div>

            <div className="my-4">
              <label className="text-lg font-semibold text-[#562d2d]">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleFileChange} // Handle file selection
                className="border-2 border-[#b37d4e] px-4 py-2 w-full rounded-lg"
              />
              {/* Show the current image from the server if no new image is selected */}
              {currentImage && !uploadImage && (
                <div className="mt-2">
                  <img
                    src={currentImage}
                    alt="Current"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
              {/* Show the preview of the newly selected image */}
              {uploadImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(uploadImage)}
                    alt="Selected"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2">
            <label className="text-lg font-semibold text-[#562d2d]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => handleTextChange(e, setDescription)} // Validation for letters only
              className="border-2 border-[#b37d4e] px-4 py-2 w-full rounded-lg h-48"
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="bg-[#562d2d] text-white font-bold px-8 py-3 rounded-lg mt-6 w-[200px]"
            onClick={handleEditReturn}
          >
            Save
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditReturn;
