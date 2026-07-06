'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PlusCircle, Search, UserCircle, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const displayName = session?.name?.trim() || session?.email?.split('@')[0] || 'Member'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/96 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[74px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--slot4-accent),var(--slot4-accent-2))] shadow-[0_10px_24px_rgba(69,100,244,0.25)] transition group-hover:-rotate-6">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="editable-display hidden max-w-[230px] truncate text-xl font-extrabold leading-none tracking-[-0.03em] sm:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  active ? 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="ml-2 hidden lg:block">
          <label className="flex h-10 w-[160px] items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-white px-3 transition focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {session ? (
            <>
              <span className="inline-flex max-w-[160px] items-center gap-2 truncate rounded-full bg-[var(--slot4-panel-bg)] px-4 py-2 text-sm font-bold text-[var(--slot4-page-text)]">
                <UserCircle className="h-4 w-4 text-[var(--slot4-accent)]" /> {displayName}
              </span>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent),var(--slot4-accent-2))] px-4 py-2 text-sm font-bold text-white shadow-[0_12px_26px_rgba(69,100,244,0.22)] transition hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent),var(--slot4-accent-2))] px-4 py-2 text-sm font-bold text-white shadow-[0_12px_26px_rgba(69,100,244,0.22)] transition hover:-translate-y-0.5"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 md:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-xl border border-[var(--editable-border)] px-3 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </form>
          <div className="grid gap-1">
            {session ? <p className="rounded-xl bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-bold">Signed in as {displayName}</p> : null}
            {[...navItems, { label: 'Search', href: '/search' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign up', href: '/signup' }, { label: 'Sign in', href: '/login' }])].map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    active ? 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
