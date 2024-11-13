import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const EventTable = ({ events }) => {
  return (
    <div>
      <style>
        {`
          .event-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0.5rem;
              background-color: #F1EEDA; /* Background color */
          }

          .table-header {
              border: 1px solid #330D0F; /* Table header border color */
              padding: 0.3rem; /* Smaller padding for header */
              text-align: center;
              background-color: #330D0F; /* Table header background color */
              color: white; /* Table header text color */
          }

          .table-data {
              border: 1px solid #330D0F; /* Table border color */
              padding: 0.3rem; /* Reduced padding for smaller table look */
              text-align: center;
              color: #330D0F; /* Table text color */
          }

          .table-row {
              height: 1.5rem; /* Slightly larger than 1rem for better readability */
          }

          .event-image {
              width: 10rem; /* Medium size width */
              height: 10rem; /* Medium size height */
              object-fit: cover;
              border-radius: 0.3rem; 
          }

          .hidden-md {
              display: none; /* Hide for mobile devices */
          }

          @media (min-width: 768px) {
              .hidden-md {
                  display: table-cell; /* Show for medium and larger devices */
              }
          }

          .actions {
              display: flex;
              justify-content: center;
              gap: 0.5rem;
          }

          /* Applying add-button style to view, edit, and delete buttons */
          .view-button, .edit-button, .delete-button {
              background-color: #330D0F;
              color: #FFFFFF;
              padding: 0.3rem 1rem; /* Adjusted padding to make buttons smaller */
              border: none;
              border-radius: 0.5rem;
              cursor: pointer;
              transition: background-color 0.3s ease;
          }

          .view-button:hover, .edit-button:hover, .delete-button:hover {
              background-color: #218838; /* Hover effect */
          }

          .zoom-link {
              color: #0066CC;
              text-decoration: underline;
              cursor: pointer;
          }
        `}
      </style>
      <table className='event-table'>
        <thead>
          <tr>
            <th className='table-header'>No</th>
            <th className='table-header'>Title</th>
            <th className='table-header hidden-md'>Category</th>
            <th className='table-header hidden-md'>Date</th>
            <th className='table-header hidden-md'>Time</th>
            <th className='table-header hidden-md'>Description</th>
            <th className='table-header'>Image</th> {/* Image Column Header */}
            <th className='table-header hidden-md'>Zoom Link</th> {/* New Zoom Link Column Header */}
            <th className='table-header'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id} className='table-row'>
              <td className='table-data'>
                {index + 1}
              </td>
              <td className='table-data'>
                {event.title}
              </td>
              <td className='table-data hidden-md'>
                {event.category}
              </td>
              <td className='table-data hidden-md'>
                {new Date(event.date).toLocaleDateString()} {/* Formatted Date */}
              </td>
              <td className='table-data hidden-md'>
                {event.time}
              </td>
              <td className='table-data hidden-md'>
                {event.description}
              </td>
              <td className='table-data'>
                {event.image ? (
                  <img
                    src={`http://localhost:5555${event.image}`}
                    alt={event.title}
                    className='event-image'
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>

              <td className='table-data hidden-md'>
                {event.zoomLink ? (
                  <a href={event.zoomLink} target="_blank" rel="noopener noreferrer" className='zoom-link'>
                    Join Zoom
                  </a>
                ) : (
                  <p>No Zoom Link</p>
                )}
              </td>

              <td className='table-data'>
                <div className='actions'>
                  <Link to={`/events/details/${event._id}`}>
                    <button className='view-button'>
                      <BsInfoCircle className='text-2xl text-green-800' />
                      View
                    </button>
                  </Link>
                  <Link to={`/events/edit/${event._id}`}>
                    <button className='edit-button'>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                      Edit
                    </button>
                  </Link>
                  <Link to={`/events/delete/${event._id}`}>
                    <button className='delete-button'>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                      Delete
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
