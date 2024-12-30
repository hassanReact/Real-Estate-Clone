import { createClient } from "@supabase/supabase-js";


// Function to upload multiple images to Supabase storage
export async function uploadImages(images: File[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Upload all images and return their public URLs
  const data = await Promise.all(
    images.map((file) =>
      supabase.storage.from("propertyImages").upload(`${file.name}_${Date.now()}`, file)
    )
  );

  // Map over the uploaded items and get the public URL for each image
  const urls = data.map(
    (item) =>
      supabase.storage.from("propertyImages").getPublicUrl(item.data?.path ?? "").data.publicUrl
  );

  return urls;
}

// Function to upload a single avatar image to Supabase storage
export async function uploadAvatar(image: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Upload the avatar image
  const data = await supabase.storage.from("avatar").upload(`${image.name}_${Date.now()}`, image);

  // Check if the path exists and get the public URL
  if (data.data?.path) {
    const urlData = await supabase.storage.from("avatar").getPublicUrl(data.data.path);
    return urlData.data.publicUrl;
  } else {
    // Handle the case when the path is undefined
    throw new Error('Failed to upload avatar: Path is undefined');
  }
}
