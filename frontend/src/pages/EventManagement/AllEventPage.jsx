import React, { useEffect, useState } from "react";
import axios from "axios";
import EventSingleCard from "../../components/home/EventSingleCard"; 
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5555/events");
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen"> {/* Added flex container */}
      <Header />
      <div className="flex-grow p-4"> {/* Allow content to grow */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          {events.length > 0 ? (
            events.map((event) => (
              <EventSingleCard key={event._id} event={event} />
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllEventsPage;