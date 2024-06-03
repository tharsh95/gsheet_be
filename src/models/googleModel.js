import mongoose from "mongoose";

const sheetSchema = mongoose.Schema(
    {
        sheetId:{
            type:String,
            required:true
        },
        sheetName:{
            type:String,
            required:true
        },
    }
)
const googleSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    sheetDetails:[sheetSchema]
  },
  {
    timestamps: true,
  }
);

export const Google = mongoose.model("Google",googleSchema )