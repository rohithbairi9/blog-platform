import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import cloudinary from "../config/cloudinary";

export const uploadImage = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await new Promise<any>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "blog-platform",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file!.buffer);
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  }
);