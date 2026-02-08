<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="keywords" :content="keywords" />
    <Meta name="author" :content="author" />

    <!-- Open Graph -->
    <Meta property="og:type" :content="ogType" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:url" :content="url" />
    <Meta property="og:site_name" content="Vue 3 Playground" />
    <Meta v-if="image" property="og:image" :content="image" />
    <Meta v-if="image" property="og:image:alt" :content="imageAlt" />

    <!-- Twitter -->
    <Meta property="twitter:card" :content="twitterCard" />
    <Meta property="twitter:title" :content="title" />
    <Meta property="twitter:description" :content="description" />
    <Meta v-if="image" property="twitter:image" :content="image" />

    <!-- Structured Data -->
    <Script type="application/ld+json" :content="structuredData" />
  </Head>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Head, Title, Meta, Script } from 'vue-meta'
import { generateMetaTags, generateStructuredData } from '@/utils/seo'

interface Props {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'blog' | 'product'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'website',
  twitterCard: 'summary_large_image',
  ogType: 'website',
})

const metaTags = computed(() =>
  generateMetaTags({
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    image: props.image,
    url: props.url,
    type: props.type,
    publishedTime: props.publishedTime,
    modifiedTime: props.modifiedTime,
    authors: props.authors,
    section: props.section,
  })
)

const structuredData = computed(() =>
  JSON.stringify(
    generateStructuredData({
      title: props.title,
      description: props.description,
      keywords: props.keywords,
      image: props.image,
      url: props.url,
      type: props.type,
      publishedTime: props.publishedTime,
      modifiedTime: props.modifiedTime,
      authors: props.authors,
      section: props.section,
    }),
    null,
    2
  )
)
</script>