import { useState, useEffect } from 'react'

export function useAssessmentProgress() {
  const [savedProgress, setSavedProgress] = useState<any>(null)
  
  useEffect(() => {
    // 从localStorage加载保存的进度
    const saved = localStorage.getItem('assessment-progress')
    if (saved) {
      setSavedProgress(JSON.parse(saved))
    }
  }, [])
  
  const saveProgress = (data: any) => {
    localStorage.setItem('assessment-progress', JSON.stringify(data))
  }
  
  return { savedProgress, saveProgress }
} 