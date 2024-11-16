import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const DeleteReturn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteReturn = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this return?"
    );
    if (!confirmDelete) return; // Exit if user cancels

    setLoading(true);
    axios
      .delete(`http://localhost:5555/records/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/records"); // Redirect to homepage after successful deletion
      })
      .catch((error) => {
        setLoading(false);
        const message =
          error.response?.data?.message || "An unexpected error occurred.";
        alert(message); // More specific error message
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff]">
        <h1 className="text-3xl font-bold mb-8">Delete Return</h1>
        {loading && <Spinner />} {/* Display spinner during loading */}
        <div className="flex flex-col items-center bg-[#f7f1e3] rounded-2xl shadow-lg p-8 w-[600px] mx-auto">
          <h3 className="text-2xl font-semibold text-[#5b3924] mb-6">
            Are you sure you want to delete this return?
          </h3>
          <button
            className="w-full bg-[#5b3924] text-white text-lg py-4 rounded-lg mb-4 hover:bg-[#3e291b] transition duration-300"
            onClick={handleDeleteReturn}
          >
            Yes, Delete It
          </button>
          <button
            className="w-full bg-[#efe0c7] text-[#5b3924] text-lg py-4 rounded-lg border-2 border-[#5b3924] hover:bg-[#e0d4b8] transition duration-300"
            onClick={() => navigate(-1)} // Go back to the previous page when user cancels
          >
            No
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteReturn;
