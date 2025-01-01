//Creating interface for all the apis 

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