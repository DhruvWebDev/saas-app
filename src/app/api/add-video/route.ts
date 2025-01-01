import { PrismaClient } from "@prisma/client";
import { createClient } from "../../../../utils/supabase/client";
const supabase = createClient();
const prisma = new PrismaClient();

export async function POST(req, res) {
    const { title, description, videoUrl: videoFileUrl, thumbnail, userId } = await req.json();
    console.log({ title, description, videoFileUrl, thumbnail, userId });
    // Validate input fields
    if(!title || !description || !videoFileUrl || !thumbnail || !userId){
        return new Response("Missing required fields.", { status: 400 })
    }

    try {
        // Upload thumbnail to Supabase storage
        const { data, error } = await supabase.storage.from("thumbnail").upload(thumbnail.name, thumbnail);

        if (error) {
            throw new Error(error.message);
        }

        // Construct the thumbnail URL from Supabase
        const thumbnail_url = `https://${process.env.NEXT_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/thumbnail/${thumbnail.name}`;

        // Create the video entry in the database
        const video = await prisma.video.create({
            data: {
                title,
                description,
                videoFileUrl, // URL of the video file
                thumbnail_url, // URL of the uploaded thumbnail
                status: 'PENDING', // Default status
                userId, // User ID (required, passed from the request)
            },
        });

        // Return the created video object
        return new Response(JSON.stringify(video), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred while adding the video.", { status: 500 });
    }
}
