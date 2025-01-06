import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Import NextResponse
import { Editor } from "../../../../type";

const prisma = new PrismaClient();

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const {name, email, imageUrl }:Editor = await req.json();
    console.log({ name, email, imageUrl});
    try {
            const createEditor = await prisma.editor.create({
                data: {
                    name: name,
                    email: email,
                    imageUrl
                }
            });

            return NextResponse.json(createEditor, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
