import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

type CloudinaryUploadResult = {
  url: string;
  secure_url: string;
};

export async function POST(request: Request) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json({ error: "env not set" }, { status: 500 });
  }
  const data = await request.formData();
  const image = data.get("image");
  if (!image || !(image instanceof File))
    return NextResponse.json({ error: "Bad Request" }, { status: 404 });
  const fileBuffer = await image.arrayBuffer();
  const type = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = "data:" + type + ";" + encoding + "," + base64Data;

  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      const result = cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };
  const result = (await uploadToCloudinary()) as CloudinaryUploadResult;
  return NextResponse.json({ url: result.url }, { status: 201 });
}
