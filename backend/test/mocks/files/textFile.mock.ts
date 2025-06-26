import { Readable } from "stream";

export const mockTextFile: Express.Multer.File = {
      fieldname: "text",
      originalname: "text.txt",
      encoding: "",
      mimetype: "",
      size: 0,
      stream: new Readable,
      destination: "",
      filename: "",
      path: "",
      buffer: Buffer.alloc(0)
    }