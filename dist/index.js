"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const estateRoutes_1 = __importDefault(require("./Routes/estateRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 500);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use("/api/estates", estateRoutes_1.default);
const MONGO_URI = process.env.MONGO_URI || "";
const port = process.env.PORT || 3500;
app.listen(port, () => {
    mongoose_1.default.connect(MONGO_URI).then(() => {
        console.log("Connected to DB");
    });
});
