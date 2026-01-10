// This client reads from a publicly shared Google Drive folder

export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  mimeType: string
}

export const GOOGLE_DRIVE_FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || ""

export function getGoogleDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

export async function listGoogleDrivePhotos(): Promise<GoogleDriveFile[]> {
  if (!GOOGLE_DRIVE_FOLDER_ID) {
    console.warn("NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID is not set")
    return []
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,webViewLink,thumbnailLink,mimeType)&pageSize=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_DRIVE_API_KEY || ""}`,
        },
      },
    )

    if (!response.ok) {
      // If API fails, return empty array - photos can be manually added
      console.warn("Failed to fetch Google Drive photos")
      return []
    }

    const data = await response.json()
    return data.files || []
  } catch (error) {
    console.error("Error fetching Google Drive photos:", error)
    return []
  }
}
