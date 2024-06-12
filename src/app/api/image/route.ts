import uploadImage from "@/cloudinary/Upload";
import { dbConnect } from "@/dbConfig/dbConfig";
import Logo from "@/model/logoSchema";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export const maxDuration = 50;

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { logoUrl, name, domain } = reqBody;

    const logoData = await Logo.findOne({ domain });

    if (logoData) {
      return NextResponse.json({
        status: "error",
        message: "Logo already exists",
      });
    }

    const imageUpload = (await uploadImage(logoUrl)) as any;

    console.log("imageUpload", imageUpload);

    if (!imageUpload) {
      return NextResponse.json({
        status: "error",
        message: "An error occurred while uploading image",
      });
    }

    const newLogo = new Logo({
      name,
      domain,
      logo_url: imageUpload.secure_url,
      public_id: imageUpload.public_id,
    });

    await newLogo.save();

    return NextResponse.json({
      status: "success",
      message: "Image uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching logos",
      },
      {
        status: 500,
      }
    );
  }
}
