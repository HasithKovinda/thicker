"use server";

import { v2 as cloudinary } from "cloudinary";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export async function uploadImage(
  baseString: string,
  fileName: string
): Promise<string> {
  if (!CLOUD_NAME || !API_KEY || API_SECRET) {
    throw new Error("Please setup env values");
  }

  type CloudinaryUploadResult = {
    url: string;
    secure_url: string;
  };
  const arrayBuffer = Buffer.from(baseString, "base64").buffer;

  const blob = new Blob([arrayBuffer]);

  const file = new File([blob], fileName);

  const arrayBufferTwo = await (file as Blob).arrayBuffer();

  const buffer = new Uint8Array(arrayBufferTwo);
  try {
    const photo: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["user-profile-image"],
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result!);
            }
          )
          .end(buffer);
      }
    );
    const data = photo.url;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot upload the image!");
  }
}
