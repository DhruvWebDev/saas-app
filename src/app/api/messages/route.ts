import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to handle fetching messages (GET)
async function fetchMessages(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });
}

// Function to handle creating a new message (POST)
async function createMessage({ senderId, receiverId, content }: { senderId: string, receiverId: string, content: string }) {
  if (!senderId || !receiverId || !content) {
    throw new Error('All fields are required');
  }

  return await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });
}

// GET function
export async function GET(req) {
  try {
    // Extract userId from URLSearchParams (query parameters)
    const url = new URL(req.url);  // Create a URL object from the request URL
    const userId = url.searchParams.get('userId');  // Extract the userId parameter

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages = await fetchMessages(userId);
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


// POST function
export async function POST(req) {
  try {
    // Ensure that body is parsed correctly
    const body = await req.json();

    const { senderId, receiverId, content } = body;

    if (!senderId || !receiverId || !content) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newMessage = await createMessage({ senderId, receiverId, content });
    return new Response(JSON.stringify(newMessage), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating message:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
