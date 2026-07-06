'use client'

import Link from 'next/link'
import { LogIn, LogOut, Search, UserPlus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Search', href: '/search' },
]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--slot4-accent),var(--slot4-accent-2))]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span className="editable-display text-2xl font-extrabold tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Navigation</h3>
          <div className="mt-4 grid gap-2">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {item.label}
                {item.label === 'Search' ? <Search className="h-3.5 w-3.5" /> : null}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Account</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {session ? (
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
