import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    // Fetch the user and include their editors
    const user = await prisma.user.findUnique({
      where: {
        id: userId,  // Find user by userId
      },
      include: {
        editors: true,  // Include all editors related to the user
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Return the list of editors for the user
    return new Response(JSON.stringify(user.editors), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve editors' }), { status: 500 });
  }
}
