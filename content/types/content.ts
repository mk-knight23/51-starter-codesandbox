export interface ContentMeta {
  title: string
  description: string
  date: string
  author: string
  category?: string
  tags?: string[]
  image?: string
  slug?: string
}

export interface BlogPost extends ContentMeta {
  content: string
  excerpt?: string
  readTime?: number
}

export interface DocumentationPage extends ContentMeta {
  content: string
  order?: number
  section?: string
}

export type Content = BlogPost | DocumentationPage

export interface ContentIndex {
  [key: string]: Content
}

export interface ContentGroup {
  [category: string]: Content[]
}