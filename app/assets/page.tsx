//app/assets/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Party from '@/components/party';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AssetsChart } from '@/components/assetsChart';

export default function Asset() {
  const [selectedFilter, setSelectedFilter] = useState("total")
  const [members, setMembers] = useState([])
  const [assets, setAssets] = useState([])

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

  return (
    <div className="p-4">
      <Party />
      <div className="flex justify-end space-x-2 mb-4">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedFilter === filter.value ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <AssetsChart members={combinedData} selectedFilter={selectedFilter} formatCurrency={formatCurrency} />
    </div>
  )
}
