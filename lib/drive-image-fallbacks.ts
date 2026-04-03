/** External fallback URLs when the local `/api/photos/[id]` proxy fails. */
export function buildDriveImageFallbackUrls(
  photoId: string,
  size: string
): string[] {
  return [
    `https://drive.google.com/thumbnail?id=${photoId}&sz=w${size}-h${size}`,
    `https://lh3.googleusercontent.com/d/${photoId}=w${size}`,
    `https://drive.google.com/uc?export=view&id=${photoId}`,
    `https://drive.google.com/uc?id=${photoId}`,
  ]
}
