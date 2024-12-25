import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Post {
  content: string
  timestamp: string
  platform: string
}

interface PostHistoryProps {
  posts: Post[]
}

export function PostHistory({ posts }: PostHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿履歴</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {posts.map((post, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="text-sm text-muted-foreground mb-2">
                {post.platform} - {post.timestamp}
              </div>
              <p className="text-sm">{post.content}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

