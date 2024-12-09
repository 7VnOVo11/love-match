'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function BasicInfoForm({
  onComplete
}: {
  onComplete: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    allowDataCollection: true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) {
      newErrors.name = '请输入姓名'
    }
    
    if (!formData.age || isNaN(Number(formData.age))) {
      newErrors.age = '请输入有效年龄'
    }
    
    if (!formData.gender) {
      newErrors.gender = '请选择性别'
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效邮箱'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">基本信息</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">年龄</label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            error={errors.age}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">性别</label>
          <Select
            value={formData.gender}
            onChange={(value) => setFormData({...formData, gender: value})}
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '其他', value: 'other' }
            ]}
            error={errors.gender}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">邮箱</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">允许数据收集</span>
          <Switch
            checked={formData.allowDataCollection}
            onCheckedChange={(checked) => 
              setFormData({...formData, allowDataCollection: checked})
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        下一步
      </button>
    </form>
  )
} 