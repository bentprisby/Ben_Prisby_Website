import Link from 'next/link'
import { getProjects } from '@/lib/mdx'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function ProjectsPage() {
  const projects = getProjects()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">{project.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 line-clamp-3">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags?.slice(0, 4).map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


