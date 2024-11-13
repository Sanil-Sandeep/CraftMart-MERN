import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true 
    },
    category: {
      type: String,
      required: true,
    },
    date: { 
      type: Date,
      required: true,
      validate: {
        validator: function(value) {
          return !isNaN(Date.parse(value)); // Validates the date
        },
        message: props => `${props.value} is not a valid date!`
      }
    },
    time: { 
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return /^([0-1]?[0-9]):([0-5][0-9]) (AM|PM)$/.test(value); 
        },
        message: props => `${props.value} is not a valid time format!`
      }
    },
    description: {
      type: String,
      required: true
    },
    image: { 
      type: String 
    },
    zoomLink: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return /^https:\/\//.test(value); // Validates that the link starts with https://
        },
        message: props => `${props.value} must start with https://`
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
