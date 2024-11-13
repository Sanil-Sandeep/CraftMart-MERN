import React from 'react';
import { Link } from 'react-router-dom';


const EventSingleCard = ({ event }) => {
  return (
    
    <div className="flex flex-col items-center justify-center">
      


      <div className="border border-gray-300 rounded-lg p-4 m-2 relative hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-md">
        {/* Link to eventDetailsPage */}
        <Link to={`/events/details/${event._id}`}>
          {/* Event Image */}
          <img
            src={`http://localhost:5555${event.image}`}
            alt={event.eventTitle}
            className="w-full h-48 object-cover rounded-md mb-2" // Increased height for the image
          />

          {/* Event Name */}
          <h3 className="text-lg font-medium text-gray-700">{event.eventTitle}</h3>
        </Link>

        {/* Button to show the details */}
        <Link to={`/events/details/${event._id}`}>
          <button className="mt-2 px-4 py-2 bg-[#330D0F] text-white rounded-md">
            View Details
          </button>
        </Link>
      </div>
    </div>
    
  );
};

export default EventSingleCard;
