interface VideoDetails {
    video: string
}

export async function uploadVideo(video: VideoDetails) {
    const { data } = await axios.post("https://www.googleapis.com/upload/youtube/v3/videos", {
        video
    })
    return data
}