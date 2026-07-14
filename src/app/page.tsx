import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const companies = [
  {
    name: 'Nexora Labs',
    initials: 'NL',
    color: 'from-violet-500 to-indigo-600',
    rating: '4.8',
    reviews: '1.2k',
    industry: 'Technology',
    location: 'San Francisco, CA',
    highlight: 'Great culture',
  },
  {
    name: 'Northstar',
    initials: 'N',
    color: 'from-sky-400 to-blue-600',
    rating: '4.7',
    reviews: '846',
    industry: 'Financial Services',
    location: 'New York, NY',
    highlight: 'Career growth',
  },
  {
    name: 'Common Goods',
    initials: 'CG',
    color: 'from-emerald-400 to-teal-600',
    rating: '4.6',
    reviews: '629',
    industry: 'Retail',
    location: 'Austin, TX',
    highlight: 'Work-life balance',
  },
  {
    name: 'Morrow Studio',
    initials: 'MS',
    color: 'from-orange-400 to-rose-500',
    rating: '4.5',
    reviews: '512',
    industry: 'Design',
    location: 'Remote',
    highlight: 'Creative freedom',
  },
]

const reviews = [
  {
    company: 'Nexora Labs',
    role: 'Senior Product Designer',
    time: '2 days ago',
    rating: 5,
    title: 'The best team I’ve worked with',
    body: 'Leadership is transparent, the work is genuinely challenging, and people care about helping each other succeed.',
    tags: ['Supportive team', 'Flexible work'],
    color: 'bg-violet-100 text-violet-700',
    initials: 'NL',
  },
  {
    company: 'Northstar',
    role: 'Financial Analyst',
    time: '4 days ago',
    rating: 4,
    title: 'Fast-paced with lots of opportunity',
    body: 'A strong place to learn quickly. The pace is high, but managers invest in your growth and recognize good work.',
    tags: ['Career growth', 'Great benefits'],
    color: 'bg-sky-100 text-sky-700',
    initials: 'N',
  },
  {
    company: 'Common Goods',
    role: 'Operations Lead',
    time: '1 week ago',
    rating: 5,
    title: 'People-first in more than name',
    body: 'The values show up in day-to-day decisions. I’ve had the flexibility and trust to do my best work here.',
    tags: ['Inclusive', 'Good leadership'],
    color: 'bg-emerald-100 text-emerald-700',
    initials: 'CG',
  },
]

