import cloudinary from ".";

async function uploadImage(fileLink: string) {
  try {
    const response = await cloudinary.uploader.upload(fileLink);
    return response;
  } catch (error) {
    console.error("error uploading image", error);
  }
}

export default uploadImage;
