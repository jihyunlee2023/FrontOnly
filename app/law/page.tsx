// app/law/page.tsx

// app/law/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Party from '@/components/party';
import { LawChart, LawChartInfo } from '@/components/lawChart';

const partyMapping = {
  "더불어민주당": 1,
  "국민의힘": 2,
  "조국혁신당": 3,
  "개혁신당": 4,
  "진보당": 5,
  "새로운미래": 6,
  "기본소득당": 7,
  "사회민주당": 8,
};

export default function Law() {
  const [data, setData] = useState<LawChartInfo[]>([]);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("내림차순");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResponse, lawResponse, assetsResponse] = await Promise.all([
          fetch('/data/members.json'),
          fetch('/data/law.json'),
          fetch('/data/assets.json')
        ]);

        if (!membersResponse.ok || !lawResponse.ok || !assetsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const [membersData, lawData, assetsData] = await Promise.all([
          membersResponse.json(),
          lawResponse.json(),
          assetsResponse.json()
        ]);

        const combinedData = membersData.map(member => {
          const law = lawData.find(a => a.id === member.id)?.law || 0;
          const assets = assetsData.find(a => a.id === member.id)?.assets || {};
          return { ...member, law, assets };
        });

        setData(combinedData.sort((a, b) => b.law - a.law));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortClick = (order) => {
    setSortOrder(order);
    if (order === '오름차순') {
      setData((prevData) => [...prevData].sort((a, b) => a.law - b.law));
    } else if (order === '내림차순') {
      setData((prevData) => [...prevData].sort((a, b) => b.law - a.law));
    }
    setIsSortMenuOpen(false); // 정렬 메뉴를 닫음
  };

  const filteredData = selectedParty ? data.filter(item => item.party === partyMapping[selectedParty]) : data;

  return (
    <div>
      <Party setSelectedParty={setSelectedParty} />
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
        {filteredData.map((info) => (
          <Link href={`/member/${info.id}`} key={info.id} legacyBehavior>
            <a className="block w-full">
              <LawChart info={info} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}