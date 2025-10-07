import Link from 'next/link'
import { getPosts } from '@/lib/mdx'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export default function BlogPage() {
  const posts = getPosts()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</p>
                <div className="mt-3 text-xs text-foreground/60">{post.readingTime} min read</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


