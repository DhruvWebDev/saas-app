import { PrismaClient, Role } from '@prisma/client';
import { User } from '../../../../type';

const prisma = new PrismaClient();


export async function POST(req, res) {
  const { user_id, email, role, name, image_url }: User = await req.json();
  console.log({ user_id, email, role, name, image_url });

  try {
    const user = await prisma.user.create({
      data: {
        id: user_id,
        email: email,
        name: name,
        role: role,
        imageUrl: image_url, // Ensure this matches your Prisma schema
      },
    });

    if (user) {
      return new Response(
        JSON.stringify({
          message: `User created successfully with ID: ${user_id}`,
          status: 201,
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to create user' }),
      { status: 500 }
    );
  }
}
