import uploadImage from "@/cloudinary/Upload";
import { dbConnect } from "@/dbConfig/dbConfig";
import Logo from "@/model/logoSchema";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { json } from "stream/consumers";
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

    const urll =
      "https://img.freepik.com/free-photo/abstract-art-colorful-bright-ink-watercolor-textures-white-paper-background_1150-6597.jpg?t=st=1718244204~exp=1718247804~hmac=cf62633500662cff12353a445c935df2b5c957948db48be09173d4ebd09521a5&w=996";

    const imageUpload = (await uploadImage(urll)) as any;

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
        Error: JSON.stringify(error),
      },
      {
        status: 500,
      }
    );
  }
}
