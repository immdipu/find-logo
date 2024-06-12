import cloudinary from ".";

// async function uploadImage(fileBuffer: Buffer, fileName: string) {
//   return new Promise((resolve, reject) => {
//     const response = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading image:", error);
//           return reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );

//     response.end(fileBuffer);
//   });
// }

async function uploadImage(fileLink: string) {
  try {
    const response = await cloudinary.uploader.upload(fileLink);
    return response;
  } catch (error) {
    console.error("error uploading image", error);
  }
}

export default uploadImage;
