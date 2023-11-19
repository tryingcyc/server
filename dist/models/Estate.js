"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EstateSchema = new mongoose_1.Schema({
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
            function () {
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Estate", EstateSchema);
