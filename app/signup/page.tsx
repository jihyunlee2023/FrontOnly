"use client";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // next/navigation에서 useRouter를 가져옵니다.
import { useState } from "react";

export default function Component() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    }, 0); // 0ms 지연 후 이동 (팝업이 먼저 뜨도록)
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto max-w-[400px] space-y-6 py-12">
        <Card className="min-h-[550px] flex flex-col justify-center items-center"> {/* 원하는 높이를 설정합니다 */}
          <CardContent className="flex flex-col items-center space-y-4 w-full"> {/* w-full 클래스 추가 */}
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">계정 생성</h1>
              <p className="text-gray-500 dark:text-gray-400">아래 단계들을 수행하시오</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="username">닉네임</Label>
                <Input id="username" placeholder="닉네임을 입력하시오" required />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" placeholder="이메일을 입력하시오" required type="email" />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" placeholder="비밀번호를 입력하시오" required type="password" />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="confirm-password">비밀번호 확인</Label>
                <Input id="confirm-password" placeholder="동일한 비밀번호를 다시 입력하시오" required type="password" />
              </div>
              <Button className="w-full" type="submit">
                회원가입
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}