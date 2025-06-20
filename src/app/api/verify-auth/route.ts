import { verifyToken } from "@/lib/auth";
import { getConnection } from "@/lib/db";
import { UsersType } from "@/types/Users";
import { RowDataPacket } from "mysql2";

type decodedType = {
  id: number;
  iat: number;
  exp: number;
};

export async function POST(request: Request) {
  const { token } = await request.json();
  const decoded = (await verifyToken(token)) as decodedType;
  const conn = await getConnection();

  const [row] = await conn.query<RowDataPacket[]>(
    "SELECT * FROM users_tbl WHERE id = ?",
    decoded.id
  );

  const user = row[0] as UsersType
  return Response.json(user);
}
