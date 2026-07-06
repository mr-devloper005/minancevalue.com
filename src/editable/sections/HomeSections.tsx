import Link from 'next/link'
import {
  ArrowRight, BookOpen, CalendarDays, ChevronRight, Clock3, Eye, Flame, Heart,
  MessageCircle, PenLine, Search, Sparkles, UserRound, Users,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const avatarColors = ['#4564f4', '#8d17e6', '#00aa63', '#ef2f39', '#111827']

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getAuthor(post?: SitePost | null) {
  const content = getContent(post)
  const author =
    asText(content.author) ||
    asText(content.authorName) ||
    asText(content.name) ||
    asText((post as unknown as Record<string, unknown>)?.author) ||
    'Editorial Contributor'
  return author
}

function getAuthorImage(post?: SitePost | null) {
  const content = getContent(post)
  const image = asText(content.avatar) || asText(content.authorImage) || asText(content.logo)
  return image
}

function getDate(post?: SitePost | null) {
  const raw = asText((post as unknown as Record<string, unknown>)?.createdAt) || asText(getContent(post).date)
  if (!raw) return 'Recently'
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return date.toLocaleDateString('en', { month: 'short', day: '2-digit' })
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] || 'M') + (parts[1]?.[0] || '')).toUpperCase()
}

function statFor(post: SitePost, seed = '') {
  const value = post.slug || post.id || post.title || seed
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return {
    views: 18 + (h % 88),
    likes: h % 7,
    comments: (h >> 2) % 4,
    minutes: 4 + (h % 7),
  }
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function Avatar({ post, size = 'h-10 w-10', index = 0 }: { post?: SitePost | null; size?: string; index?: number }) {
  const author = getAuthor(post)
  const image = getAuthorImage(post)
  return (
    <span
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(7,17,38,0.18)]`}
      style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
    >
      {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : initials(author)}
    </span>
  )
}

function MetaRow({ post, index = 0, light = false }: { post: SitePost; index?: number; light?: boolean }) {
  const stats = statFor(post, String(index))
  const text = light ? 'text-white/78' : 'text-[var(--slot4-muted-text)]'
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${text}`}>
      <span className="inline-flex items-center gap-2 font-semibold">
        <Avatar post={post} size="h-8 w-8" index={index} /> {getAuthor(post)}
      </span>
      <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {getDate(post)}</span>
      <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {stats.minutes} min read</span>
    </div>
  )
}

function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="text-center">
      {eyebrow ? <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-5xl">{title}</h2>
      {description ? <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)]">{description}</p> : null}
    </div>
  )
}

function FeatureCard({ post, href }: { post: SitePost; href: string }) {
  const stats = statFor(post)
  return (
    <article className="editable-card-breathe group relative min-h-[520px] overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] text-white shadow-[0_28px_55px_rgba(7,17,38,0.2)]">
      <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,2,10,0.08),rgba(5,2,10,0.92)_72%)]" />
      <div className="relative flex min-h-[520px] flex-col justify-end p-6 sm:p-8">
      
        <div className="flex flex-wrap items-center justify-between gap-4">
          <MetaRow post={post} light />
          <span className="text-sm font-medium text-white/90">{getDate(post)} · {stats.minutes} min read</span>
        </div>
        <Link href={href} className="mt-5 block">
          <h3 className="max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">{post.title}</h3>
        </Link>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/82">{getEditableExcerpt(post, 220) || 'A fresh contribution from the community, ready for readers to explore.'}</p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-sm font-semibold text-white/85">
            <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4 fill-[var(--slot4-accent-3)] text-[var(--slot4-accent-3)]" /> {stats.likes}</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {stats.comments}</span>
          </div>
        
        </div>
      </div>
    </article>
  )
}

function HotCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  const stats = statFor(post, String(index))
  return (
    <Link href={href} className="group grid grid-cols-[46px_minmax(0,1fr)] gap-4 rounded-xl bg-[#f1f2f5] p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_36px_rgba(7,17,38,0.1)]">
      <span className="text-2xl font-black text-[#c9ced7]">{String(index + 5).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="inline-flex items-center gap-2">
          <span className="rounded bg-[var(--slot4-accent-2)] px-2 py-1 text-[10px] font-bold text-white">{category}</span>
          <span className="text-xs text-[var(--slot4-muted-text)]">{stats.views}</span>
        </span>
        <span className="mt-2 block line-clamp-2 text-base font-black leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</span>
        <span className="mt-2 flex items-center gap-2 text-xs text-[var(--slot4-muted-text)]">
          <Avatar post={post} size="h-5 w-5 text-[10px]" index={index} /> {getAuthor(post)} · <Heart className="h-3.5 w-3.5 fill-[var(--slot4-accent-3)] text-[var(--slot4-accent-3)]" /> {stats.likes}
        </span>
      </span>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const feature = pool[0]
  const hot = pool.slice(1, 5)
  if (!feature) {
    return (
      <section className={`${container} py-16 text-center`}>
        <SectionTitle title={pagesContent.home.hero.title?.join(' ') || `Welcome to ${SITE_CONFIG.name}`} description={pagesContent.home.hero.description} />
        <Link href="/create" className="mt-8 inline-flex rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">Start Writing</Link>
      </section>
    )
  }
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="editable-hero-glow pointer-events-none absolute left-[8%] top-20 h-44 w-44 rounded-full bg-[var(--slot4-accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-28 h-52 w-52 rounded-full bg-[var(--slot4-accent-3)]/10 blur-3xl" />
      <div className={`${container} py-16 sm:py-20`}>
        <SectionTitle eyebrow="Editor's Pick" title="Editor's Pick" description="Outstanding contributions from our authors." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
          <FeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} />
          <aside>
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-[-0.02em]">
              <Flame className="h-5 w-5 fill-[var(--slot4-accent-3)] text-[var(--slot4-accent-3)]" /> Hot Right Now
            </h2>
            <div className="mt-4 grid gap-4">
              {hot.map((post, index) => <HotCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function ImageFirstCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const stats = statFor(post, String(index))
  return (
    <Link href={href} className="group block overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white shadow-[0_14px_34px_rgba(7,17,38,0.09)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_rgba(7,17,38,0.14)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-0 top-0 bg-[var(--slot4-accent)] px-3 py-2 text-xs font-black text-white">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-xl font-black leading-snug tracking-[-0.03em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 125)}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <MetaRow post={post} index={index} />
          <span className="flex items-center gap-3 text-xs font-semibold text-[var(--slot4-muted-text)]"><Heart className="h-4 w-4 fill-[#697386] text-[#697386]" /> {stats.likes} <MessageCircle className="h-4 w-4" /> {stats.comments}</span>
        </div>
      </div>
    </Link>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections).slice(5, 8)
  if (!pool.length) return null
  return (
    <section className="bg-white pb-16">
      <div className={container}>
        <div className="grid gap-6 md:grid-cols-3">
          {pool.map((post, index) => <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
        <div className="mt-10 text-center">
          <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent),var(--slot4-accent-2))] px-8 py-4 text-sm font-black text-white shadow-[0_16px_32px_rgba(69,100,244,0.2)] transition hover:-translate-y-1">
            Discover More Top Content
          </Link>
        </div>
      </div>
    </section>
  )
}

function AuthorCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const author = getAuthor(post)
  return (
    <Link href={href} className="group rounded-xl border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_16px_38px_rgba(7,17,38,0.08)] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(7,17,38,0.14)]">
      <Avatar post={post} size="mx-auto h-24 w-24 text-2xl" index={index} />
      <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{author}</h3>
      <p className="mx-auto mt-3 line-clamp-2 max-w-xs text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 94) || 'Writer and community contributor'}</p>
      <span className="mt-4 inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-4 py-1.5 text-xs font-bold text-[var(--slot4-accent)]">{12 + index * 17} articles</span>
      <span className="mt-5 block rounded-full border border-[var(--slot4-accent)] px-5 py-2 text-sm font-bold text-[var(--slot4-accent)] transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white">View Profile</span>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const authors = pool.slice(8, 16)
  return (
    <section className="bg-[var(--slot4-warm)] py-20">
      <div className={container}>
        <div className="text-center">
          <h2 className="editable-serif mx-auto max-w-3xl text-5xl leading-[0.96] text-[var(--slot4-page-text)] sm:text-7xl">
            Your story <span className="relative inline-block font-bold text-[var(--slot4-accent)] after:absolute after:inset-x-0 after:bottom-1 after:h-2 after:rounded-full after:bg-[var(--slot4-accent)]/20">deserves</span> to be told.
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-xl leading-8 text-[var(--slot4-muted-text)]">
            Publish useful ideas, build a profile, and help readers find the voices behind the work.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-[var(--editable-border)] bg-white p-8 shadow-[0_22px_54px_rgba(7,17,38,0.12)] before:block before:h-1 before:rounded-full before:bg-[linear-gradient(90deg,var(--slot4-accent),var(--slot4-accent-2),var(--slot4-accent-3))] sm:p-10">
          <h3 className="text-center text-3xl font-black tracking-[-0.04em]">Writer's Platform</h3>
          <p className="mt-2 text-center font-bold text-[var(--slot4-accent)]">Share your expertise with the world</p>
          <div className="mt-8 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
            <BookOpen className="h-8 w-8 text-[var(--slot4-accent)]" />
            <p className="mt-4 text-xl font-semibold italic leading-8 text-[var(--slot4-page-text)]">“Publishing here keeps the writing experience simple, readable, and focused on the people who care about the topic.”</p>
            <p className="mt-4 font-bold text-[var(--slot4-accent)]">— Community Contributor</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center">
              {pool.slice(0, 3).map((post, index) => <Avatar key={post.id || post.slug || index} post={post} index={index} size="-ml-2 first:ml-0 h-10 w-10" />)}
              <span className="-ml-1 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-2 text-sm font-bold text-[var(--slot4-accent)]"><Users className="mr-1 inline h-4 w-4" /> Active writers</span>
            </div>
            <Link href="/create" className="rounded-lg bg-[var(--slot4-dark-bg)] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1">Start Writing</Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            ['800K+', 'Active Authors'],
            ['2M+', 'Monthly Readers'],
            ['1.9M+', 'Articles Published'],
          ].map(([number, label]) => (
            <div key={label} className="rounded-xl border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_8px_26px_rgba(7,17,38,0.05)]">
              <p className="text-3xl font-black text-[var(--slot4-accent)]">{number}</p>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{label}</p>
            </div>
          ))}
        </div>

        {authors.length ? (
          <div className="mt-20">
            <SectionTitle title="Authors Leading the Way" description="Meet the voices shaping the community." />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {authors.map((post, index) => <AuthorCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function SliderCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const stats = statFor(post, String(index))
  return (
    <Link href={href} className="group grid w-[78vw] max-w-[760px] shrink-0 grid-cols-1 overflow-hidden rounded-2xl bg-white text-[var(--slot4-page-text)] shadow-[0_26px_60px_rgba(0,0,0,0.22)] sm:grid-cols-[280px_minmax(0,1fr)]">
      <div className="relative min-h-[260px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
          <Avatar post={post} index={index} />
          <span className="font-black drop-shadow">{getAuthor(post)}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center p-7">
        <span className="w-fit rounded-full bg-[#e91e73] px-4 py-2 text-xs font-black text-white">{getEditableCategory(post)}</span>
        <h3 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <div className="mt-6 flex items-center justify-between gap-4 text-xs font-bold text-[var(--slot4-muted-text)]">
          <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4" /> {stats.views}</span>
          <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {stats.comments}</span>
          <span className="rounded-full bg-black px-4 py-2 text-white">Read Post</span>
        </div>
      </div>
    </Link>
  )
}

function LatestRow({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const stats = statFor(post, String(index))
  return (
    <Link href={href} className="group grid gap-6 border-b border-[var(--editable-border)] py-8 transition hover:translate-x-1 lg:grid-cols-[minmax(0,1fr)_286px]">
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-xl font-black leading-snug tracking-[-0.02em] group-hover:text-[var(--slot4-accent)] sm:text-2xl">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-base leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--slot4-muted-text)]">
          <MetaRow post={post} index={index} />
          <span className="rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1">{getEditableCategory(post)}</span>
          <span>{stats.views} views</span>
          <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5 fill-[var(--slot4-accent-3)] text-[var(--slot4-accent-3)]" /> {stats.likes}</span>
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[var(--slot4-media-bg)] lg:aspect-auto lg:h-36">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
    </Link>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const picked = pool.slice(0, 6)
  const latest = pool.slice(0, 10)
  if (!pool.length) return null
  const sliderItems = [...picked, ...picked]
  return (
    <>
      <section className="overflow-hidden bg-[var(--slot4-dark-bg)] py-20 text-white">
        <div className={`${container} text-center`}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
            <Sparkles className="h-4 w-4 text-[var(--slot4-accent-2)]" /> Top Picks
          </span>
          <h2 className="mt-6 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            Hand <span className="text-[var(--slot4-accent-2)]">Picked</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-white/70">Hand-selected quality content you should not miss.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['All Categories', 'Technology News', 'Investing', 'Business', 'Gadgets & Gizmos'].map((chip, index) => (
              <span key={chip} className={`rounded-full px-4 py-2 text-sm font-bold ${index === 0 ? 'bg-white text-[var(--slot4-page-text)]' : 'bg-[var(--slot4-accent-3)] text-white'}`}>{chip}</span>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/create" className="rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-2),#ff4bb4)] px-7 py-3 text-sm font-black text-white">Start Writing</Link>
            <Link href="/search" className="rounded-full border border-white/15 bg-white/10 px-7 py-3 text-sm font-black text-white">Explore Content</Link>
          </div>
        </div>
        {sliderItems.length ? (
          <div className="mt-16 flex overflow-hidden">
            <div className="editable-slider-track flex w-max gap-6 px-6">
              {sliderItems.map((post, index) => <SliderCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={`${container} max-w-6xl`}>
          <SectionTitle title="Latest Posts" description="Just published: See what's new from our writers." />
          <div className="mt-10">
            {latest.map((post, index) => <LatestRow key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
          <div className="mt-10 text-center">
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-accent)] px-7 py-3 text-sm font-bold text-[var(--slot4-accent)] transition hover:bg-[var(--slot4-accent)] hover:text-white">
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-warm)] py-16">
      <div className={`${container} grid gap-8 rounded-3xl bg-[linear-gradient(135deg,#082f49,#075985)] px-6 py-12 text-white shadow-[0_24px_55px_rgba(7,17,38,0.18)] sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center`}>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-200">Publish with purpose</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Create a profile, share an article, and join the conversation.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">A clean publishing space for readers, writers, professionals, businesses, students, researchers, and community members.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-black text-[#082f49] transition hover:-translate-y-1">
            <PenLine className="h-4 w-4" /> Create
          </Link>
          <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-black text-white transition hover:bg-white/10">
            <Search className="h-4 w-4" /> Search
          </Link>
        </div>
      </div>
    </section>
  )
}
