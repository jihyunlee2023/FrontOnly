"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:px-8">
      <section>
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle>안철수</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">국민의 힘, 경기 분당 갑</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <div className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">생년월일</div>
                <div className="text-xl font-semibold">1962년 2월 26일</div>
              </div>
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <div className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">학력</div>
                <div className="text-xl font-semibold">동성국-부산중앙중-부산고-서울대</div>
              </div>
              <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <div className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">의원 대수</div>
                <div className="text-xl font-semibold">4선</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 pt-8 md:grid-cols-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>법안발의</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="w-full aspect-[3/2]" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>출석률</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="w-full aspect-[3/2]" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>재산</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart className="w-full aspect-[3/2]" />
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="pt-8">
        <h2 className="text-xl font-semibold mb-4">Related News</h2>
        <div className="grid gap-4">
          <Card className="md:grid md:grid-cols-[auto,1fr] md:gap-4">
            <CardHeader className="flex items-center gap-2 md:flex-col md:items-start">
              <div>
                <div className="font-semibold">jTBC</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-3">
              안철수 "이재명 '검찰 애완견'발언, 희대의 망언...감옥 두렵나"
              </div>
            </CardContent>
          </Card>
          <Card className="md:grid md:grid-cols-[auto,1fr] md:gap-4">
            <CardHeader className="flex items-center gap-2 md:flex-col md:items-start">
              <div>
                <div className="font-semibold">한국경제</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-3">
              안철수, 전당대회 민심 20% 반영에 "턱없이 부족하다"
              </div>
            </CardContent>
          </Card>
          <Card className="md:grid md:grid-cols-[auto,1fr] md:gap-4">
            <CardHeader className="flex items-center gap-2 md:flex-col md:items-start">
              <div>
                <div className="font-semibold">MBN</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</div>
              </div>
            </CardHeader>
            <CardContent>
                <div className="line-clamp-3">
                안철수 "추가 기소된 이재명, 정계 은퇴해야 할 때"
                </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "1월", count: 3 },
          { name: "2월", count: 5 },
          { name: "3월", count: 4 },
          { name: "4월", count: 6 },
          { name: "5월", count: 1 },
          { name: "6월", count: 5 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["red"]}
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
  )
}


function LineChart(props) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: [
                { x: "1월", y: 43 },
                { x: "2월", y: 98 },
                { x: "3월", y: 61 },
                { x: "4월", y: 80 },
                { x: "5월", y: 26 },
                { x: "6월", y: 70 },
              ],
            }
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["red", "red"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
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
          role="application"
        />
      </div>
    )
  }
  


function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "건물", value: 36 },
          { id: "예금", value: 31 },
          { id: "증권", value: 1331 },
          { id: "채권", value: 8 }
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["red"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
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
        }}
        role="application"
      />
    </div>
  )
}