import { PrismaClient, Role } from '@prisma/client';
import { User } from '../../../../type';
import { useUser } from '@clerk/nextjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Ensure the body is valid and not null
    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400 }
      );
    }

    // Destructure the user properties from the body
    const { user_id, email, name, handleName, image_url }: User = body;
    console.log({ user_id, email, name, image_url });

    // Default role if not provided

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        id: user_id,
        email: email,
        name: name,
        imageUrl: image_url, // Ensure this matches your Prisma schema (imageUrl)
        createdAt: new Date(),
        updatedAt: new Date(),
        handleName
      },
    });

    // Return success response
    return new Response(
      JSON.stringify({
        message: `User created successfully with ID: ${user_id}`,
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error) {
    // Log error as string in case it's not an object
    console.error(error instanceof Error ? error.message : error);

    // Return the error response
    return new Response(
      JSON.stringify({ error: 'Failed to create user' }),
      { status: 500 }
    );
  }
}
