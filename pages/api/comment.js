import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    console.log(session)
}