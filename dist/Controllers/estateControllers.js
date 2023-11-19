"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleEstate = exports.createEstate = exports.getEstate = void 0;
const Estate_1 = __importDefault(require("../models/Estate"));
const schemaValidateMessage_1 = require("../utils/schemaValidateMessage");
const getEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const type = req.query.type || null;
        const price = req.query.price;
        const roomFilter = req.query.roomCount;
        const text = req.query.title;
        const query = Object.assign(Object.assign(Object.assign(Object.assign({}, (type && { type })), (price && { price: { $gte: price.minPrice, $lte: price.maxPrice } })), (roomFilter &&
            (roomFilter.includes("5")
                ? { rooms: { $gte: 5, $in: roomFilter } }
                : { rooms: { $in: roomFilter } }))), (text && { street: { $regex: text, $options: "i" } }));
        const estates = yield Estate_1.default.find(query)
            .sort({ createdAt: -1 })
            .limit(+limit)
            .skip((+page - 1) * +limit);
        return res.status(200).json({ data: estates });
    }
    catch (err) {
        next(err);
    }
});
exports.getEstate = getEstate;
const createEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, images, city, street, currentFloor, totalFloor, rooms, area, description, features, type, } = req.body;
        const newEstate = new Estate_1.default({
            title,
            price,
            images,
            city,
            street,
            currentFloor,
            totalFloor,
            rooms,
            area,
            description,
            features,
            type,
        });
        const validateErrors = newEstate.validateSync();
        if (validateErrors) {
            return res.status(500).json((0, schemaValidateMessage_1.schemaValidateMessage)(validateErrors));
        }
        yield Estate_1.default.create(newEstate);
        return res.status(200).json({ message: "Created" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.createEstate = createEstate;
const getSingleEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const estate = yield Estate_1.default.findById(id);
        if (!estate) {
            return res.status(404).json({ message: "Not Found" });
        }
        return res.status(200).json({ data: estate });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleEstate = getSingleEstate;
