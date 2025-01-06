//Creating interface for all the apis 

import { Role } from "@prisma/client";

export interface Editor {
    id: number;
    name: string;
    email: string;
}

export interface User {
    user_id: string;
    email: string;
    role: Role;
    name: string;
    image_url: string;
}
export interface messagePayload  {
    senderId: string | undefined,
      receiverId: string | undefined, // The selected creator as the receiver
      content: string | undefined
}