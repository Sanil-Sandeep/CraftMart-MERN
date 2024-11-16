import mongoose from "mongoose";

const recordSchema = mongoose.Schema(
    {
        pid: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        uploadImage: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

export const Record = mongoose.model('Cat', recordSchema);