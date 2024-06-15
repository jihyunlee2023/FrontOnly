"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const mergeData = (members, attendance, assets, laws) => {
  return members.map(member => {
    const attendanceData = attendance.find(item => item.id === member.id);
    const assetsData = assets.find(item => item.id === member.id);
    const lawData = laws.find(item => item.id === member.id);
    return {
      ...member,
      attendance: attendanceData?.attendance || 0,
      assets: assetsData?.assets || {},
      law: lawData?.law || 0
    };
  });
};

const partyColors = {
  1: "#1E90FF", // 더불어민주당 (Blue)
  2: "#FF4500", // 국민의 힘 (Red)
  3: "navy", // 조국혁신당 (navy)
  4: "orange",  // 개혁신당 (orange)
  5: "red" // 진보당 (red)
  // 다른 정당의 색상도 추가합니다.
};

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchData('/data/members.json'),
      fetchData('/data/attendance.json'),
      fetchData('/data/assets.json'),
      fetchData('/data/law.json')
    ])
    .then(([members, attendance, assets, laws]) => {
      setData(mergeData(members, attendance, assets, laws));
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getTop10 = (data, key) => {
    return data
      .sort((a, b) => b[key] - a[key])
      .slice(0, 10)
      .map(item => ({
        name: item.name,
        value: item[key],
        party: item.party
      }));
  };

  const attendanceData = getTop10(data, 'attendance');
  const assetsData = getTop10(data.map(item => ({...item, total: item.assets.total})), 'total');
  const lawData = getTop10(data, 'law');

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 md:px-10 py-12 w-full">
      <div className="relative w-full">
        <img 
          src="https://images.unsplash.com/photo-1520452112805-c6692c840af0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVBJUI1JUFEJUVEJTlBJThDfGVufDB8fDB8fHww" 
          alt="New Image" 
          className="w-full h-[350px] object-cover filter saturate-45" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Card>
          <Link href="/attendance" passHref>
            <CardHeader>
              <CardTitle>Top 10 by 출석률</CardTitle>
            </CardHeader>
            <CardContent className="aspect-[4/3]">
              <HorizontalbarChart data={attendanceData} />
              <h4 className="text-right" style={{ paddingRight: '10pt' }}>Click to View More &gt; </h4> 
            </CardContent>
          </Link>
        </Card>
        <Card>
          <Link href="/assets" passHref>
            <CardHeader>
              <CardTitle>Top 10 by 재산</CardTitle>
            </CardHeader>
            <CardContent className="aspect-[4/3]">
              <HorizontalbarChart data={assetsData} />
              <h4 className="text-right" style={{ paddingRight: '10pt' }}>Click to View More &gt; </h4> 
            </CardContent>
          </Link>
        </Card>
        <Card>
          <Link href="/law" passHref>
            <CardHeader>
              <CardTitle>Top 10 by 법안발의</CardTitle>
            </CardHeader>
            <CardContent className="aspect-[4/3]">
              <HorizontalbarChart data={lawData} />
              <h4 className="text-right" style={{ paddingRight: '10pt' }}>Click to View More &gt; </h4> 
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}

function HorizontalbarChart({ data }) {
  return (
    <div style={{ height: "300px", flex: 1 }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="name"
        layout="horizontal"
        reverse={true} // 이 줄을 추가하여 상위 항목이 더 높은 곳에 나타나도록 설정
        margin={{ top: 0, right: 0, bottom: 20, left: 50 }}
        padding={0.3}
        colors={({ id, data }) => partyColors[data.party]}
        axisBottom={null}
        axisLeft={{
          tickSize: 0,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A horizontal bar chart"
      />
    </div>
  );
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: [0, 50, 100, 150, 200], // 배열로 제공
          tickPadding: 16,
        }}
        gridYValues={[0, 50, 100, 150, 200]} // 배열로 제공
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
