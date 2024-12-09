'use client'

import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'

interface ValueQuestion {
  id: number
  category: string
  text: string
  description: string
  options: {
    value: number
    label: string
    description: string
  }[]
}

const valueQuestions: ValueQuestion[] = [
  {
    id: 1,
    category: "成就与发展",
    text: "个人成就对我来说意味着什么？",
    description: "这个问题旨在了解您对个人成功的定义和追求",
    options: [
      { 
        value: 1, 
        label: "社会地位和认可",
        description: "获得他人的尊重和社会认可是最重要的"
      },
      { 
        value: 2, 
        label: "个人成长与学习",
        description: "不断学习和提升自我是最有价值的"
      },
      { 
        value: 3, 
        label: "财务独立",
        description: "实现经济自由和财务安全是首要目标"
      },
      { 
        value: 4, 
        label: "自我实现",
        description: "实现个人理想和抱负是最大的成就"
      }
    ]
  },
  {
    id: 2,
    category: "人际关系",
    text: "在人际交往中,我最看重:",
    description: "这个问题帮助了解您在社交关系中最重视的方面",
    options: [
      { 
        value: 1, 
        label: "真诚与信任",
        description: "建立在诚信基础上的深厚友谊"
      },
      { 
        value: 2, 
        label: "互惠与合作",
        description: "能够互相帮助和支持的关系"
      },
      { 
        value: 3, 
        label: "理解与包容",
        description: "能够相互理解和接纳差异"
      },
      { 
        value: 4, 
        label: "独立与边界",
        description: "保持适当距离的理性关系"
      }
    ]
  },
  {
    id: 3,
    category: "生活方式",
    text: "理想的生活方式是:",
    description: "这个问题探索您对生活品质的追求",
    options: [
      { 
        value: 1, 
        label: "稳定与安逸",
        description: "平稳有序、生活质量有保障"
      },
      { 
        value: 2, 
        label: "冒险与挑战",
        description: "充满新鲜感和挑战性的生活"
      },
      { 
        value: 3, 
        label: "简单与自由",
        description: "不受束缚、随心所欲的生活"
      },
      { 
        value: 4, 
        label: "充实与平衡",
        description: "工作与生活平衡、内容丰富"
      }
    ]
  }
]

export default function ValuesAssessment({
  onComplete
}: {
  onComplete: (data: any) => void
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [error, setError] = useState<string>('')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    setError('')
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length < valueQuestions.length) {
      setError('请完成所有价值观问题的评估')
      return
    }

    const results = {
      answers,
      categories: valueQuestions.reduce((acc, question) => {
        acc[question.category] = answers[question.id]
        return acc
      }, {} as Record<string, number>),
      timestamp: new Date().toISOString()
    }

    onComplete(results)
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-semibold">价值观调查</h2>
        <p className="text-gray-600 mt-2">
          请根据您的真实想法和感受,选择最符合您价值观的选项
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      <div className="space-y-8">
        {valueQuestions.map(question => (
          <Card 
            key={question.id} 
            className="p-6"
          >
            <div className="space-y-4">
              <div>
                <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-md mb-2">
                  {question.category}
                </span>
                <h3 className="text-lg font-medium">{question.text}</h3>
                <p className="text-gray-600 text-sm mt-1">{question.description}</p>
              </div>

              <RadioGroup
                value={answers[question.id]}
                onValueChange={(value) => handleAnswer(question.id, Number(value))}
                className="space-y-3"
              >
                {question.options.map(option => (
                  <div 
                    key={option.value}
                    className="relative flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <RadioGroup.Item
                        value={option.value}
                        id={`q${question.id}-o${option.value}`}
                        className="absolute inset-0 rounded-lg"
                      />
                      <label
                        htmlFor={`q${question.id}-o${option.value}`}
                        className="font-medium text-gray-900"
                      >
                        {option.label}
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          className="px-8"
        >
          提交价值观调查
        </Button>
      </div>
    </div>
  )
} 