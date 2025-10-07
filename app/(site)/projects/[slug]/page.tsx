import { notFound } from 'next/navigation'
import { getProject } from '@/lib/mdx'
import { Metadata } from 'next'
import { generateMetadata as seo } from '@/lib/seo'

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) return {}
  return seo({ title: project.title, description: project.description, path: `/projects/${project.slug}` })
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug)
  if (!project) return notFound()

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{project.title}</h1>
      <p className="lead">{project.description}</p>
      <div className="not-prose mt-4">
        {project.github && (
          <a className="underline" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
        )}
        {project.demo && (
          <a className="underline ml-4" href={project.demo} target="_blank" rel="noreferrer">Demo</a>
        )}
      </div>
      <div className="mt-6 whitespace-pre-wrap">
        {project.content}
      </div>
    </article>
  )
}


