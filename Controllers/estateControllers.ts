import { Request, Response, NextFunction } from "express";
import Estate, { IEstate } from "../models/Estate";
import { schemaValidateMessage } from "../utils/schemaValidateMessage";
import { FilterQuery } from "mongoose";
const getEstate = async (req: Request, res: Response, next: NextFunction) => {
  interface PriceRange {
    minPrice: number;
    maxPrice: number;
  }

  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const type = req.query.type || null;
    const price: PriceRange | undefined = req.query.price as
      | PriceRange
      | undefined;
    const roomFilter = req.query.roomCount as string[] | undefined;
    const text = req.query.title;

    const query: FilterQuery<IEstate> = {
      ...(type && { type }),
      ...(price && { price: { $gte: price.minPrice, $lte: price.maxPrice } }),
      ...(roomFilter &&
        (roomFilter.includes("5")
          ? { rooms: { $gte: 5, $in: roomFilter } }
          : { rooms: { $in: roomFilter } })),
      ...(text && { street: { $regex: text, $options: "i" } }),
    };
    
    const estates = await Estate.find(query)
      .sort({ createdAt: -1 })
      .limit(+limit)
      .skip((+page - 1) * +limit);

    return res.status(200).json({ data: estates });
  } catch (err) {
    next(err);
  }
};

const createEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
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
    } = req.body;

    const newEstate = new Estate({
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
      return res.status(500).json(schemaValidateMessage(validateErrors));
    }

    await Estate.create(newEstate);
    return res.status(200).json({ message: "Created" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

const getSingleEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const estate = await Estate.findById(id);

    if (!estate) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res.status(200).json({ data: estate });
  } catch (err) {
    next(err);
  }
};

export { getEstate, createEstate, getSingleEstate };
