//app/attendance/page.tsx

"use client"

import React, { useState, useEffect } from 'react';
import Party from '@/components/party';
import { AttChart, AttChartInfo } from '@/components/attChart';

export default function Attendance() {
  const [data, setData] = useState<AttChartInfo[]>([]);

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

  return (
    <div>
      <Party />
      <div className="flex flex-col items-center justify-center px-4 space-y-4">
        {data.map((info) => (
          <AttChart key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
}
