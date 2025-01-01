import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, res) {
    const { id: editorId } = req.query; // Assuming editorId is passed as a query parameter

    if (!editorId) {
        return res.status(400).json({ error: "Editor ID (editorId) is required." });
    }

    try {
        // Fetch all videos that belong to the editor
        const videos = await prisma.video.findMany({
            where: {
                editorId: editorId, // Filter videos by the editorId field
            },
        });

        // If no videos are found for the editor, return a 404 error
        if (videos.length <= 0) {
            return res.status(404).json({ error: "No videos found for this editor." });
        }

        // Return the videos data as JSON
        return res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch videos for this editor." });
    }
}
