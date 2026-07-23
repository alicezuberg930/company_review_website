'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe2,
  Heart,
  MapPin,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
} from 'lucide-react'

type CompanyProfile = {
  id: string
  name: string
  tagline: string
  industry: string
  location: string
  imageUrl: string | null
  score: number
  reviewCount: number
  recommendationRate: number
  ceoApproval: number
  description: string
  founded: string
  companySize: string
  companyType: string
  website: string
  headquarters: string
  specialties: string[]
  categoryScores: Array<{
    label: string
    score: number
  }>
}

type Review = {
  id: number
  user: string
  initials: string
  avatarTone: string
  role: string
  employment: string
  date: string
  rating: number
  verified: boolean
  title: string
  body: string
  pros: string
  cons: string
  helpful: number
}

const nexoraProfile: CompanyProfile = {
  id: 'nexora-labs',
  name: 'Nexora Labs',
  tagline: 'Build what work can become.',
  industry: 'Technology',
  location: 'San Francisco, CA',
  imageUrl: null,
  score: 4.7,
  reviewCount: 386,
  recommendationRate: 92,
  ceoApproval: 88,
  description:
    'Nexora Labs builds collaborative software for modern product teams. The company brings research, design, and engineering into one connected workspace so teams can move from early ideas to shipped products with less friction.',
  founded: '2013',
  companySize: '1,001 - 5,000 employees',
  companyType: 'Privately held',
  website: 'https://example.com',
  headquarters: 'San Francisco, California',
  specialties: ['Product software', 'AI collaboration', 'Developer tools', 'Remote work'],
  categoryScores: [
    { label: 'Culture & values', score: 4.8 },
    { label: 'Work-life balance', score: 4.5 },
    { label: 'Leadership', score: 4.4 },
    { label: 'Career growth', score: 4.6 },
    { label: 'Compensation', score: 4.3 },
  ],
}

const companyProfiles: Record<string, CompanyProfile> = {
  '1': nexoraProfile,
  'nexora-labs': nexoraProfile,
  nexora: nexoraProfile,
}

const ratingBreakdown = [
  { stars: 5, percentage: 78, count: 301 },
  { stars: 4, percentage: 14, count: 54 },
  { stars: 3, percentage: 5, count: 19 },
  { stars: 2, percentage: 2, count: 8 },
  { stars: 1, percentage: 1, count: 4 },
]

const reviews: Review[] = [
  {
    id: 1,
    user: 'Maya R.',
    initials: 'MR',
    avatarTone: 'bg-cyan-100 text-cyan-800',
    role: 'Senior Product Designer',
    employment: 'Current employee, 3+ years',
    date: 'May 18, 2026',
    rating: 5,
    verified: true,
    title: 'A rare mix of ambitious work and genuinely kind people',
    body:
      'The problems are complex, but there is a lot of trust in how teams solve them. I have room to shape strategy, not just execute tickets, and feedback is thoughtful rather than performative.',
    pros: 'Strong design culture, transparent leadership, flexible hours, and teammates who make time to help.',
    cons: 'The pace can be intense around major launches, and priorities sometimes shift quickly.',
    helpful: 48,
  },
  {
    id: 2,
    user: 'Daniel K.',
    initials: 'DK',
    avatarTone: 'bg-amber-100 text-amber-800',
    role: 'Software Engineer',
    employment: 'Current employee, 1+ year',
    date: 'April 29, 2026',
    rating: 4.4,
    verified: true,
    title: 'High ownership with a lot of room to grow',
    body:
      'Engineers are close to customers and have a real say in product direction. The onboarding was structured, and my manager set clear expectations without micromanaging the work.',
    pros: 'Modern stack, excellent peers, useful learning budget, and meaningful ownership from day one.',
    cons: 'Documentation trails the speed of product development in a few older areas.',
    helpful: 31,
  },
  {
    id: 3,
    user: 'Avery T.',
    initials: 'AT',
    avatarTone: 'bg-emerald-100 text-emerald-800',
    role: 'Customer Success Manager',
    employment: 'Former employee, 2 years',
    date: 'March 12, 2026',
    rating: 4,
    verified: true,
    title: 'People-first culture that mostly lives up to the promise',
    body:
      'My team cared deeply about customers and each other. Leadership communicated openly during a difficult reorganization, and I left with stronger skills and lasting friendships.',
    pros: 'Supportive managers, good benefits, diverse teams, and a healthy approach to taking time off.',
    cons: 'Career paths outside the largest departments could be clearer and more consistent.',
    helpful: 24,
  },
]

