import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req, res) {
    const { email, name } = await req.json(); // Do not expect editorId here
    console.log("Adding email to editor's access list", email, name);
    try {
        // Create EditorAccess without editorId
        const editorAccess = await prisma.editorAccess.create({
            data: {
                email,
                name,
                UserId: 
            },
        });

        return new Response(JSON.stringify(editorAccess), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to add email to editor's access list.", { status: 500 });
    }
}
