import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI APIキーが設定されていません')
    }

    const { character, topic } = await req.json()

    if (!character || !topic) {
      throw new Error('キャラクター設定とトピックは必須です')
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `あなたは以下の特徴を持つAIインフルエンサーです：${character}`
        },
        {
          role: "user",
          content: `${topic}について、SNSに投稿する内容を280文字以内で生成してください。ハッシュタグも含めてください。`
        }
      ],
    })

    const generatedContent = completion.choices[0].message.content

    if (!generatedContent) {
      throw new Error('コンテンツが生成されませんでした')
    }

    return NextResponse.json({ content: generatedContent })

  } catch (error: any) {
    console.error('OpenAI API error:', error)
    
    return NextResponse.json(
      { error: error.message || 'コンテンツの生成に失敗しました' },
      { status: error.status || 500 }
    )
  }
}

