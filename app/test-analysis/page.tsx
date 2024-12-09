'use client'

import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import BasicInfoForm from './components/BasicInfoForm'
import PersonalityAssessment from './components/PersonalityAssessment'
import ValuesAssessment from './components/ValuesAssessment'
import HabitsAnalysis from './components/HabitsAnalysis'
import FuturePlanning from './components/FuturePlanning'
import { Card } from '@/components/ui/card'
import AchievementSystem from './components/AchievementSystem'

type AssessmentData = {
  basicInfo?: any
  personality?: any
  values?: any
  habits?: any
  future?: any
}

export default function TestAnalysis() {
  const [currentStep, setCurrentStep] = useState(1)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({})
  const [mode, setMode] = useState<'quick' | 'full'>('quick')
  const [progress, setProgress] = useState({
    answers: {},
    completionRate: 0,
    thoughtfulAnswers: 0,
    startTime: new Date()
  })
  
  const totalSteps = 5 // 基础信息 + 4个核心测评模块
  
  const handleStepComplete = (stepData: any) => {
    // 保存当前步骤的数据
    setAssessmentData(prev => ({
      ...prev,
      [getCurrentStepKey()]: stepData
    }))
    
    // 如果不是最后一步,进入下一步
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      // 最后一步完成后的处理逻辑
      handleAssessmentComplete()
    }
    
    // 更新进度
    setProgress(prev => ({
      ...prev,
      answers: { ...prev.answers, ...stepData },
      completionRate: (currentStep / totalSteps) * 100
    }))
  }
  
  const getCurrentStepKey = () => {
    switch (currentStep) {
      case 1: return 'basicInfo'
      case 2: return 'personality'
      case 3: return 'values'
      case 4: return 'habits'
      case 5: return 'future'
      default: return 'basicInfo'
    }
  }
  
  const handleAssessmentComplete = () => {
    // TODO: 提交完整的测评数据到服务器
    console.log('Assessment completed:', assessmentData)
  }
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm onComplete={handleStepComplete} />
      case 2:
        return <PersonalityAssessment mode={mode} onComplete={handleStepComplete} />
      case 3:
        return <ValuesAssessment onComplete={handleStepComplete} />
      case 4:
        return <HabitsAnalysis onComplete={handleStepComplete} />
      case 5:
        return <FuturePlanning onComplete={handleStepComplete} />
      default:
        return null
    }
  }

  const ModeSelector = () => (
    <div className="text-center mb-8">
      <h2 className="text-xl font-semibold mb-4">选择测评模式</h2>
      <div className="flex justify-center gap-4">
        <Card 
          className={`p-6 cursor-pointer ${mode === 'quick' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setMode('quick')}
        >
          <h3 className="font-medium">快速测评</h3>
          <p className="text-sm text-gray-500">3分钟完成核心测评</p>
        </Card>
        <Card
          className={`p-6 cursor-pointer ${mode === 'full' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setMode('full')}
        >
          <h3 className="font-medium">完整测评</h3>
          <p className="text-sm text-gray-500">深入了解全面分析</p>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">个人测评</h1>
        <Progress 
          value={(currentStep / totalSteps) * 100} 
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-2">
          完成进度: {currentStep} / {totalSteps}
        </p>
      </div>
      
      <div className="mt-8">
        {ModeSelector()}
        {renderCurrentStep()}
      </div>
      
      <AchievementSystem progress={progress} />
    </div>
  )
} 