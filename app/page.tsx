// app/page.tsx

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

const mergeData = (members, attendance, assets) => {
  return members.map(member => {
    const attendanceData = attendance.find(item => item.id === member.id);
    const assetsData = assets.find(item => item.id === member.id);
    return {
      ...member,
      attendance: attendanceData?.attendance || 0,
      assets: assetsData?.assets || {}
    };
  });
};

const partyColors = {
  1: "#1E90FF", // 더불어민주당 (Blue)
  2: "#FF4500", // 국민의 힘 (Red)
  3: "#FFD700", // 정의당 (Yellow)
  4: "green"  // 국민의당 (Green)
  // 다른 정당의 색상도 추가합니다.
};

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchData('/data/members.json'),
      fetchData('/data/attendance.json'),
      fetchData('/data/assets.json')
    ])
    .then(([members, attendance, assets]) => {
      setData(mergeData(members, attendance, assets));
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const attendanceData = data.map(item => ({
    name: item.name,
    value: item.attendance,
    party: item.party
  }));

  const assetsData = data.map(item => ({
    name: item.name,
    value: item.assets.total || 0,
    party: item.party
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 md:px-10 py-12">
      <div className="flex flex-col items-center gap-4">
      <img src="/images/new-image.jpg" alt="New Image" className="rounded-lg w-full max-w-screen-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Card>
          <Link href="/attendance" passHref>
            <CardHeader>
              <CardTitle>Top 10 by Attendance</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <HorizontalbarChart data={attendanceData} />
              <h4 className="text-right" style={{ paddingRight: '10pt' }}>Click to View More &gt; </h4> 
            </CardContent>
          </Link>
        </Card>
        <Card>
          <Link href="/assets" passHref>
            <CardHeader>
              <CardTitle>Top 10 by Assets</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <HorizontalbarChart data={assetsData} />
              <h4 className="text-right" style={{ paddingRight: '10pt' }}>Click to View More &gt; </h4> 
            </CardContent>
          </Link>
        </Card>
        <Card>
          <Link href="/law" passHref>
            <CardHeader>
              <CardTitle>Top 10 by Bills Proposed</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[4/3]" />
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
        margin={{ top: 0, right: 0, bottom: 40, left: 100 }}
        padding={0.3}
        colors={({ id, data }) => partyColors[data.party]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
        }}
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
          tickValues: 4,
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
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
