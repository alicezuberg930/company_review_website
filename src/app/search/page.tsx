"use client"

import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getScoreClasses } from "@/lib/utils"
import {
    ArrowRight,
    Building2,
    CalendarDays,
    Globe,
    MapPin,
    Menu,
    Star,
} from "lucide-react"

const filterOptions = [
    {
        type: "company-type",
        options: [
            "Công ty TNHH 1 thành viên",
            "Công ty cổ phần",
            "Công ty vốn ngoài nhà nước",
            "Chi nhánh DN nước ngoài",
        ],
    },
    {
        type: "status",
        options: [
            "Đang hoạt động",
            "Đã chuyển chủ quyền quản lý",
            "Ngừng hoạt động và đã đóng MST",
        ],
    },
] as const

type FilterType = (typeof filterOptions)[number]["type"]

const results = [
    {
        title: "Northstar Analytics",
        tagline: "Business intelligence platform for distributed teams",
        category: "SaaS",
        founded: "2018",
        location: "New York, NY",
        score: 8.8,
        description: "Northstar combines data pipelines, reporting, and team collaboration into a single workspace. Employees mention strong mentorship and aggressive promotion timelines.",
        highlights: ["Remote work", "Clear KPIs", "Diversity-first hiring"],
        platform: "Global",
        filters: {
            "company-type": "Công ty cổ phần",
            status: "Đang hoạt động",
        },
    },
    {
        title: "Morrow Studio",
        tagline: "Creative design and branding agency",
        category: "Creative",
        founded: "2015",
        location: "Austin, TX",
        score: 7.4,
        description:
            "A high-energy studio with strong design leadership and cross-team collaboration. Reviewers note good learning opportunities alongside tight deadlines.",
        highlights: ["Mentor support", "Portfolio visibility", "Flexible Fridays"],
        platform: "United States",
        filters: {
            "company-type": "Chi nhánh DN nước ngoài",
            status: "Đang hoạt động",
        },
    },
    {
        title: "Common Goods Co.",
        tagline: "Consumer goods retail and logistics",
        category: "Retail",
        founded: "2012",
        location: "Remote",
        score: 6.6,
        description:
            "Known for approachable leadership and transparent communication. Employees cite consistent workload balance and a structured review process.",
        highlights: ["Work-life balance", "Manager support", "Operations depth"],
        platform: "Global",
        filters: {
            "company-type": "Công ty TNHH 1 thành viên",
            status: "Đã chuyển chủ quyền quản lý",
        },
    },
    {
        title: "Nexora Labs",
        tagline: "AI-enabled collaboration tools for enterprise teams",
        category: "Technology",
        founded: "2017",
        location: "San Francisco, CA",
        score: 5.1,
        description:
            "A startup with a strong learning culture and ambitious roadmap. Mixed reviews around work pace and support but positive direction for career growth.",
        highlights: ["Fast growth", "Technical depth", "High ownership"],
        platform: "United States",
        filters: {
            "company-type": "Công ty cổ phần",
            status: "Đang hoạt động",
        },
    },
    {
        title: "Redpine Logistics",
        tagline: "Shipping tech and supply-chain optimization",
        category: "Logistics",
        founded: "2014",
        location: "Chicago, IL",
        score: 4.3,
        description:
            "Operationally stable with clear process playbooks. Lower scores note limited flexibility and communication gaps in some departments.",
        highlights: ["Structured operations", "Benefits", "Legacy systems"],
        platform: "North America",
        filters: {
            "company-type": "Công ty vốn ngoài nhà nước",
            status: "Ngừng hoạt động và đã đóng MST",
        },
    },
]

const topFilters = ["All", "Top rated", "Most reviewed", "Remote friendly", "New"]

