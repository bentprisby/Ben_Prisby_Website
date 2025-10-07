import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getFeaturedProjects, getPosts } from '@/lib/mdx'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 3)
  const posts = getPosts().slice(0, 3)

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Hi, I’m Ben. I build systems.</h1>
        <p className="text-foreground/80 max-w-2xl">
          Applied (Industrial) Engineering at MSU. Founder of Onyx Detailing Solutions. I turn messy operations into measurable systems with data, automation, and clear processes.
        </p>
        <div className="flex gap-3">
          <Button href="/projects">View Projects</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-sky hover:underline">See all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(project => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">{project.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 line-clamp-3">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map(tag => <Badge key={tag}>{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Writing</h2>
          <Link href="/blog" className="text-sm text-sky hover:underline">Read more</Link>
        </div>
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
      </section>
    </div>
  )
}


