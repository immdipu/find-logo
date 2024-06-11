import cloudinary from ".";

async function uploadImage(fileBuffer: Buffer, fileName: string) {
  return new Promise((resolve, reject) => {
    const response = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
          return reject(error);
        } else {
          resolve(result);
        }
      }
    );

    response.end(fileBuffer);
  });
}

export default uploadImage;
