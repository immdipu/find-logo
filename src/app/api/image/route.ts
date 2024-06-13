import uploadImage from "@/cloudinary/Upload";
import { dbConnect } from "@/dbConfig/dbConfig";
import Logo from "@/model/logoSchema";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 50;

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const formdata = await request.formData();

    if (!formdata) {
      return NextResponse.json({
        status: "error",
        message: "No form data found",
      });
    }

    const logoData = await Logo.findOne({ domain: formdata.get("domain") });

    if (logoData) {
      return NextResponse.json({
        status: "error",
        message: "Logo already exists",
      });
    }

    const image: any = await formdata.get("file");

    console.log("image", image);

    if (!image) {
      return NextResponse.json({
        status: "error",
        message: "No image found",
      });
    }

    const fileBuffer = await image.arrayBuffer();
    console.log("fileBuffer", fileBuffer);
    var mime = image.type;
    var encoding = "base64";
    var base64Data = Buffer.from(fileBuffer).toString("base64");
    var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    const imageUpload: any = await uploadImage(fileUri);

    if (!imageUpload) {
      return NextResponse.json({
        status: "error",
        message: "An error occurred while uploading image",
      });
    }

    console.log("imageUpload", imageUpload);

    const newLogo = new Logo({
      name: formdata.get("name"),
      domain: formdata.get("domain"),
      logo_url: imageUpload.secure_url,
      public_id: imageUpload.public_id,
    });

    await newLogo.save();

    return NextResponse.json({
      status: "success",
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image 3:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching logos",
        Error: JSON.stringify(error),
      },
      {
        status: 500,
      }
    );
  }
}
