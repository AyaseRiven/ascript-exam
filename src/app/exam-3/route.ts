import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./public/exam-3/exam-3.json');

// ฟังก์ชันอ่านข้อมูลผู้ใช้จากไฟล์ JSON
const readUsers = (): { users: User[] } => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// ฟังก์ชันเขียนข้อมูลผู้ใช้ลงในไฟล์ JSON
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

// GET: ดึงข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  const data = readUsers();
  
  if (data.users && data.users.length > 0) {
    return NextResponse.json({
      message: "Users found",
      users: data.users,
    });
  } else {
    return NextResponse.json({
      message: "User not found",
    });
  }
}

// POST: สร้างผู้ใช้ใหม่
export async function POST(req: Request) {
  try {
    const { email, password, fullName, phone, address, gender } = await req.json();
    const data = readUsers();
    const newUser: User = {
      id: String(data.users.length + 1),
      email,
      password,
      fullName,
      phone,
      address,
      gender,
    };
    data.users.push(newUser);
    writeUsers(data); 
    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}


// PUT: อัปเดตข้อมูลผู้ใช้ทั้งหมด
export async function PUT(request: Request) {
  const updatedData = await request.json(); 
  const data = readUsers();

 
  data.users = data.users.map((user) => ({
    ...user,
    ...updatedData,
  }));

  writeUsers(data); 

  return NextResponse.json({
    message: "All users updated successfully",
    users: data.users,
  });
}

// DELETE: ลบข้อมูลผู้ใช้ทั้งหมด
export async function DELETE() {
  const data = { users: [] }; 
  writeUsers(data); 

  return NextResponse.json({
    message: "All users deleted successfully",
  });
}

