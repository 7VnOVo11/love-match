'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Target, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  condition: (progress: any) => boolean
  reward?: string
}

const achievements: Achievement[] = [
  {
    id: 'quick_start',
    title: '开启探索之旅',
    description: '完成第一个测评问题',
    icon: <Target className="w-6 h-6 text-blue-500" />,
    condition: (progress) => Object.keys(progress.answers || {}).length >= 1,
    reward: '解锁详细解析'
  },
  {
    id: 'half_way',
    title: '半程旅人',
    description: '完成50%的测评',
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    condition: (progress) => progress.completionRate >= 50,
    reward: '获得中期分析报告'
  },
  {
    id: 'deep_thinker',
    title: '深度思考者',
    description: '在一个问题上思考超过30秒',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    condition: (progress) => progress.thoughtfulAnswers >= 1,
    reward: '解锁个性化建议'
  }
]

export default function AchievementSystem({ progress }: { progress: any }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [showAnimation, setShowAnimation] = useState(false)
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // 检查是否有新解锁的成就
    achievements.forEach(achievement => {
      if (
        !unlockedAchievements.includes(achievement.id) && 
        achievement.condition(progress)
      ) {
        setUnlockedAchievements(prev => [...prev, achievement.id])
        setLatestAchievement(achievement)
        setShowAnimation(true)
        
        // 显示成就解锁提示
        toast.success(`🎉 解锁成就: ${achievement.title}`, {
          description: achievement.reward ? `奖励: ${achievement.reward}` : undefined,
          duration: 5000,
        })
      }
    })
  }, [progress])

  return (
    <>
      {/* 成就展示区 */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <AnimatePresence>
          {showAnimation && latestAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="p-4"
            >
              <Card className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <div className="flex items-center gap-3">
                  {latestAchievement.icon}
                  <div>
                    <h4 className="font-semibold">{latestAchievement.title}</h4>
                    <p className="text-sm opacity-90">{latestAchievement.description}</p>
                  </div>
                </div>
                {latestAchievement.reward && (
                  <Badge className="mt-2 bg-white/20">
                    {latestAchievement.reward}
                  </Badge>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 成就统计 */}
      <div className="fixed top-4 right-4">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">
              {unlockedAchievements.length} / {achievements.length}
            </span>
          </div>
        </Card>
      </div>
    </>
  )
} 