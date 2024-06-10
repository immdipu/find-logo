import cloudinary from ".";

async function uploadImage(fileLink: string) {
  try {
    const response = await cloudinary.uploader.upload(fileLink);
    console.log("upload image", response);
    return response;
  } catch (error) {
    console.error("error uploading image", error);
  }
}

export default uploadImage;
