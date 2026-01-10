import { GOOGLE_DRIVE_API_KEY } from "@/lib/google-drive"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fileId = id
    const searchParams = new URL(request.url).searchParams
    const size = searchParams.get("size") || "1920"
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:8',message:'API route called',data:{fileId,size},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (!GOOGLE_DRIVE_API_KEY) {
      return new Response("API key not configured", { status: 500 })
    }

    // Use Google Drive's thumbnail API which automatically converts HEIC to viewable format
    // The API returns a redirect (302) to the actual thumbnail, so we need to follow redirects
    const thumbnailUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/thumbnail?sz=w${size}-h${size}&key=${GOOGLE_DRIVE_API_KEY}`
    
    // Fetch the thumbnail from Google Drive (follow redirects)
    const response = await fetch(thumbnailUrl, {
      redirect: 'follow',
      headers: {
        'Accept': 'image/*',
      },
    })

    if (response.ok) {
      const contentType = response.headers.get('content-type')
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:29',message:'Thumbnail API response',data:{fileId,status:response.status,contentType,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // Check if it's an image or if response is successful (some APIs return images without explicit content-type)
      if (contentType?.startsWith('image/') || response.status === 200) {
        try {
          const imageBlob = await response.blob()
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:35',message:'Image blob created',data:{fileId,blobType:imageBlob.type,blobSize:imageBlob.size},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          // Verify it's actually an image by checking blob type
          if (imageBlob.type.startsWith('image/') || imageBlob.size > 0) {
            // #region agent log
            fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:38',message:'Returning image successfully',data:{fileId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            return new Response(imageBlob, {
              headers: {
                'Content-Type': contentType || imageBlob.type || 'image/jpeg',
                'Cache-Control': 'public, max-age=3600',
              },
            })
          }
        } catch (blobError) {
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:45',message:'Blob error',data:{fileId,error:String(blobError)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          console.error("[v0] Error reading image blob:", blobError)
        }
      }
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:48',message:'Thumbnail API failed',data:{fileId,status:response.status,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    }

    // Fallback 1: Try Google Drive's public thumbnail endpoint
    const publicThumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}-h${size}`
    const publicResponse = await fetch(publicThumbnailUrl, {
      redirect: 'follow',
    })
    
    if (publicResponse.ok) {
      const contentType = publicResponse.headers.get('content-type')
      if (contentType?.startsWith('image/') || publicResponse.status === 200) {
        try {
          const imageBlob = await publicResponse.blob()
          if (imageBlob.type.startsWith('image/') || imageBlob.size > 0) {
            return new Response(imageBlob, {
              headers: {
                'Content-Type': contentType || imageBlob.type || 'image/jpeg',
                'Cache-Control': 'public, max-age=3600',
              },
            })
          }
        } catch (blobError) {
          console.error("[v0] Error reading public thumbnail blob:", blobError)
        }
      }
    }

    // Fallback 2: Try direct view URL (only works if file is publicly shared)
    const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
    const fallbackResponse = await fetch(fallbackUrl, {
      redirect: 'follow',
    })
    
    if (fallbackResponse.ok) {
      const contentType = fallbackResponse.headers.get('content-type')
      if (contentType?.startsWith('image/') || fallbackResponse.status === 200) {
        try {
          const imageBlob = await fallbackResponse.blob()
          if (imageBlob.type.startsWith('image/') || imageBlob.size > 0) {
            return new Response(imageBlob, {
              headers: {
                'Content-Type': contentType || imageBlob.type || 'image/jpeg',
                'Cache-Control': 'public, max-age=3600',
              },
            })
          }
        } catch (blobError) {
          console.error("[v0] Error reading fallback image blob:", blobError)
        }
      }
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:100',message:'All fallbacks failed',data:{fileId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return new Response("Image not found or not accessible", { status: 404 })
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/photos/[id]/route.ts:103',message:'API route exception',data:{fileId,error:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.error("[v0] Error fetching image:", error)
    return new Response("Failed to fetch image", { status: 500 })
  }
}
