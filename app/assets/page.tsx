"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Party from "@/components/party";
import { AssetsChart } from "@/components/assetsChart";

export default function Asset() {
  const [selectedFilter, setSelectedFilter] = useState("total");
  const [members, setMembers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("정렬");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const filters = [
    { label: "Total Assets", value: "total" },
    { label: "Real Estate", value: "realEstate" },
    { label: "Securities", value: "securities" },
    { label: "Deposits", value: "deposits" },
    { label: "Usage Rights", value: "usageRights" },
  ];

  useEffect(() => {
    fetch("/data/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members data:", error));
  }, []);

  useEffect(() => {
    fetch("/data/assets.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets data:", error));
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const combinedData = members.map((member) => {
    const memberAssets = assets.find((asset) => asset.id === member.id)?.assets || {};
    return {
      ...member,
      assets: memberAssets,
    };
  });

  const handleFilterClick = (value) => {
    setSelectedFilter(value);
    setIsMenuOpen(false);
  };

  const handleSortClick = (order) => {
    setSortOrder(order);
    setIsSortMenuOpen(false);
  };

  const getFilterLabel = (value) => {
    const filter = filters.find((filter) => filter.value === value);
    return filter ? filter.label : "Total Assets";
  };

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

  let filteredData = selectedParty
    ? combinedData.filter((item) => item.party === partyMapping[selectedParty])
    : combinedData;

  filteredData = filteredData.sort((a, b) => {
    const aValue = a.assets[selectedFilter] || 0;
    const bValue = b.assets[selectedFilter] || 0;
    return sortOrder === "오름차순" ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="p-4">
      <Party setSelectedParty={setSelectedParty} />
      <div className="flex justify-between w-40 max-w-xl ml-32 mb-3 relative">
        <Button
          className="bg-black text-white px-6 py-2 w-32 h-10"
          variant={isMenuOpen ? "default" : "outline"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {getFilterLabel(selectedFilter)}
        </Button>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-50 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {filters.map((filter) => (
              <div
                key={filter.value}
                onClick={() => handleFilterClick(filter.value)}
                className={`cursor-pointer px-4 py-2 ${
                  selectedFilter === filter.value ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                {filter.label}
              </div>
            ))}
          </div>
        )}
        <Button
          className="bg-black text-white px-6 py-2 w-32 h-10 ml-2"
          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
        >
          {sortOrder}
        </Button>
        {isSortMenuOpen && (
          <div className="absolute top-full left-32 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div onClick={() => handleSortClick("오름차순")} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              오름차순
            </div>
            <div onClick={() => handleSortClick("내림차순")} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              내림차순
            </div>
          </div>
        )}
      </div>
      <AssetsChart members={filteredData} selectedFilter={selectedFilter} formatCurrency={formatCurrency} />
    </div>
  );
}