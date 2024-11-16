import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const ReturnDashboard = () => {
  const [records, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/records");
        console.log(response.data); // Log the response for debugging
        setReturns(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#F5F2E6]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#4D2A24]">
              Return & Refund Management
            </h1>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Link
              to="/records/create"
              className="bg-[#4D2A24] text-white px-4 py-2 rounded-md hover:bg-[#703A2E] transition"
            >
              Add New Return
            </Link>

            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6B097]"
            />
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : (
            <div className="flex justify-center">
              <table className="w-3/4 border border-collapse shadow-md">
                <thead>
                  <tr>
                    <th className="border border-[#4D2A24] p-2">Payment ID</th>
                    <th className="border border-[#4D2A24] p-2">
                      Product Name
                    </th>
                    <th className="border border-[#4D2A24] p-2">Image</th>
                    <th className="border border-[#4D2A24] p-2">Description</th>
                    <th className="border border-[#4D2A24] p-2">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {records
                    .filter((record) => {
                      return search.toLowerCase() === ""
                        ? true
                        : record.pid
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                            record.productName
                              ?.toLowerCase()
                              .includes(search.toLowerCase()) ||
                            record.description
                              ?.toLowerCase()
                              .includes(search.toLowerCase());
                    })
                    .map((Record, index) => (
                      <tr
                        key={Record._id}
                        className={`${
                          index % 2 === 0 ? "bg-[#E1D5C0]" : "bg-[#F5F2E6]"
                        }`}
                      >
                        <td className="border border-[#4D2A24] p-2 text-center">
                          {Record.pid}
                        </td>
                        <td className="border border-[#4D2A24] p-2 text-center">
                          {Record.productName}
                        </td>
                        <td className="border border-[#4D2A24] p-2 text-center">
                          {Record.uploadImage ? (
                            <img
                              src={Record.uploadImage} // Use the Cloudinary URL directly
                              alt={Record.productName || "Product Image"}
                              className="h-16 w-16 object-cover rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "fallback-image-url.png"; // Fallback image
                              }}
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-300 rounded-md flex items-center justify-center">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="border border-[#4D2A24] p-2 text-center">
                          {Record.description}
                        </td>
                        <td className="border border-[#4D2A24] p-2 text-center">
                          <div className="flex justify-center gap-x-6">
                            <Link to={`/records/details/${Record._id}`}>
                              <BsInfoCircle className="text-3xl text-green-600 hover:text-green-800 transition-colors duration-300" />
                            </Link>
                            <Link to={`/records/edit/${Record._id}`}>
                              <AiOutlineEdit className="text-3xl text-yellow-500 hover:text-yellow-700 transition-colors duration-300" />
                            </Link>
                            <Link to={`/records/delete/${Record._id}`}>
                              <MdOutlineDelete className="text-3xl text-red-600 hover:text-red-800 transition-colors duration-300" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReturnDashboard;