const categories = [
  { name: 'Technology', count: '2,840 companies', icon: Sparkles, tone: 'bg-violet-100 text-violet-700' },
  { name: 'Finance', count: '1,260 companies', icon: TrendingUp, tone: 'bg-blue-100 text-blue-700' },
  { name: 'Healthcare', count: '1,940 companies', icon: ShieldCheck, tone: 'bg-emerald-100 text-emerald-700' },
  { name: 'Retail', count: '1,120 companies', icon: Building2, tone: 'bg-orange-100 text-orange-700' },
]

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className='flex items-center gap-0.5' aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <main className='min-h-screen overflow-hidden bg-[#fbfcff] text-slate-950'>
      <header className='relative z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8'>
          <a href='#' className='flex items-center gap-2.5' aria-label='Truework home'>
            <span className='grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200'>
              <Building2 className='size-5' />
            </span>
            <span className='text-xl font-extrabold tracking-tight'>truework</span>
          </a>
          <nav className='hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex'>
            <a href='#companies' className='transition hover:text-indigo-600'>Companies</a>
            <a href='#reviews' className='transition hover:text-indigo-600'>Reviews</a>
            <a href='#categories' className='transition hover:text-indigo-600'>Explore</a>
            <a href='#employers' className='transition hover:text-indigo-600'>For employers</a>
          </nav>
          <div className='hidden items-center gap-2 sm:flex'>
            <Button variant='ghost' className='h-10 px-4'>Sign in</Button>
            <Button className='h-10 bg-indigo-600 px-4 shadow-sm hover:bg-indigo-700'>Write a review</Button>
          </div>
          <Button variant='ghost' size='icon' className='sm:hidden' aria-label='Open menu'><Menu /></Button>
        </div>
      </header>

      <section className='relative border-b border-indigo-100 bg-[radial-gradient(circle_at_top_left,#e8e7ff_0,transparent_34%),radial-gradient(circle_at_85%_25%,#dff7ff_0,transparent_28%),linear-gradient(to_bottom,#f8f7ff,#fbfcff)]'>
        <div className='absolute left-[8%] top-24 size-24 rounded-full border border-indigo-200/60 bg-white/30 blur-[1px]' />
        <div className='absolute right-[7%] top-16 size-44 rounded-full bg-cyan-200/20 blur-3xl' />
        <div className='relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28'>
          <div>
            <Badge className='mb-6 h-7 border border-indigo-200 bg-white/80 px-3 text-indigo-700 shadow-sm'>
              <Sparkles className='fill-indigo-500' /> Real stories. Better careers.
            </Badge>
            <h1 className='max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl'>
              Know the company<br />before you <span className='text-indigo-600'>join it.</span>
            </h1>
            <p className='mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg'>
              Honest reviews from real employees help you find a workplace where you can do your best work—and feel good doing it.
            </p>
            <div className='mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white bg-white p-2.5 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.35)] sm:flex-row'>
              <div className='flex flex-1 items-center gap-3 px-3'>
                <Search className='size-5 text-indigo-500' />
                <Input className='h-11 border-0 px-0 text-base shadow-none ring-0 focus-visible:ring-0' placeholder='Search a company or industry' aria-label='Search companies' />
              </div>
              <Button className='h-11 bg-indigo-600 px-7 text-base hover:bg-indigo-700'>Search</Button>
            </div>
            <div className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500'>
              <span className='font-semibold text-slate-700'>Popular:</span>
              <a href='#' className='underline-offset-4 hover:text-indigo-600 hover:underline'>Nexora</a>
              <a href='#' className='underline-offset-4 hover:text-indigo-600 hover:underline'>Northstar</a>
              <a href='#' className='underline-offset-4 hover:text-indigo-600 hover:underline'>Common Goods</a>
            </div>
          </div>

          <div className='relative hidden min-h-116 lg:block'>
            <Card className='absolute left-4 top-3 w-96 -rotate-3 border-0 bg-white py-0 shadow-[0_30px_70px_-25px_rgba(30,41,59,.4)] ring-1 ring-slate-200'>
              <CardContent className='p-7'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-12 rounded-xl'><AvatarFallback className='rounded-xl bg-violet-100 font-bold text-violet-700'>NL</AvatarFallback></Avatar>
                    <div><p className='font-bold'>Nexora Labs</p><p className='text-xs text-slate-500'>Product Designer</p></div>
                  </div>
                  <Badge className='bg-emerald-50 text-emerald-700'><CheckCircle2 /> Verified</Badge>
                </div>
                <div className='mt-6 flex items-center gap-2'><Stars /><span className='text-sm font-bold'>5.0</span></div>
                <h3 className='mt-4 text-xl font-bold tracking-tight'>“A place where good ideas actually go somewhere.”</h3>
                <p className='mt-3 leading-6 text-slate-600'>I’ve never felt more trusted to own my work. The team is sharp, kind, and genuinely collaborative.</p>
                <div className='mt-6 flex gap-2'><Badge variant='secondary'>Great culture</Badge><Badge variant='secondary'>Remote friendly</Badge></div>
              </CardContent>
            </Card>
            <Card className='absolute bottom-3 right-0 w-72 rotate-3 border-0 bg-slate-950 py-0 text-white shadow-2xl ring-0'>
              <CardContent className='p-6'>
                <p className='text-sm text-slate-400'>Community score</p>
                <div className='mt-2 flex items-end gap-2'><span className='text-5xl font-black'>4.7</span><span className='pb-1 text-sm text-slate-400'>/ 5</span></div>
                <div className='mt-3'><Stars /></div>
                <div className='mt-6 flex items-center gap-3 border-t border-white/10 pt-5'>
                  <div className='flex -space-x-2'>
                    {['AM', 'JK', 'RS'].map((i) => <Avatar key={i} size='sm' className='ring-2 ring-slate-950'><AvatarFallback className='bg-slate-700 text-[9px] text-white'>{i}</AvatarFallback></Avatar>)}
                  </div>
                  <span className='text-xs text-slate-400'>Trusted by 250k+ people</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='mx-auto grid max-w-7xl grid-cols-2 gap-6 border-t border-indigo-100/70 px-5 py-7 sm:grid-cols-4 lg:px-8'>
          {[['18k+', 'Companies'], ['420k+', 'Verified reviews'], ['94%', 'Would recommend'], ['2.5M', 'Monthly readers']].map(([value, label]) => (
            <div key={label} className='text-center'>
              <p className='text-2xl font-extrabold tracking-tight'>{value}</p>
              <p className='mt-1 text-xs text-slate-500 sm:text-sm'>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id='companies' className='mx-auto max-w-7xl px-5 py-20 lg:px-8'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[.18em] text-indigo-600'>Top workplaces</p>
            <h2 className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl'>Companies people love</h2>
            <p className='mt-3 text-slate-600'>Highly rated by the people who know them best.</p>
          </div>
          <Button variant='ghost' className='hidden text-indigo-600 sm:flex'>
            View all companies
            <ArrowRight />
          </Button>
        </div>
        <div className='mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {companies.map((company) => (
            <Card key={company.name} className='group border-0 bg-white py-0 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
              <CardContent className='p-5'>
                <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${company.color} font-extrabold text-white shadow-md`}>{company.initials}</div>
                <h3 className='mt-5 text-lg font-bold'>{company.name}</h3>
                <p className='mt-1 text-xs text-slate-500'>{company.industry}</p>
                <div className='mt-4 flex items-center gap-2'>
                  <Star className='size-4 fill-amber-400 text-amber-400' />
                  <span className='font-bold'>{company.rating}</span>
                  <span className='text-xs text-slate-400'>({company.reviews} reviews)</span>
                </div>
                <div className='my-4 h-px bg-slate-100' />
                <p className='flex items-center gap-2 text-xs text-slate-500'><MapPin className='size-3.5' />{company.location}</p>
                <Badge variant='secondary' className='mt-4 bg-indigo-50 text-indigo-700'>{company.highlight}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id='reviews' className='border-y border-slate-200 bg-white py-20'>
        <div className='mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8'>
          <div className='lg:sticky lg:top-8 lg:self-start'>
            <Badge className='bg-indigo-50 text-indigo-700'>From the community</Badge>
            <h2 className='mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl'>Fresh perspectives,<br />shared every day.</h2>
            <p className='mt-4 max-w-sm leading-7 text-slate-600'>Get the full picture from people across roles, teams, and experience levels.</p>
            <Button variant='outline' className='mt-7 h-10'>Read all reviews <ArrowRight /></Button>
          </div>
          <div className='space-y-4'>
            {reviews.map((review) => (
              <Card key={review.company} className='border-0 bg-[#fbfcff] py-0 ring-1 ring-slate-200 transition hover:ring-indigo-200'>
                <CardContent className='p-6 sm:p-7'>
                  <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
                    <div className='flex items-center gap-3'>
                      <Avatar size='lg'>
                        <AvatarFallback className={`${review.color}`}>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div><p className='font-bold'>{review.company}</p><p className='text-xs text-slate-500'>{review.role}</p></div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Stars rating={review.rating} />
                    </div>
                  </div>
                  <h3 className='mt-6 text-lg font-bold'>{review.title}</h3>
                  <p className='mt-2 leading-6 text-slate-600'>{review.body}</p>
                  <div className='mt-5 flex flex-wrap items-center gap-2'>
                    {review.tags.map((tag) => <Badge key={tag} variant='secondary'>{tag}</Badge>)}
                    <span className='ml-auto flex items-center gap-1.5 text-xs text-slate-400'><Clock3 className='size-3.5' />{review.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id='categories' className='mx-auto max-w-7xl px-5 py-20 lg:px-8'>
        <div className='text-center'>
          <p className='text-sm font-bold uppercase tracking-[.18em] text-indigo-600'>Find your fit</p>
          <h2 className='mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl'>Explore by industry</h2>
        </div>
        <div className='mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map(({ name, count, icon: Icon, tone }) => (
            <a key={name} href='#' className='group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md'>
              <span className='flex-1'><span className='block font-bold'>{name}</span><span className='text-xs text-slate-500'>{count}</span></span>
              <ChevronRight className='size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600' />
            </a>
          ))}
        </div>
      </section>

      <section id='employers' className='mx-auto max-w-7xl px-5 pb-20 lg:px-8'>
        <div className='relative overflow-hidden rounded-[2rem] bg-indigo-600 px-6 py-12 text-white shadow-2xl shadow-indigo-200 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-14'>
          <div className='absolute -right-16 -top-24 size-72 rounded-full border-12 border-white/10' />
          <div className='absolute bottom-25 left-[40%] size-52 rounded-full bg-cyan-300/20 blur-3xl' />
          <div className='relative max-w-2xl'>
            <div className='flex items-center gap-2 text-sm font-semibold text-indigo-100'><Users className='size-5' /> Your voice makes work better</div>
            <h2 className='mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl'>Had a workplace experience worth sharing?</h2>
            <p className='mt-4 leading-7 text-indigo-100'>Your anonymous review can help someone make a confident career decision. It only takes a few minutes.</p>
          </div>
          <Button className='relative mt-8 h-12 bg-white px-6 text-indigo-700 shadow-lg hover:bg-indigo-50 lg:mt-0'>Write an anonymous review <ArrowRight /></Button>
        </div>
      </section>

      <footer className='border-t border-slate-200 bg-white'>
        <div className='mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8'>
          <div className='flex items-center gap-2 font-bold text-slate-900'><BriefcaseBusiness className='size-5 text-indigo-600' /> truework</div>
          <p>© 2026 Truework. Better workplaces start with the truth.</p>
          <div className='flex gap-5'><a href='#' className='hover:text-indigo-600'>Privacy</a><a href='#' className='hover:text-indigo-600'>Terms</a><a href='#' className='hover:text-indigo-600'>Contact</a></div>
        </div>
      </footer>
    </main>
  )
}
