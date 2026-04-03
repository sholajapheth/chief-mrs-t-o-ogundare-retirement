export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
  size?: string
}

const MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
  "image/avif",
  "image/x-raw",
  "image/cr2",
  "image/dng",
] as const

function buildMimeQuery(): string {
  const explicit = MIME_TYPES.map((m) => `mimeType='${m}'`).join(" or ")
  // Catch-all for other vendor / future image types Google may return
  return `(${explicit} or mimeType contains 'image')`
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
  const isHeic = mimeType?.includes("heic") || mimeType?.includes("heif")

  if (isHeic && thumbnailLink) {
    if (isFullSize) {
      return thumbnailLink.replace(/=s\d+/, "=s1920")
    }
    return thumbnailLink.replace(/=s\d+/, "=s800")
  }

  if (thumbnailLink) {
    if (isFullSize) {
      return thumbnailLink.replace(/=s\d+/, "=s1920")
    }
    return thumbnailLink.replace(/=s\d+/, "=s800")
  }

  if (webContentLink && !isHeic) {
    return webContentLink
  }

  if (isHeic) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`
  }

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

  const folderId = GOOGLE_DRIVE_FOLDER_ID
  const mimeQuery = buildMimeQuery()
  const q = `'${folderId}' in parents and trashed=false and ${mimeQuery}`

  const allFiles: GoogleDriveFile[] = []
  let pageToken: string | undefined

  try {
    do {
      const params = new URLSearchParams({
        q,
        fields:
          "nextPageToken,files(id,name,mimeType,createdTime,thumbnailLink,webContentLink,size)",
        orderBy: "createdTime desc",
        pageSize: "1000",
        supportsAllDrives: "true",
        includeItemsFromAllDrives: "true",
        key: GOOGLE_DRIVE_API_KEY,
      })
      if (pageToken) {
        params.set("pageToken", pageToken)
      }

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?${params.toString()}`
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[google-drive] Google Drive API error:", errorData.error)
        return allFiles.length ? allFiles : []
      }

      const data = await response.json()
      const files = (data.files || []).map((file: Record<string, unknown>) => ({
        id: file.id as string,
        name: file.name as string,
        webViewLink: `https://drive.google.com/file/d/${file.id}/view`,
        thumbnailLink: file.thumbnailLink as string | undefined,
        webContentLink: file.webContentLink as string | undefined,
        mimeType: file.mimeType as string,
        size: file.size as string | undefined,
      }))
      allFiles.push(...files)
      pageToken = data.nextPageToken as string | undefined
    } while (pageToken)

    return allFiles
  } catch (error) {
    console.error("[google-drive] Error fetching Google Drive photos:", error)
    return []
  }
}
