// app/login/page.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex h-screen w-full items-center justify-center bg-gray-white">
        <div className="mx-auto max-w-[400px] w-full space-y-6">
          <Card className="min-h-[400px] flex flex-col justify-center items-center"> {/* 원하는 높이를 설정합니다 */}
            <CardContent className="flex flex-col items-center space-y-4 w-full"> {/* w-full 클래스 추가 */}
              <h1 className="text-2xl font-bold">환영합니다</h1>
              <div className="space-y-2 w-full">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" placeholder="m@example.com" required type="email" className="w-full" /> {/* w-full 클래스 추가 */}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" required type="password" className="w-full" /> {/* w-full 클래스 추가 */}
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <Button className="w-full">로그인</Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            아직 계정이 없으신가요?{" "}
            <Link className="font-medium underline underline-offset-4" href="signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}