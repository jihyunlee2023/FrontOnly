// components/party.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Party: React.FC = () => {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const handleClick = (party: string) => {
    setSelectedParty(party);
  };

  const isSelected = (party: string) => selectedParty === party;

  return (
    <div className="flex justify-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-wrap justify-center space-x-2 space-y-2 max-w-6xl w-full">
        {["전체", "더불어민주당", "국민의힘", "정의당", "새로운선택", "개혁신당", "조국혁신당", "무소속", "기본소득당", "진보당", "자유통일당"].map((party) => (
          <Button
            key={party}
            className={`rounded-full px-4 py-2 text-sm font-medium ${isSelected(party) ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleClick(party)}
          >
            {party}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Party;
