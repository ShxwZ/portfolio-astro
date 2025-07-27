import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).default([]),
        author: z.string().default("Gabriel García Pellizzón"),
        lang: z.enum(["es", "en"]).default("es"),
        draft: z.boolean().default(false),
        relatedPosts: z
            .object({
                es: z.string().optional(),
                en: z.string().optional(),
                fallback: z.string(),
            })
            .optional(),
    }),
});

export const collections = { blog };
