import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, res) {
    const { user_id: userId } = req.body; // Assuming userId is passed as a query parameter

    if (!userId) {
        return res.status(400).json({ error: "User ID (userId) is required." });
    }

    try {
        // Fetch all videos that belong to the user
        const videos = await prisma.video.findMany({
            where: {
                user: userId, // Assuming there's a `userId` field in the video table that links to the user
            },
        });

        // If no videos are found for the user, return a 404 error
        if (videos.length === 0) {
            return res.status(404).json({ error: "No videos found for this user." });
        }

        // Return the videos data as JSON
        return res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch videos for this user." });
    }
}
