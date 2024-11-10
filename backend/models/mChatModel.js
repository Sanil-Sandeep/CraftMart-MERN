import mongoose from "mongoose";

const mChatSchema = mongoose.Schema(
    {
        mMessage: {
            type: String,
            required: true,
        },
        mReply: {
            type: String,
            
        }
    },
    {
        timestamps: true,
    }
);

export const MChat = mongoose.model('MChat', mChatSchema);