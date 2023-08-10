import { ChangeEvent, ReactNode } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SortBy } from "@/enums/sortBy"
import Head from "next/head"
import { ALLOW_INDEXING, SITE_DOMAIN_NAME, SITE_DOMAIN_URL } from "@/data/site-settings"

interface LayoutProps {
    indexed?: boolean
    children?: ReactNode
    onSorterOrderChange?: (sortOption: SortBy) => void
    onSearchInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
    seo: {
        title: string
        description: string
    }
}

const Layout = ({
    children,
    onSorterOrderChange,
    onSearchInputChange,
    indexed = true,
    seo,
}: LayoutProps) => {
    const robotsContent = (ALLOW_INDEXING && indexed) ? "index, follow" : "noindex, nofollow"
    return (
        <>
            <Head>
                <title>{`${seo.title.trim()} | ${SITE_DOMAIN_NAME}`}</title>

                <link rel="canonical" href={SITE_DOMAIN_URL} />

                <meta name="robots" content={robotsContent} />
                <meta name="description" content={`${seo.description.trim()} | ${SITE_DOMAIN_NAME}`} />

                <meta name="og:title" content={`${seo.title.trim()} | ${SITE_DOMAIN_NAME}`} />
                <meta name="og:locale" content="sv_SE" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content={SITE_DOMAIN_NAME} />
                <meta name="og:url" content={SITE_DOMAIN_URL} />
                <meta name="og:description" content={`${seo.description.trim()} | ${SITE_DOMAIN_NAME}`} />

                <meta name="twitter:description" content={`${seo.description.trim()} | ${SITE_DOMAIN_NAME}`} />
                <meta name="twitter:card" content="summary" />

            </Head>
            <Header
                onSorterOrderChange={onSorterOrderChange}
                onSearchInputChange={onSearchInputChange}
            />
            {children}
            <Footer />
        </>
    )
}

export default Layout