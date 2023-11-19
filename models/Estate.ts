import { Schema, model, Document } from "mongoose";
import { EstateTypes } from "../types/types";

interface IEstate extends Document {
  title: string;
  price: number;
  images: string[];
  city: string;
  street: string;
  currentFloor: number;
  totalFloor: number;
  rooms: number;
  area: number;
  description: string;
  features: EstateTypes.EstateFeatures[];
  type: EstateTypes.EstateModelTypes;
}

const EstateSchema = new Schema<IEstate>(
  {
    title: {
      type: String,
      required: [true, "Please Provide Title"],
    },
    price: {
      type: Number,
      required: [true, "Please Provide Price"],
    },
    images: [{ type: String, required: true }],
    city: {
      type: String,
      required: [true, "Please Provide City"],
    },
    street: {
      type: String,
      required: [true, "Please Provide Street"],
    },
    currentFloor: {
      type: Number,
      required: [
        function (this: IEstate) {
          return this.totalFloor !== 0;
        },
        "Please Provide Current Floor",
      ],
    },
    totalFloor: {
      type: Number,
      required: [true, "Please Provide Total Floor"],
      min: 0,
    },
    rooms: {
      type: Number,
      required: [true, "Please Provide Rooms"],
    },
    area: {
      type: Number,
      required: [true, "Please Provide Area"],
    },
    description: {
      type: String,
      required: [true, "Please Provide Description"],
    },
    features: [
      {
        type: String,
        enum: [
          "Security",
          "Parking",
          "Elevator",
          "Garden",
          "Pool",
          "Furniture",
        ],
      },
    ],
    type: {
      type: String,
      enum: [
        "Apartment",
        "House",
        "Office",
        "Land",
        "New Building",
        "Old Building",
      ],
      required: [true, "Please Provide Type"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IEstate>("Estate", EstateSchema);
export { IEstate };
