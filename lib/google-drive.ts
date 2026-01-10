export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  mimeType: string
}

export const GOOGLE_DRIVE_FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || ""
export const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY || ""

export function getGoogleDriveImageUrl(fileId: string): string {
  // Direct access URL for publicly shared files
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

export async function listGoogleDrivePhotos(): Promise<GoogleDriveFile[]> {
  if (!GOOGLE_DRIVE_FOLDER_ID) {
    console.warn("NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID is not set")
    return []
  }

  if (!GOOGLE_DRIVE_API_KEY) {
    console.warn("GOOGLE_DRIVE_API_KEY is not set")
    return []
  }

  try {
    const folderId = GOOGLE_DRIVE_FOLDER_ID
    const url = new URL("https://www.googleapis.com/drive/v3/files")

    url.searchParams.append("q", `'${folderId}' in parents and trashed=false and mimeType contains 'image'`)
    url.searchParams.append("fields", "files(id,name,mimeType,createdTime)")
    url.searchParams.append("pageSize", "100")
    url.searchParams.append("orderBy", "createdTime desc")
    url.searchParams.append("key", GOOGLE_DRIVE_API_KEY)

    const response = await fetch(url.toString())

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Google Drive API error:", errorData.error)
      return []
    }

    const data = await response.json()
    return (data.files || []).map((file: any) => ({
      id: file.id,
      name: file.name,
      webViewLink: `https://drive.google.com/file/d/${file.id}/view`,
      mimeType: file.mimeType,
    }))
  } catch (error) {
    console.error("[v0] Error fetching Google Drive photos:", error)
    return []
  }
}
