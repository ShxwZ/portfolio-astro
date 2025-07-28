---
title: "Mi primer post del blog"
description: "Este es mi primer post usando Markdown en Astro. Aquí explico las ventajas de usar un generador estático."
heroImage: "/assets/images/astro-logo.webp"
pubDate: 2025-01-15
tags: ["astro", "markdown", "blog", "desarrollo-web"]
lang: "es"
relatedPosts:
  en: "primer-post-en"
  fallback: "/en/blog"
---

¡Bienvenidos a mi nuevo blog! Este es el primer post escrito completamente en **Markdown** usando las capacidades nativas de Astro.

## ¿Por qué Astro para blogs?

Astro es perfecto para blogs porque:

- 🚀 **Rendimiento increíble**: Genera sitios estáticos súper rápidos
- 📝 **Soporte nativo para Markdown**: Sin configuración adicional
- 🎨 **Componentes reutilizables**: Mezcla Markdown con componentes Astro
- 🌍 **SEO optimizado**: Meta tags y estructura perfecta para buscadores

## Características del blog

Este blog incluirá:

1. **Posts en Markdown** con frontmatter
2. **Sistema de tags** para categorizar contenido
3. **Soporte multiidioma** (español e inglés)
4. **Imágenes optimizadas** automáticamente
5. **Modo oscuro/claro** heredado del portfolio

### Código de ejemplo

```typescript
// Ejemplo de como obtener posts en Astro
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const publishedPosts = allPosts.filter(post => !post.data.draft);
```

## Próximos posts

Estaré escribiendo sobre:

- Mejores prácticas en Astro
- Optimización de rendimiento web
- Experiencias con TypeScript
- Proyectos interesantes

¡Gracias por leer! 🚀

