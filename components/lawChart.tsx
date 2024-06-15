// components/lawChart.tsx

import React from 'react';

export interface LawChartInfo {
  id: number;
  name: string;
  party: number;
  constituency: string;
  assets: {
    total: number;
    realEstate: number;
    securities: number;
    deposits: number;
    usageRights: number;
  };
  law: number;
}

const partyColors = {
  1: 'blue',
  2: 'red',
  3: 'navy',
  4: 'orange',
  5: 'red',
  6: 'green',
  7: 'mint',
  8: 'orange'
};

const partyNames = {
  1: '더불어민주당',
  2: '국민의힘',
  3: '조국혁신당',
  4: '개혁신당',
  5: '진보당',
  6: '새로운미래',
  7: '기본소득당',
  8: '사회민주당'
};

export function LawChart({ info }: { info: LawChartInfo }) {
  const lawCount = info.law;

  return (
    <div className="flex items-center justify-between w-full max-w-6xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 mx-auto">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold dark:text-white">{info.name}</h3>
          <div className="text-gray-500 dark:text-gray-400">
            <span className="font-medium">{partyNames[info.party]}</span> | {info.constituency}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <div className="text-gray-500 dark:text-gray-400">법안발의: {lawCount}</div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-300 h-6 rounded-full relative">
        <div className={`h-6 rounded-full absolute top-0 left-0`} style={{ width: `${(lawCount / 45) * 100}%`, backgroundColor: partyColors[info.party] }} />
      </div>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}