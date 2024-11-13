import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';
import axios from 'axios';
import EventSingleCard from '../../components/home/EventSingleCard';

const EventCardPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/events');
        const eventData = response.data; // Adjust based on your API response structure
        setEvents(eventData); // Set initial events to all fetched events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle navigation to the EventDetails page
  const handleEventClick = (eventId) => {
    navigate(`/events/details/${eventId}`); // Change to your EventDetails route
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 bg-cover bg-center">
        {/* Description Section */}
        <div className="mb-8 text-center text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Discover the Beauty of Sri Lankan Handmade Art</h2>
          <p className="text-lg">
            Embark on a journey through the beauty and tradition of Sri Lankan handmade art. Our carefully curated experiences will open the doors to a world where each item tells a story, from the intricate details of finely carved masks to the timeless elegance of handcrafted furniture and sculptures.
            <br /><br />
            Discover how these extraordinary creations come to life, and engage with the artisans who pour their skill and passion into every piece. Whether you're looking to witness their craft in real-time, delve into the rich history behind these works, or connect with others who share your love for fine craftsmanship, our events offer something truly unique.
            <br /><br />
            By attending, you’ll not only experience the heart of Sri Lankan artistry but also enjoy special opportunities to bring these one-of-a-kind treasures into your home. These experiences provide a closer look at the craftsmanship while giving you the chance to support and celebrate our talented artisans.
            <br /><br />
            Don’t miss your opportunity to be a part of these unforgettable experiences, where tradition meets creativity in a space designed to inspire and captivate.
          </p>
        </div>

        {/* Button for View All Events */}
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition duration-300"
            onClick={() => navigate('/events/all')} // Adjust the path to your All Events page
          >
            View All Events
          </button>
        </div>

        {/* Display All Events */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((item) => (
              <div key={item._id} onClick={() => handleEventClick(item._id)}>
                <EventSingleCard event={item} />
              </div>
            ))
          ) : null} {/* Removed "No events available" message */}
        </div>
      </div>
      <Footer />
    </div>
  );
};  

export default EventCardPage;
