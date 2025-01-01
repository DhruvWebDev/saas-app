import { uploadVideo } from "@/lib/uploadVideo"

export async function POST(req, res){
    const {} = req.body    
    try {
        //Youtube api for uploading the video
        const video = await uploadVideo()
        if(video){
            res.status(200).json({message: "Video uploaded successfully on youtube"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }

}