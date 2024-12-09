'use client';

import { features, steps, stories } from './data/content';
import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link 
        href="/test-analysis"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        开始测评
      </Link>
    </div>
  )
}
