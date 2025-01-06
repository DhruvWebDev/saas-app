import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request): Promise<Response> {
  try {
    console.log("GET /api/get-videos-by-editor");

    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const editorId = url.searchParams.get("editorId");
    console.log("Requested Editor ID:", editorId);

    // Validate the editorId parameter
    if (!editorId) {
      return new Response(
        JSON.stringify({ error: "Editor ID is required" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Fetch all videos associated with the given editorId
    const videos = await prisma.video.findMany({
      where: {
        id: editorId, // Fetch all videos for this editorId
      },
    });

    console.log("Videos found:", videos);

    // If no videos are found, return a 404 error
    if (!videos || videos.length === 0) {
      return new Response(
        JSON.stringify({ error: "No videos found for this editor" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    // Return the videos data as JSON
    return new Response(JSON.stringify(videos), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error retrieving videos:", error);

    // Return a 500 Internal Server Error response with the error details
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
