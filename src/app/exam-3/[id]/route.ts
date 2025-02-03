import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./public/exam-3/exam-3.json');

const readUsers = (): { users: User[] } => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};


const writeUsers = (data: { users: User[] }) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  gender: string;
}

// GET: ดึงข้อมูลผู้ใช้ตาม id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;  
  const data = readUsers();
  const user = data.users.find((user) => user.id === id);
  
  if (user) {
    return NextResponse.json({
      message: "User found",
      user: user,
    });
  } else {
    return NextResponse.json({
      message: "User not found",
    });
  }
}

// PUT: อัปเดตข้อมูลผู้ใช้
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = readUsers(); 

  const updatedUser = await request.json(); 

  
  const userIndex = data.users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
   
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

 
  data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };

  writeUsers(data);

  return NextResponse.json({
    message: "User updated successfully",
    user: data.users[userIndex], 
  });
}

// DELETE: ลบข้อมูลผู้ใช้ตาม id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = readUsers(); 
  const userIndex = data.users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
   
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

 
  data.users.splice(userIndex, 1);

  writeUsers(data); 
  return NextResponse.json({
    message: "User deleted successfully",
  });
}
