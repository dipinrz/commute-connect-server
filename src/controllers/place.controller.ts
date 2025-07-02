import { Request, Response } from "express";
import { createPlace, getAllPlaces } from "../services/place.service";

export const addPlaceController = async (req: any, res: any) => {
  try {
    const { place } = req.body;

    if (!place || place.trim() === "") {
      return res.status(400).json({ message: "Place name is required" });
    }

    const newPlace = await createPlace(place.trim());

    return res.status(201).json({ message: "Place created", data: newPlace });
  } catch (error) {
    console.error("Error adding place:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getPlacesController = async (req: any, res: any) => {
  try {
    const places = await getAllPlaces();
    return res.status(200).json({ data: places });
  } catch (error) {
    console.error("Error fetching places:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};