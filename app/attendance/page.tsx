"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Party from '@/components/party';
import { AttChart, AttChartInfo } from '@/components/attChart';

export default function Attendance() {
  const [data, setData] = useState<AttChartInfo[]>([]);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("정렬");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResponse, attendanceResponse, assetsResponse] = await Promise.all([
          fetch('/data/members.json'),
          fetch('/data/attendance.json'),
          fetch('/data/assets.json')
        ]);

        if (!membersResponse.ok || !attendanceResponse.ok || !assetsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const [membersData, attendanceData, assetsData] = await Promise.all([
          membersResponse.json(),
          attendanceResponse.json(),
          assetsResponse.json()
        ]);

        const combinedData = membersData.map(member => {
          const attendance = attendanceData.find(a => a.id === member.id)?.attendance || 0;
          const assets = assetsData.find(a => a.id === member.id)?.assets || {};
          return { ...member, attendance, assets };
        });

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortClick = (order) => {
    setSortOrder(order);
    setIsSortMenuOpen(false); // 정렬 메뉴를 닫음
  };

  return (
    <div>
      <Party />
      <div className="flex justify-between w-24 max-w-xl ml-36 mb-3 relative">
        <Button
          className="bg-black text-white px-6 py-2 w-32 h-10 ml-2"
          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
        >
          {sortOrder}
        </Button>
        {isSortMenuOpen && (
          <div 
            className="absolute top-full left-0 w-24 bg-white border border-gray-200 shadow-lg"
          >
            <div
              onClick={() => handleSortClick('오름차순')}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              오름차순
            </div>
            <div
              onClick={() => handleSortClick('내림차순')}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              내림차순
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center px-4 space-y-4">
        {data.map((info) => (
          <AttChart key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
}
