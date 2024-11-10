import mongoose from "mongoose";

const cChatSchema = mongoose.Schema(
    {
        cMessage: {
            type: String,
            required: true,
        },
        cReply: {
            type: String,
            
        }
    },
    {
        timestamps: true,
    }
);

export const CChat = mongoose.model('CChat', cChatSchema);