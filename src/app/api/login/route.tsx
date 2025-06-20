import { signToken } from "@/lib/auth";
import { getConnection } from "@/lib/db";
import { UsersType } from "@/types/Users";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const conn = await getConnection();
  const [row] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM users_tbl WHERE email = ?",
    email
  );

  const user = row[0] as UsersType;

  if (user.password != password)
    return Response.json({ message: "Incorrect Password!" });

  const token = await signToken({ id : user.id})
  return Response.json({ token: token });
}
