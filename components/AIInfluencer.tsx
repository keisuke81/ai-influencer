'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PostHistory } from './PostHistory'
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

interface Post {
  content: string
  timestamp: string
  platform: string
}

export default function AIInfluencer() {
  const [character, setCharacter] = useState('')
  const [topic, setTopic] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateContent = async () => {
    if (!character || !topic) {
      toast({
        title: "エラー",
        description: "キャラクター設定とテーマを入力してください。",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ character, topic }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'コンテンツの生成に失敗しました')
      }
      
      setGeneratedContent(data.content)
      toast({
        title: "成功",
        description: "コンテンツが生成されました！",
      })
    } catch (error: any) {
      console.error('Error generating content:', error)
      toast({
        title: "エラー",
        description: error.message || "コンテンツの生成に失敗しました。",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const postToSNS = async (platform: 'X' | 'TikTok') => {
    const newPost = {
      content: generatedContent,
      timestamp: new Date().toLocaleString('ja-JP'),
      platform
    }
    setPosts([newPost, ...posts])
    toast({
      title: "投稿完了",
      description: `${platform}に投稿しました！`,
    })
  }

  const saveCharacter = () => {
    if (!character) {
      toast({
        title: "エラー",
        description: "キャラクター設定を入力してください。",
        variant: "destructive"
      })
      return
    }
    localStorage.setItem('aiCharacter', character)
    toast({
      title: "保存完了",
      description: "キャラクター設定を保存しました。",
    })
  }

  const loadCharacter = () => {
    const saved = localStorage.getItem('aiCharacter')
    if (saved) {
      setCharacter(saved)
      toast({
        title: "読み込み完了",
        description: "キャラクター設定を読み込みました。",
      })
    } else {
      toast({
        title: "エラー",
        description: "保存されたキャラクター設定がありません。",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AIインフルエンサー設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="character">キャラクター設定</Label>
            <div className="flex gap-2">
              <Textarea
                id="character"
                placeholder="キャラクターの性格、口調、特徴などを入力してください"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Button onClick={saveCharacter} variant="outline">保存</Button>
                <Button onClick={loadCharacter} variant="outline">読込</Button>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="topic">話題のテーマ</Label>
            <Input
              id="topic"
              placeholder="現在のトレンドや話題を入力してください"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <Button onClick={generateContent} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              'コンテンツを生成'
            )}
          </Button>
          {generatedContent && (
            <div>
              <Label>生成されたコンテンツ</Label>
              <Textarea value={generatedContent} readOnly className="mt-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button onClick={() => postToSNS('X')} disabled={!generatedContent}>Xに投稿</Button>
          <Button onClick={() => postToSNS('TikTok')} disabled={!generatedContent}>TikTokに投稿</Button>
        </CardFooter>
      </Card>

      <PostHistory posts={posts} />
    </div>
  )
}

