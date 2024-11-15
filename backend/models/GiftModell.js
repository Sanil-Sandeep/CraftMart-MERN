import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique ID generation

const GiftSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        b_price: { // Use 'b_price' instead of 'price'
            type: Number,
            required: true,
        },
        productID: {
            type: String,
            unique: true,
            default: uuidv4, // Automatically generate a unique productID using UUID
        },
        image: { type: String },
        final_price: {
            type: Number,
        },
        percentage: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Gift = mongoose.model('Gift', GiftSchema);
