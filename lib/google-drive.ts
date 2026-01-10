export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
}

// Remove leading slash if present
const rawFolderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || ""
export const GOOGLE_DRIVE_FOLDER_ID = rawFolderId.startsWith("/") ? rawFolderId.slice(1) : rawFolderId
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
    return (data.files || []).map((file: any) => {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'google-drive.ts:89',message:'Google Drive file data',data:{id:file.id,name:file.name,mimeType:file.mimeType,hasThumbnailLink:!!file.thumbnailLink,hasWebContentLink:!!file.webContentLink},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      return {
        id: file.id,
        name: file.name,
        webViewLink: `https://drive.google.com/file/d/${file.id}/view`,
        thumbnailLink: file.thumbnailLink,
        webContentLink: file.webContentLink,
        mimeType: file.mimeType,
      }
    })
  } catch (error) {
    console.error("[v0] Error fetching Google Drive photos:", error)
    return []
  }
}
