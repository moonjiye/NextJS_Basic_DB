import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogOutBtn from "./LogOutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // 로그인된 유저정보 출력, 서버컴포넌트
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            MongoDB
          </Link>
          <Link href="/list">List</Link>
          {session? (
            <span>
              {session.user.name} <LogOutBtn />
            </span>
          ) : (
            <LoginBtn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
