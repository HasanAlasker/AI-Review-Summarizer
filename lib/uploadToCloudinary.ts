// lib/uploadToCloudinary.ts
export async function uploadToCloudinary(
  file: File
): Promise<{ publicId: string; url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ECommerce");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error(`Upload failed for ${file.name}`);
  }

  const data = await res.json();
  return { publicId: data.public_id, url: data.secure_url };
}