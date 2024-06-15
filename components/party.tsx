// components/party.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PartyProps {
  setSelectedParty: (party: string | null) => void;
}

const Party: React.FC<PartyProps> = ({ setSelectedParty }) => {
  const [selectedParty, setSelectedPartyState] = useState<string | null>(null);

  const handleClick = (party: string) => {
    setSelectedPartyState(party === "전체" ? null : party);
    setSelectedParty(party === "전체" ? null : party);
  };

  const isSelected = (party: string) => selectedParty === party;

  return (
    <div className="flex justify-center px-4 mt-2 mb-3">
      <div className="bg-white shadow-md rounded-2xl p-4 flex justify-center space-x-2 max-w-6xl w-full overflow-x-auto">
        {["전체", "더불어민주당", "국민의힘", "조국혁신당", "개혁신당", "진보당", "새로운미래", "기본소득당", "사회민주당"].map((party) => (
          <Button
            key={party}
            className={`flex-grow rounded-full px-4 py-2 text-sm font-medium ${isSelected(party) ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
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