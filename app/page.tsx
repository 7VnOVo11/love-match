'use client';

import { features, steps, stories } from './data/content';
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              遇见真爱
            </span>
            <span className="block text-3xl mt-4">
              AI驱动的智能情感分析
            </span>
          </h1>
          <p className="text-xl text-foreground/60 mb-12">
            科学的数据分析，让每一次相遇都更有意义
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors">
            开始测试
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">科学的匹配系统</h2>
            <p className="text-lg text-foreground/60">
              多维度分析，精准匹配，让每一次相遇都更有意义
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
