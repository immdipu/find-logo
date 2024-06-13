import cloudinary from ".";

async function uploadImage(fileUri: string) {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileUri,
        {
          invalidate: true,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image 1:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return uploadResult;
  } catch (error) {
    console.error("Error uploading image 2:", error);
  }
}

export default uploadImage;
