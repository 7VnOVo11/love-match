'use client'

import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'

interface Question {
  id: number
  text: string
  options: {
    value: number
    label: string
  }[]
}

const personalityQuestions: Question[] = [
  {
    id: 1,
    text: "在社交场合中,我通常会:",
    options: [
      { value: 1, label: "主动与他人交谈" },
      { value: 2, label: "等待他人来与我交谈" },
      { value: 3, label: "保持安静观察" },
      { value: 4, label: "感到不自在" }
    ]
  },
  {
    id: 2,
    text: "面对新的挑战时,我倾向于:",
    options: [
      { value: 1, label: "立即行动" },
      { value: 2, label: "仔细规划后再行动" },
      { value: 3, label: "寻求他人建议" },
      { value: 4, label: "观望一段时间" }
    ]
  },
  {
    id: 3,
    text: "在团队合作中,我更喜欢:",
    options: [
      { value: 1, label: "担任领导角色" },
      { value: 2, label: "提供创意和建议" },
      { value: 3, label: "执行具体任务" },
      { value: 4, label: "协调沟通" }
    ]
  },
  // 更多问题...
]

interface Props {
  mode: 'quick' | 'full'
  onComplete: (data: any) => void
}

export default function PersonalityAssessment({ mode, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [error, setError] = useState<string>('')

  // 根据mode选择显示的问题数量
  const questions = mode === 'quick' 
    ? personalityQuestions.slice(0, 2) // 快速模式只显示2个核心问题
    : personalityQuestions // 完整模式显示所有问题
    
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    setError('')
  }

  const handleSubmit = () => {
    // 检查是否所有问题都已回答
    if (Object.keys(answers).length < questions.length) {
      setError('请回答所有问题后再提交')
      return
    }

    // 计算性格特质得分
    const results = {
      answers,
      // 这里可以添加更多的分析结果
      timestamp: new Date().toISOString()
    }

    onComplete(results)
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-semibold">性格特质评估</h2>
        <p className="text-gray-600 mt-2">
          请根据您的真实想法选择最符合的选项
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      <div className="space-y-6">
        {questions.map(question => (
          <div key={question.id} className="p-4 bg-white rounded-lg shadow">
            <p className="text-lg font-medium mb-4">{question.text}</p>
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswer(question.id, Number(value))}
              className="space-y-2"
            >
              {question.options.map(option => (
                <div key={option.value} className="flex items-center">
                  <RadioGroup.Item
                    value={option.value}
                    id={`q${question.id}-o${option.value}`}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={`q${question.id}-o${option.value}`}
                    className="ml-2 text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          className="px-8"
        >
          提交评估
        </Button>
      </div>
    </div>
  )
} 