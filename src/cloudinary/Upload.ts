import cloudinary from ".";
import axios from "axios";

async function uploadImage(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const fileBuffer = response.data;
    const mime = response.headers["content-type"];
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mime};${encoding},${base64Data}`;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileUri,
        {
          invalidate: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return uploadResult;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

export default uploadImage;
