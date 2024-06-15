"use client"; // 클라이언트 컴포넌트로 명시

import Link from "next/link";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js의 클라이언트 라우터 사용
import { Button } from "@/components/ui/button"; // Button 컴포넌트 import
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
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // 클라이언트 라우터

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/member`);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-950 text-white py-4 px-6 md:px-10 flex items-center justify-between fixed w-full z-50">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-bold text-lg flex items-center gap-2" prefetch={false}>
                National Assembly
              </Link>
              <div className="flex items-center gap-2.5 border border-gray-50 rounded-xl px-4 py-2 dark:border-gray-800">
                <a href="/attendance">
                  <Button className="px-6 py-3 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                    출석률
                  </Button>
                </a>
                <a href="/law">
                  <Button className="px-5 py-3 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                    법안발의
                  </Button>
                </a>
                <a href="/assets">
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
            <div className="bg-gray-950 text-white p-4 flex justify-end fixed w-full top-16 z-40 mt-3">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-screen-2xl mx-auto flex">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" className="ml-2">Search</Button>
              </form>
            </div>
          )}
          <main className="flex-1 pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}