import { notFound } from 'next/navigation'
import { getPost } from '@/lib/mdx'
import { Metadata } from 'next'
import { generateMetadata as seo } from '@/lib/seo'

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return seo({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` })
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug)
  if (!post) return notFound()

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p className="lead">{post.excerpt}</p>
      <div className="mt-6 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  )
}


