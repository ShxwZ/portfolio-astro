---
title: "My First Blog Post"
description: "This is my first post using Markdown in Astro. Here I explain the advantages of using a static generator."
pubDate: 2025-01-15
tags: ["astro", "markdown", "blog", "web-development"]
lang: "en"
relatedPosts:
  es: "primer-post"
  fallback: "/blog"
---

Welcome to my new blog! This is the first post written entirely in **Markdown** using Astro's native capabilities.

## Why Astro for Blogs?

Astro is perfect for blogs because:

- 🚀 **Incredible performance**: Generates super fast static sites
- 📝 **Native Markdown support**: No additional configuration needed
- 🎨 **Reusable components**: Mix Markdown with Astro components
- 🌍 **SEO optimized**: Perfect meta tags and structure for search engines

## Blog Features

This blog will include:

1. **Markdown posts** with frontmatter
2. **Tag system** to categorize content
3. **Multi-language support** (Spanish and English)
4. **Automatically optimized images**
5. **Dark/light mode** inherited from the portfolio

### Code Example

```typescript
// Example of how to get posts in Astro
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const publishedPosts = allPosts.filter(post => !post.data.draft);
```

## Upcoming Posts

I'll be writing about:

- Best practices in Astro
- Web performance optimization
- Experiences with TypeScript
- Interesting projects

Thanks for reading! 🚀
