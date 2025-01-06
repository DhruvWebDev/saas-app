import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    // Fetch the editors associated with the Youtuber (user) through the EditorAccess model
    const editors = await prisma.editorAccess.findMany({
      where: {
        userId: userId,  // Find editors where the userId matches the Youtuber
      },
      include: {
        Editor: true,  // Include the editor details
      },
    });

    if (editors.length === 0) {
      return new Response('No editors found for this user', { status: 404 });
    }

    // Return the list of editors for the user
    return new Response(JSON.stringify(editors.map(access => access.Editor)), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve editors' }), { status: 500 });
  }
}
