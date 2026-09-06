export interface CloudinaryConfig {
  cloudName: string;
  apiKey?: string;
  apiSecret?: string;
  uploadPreset?: string;
}

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
}

/**
 * Uploads an image file or blob to Cloudinary.
 * Compatible with Cloudflare Workers (uses standard Web Crypto API and fetch, no heavy Node SDK needed).
 */
export async function uploadToCloudinary(
  file: File | Blob,
  config: CloudinaryConfig
): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret, uploadPreset } = config;

  if (!cloudName) {
    throw new Error(
      "Cloudinary is not configured: CLOUDINARY_CLOUD_NAME is required."
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  // If API key and secret are provided, perform a secure signed upload
  if (apiKey && apiSecret) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "opentalk_blogs";

    // Cloudinary signature parameters must be sorted alphabetically
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

    // Compute SHA-1 using standard Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);
  } else if (uploadPreset) {
    // Unsigned upload with an upload preset
    formData.append("upload_preset", uploadPreset);
  } else {
    throw new Error(
      "Cloudinary credentials missing: Provide either (CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET) or CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const resJson = (await response.json()) as any;

  if (!response.ok || resJson.error) {
    const message =
      resJson.error?.message ||
      `Cloudinary upload failed with status ${response.status}`;
    throw new Error(message);
  }

  return {
    url: resJson.secure_url || resJson.url,
    public_id: resJson.public_id,
  };
}
