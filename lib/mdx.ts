import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  content: string
  readingTime: number
}

export interface Project {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  github?: string
  demo?: string
  featured: boolean
}

export function getPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const readingTime = Math.ceil(content.split(/\s+/).length / 200)
      
      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        tags: data.tags || [],
        content,
        readingTime,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export function getPost(slug: string): Post | null {
  try {
    const fullPath = path.join(contentDirectory, 'posts', `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const readingTime = Math.ceil(content.split(/\s+/).length / 200)
    
    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      tags: data.tags || [],
      content,
      readingTime,
    }
  } catch {
    return null
  }
}

export function getProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  const fileNames = fs.readdirSync(projectsDirectory)
  
  const projects = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        content,
        github: data.github,
        demo: data.demo,
        featured: data.featured || false,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return projects
}

export function getProject(slug: string): Project | null {
  try {
    const fullPath = path.join(contentDirectory, 'projects', `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      content,
      github: data.github,
      demo: data.demo,
      featured: data.featured || false,
    }
  } catch {
    return null
  }
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(project => project.featured)
}

