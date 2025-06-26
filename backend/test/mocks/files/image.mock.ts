import { Readable } from "stream";

export const mockImageFile: Express.Multer.File = {
      fieldname: "image",
      originalname: "image.png",
      encoding: "",
      mimetype: "",
      size: 0,
      stream: new Readable,
      destination: "",
      filename: "",
      path: "",
      buffer: Buffer.alloc(0)
    }