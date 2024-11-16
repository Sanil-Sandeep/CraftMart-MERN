import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const CreateReturns = () => {
  const [pid, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to restrict Product Name and Description to English letters only
  const handleTextChange = (e, setter) => {
    const value = e.target.value;
    // Allow only letters (both uppercase and lowercase)
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  // Function to restrict PID to numbers only
  const handleIDChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setID(value);
    }
  };

  const handleSaveReturn = () => {
    // Basic validation before submitting
    if (!pid || !productName || !description || !uploadImage) {
      alert("Please fill in all fields including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("pid", pid);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("uploadImage", uploadImage);

    setLoading(true);

    axios
      .post("http://localhost:5555/records", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);
        navigate("/records");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console for details.");
        console.error(error);
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
      <div className="p-4 bg-[#fff] min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4 text-[#4a2c2a]">Add Complain</h1>
        {loading && <Spinner />}
        <div className="bg-white shadow-lg border-2 border-[#5a2b2b] rounded-xl w-[800px] p-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col space-y-4 w-1/2">
              <div>
                <label className="text-lg text-[#4a2c2a]">Product ID</label>
                <input
                  type="text"
                  value={pid}
                  onChange={handleIDChange} // Validation for numbers only
                  className="border-2 border-[#b4b4b4] px-4 py-2 w-full rounded-md"
                />
              </div>

              <div>
                <label className="text-lg text-[#4a2c2a]">Upload Image</label>
                <input
                  type="file"
                  onChange={handleFileChange} // File validation handled here
                  className="border-2 border-[#b4b4b4] px-4 py-2 w-full rounded-md"
                />
              </div>

              <div>
                <label className="text-lg text-[#4a2c2a]">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => handleTextChange(e, setProductName)} // Validation for letters only
                  className="border-2 border-[#b4b4b4] px-4 py-2 w-full rounded-md"
                />
              </div>
            </div>

            <div className="w-1/2 pl-6">
              <label className="text-lg text-[#4a2c2a]">Description</label>
              <textarea
                value={description}
                onChange={(e) => handleTextChange(e, setDescription)} // Validation for letters only
                className="border-2 border-[#b4b4b4] px-4 py-2 w-full h-40 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="bg-[#5a2b2b] text-white font-bold px-6 py-2 rounded-md w-full max-w-[200px]"
              onClick={handleSaveReturn}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateReturns;
