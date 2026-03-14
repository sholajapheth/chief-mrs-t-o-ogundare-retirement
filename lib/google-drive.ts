export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
}

function normalizeFolderId(input: string): string {
  const trimmed = input.trim().replace(/^["']|["']$/g, "")
  if (!trimmed) return ""

  const folderPathMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/)
  if (folderPathMatch?.[1]) return folderPathMatch[1]

  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idParamMatch?.[1]) return idParamMatch[1]

  const tokenMatch = trimmed.match(/[a-zA-Z0-9_-]{20,}/)
  if (tokenMatch?.[0]) return tokenMatch[0]

  return trimmed
}

const rawFolderId =
  process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID ||
  process.env.GOOGLE_DRIVE_FOLDER_ID ||
  ""
export const GOOGLE_DRIVE_FOLDER_ID = normalizeFolderId(rawFolderId)
export const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY || ""

export function getGoogleDriveImageUrl(
  fileId: string, 
  mimeType?: string,
  thumbnailLink?: string, 
  webContentLink?: string,
  isFullSize: boolean = false
): string {
  const isHeic = mimeType?.includes('heic') || mimeType?.includes('heif')
  
  // For HEIC files, always use thumbnailLink (Google Drive converts them automatically)
  if (isHeic && thumbnailLink) {
    if (isFullSize) {
      // For full-size HEIC, use larger thumbnail (max 1920px)
      return thumbnailLink.replace(/=s\d+/, "=s1920")
    }
    // For thumbnails, use 800px
    return thumbnailLink.replace(/=s\d+/, "=s800")
  }
  
  // Prefer thumbnailLink for thumbnails (faster, smaller)
  if (thumbnailLink) {
    if (isFullSize) {
      return thumbnailLink.replace(/=s\d+/, "=s1920") // Larger size for full view
    }
    return thumbnailLink.replace(/=s\d+/, "=s800") // Resize to 800px for better quality
  }
  
  // Use webContentLink if available (direct download link)
  if (webContentLink && !isHeic) {
    return webContentLink
  }
  
  // For HEIC files without thumbnailLink, use Google Drive's viewer (converts to viewable format)
  if (isHeic) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`
  }
  
  // Fallback to direct access URL for publicly shared files
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

    // Query includes all image types including HEIC/HEIF, JPG/JPEG
    url.searchParams.append("q", `'${folderId}' in parents and trashed=false and (mimeType contains 'image' or mimeType='image/heic' or mimeType='image/heif' or mimeType='image/jpeg' or mimeType='image/jpg')`)
    url.searchParams.append("fields", "files(id,name,mimeType,createdTime,thumbnailLink,webContentLink)")
    url.searchParams.append("pageSize", "100")
    url.searchParams.append("orderBy", "createdTime desc")
    url.searchParams.append("key", GOOGLE_DRIVE_API_KEY)
    url.searchParams.append("supportsAllDrives", "true")
    url.searchParams.append("includeItemsFromAllDrives", "true")

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
        thumbnailLink: file.thumbnailLink,
        webContentLink: file.webContentLink,
        mimeType: file.mimeType,
      }))
  } catch (error) {
    console.error("[v0] Error fetching Google Drive photos:", error)
    return []
  }
}
