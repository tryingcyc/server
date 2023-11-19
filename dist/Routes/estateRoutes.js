"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estateControllers_1 = require("../Controllers/estateControllers");
const router = (0, express_1.Router)();
router.get("/", estateControllers_1.getEstate);
router.get("/get-single-estate", estateControllers_1.getSingleEstate);
router.post("/", estateControllers_1.createEstate);
exports.default = router;
