"use client"; // 클라이언트 컴포넌트로 명시

import Link from "next/link";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Button 컴포넌트 import
import { FaEye } from "react-icons/fa"; // FaEye 아이콘 import
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-950 text-white py-4 px-6 md:px-10 flex items-center justify-between fixed w-full z-50">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-bold text-lg flex items-center gap-2" prefetch={false}>
                {/* XIcon 대신 FaEye 아이콘 사용 */}
                <FaEye className="w-10 h-10 mr-3" />
                National Assembly
              </Link>
              <div className="flex items-center gap-2.5 border border-gray-100 rounded-xl px-4 py-2 dark:border-gray-800">
                <a href="http://localhost:3000/attendance">
                  <Button className="px-6 py-3 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                    출석률
                  </Button>
                </a>
                <a href="http://localhost:3000/law">
                  <Button className="px-5 py-3 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                    법안발의
                  </Button>
                </a>
                <a href="http://localhost:3000/assets">
                  <Button className="px-8 py-3 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                    재산
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" passHref>
                <Button variant="ghost" size="icon" aria-label="Login">
                  <UserIcon className="w-6 h-6" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" aria-label="Search" onClick={toggleSearch}>
                <SearchIcon className="w-6 h-6" />
              </Button>
            </div>
          </header>
          {searchVisible && (
            <div className="bg-gray-950 text-white p-4 flex justify-end fixed w-full top-16 z-40">
              <input
                type="text"
                placeholder="Search..."
                className="w-1/3 max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <main className="flex-1 pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