export default function Page() {
    const [selectedFilters, setSelectedFilters] = useState<Record<FilterType, string[]>>({})

    const filteredResults = useMemo(() => {
        return results.filter((result) => {
            return filterOptions.every((group) => {
                const selected = selectedFilters[group.type]
                if (!selected?.length) return true
                return selected.includes(result.filters[group.type as FilterType])
            })
        })
    }, [selectedFilters])

    const handleFilterChange = (groupType: FilterType, option: string, checked: boolean | "indeterminate") => {
        setSelectedFilters((prev) => {
            const current = prev[groupType] ?? []
            const next = checked === true ? [...current, option] : current.filter((item) => item !== option)
            const uniqueNext = [...new Set(next)]

            if (!uniqueNext.length) {
                const nextState = { ...prev }
                delete nextState[groupType]
                return nextState
            }

            return { ...prev, [groupType]: uniqueNext }
        })
    }

    const hasActiveFilters = Object.keys(selectedFilters).some((type) => selectedFilters[type]?.length > 0)

    return (
        <main className='min-h-screen bg-[#fbfcff] text-slate-950'>
            <header className='sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl'>
                <div className='mx-auto flex h-18 max-w-7xl items-center justify-between px-2'>
                    <a href='/' className='flex items-center gap-2.5' aria-label='Congtytui.me home'>
                        <span className='grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
                            <Building2 className='size-5' />
                        </span>
                        <span className='text-xl font-extrabold tracking-tight'>Congtytui.me</span>
                    </a>
                    <nav className='hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex'>
                        <a href='/' className='transition hover:text-primary'>
                            Home
                        </a>
                        <a href='/?#companies' className='transition hover:text-primary'>
                            Companies
                        </a>
                        <a href='/?#reviews' className='transition hover:text-primary'>
                            Reviews
                        </a>
                        <a href='/?#categories' className='transition hover:text-primary'>
                            Explore
                        </a>
                    </nav>
                    <Menu className='size-5 text-slate-600 md:hidden' />
                </div>
            </header>

            <section className='mx-auto max-w-7xl px-2 py-7'>
                <div className='mb-5 flex flex-wrap items-center gap-2'>
                    {topFilters.map((filter) => (
                        <button
                            key={filter}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === "All" ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"}`}
                            type='button'
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <p className='text-xs font-semibold uppercase tracking-[.16em] mb-3 text-slate-500'>
                    Showing {filteredResults.length} results
                </p>
                <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]'>
                    <div className='space-y-4'>
                        {filteredResults.map((result) => (
                            <article
                                key={result.title}
                                className='rounded-3xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-100/80 sm:p-5'
                            >
                                <div className='flex gap-4'>
                                    <div className='grid size-14 flex-none place-items-center rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 text-xs font-black text-slate-600'>
                                        {result.category.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <div className='flex flex-wrap items-center gap-2'>
                                            <h2 className='text-2xl font-bold tracking-tight text-slate-900'>{result.title}</h2>
                                            <span className='rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500'>
                                                {result.tagline}
                                            </span>
                                        </div>
                                        <div className='mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500'>
                                            <span className='inline-flex items-center gap-1'>
                                                <CalendarDays className='size-3.5' />
                                                Since {result.founded}
                                            </span>
                                            <span className='inline-flex items-center gap-1'>
                                                <MapPin className='size-3.5' />
                                                {result.location}
                                            </span>
                                            <span className='inline-flex items-center gap-1'>
                                                <Globe className='size-3.5' />
                                                {result.platform}
                                            </span>
                                        </div>
                                        <p className='mt-3 text-sm leading-6 text-slate-600'>{result.description}</p>
                                        <div className='mt-4 flex flex-wrap gap-2'>
                                            {result.highlights.map((item) => (
                                                <span
                                                    key={item}
                                                    className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600'
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='ml-auto hidden w-16 flex-none sm:block'>
                                        <div
                                            className={`mx-auto grid size-14 place-items-center rounded-full border-2 bg-gradient-to-br from-white to-transparent p-0.5 font-black ${getScoreClasses(result.score)} ring-2`}
                                        >
                                            <span className='grid size-12 place-items-center rounded-full'>{result.score}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className='space-y-4'>
                        <div className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
                            <div className='mb-4 flex items-center justify-between'>
                                <h3 className='text-sm font-bold uppercase tracking-[.16em] text-slate-500'>Filters</h3>
                                {hasActiveFilters && (
                                    <button
                                        type='button'
                                        onClick={() => setSelectedFilters({})}
                                        className='text-xs font-semibold text-primary transition hover:underline'
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <div className='space-y-5'>
                                {filterOptions.map((group) => (
                                    <div key={group.type} className='space-y-3'>
                                        <p className='border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-[.14em] text-slate-500'>
                                            {group.type}
                                        </p>
                                        <div className='space-y-3 pt-3'>
                                            {group.options.map((option) => (
                                                <Label key={option} className='flex items-center gap-3 text-sm text-slate-700'>
                                                    <Checkbox
                                                        checked={(selectedFilters[group.type] ?? []).includes(option)}
                                                        onCheckedChange={(checked: boolean | "indeterminate") => {
                                                            handleFilterChange(group.type, option, checked)
                                                        }}
                                                    />
                                                    <span>{option}</span>
                                                </Label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <footer className='border-t border-slate-200 bg-white'>
                <div className='mx-auto flex max-w-7xl flex-col gap-5 px-2 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-2 font-bold text-slate-900'>
                        <Building2 className='size-5 text-primary' /> Congtytui.me
                    </div>
                    <p>© 2026 Congtytui.me. Better workplaces start with the truth.</p>
                    <div className='flex gap-5'>
                        <a href='#' className='hover:text-primary'>
                            Privacy
                        </a>
                        <a href='#' className='hover:text-primary'>
                            Terms
                        </a>
                        <a href='#' className='hover:text-primary'>
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
