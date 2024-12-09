'use client'

import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface HabitQuestion {
  id: number
  category: string
  text: string
  frequency: {
    value: number
    label: string
    description: string
  }[]
  suggestion?: string
}

const habitQuestions: HabitQuestion[] = [
  {
    id: 1,
    category: "作息习惯",
    text: "我能保持规律的作息时间",
    frequency: [
      { value: 1, label: "从不", description: "作息时间完全不固定" },
      { value: 2, label: "偶尔", description: "有时能保持规律作息" },
      { value: 3, label: "经常", description: "大多数时候作息规律" },
      { value: 4, label: "总是", description: "始终保持规律的作息时间" }
    ],
    suggestion: "建议制定固定的作息计划,并逐步培养规律的生活习惯"
  },
  {
    id: 2,
    category: "运动习惯",
    text: "每周进行规律运动的频率",
    frequency: [
      { value: 1, label: "从不", description: "几乎不运动" },
      { value: 2, label: "偶尔", description: "每周运动1-2次" },
      { value: 3, label: "经常", description: "每周运动3-4次" },
      { value: 4, label: "总是", description: "每周运动5次以上" }
    ],
    suggestion: "建议每周至少进行3次中等强度运动,每次30分钟以上"
  },
  {
    id: 3,
    category: "学习习惯",
    text: "我会主动学习新知识和技能",
    frequency: [
      { value: 1, label: "从不", description: "对学习新东西没有兴趣" },
      { value: 2, label: "偶尔", description: "有时会学习感兴趣的内容" },
      { value: 3, label: "经常", description: "经常学习新知识" },
      { value: 4, label: "总是", description: "持续保持学习的习惯" }
    ],
    suggestion: "建议培养终身学习的习惯,每天固定时间用于学习"
  },
  {
    id: 4,
    category: "工作习惯",
    text: "我能够专注地完成工作任务",
    frequency: [
      { value: 1, label: "从不", description: "经常分心,难以专注" },
      { value: 2, label: "偶尔", description: "有时能保持专注" },
      { value: 3, label: "经常", description: "大多数时候能专注工作" },
      { value: 4, label: "总是", description: "始终保持高度专注" }
    ],
    suggestion: "建议使用番茄工作法,合理安排工作时间和休息时间"
  }
]

export default function HabitsAnalysis({
  onComplete
}: {
  onComplete: (data: any) => void
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [error, setError] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<Record<number, boolean>>({})
  const [feedback, setFeedback] = useState<Record<number, string>>({})

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    setError('')
    
    // 如果选择的是较低频率,显示建议
    if (value <= 2) {
      setShowSuggestions(prev => ({
        ...prev,
        [questionId]: true
      }))
    }
    
    // 显示即时反馈
    const feedback = getFeedback(questionId, value)
    setFeedback(prev => ({...prev, [questionId]: feedback}))
    
    // 添加一些趣味性的动画效果
    triggerConfetti() // 当完成一定数量的问题时
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < habitQuestions.length) {
      setError('请完成所有习惯的评估')
      return
    }

    const results = {
      answers,
      categories: habitQuestions.reduce((acc, question) => {
        acc[question.category] = answers[question.id]
        return acc
      }, {} as Record<string, number>),
      suggestions: habitQuestions
        .filter(q => answers[q.id] <= 2)
        .map(q => ({
          category: q.category,
          suggestion: q.suggestion
        })),
      timestamp: new Date().toISOString()
    }

    onComplete(results)
  }

  // 添加有趣的统计对比
  const StatComparison = ({ value, category }: { value: number, category: string }) => (
    <div className="text-sm text-gray-600 mt-2">
      <span>有 {getPercentage(value, category)}% 的用户与您选择相同</span>
    </div>
  )

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-semibold">生活习惯分析</h2>
        <p className="text-gray-600 mt-2">
          请评估您在各个方面的习惯表现频率
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      <div className="space-y-6">
        {habitQuestions.map(question => (
          <Card key={question.id} className="p-6">
            <div className="space-y-4">
              <div>
                <span className="inline-block px-2 py-1 text-sm bg-green-100 text-green-800 rounded-md mb-2">
                  {question.category}
                </span>
                <h3 className="text-lg font-medium">{question.text}</h3>
              </div>

              <RadioGroup
                value={answers[question.id]}
                onValueChange={(value) => handleAnswer(question.id, Number(value))}
                className="space-y-3"
              >
                {question.frequency.map(freq => (
                  <div 
                    key={freq.value}
                    className="relative flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <RadioGroup.Item
                        value={freq.value}
                        id={`q${question.id}-f${freq.value}`}
                        className="absolute inset-0 rounded-lg"
                      />
                      <label
                        htmlFor={`q${question.id}-f${freq.value}`}
                        className="font-medium text-gray-900"
                      >
                        {freq.label}
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        {freq.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {showSuggestions[question.id] && question.suggestion && (
                <div className="mt-4">
                  <Separator className="my-4" />
                  <div className="text-sm text-orange-600">
                    <span className="font-medium">建议: </span>
                    {question.suggestion}
                  </div>
                </div>
              )}

              {feedback[question.id] && (
                <StatComparison value={answers[question.id]} category={question.category} />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          className="px-8"
        >
          提交习惯分析
        </Button>
      </div>
    </div>
  )
} 