const ratioBar = (a: number) => {
  return a / 100
}

function Stars({
  rating,
  size = 'md',
}: {
  rating: number
  size?: 'sm' | 'md'
}) {
  const iconSize = size === 'sm' ? 'size-4' : 'size-5'

  return (
    <div
      className='flex items-center gap-1'
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(100, Math.max(0, (rating - star + 1) * 100))

        return (
          <span key={star} className={`relative block ${iconSize}`}>
            <Star className={`${iconSize} fill-slate-200 text-slate-200`} />
            <span
              className='absolute inset-y-0 left-0 overflow-hidden'
              style={{ width: `${fill}%` }}
            >
              <Star
                className={`${iconSize} max-w-none fill-amber-400 text-amber-400`}
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}

function CompanyImage({
  src,
  name,
  industry,
}: {
  src: string | null
  name: string
  industry: string
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  return (
    <div className='relative min-h-80 overflow-hidden rounded-[1.75rem] bg-slate-950 sm:min-h-105'>
      {src && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} office`}
          className='absolute inset-0 size-full object-cover'
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className='absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,.34),transparent_30%),radial-gradient(circle_at_82%_72%,color-mix(in_oklch,var(--primary)_55%,transparent),transparent_36%),linear-gradient(145deg,#0f172a,#172554_55%,#0f172a)]'>
          <div className='absolute -left-12 bottom-12 size-44 rounded-full border border-white/15' />
          <div className='absolute -left-2 bottom-22 size-28 rounded-full border border-white/10' />
          <div className='absolute -right-16 -top-16 size-60 rotate-12 rounded-[3rem] border border-white/10 bg-white/5' />
          <div className='absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.25rem] border border-white/20 bg-white/10 text-5xl font-black tracking-[-0.08em] text-white shadow-2xl backdrop-blur-md sm:size-44 sm:text-6xl'>
            {initials}
          </div>
        </div>
      )}

      <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-cyan-300'>
            {industry}
          </p>
          <p className='mt-2 text-sm text-white/70'>
            Company image unavailable
          </p>
        </div>
        <span className='grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur'>
          <Building2 className='size-5' />
        </span>
      </div>
    </div>
  )
}

export default function CompanyDetailsPage() {
  const params = useParams<{ id: string }>()
  const companyId = params?.id?.toLowerCase() ?? ''
  const company = companyProfiles[companyId] ?? nexoraProfile

  const companyFacts = [
    { label: 'Founded', value: company.founded, icon: CalendarDays },
    { label: 'Company size', value: company.companySize, icon: Users },
    { label: 'Company type', value: company.companyType, icon: Building2 },
    { label: 'Headquarters', value: company.headquarters, icon: MapPin },
  ]

  return (
    <main className='min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950'>
      <header className='sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8'>
          <Link
            href='/'
            className='flex items-center gap-2.5'
            aria-label='Congtytui.me home'
          >
            <span className='grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
              <Building2 className='size-5' />
            </span>
            <span className='text-xl font-extrabold tracking-tight'>
              Congtytui.me
            </span>
          </Link>

          <nav className='hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex'>
            <Link href='/search' className='transition hover:text-primary'>
              Companies
            </Link>
            <a href='#reviews' className='transition hover:text-primary'>
              Reviews
            </a>
            <a href='#company-details' className='transition hover:text-primary'>
              Company details
            </a>
          </nav>

          <div className='hidden items-center gap-3 sm:flex'>
            <Button
              type='button'
              variant='outline'
              className='h-10 rounded-xl px-4 font-bold text-slate-700 hover:border-primary/30 hover:text-primary'
            >
              <Heart className='size-4' />
              Follow
            </Button>
            <a
              href='#write-review'
              className='inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-95'
            >
              Write a review
            </a>
          </div>

          <Button
            type='button'
            variant='outline'
            size='icon'
            className='size-10 rounded-xl sm:hidden'
            aria-label='Open navigation'
          >
            <Menu className='size-5' />
          </Button>
        </div>
      </header>

      <section className='relative bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(34,211,238,.12),transparent_28%),linear-gradient(to_bottom,#fff,#f8fafc)]'>
        <div className='mx-auto max-w-7xl px-5 pb-14 pt-6 lg:px-8 lg:pb-18'>
          <div className='mb-6 flex items-center gap-2 overflow-hidden text-sm text-slate-500'>
            <Link
              href='/search'
              className='inline-flex shrink-0 items-center gap-1 font-semibold transition hover:text-primary'
            >
              <ArrowLeft className='size-4' />
              Companies
            </Link>
            <ChevronRight className='size-4 shrink-0 text-slate-300' />
            <span className='truncate'>{company.industry}</span>
            <ChevronRight className='size-4 shrink-0 text-slate-300' />
            <span className='truncate font-semibold text-slate-800'>
              {company.name}
            </span>
          </div>

          <div className='grid gap-8 lg:grid-cols-[1.04fr_.96fr] lg:items-stretch'>
            <CompanyImage
              src={company.imageUrl}
              name={company.name}
              industry={company.industry}
            />

            <div className='flex flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,.45)] sm:p-8'>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge className='rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50'>
                  <BadgeCheck className='size-4' />
                  Claimed profile
                </Badge>
                <Badge
                  variant='secondary'
                  className='rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600'
                >
                  {company.industry}
                </Badge>
              </div>

              <div className='mt-5'>
                <h1 className='text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl'>
                  {company.name}
                </h1>
                <p className='mt-2 text-base font-medium text-slate-500'>
                  {company.tagline}
                </p>
                <div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500'>
                  <span className='inline-flex items-center gap-1.5'>
                    <MapPin className='size-4 text-primary' />
                    {company.location}
                  </span>
                  <a
                    href={company.website}
                    className='inline-flex items-center gap-1.5 font-semibold text-primary hover:underline'
                  >
                    <Globe2 className='size-4' />
                    Website
                    <ExternalLink className='size-3' />
                  </a>
                </div>
              </div>

              <div className='my-7 h-px bg-slate-100' />

              <div className='grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center'>
                <div className='flex items-end gap-2 sm:block'>
                  <span className='text-6xl font-black leading-none tracking-[-0.07em] text-slate-950'>
                    {company.score}
                  </span>
                  <span className='mb-1 text-sm font-semibold text-slate-400 sm:ml-2'>
                    / 5
                  </span>
                  <div className='mb-0.5 sm:mt-3'>
                    <Stars rating={company.score} />
                  </div>
                  <p className='mb-0.5 text-sm font-semibold text-slate-500 sm:mt-2'>
                    {company.reviewCount} reviews
                  </p>
                </div>

                <div className='space-y-2.5'>
                  {ratingBreakdown.map((rating) => (
                    <div
                      key={rating.stars}
                      className='grid grid-cols-[34px_1fr_34px] items-center gap-3 text-xs'
                    >
                      <span className='font-bold text-slate-500'>
                        {rating.stars} star
                      </span>
                      <span className='h-2 overflow-hidden rounded-full bg-slate-100'>
                        <span
                          className='block h-full rounded-full bg-amber-400'
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </span>
                      <span className='text-right font-semibold text-slate-400'>
                        {rating.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-auto grid grid-cols-2 gap-3 pt-7'>
                <div className='rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100'>
                  <div className='flex items-center gap-2 text-emerald-700'>
                    <CheckCircle2 className='size-5' />
                    <span className='text-2xl font-black'>
                      {company.recommendationRate}%
                    </span>
                  </div>
                  <p className='mt-1 text-xs font-semibold text-emerald-800/70'>
                    would recommend
                  </p>
                </div>
                <div className='rounded-2xl bg-cyan-50 p-4 ring-1 ring-cyan-100'>
                  <div className='flex items-center gap-2 text-cyan-700'>
                    <ShieldCheck className='size-5' />
                    <span className='text-2xl font-black'>
                      {company.ceoApproval}%
                    </span>
                  </div>
                  <p className='mt-1 text-xs font-semibold text-cyan-800/70'>
                    approve of leadership
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='company-details'
        className='mx-auto max-w-7xl scroll-mt-24 px-5 py-8 lg:px-8 lg:py-16'
      >
        <div className='grid gap-10 lg:grid-cols-[1.15fr_.85fr]'>
          <div>
            <p className='max-w-3xl text-base leading-8 text-slate-600'>
              {company.description}
            </p>

            <div className='mt-8 grid gap-3 sm:grid-cols-2'>
              {companyFacts.map(({ label, value, icon: Icon }) => (
                <Card
                  key={label}
                  className='rounded-2xl border-slate-200 bg-white py-0 shadow-sm'
                >
                  <CardContent className='flex items-center gap-4 p-4'>
                    <span className='grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary'>
                      <Icon className='size-5' />
                    </span>
                    <div className='min-w-0'>
                      <p className='text-xs font-bold uppercase tracking-[0.12em] text-slate-400'>
                        {label}
                      </p>
                      <p className='mt-1 truncate text-sm font-bold text-slate-800'>
                        {value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className='mt-8'>
              <h3 className='text-sm font-black uppercase tracking-[0.15em] text-slate-500'>
                What they work on
              </h3>
              <div className='mt-4 flex flex-wrap gap-2'>
                {company.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className='rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm'
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className='rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,.45)] sm:p-7'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-black uppercase tracking-[0.16em] text-slate-400'>
                  Employee ratings
                </p>
                <h3 className='mt-2 text-xl font-black'>
                  The workplace, by category
                </h3>
              </div>
              <span className='grid size-12 place-items-center rounded-2xl bg-amber-50 font-black text-amber-700 ring-1 ring-amber-100'>
                {company.score}
              </span>
            </div>

            <div className='mt-7 space-y-5'>
              {company.categoryScores.map((category) => (
                <div key={category.label}>
                  <div className='mb-2 flex items-center justify-between gap-4 text-sm'>
                    <span className='font-semibold text-slate-600'>
                      {category.label}
                    </span>
                    <span className='font-black text-slate-900'>
                      {category.score}
                    </span>
                  </div>
                  <div className='h-2 overflow-hidden rounded-full bg-slate-100'>
                    <div
                      className='h-full rounded-full bg-linear-to-r from-primary to-cyan-400'
                      style={{ width: `${(category.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <a
              href='#reviews'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-primary/30 hover:text-primary'
            >
              Explore all reviews
              <ArrowRight className='size-4' />
            </a>
          </aside>
        </div>
      </section>

      <section
        id='reviews'
        className='scroll-mt-20 border-y border-slate-200 bg-white'
      >
        <div className='mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24'>
          <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
            <div>
              <p className='flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary'>
                <MessageSquareText className='size-4' />
                Employee reviews
              </p>
              <h2 className='mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl'>
                What it is really like inside
              </h2>
              <p className='mt-3 text-slate-500'>
                First-hand experiences from verified current and former
                employees.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                type='button'
                className='rounded-full bg-slate-950 px-4 font-bold text-white hover:bg-slate-800'
              >
                Most helpful
              </Button>
              <Button
                type='button'
                variant='outline'
                className='rounded-full px-4 font-bold text-slate-600'
              >
                Newest
              </Button>
            </div>
          </div>

          <div className='mt-10 grid gap-8 lg:grid-cols-[300px_1fr]'>
            <div className='rounded-xl border border-slate-700 bg-slate-900/80 p-4 h-fit'>
              <p className='text-xs font-semibold uppercase tracking-[.14em] text-slate-300'>User Score</p>
              <div className='mt-3 flex items-center gap-4'>
                <div
                  className={`grid size-16 place-items-center rounded-full text-3xl font-black shadow ${"user"}`}
                >
                  {(3.4).toFixed(1)}
                </div>
                <div>
                  <p className='text-sm font-bold text-white'>{"current.userLabel"}</p>
                  <p className='text-xs text-slate-300'>Based on {"23432".toLocaleString()} ratings</p>
                </div>
              </div>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center justify-between text-xs'>
                  <span>Positive</span>
                  <span>{12}%</span>
                </div>
                <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-800'>
                  <div className='h-full bg-emerald-500' style={{ width: '43%' }} />
                </div>
                <div className='flex items-center justify-between text-xs'>
                  <span>Mixed</span>
                  <span>{23}%</span>
                </div>
                <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-800'>
                  <div className='h-full bg-amber-500' style={{ width: '65%' }} />
                </div>
                <div className='flex items-center justify-between text-xs'>
                  <span>Negative</span>
                  <span>{32}%</span>
                </div>
                <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-800'>
                  <div className='h-full bg-rose-500' style={{ width: `87%` }} />
                </div>
                <p className='pt-1 text-[11px] text-slate-400'>Based on {'3421342134'.toLocaleString()} user reviews</p>
              </div>
            </div>

            <div className='space-y-5'>
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className='rounded-[1.75rem] border border-slate-200 bg-[#fbfcff] p-5 shadow-sm transition hover:border-primary/20 hover:shadow-lg sm:p-7'
                >
                  <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-start'>
                    <div className='flex items-center gap-3.5'>
                      <Avatar className='size-12 shrink-0'>
                        <AvatarFallback
                          className={`text-sm font-black ${review.avatarTone}`}
                        >
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='font-black text-slate-900'>
                            {review.user}
                          </p>
                          {review.verified && (
                            <Badge className='rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 hover:bg-emerald-50'>
                              <BadgeCheck className='size-3' />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className='mt-1 text-xs font-medium text-slate-500'>
                          {review.role} · {review.employment}
                        </p>
                      </div>
                    </div>

                    <div className='sm:text-right'>
                      <div className='flex items-center gap-2 sm:justify-end'>
                        <Stars rating={review.rating} size='sm' />
                        <span className='text-sm font-black text-slate-800'>
                          {review.rating}
                        </span>
                      </div>
                      <p className='mt-2 text-xs font-semibold text-slate-400'>
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <h3 className='mt-6 text-xl font-black tracking-tight text-slate-900'>
                    {review.title}
                  </h3>
                  <p className='mt-3 text-sm leading-7 text-slate-600'>
                    {review.body}
                  </p>

                  <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                    <div className='rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4'>
                      <p className='flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700'>
                        <CheckCircle2 className='size-4' />
                        Pros
                      </p>
                      <p className='mt-2 text-sm leading-6 text-emerald-950/75'>
                        {review.pros}
                      </p>
                    </div>
                    <div className='rounded-2xl border border-amber-100 bg-amber-50/70 p-4'>
                      <p className='flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-amber-700'>
                        <Sparkles className='size-4' />
                        Keep improving
                      </p>
                      <p className='mt-2 text-sm leading-6 text-amber-950/75'>
                        {review.cons}
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5'>
                    <p className='text-xs font-semibold text-slate-400'>
                      Was this review helpful?
                    </p>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='rounded-full px-3 text-xs font-bold text-slate-600 hover:border-primary/30 hover:text-primary'
                    >
                      <ThumbsUp className='size-3.5' />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </article>
              ))}

              <Button
                type='button'
                variant='outline'
                className='h-auto w-full rounded-2xl px-5 py-4 font-black text-slate-700 hover:border-primary/30 hover:text-primary'
              >
                Load more employee reviews
                <ArrowRight className='size-4' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id='write-review'
        className='mx-auto max-w-7xl scroll-mt-24 px-5 py-18 lg:px-8'
      >
        <div className='relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-primary-foreground shadow-2xl shadow-primary/20 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14'>
          <div className='absolute -right-20 -top-28 size-72 rounded-full border-16 border-white/10' />
          <div className='absolute bottom-0 left-[48%] size-40 rounded-full bg-cyan-300/20 blur-3xl' />
          <div className='relative max-w-2xl'>
            <p className='flex items-center gap-2 text-sm font-bold text-primary-foreground/75'>
              <ShieldCheck className='size-5' />
              Anonymous and protected
            </p>
            <h2 className='mt-3 text-3xl font-black tracking-tight'>
              Worked at {company.name}?
            </h2>
            <p className='mt-3 leading-7 text-primary-foreground/75'>
              Your experience can help someone make a better career decision.
              Share the useful details you wish you knew.
            </p>
          </div>
          <Button
            type='button'
            className='relative mt-7 h-12 rounded-xl bg-white px-6 font-black text-primary shadow-lg hover:bg-slate-50 lg:mt-0'
          >
            Write your review
            <ArrowRight className='size-4' />
          </Button>
        </div>
      </section>

      <footer className='border-t border-slate-200 bg-white'>
        <div className='mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8'>
          <div className='flex items-center gap-2 font-bold text-slate-900'>
            <BriefcaseBusiness className='size-5 text-primary' />
            Congtytui.me
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
