import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export const seoConfig = {
    name: 'Truework',
    title: 'Truework | Honest Company Reviews From Real Employees',
    description: 'Explore honest company reviews, workplace ratings, salaries, benefits, and employee experiences to find a workplace where you can thrive.',
    url: siteUrl,
    locale: 'en_US',
    defaultImage: '/favicon.ico',
    defaultImageWidth: 32,
    defaultImageHeight: 32,
    keywords: [
        'Truework',
        'company reviews',
        'employee reviews',
        'workplace reviews',
        'employer ratings',
        'company culture',
        'employee experience',
        'work-life balance',
        'salary reviews',
        'employee benefits',
        'career advice',
        'best companies to work for',
        'job search',
        'anonymous company reviews'
    ]
} as const

type SeoImage = {
    url?: string
    alt?: string
    width?: number
    height?: number
}

export type CreateSeoMetadataOptions = {
    title?: string
    description?: string
    path?: string
    keywords?: string[]
    image?: string | SeoImage
    noIndex?: boolean
    noFollow?: boolean
}

function getMetadataBase() {
    try {
        return new URL(seoConfig.url)
    } catch {
        return new URL('http://localhost:3001')
    }
}

function normalizePath(path = '/') {
    if (/^https?:\/\//i.test(path)) {
        return path
    }

    return path.startsWith('/') ? path : `/${path}`
}

function formatTitle(title?: string) {
    if (!title) {
        return seoConfig.title
    }

    return title.toLowerCase().includes(seoConfig.name.toLowerCase())
        ? title
        : `${title} | ${seoConfig.name}`
}

function resolveImage(image?: string | SeoImage) {
    if (!image) {
        return {
            url: seoConfig.defaultImage,
            width: seoConfig.defaultImageWidth,
            height: seoConfig.defaultImageHeight,
            alt: `${seoConfig.name} logo`
        }
    }

    const imageConfig = typeof image === 'string' ? { url: image } : image
    const resolvedImage = {
        url: normalizePath(imageConfig.url || seoConfig.defaultImage),
        alt: imageConfig.alt || seoConfig.title
    }

    return {
        ...resolvedImage,
        ...(imageConfig.width ? { width: imageConfig.width } : {}),
        ...(imageConfig.height ? { height: imageConfig.height } : {})
    }
}

export function createSeoMetadata({
    title,
    description = seoConfig.description,
    path = '/',
    keywords = [],
    image,
    noIndex = false,
    noFollow = false
}: CreateSeoMetadataOptions = {}): Metadata {
    const canonicalPath = normalizePath(path)
    const resolvedTitle = formatTitle(title)
    const resolvedImage = resolveImage(image)
    const allowFollow = !noIndex && !noFollow

    return {
        metadataBase: getMetadataBase(),
        title: title ? {
            absolute: resolvedTitle
        } : {
            default: seoConfig.title,
            template: `%s | ${seoConfig.name}`
        },
        description,
        keywords: Array.from(new Set([...seoConfig.keywords, ...keywords])),
        applicationName: seoConfig.name,
        authors: [{ name: seoConfig.name }],
        creator: seoConfig.name,
        publisher: seoConfig.name,
        alternates: {
            canonical: canonicalPath
        },
        icons: {
            icon: seoConfig.defaultImage,
            apple: seoConfig.defaultImage
        },
        robots: {
            index: !noIndex,
            follow: allowFollow,
            googleBot: {
                index: !noIndex,
                follow: allowFollow,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1
            }
        },
        openGraph: {
            type: 'website',
            title: resolvedTitle,
            description,
            url: canonicalPath,
            siteName: seoConfig.name,
            locale: seoConfig.locale,
            images: [resolvedImage]
        },
        twitter: {
            card: 'summary_large_image',
            title: resolvedTitle,
            description,
            images: [resolvedImage.url]
        }
    }
}
