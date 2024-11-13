import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/events/${id}`);
        if (typeof response.data === "object" && response.data !== null) {
          setEvent(response.data);
        } else {
          throw new Error("Event data is not valid");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Event not found");
        } else {
          setError("An error occurred while fetching the event");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  if (!event || !event.title || !event.image || !event.category || !event.date || !event.time || !event.description) {
    return <div className="text-red-500 text-center mt-8">Invalid event data</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="event-details-container">
          <div className="event-image-container">
            {event.image ? (
              <img
                src={`http://localhost:5555/uploads/${event.image}`}
                alt={event.title}
                className="event-image"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="event-info-container">
            <h1 className="title">{event.title}</h1>
            <p className="category">{event.category}</p>
            <p className="date">{event.date}</p>
            <p className="time">{event.time}</p>
            <p className="description">{event.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
