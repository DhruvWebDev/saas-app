import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, res) {
    const { id: vid } = req.query; // Assuming vid is passed as a query parameter

    if (!vid) {
        return res.status(400).json({ error: "Video ID (vid) is required." });
    }

    try {
        // Fetch the video by its unique id
        const video = await prisma.video.findUnique({
            where: {
                id: vid, // Filter by video ID (assuming it's named `id` in the database)
            },
        });

        // If no video is found, return a 404 error
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        // Return the video data as JSON
        return res.status(200).json(video);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch video data." });
    }
}

