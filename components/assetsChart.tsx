// components/assetsChart.tsx

// components/assetsChart.tsx

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Member {
  id: number;
  name: string;
  party: number;
  constituency: string;
  assets?: {
    total?: number;
    realEstate?: number;
    securities?: number;
    deposits?: number;
    usageRights?: number;
  };
}

const partyNames: { [key: number]: string } = {
  1: "더불어 민주당",
  2: "국민의 힘",
  3: "정의당",
  4: "새로운 선택"
};

export function AssetsChart({ members, selectedFilter, formatCurrency }: { members: Member[], selectedFilter: string, formatCurrency: (value: number) => string }) {
  return (
    <div className="grid gap-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={member.name} />
              <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div className="text-lg font-semibold">{member.name}</div>
              <div className="text-gray-500 dark:text-gray-400">
                {partyNames[member.party]} - {member.constituency}
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold">
            {formatCurrency(member.assets?.[selectedFilter] || 0)}
          </div>
        </div>
      ))}
    </div>
  );
}
