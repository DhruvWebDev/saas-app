import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Import NextResponse
import { Editor } from "../../../../type";

const prisma = new PrismaClient();

export async function POST(req) {

    const { id, name, email }:Editor = await req.json();
    console.log({id, name, email});
    try {
        const existingEditor = await prisma.editor.findUnique({
            where: {
                id: id
            }
        });

        if (!existingEditor) {
            const createEditor = await prisma.editor.create({
                data: {
                    id: id,
                    name: name,
                    email: email
                }
            });

            return NextResponse.json(createEditor, { status: 201 });
        } else {
            return NextResponse.json({ message: "Editor already exists in the database" }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
