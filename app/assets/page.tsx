"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Party from '@/components/party';
import { AssetsChart } from '@/components/assetsChart';

export default function Asset() {
  const [selectedFilter, setSelectedFilter] = useState("total")
  const [members, setMembers] = useState([])
  const [assets, setAssets] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filters = [
    { label: "Total Assets", value: "total" },
    { label: "Real Estate", value: "realEstate" },
    { label: "Securities", value: "securities" },
    { label: "Deposits", value: "deposits" },
    { label: "Usage Rights", value: "usageRights" },
  ]

  useEffect(() => {
    // JSON 파일에서 데이터를 불러와 상태에 설정
    fetch('/data/members.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members data:', error));
  }, [])

  useEffect(() => {
    // JSON 파일에서 자산 데이터를 불러와 상태에 설정
    fetch('/data/assets.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setAssets(data))
      .catch((error) => console.error('Error fetching assets data:', error));
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const combinedData = members.map(member => {
    const memberAssets = assets.find(asset => asset.id === member.id)?.assets || {};
    return {
      ...member,
      assets: memberAssets
    };
  });

  const handleFilterClick = (value) => {
    setSelectedFilter(value);
    setIsMenuOpen(false); // 메뉴를 닫음
  };

  const getFilterLabel = (value) => {
    const filter = filters.find((filter) => filter.value === value);
    return filter ? filter.label : "Total Assets";
  };

  return (
    <div className="p-4">
      <Party />
      <div 
  className="flex justify-between w-40 max-w-xl ml-28 mb-3 relative"
  onMouseEnter={() => setIsMenuOpen(true)}
  onMouseLeave={() => setIsMenuOpen(false)}
>
        <Button
          className="bg-black text-white px-6 py-2"
          variant={isMenuOpen ? "default" : "outline"}
        >
          {getFilterLabel(selectedFilter)}
        </Button>
        {isMenuOpen && (
          <div 
            className="absolute top-full left-0 w-50 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            {filters.map((filter) => (
              <div
                key={filter.value}
                onClick={() => handleFilterClick(filter.value)}
                className={`cursor-pointer px-4 py-2 ${selectedFilter === filter.value ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                {filter.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <AssetsChart members={combinedData} selectedFilter={selectedFilter} formatCurrency={formatCurrency} />
    </div>
  )
}
