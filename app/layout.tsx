import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "AI Love Match - 智能情感分析与匹配平台",
  description: "基于AI技术的智能情感分析平台，通过科学的数据分析和机器学习算法，为您提供专业的恋爱关系契合度评估和建议。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
