import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { siteConfig } from '@/config/site';

const SERVICE_LINKS = [
  { href: '#services', label: 'Cybersecurity' },
  { href: '#services', label: 'IT Consulting' },
  { href: '#services', label: 'ERP & Application Support' },
  { href: '#services', label: 'NBN Services' },
  { href: '#services', label: 'Website Development' },
  { href: '#services', label: 'Business Support' },
];

const COMPANY_LINKS = [
  { href: '#why-us', label: 'How we work' },
  { href: '#testimonials', label: 'Client feedback' },
  { href: '#contact', label: 'Contact us' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-200">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-400 to-electric-600 text-sm font-bold text-white">
                A
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-white">
                  Ausstech
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-navy-400">
                  Consulting
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed">
              IT consulting, cybersecurity, ERP support and NBN fault resolution
              for Australian small and medium businesses.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-electric-400"
                aria-hidden="true"
              />
              <span>{siteConfig.serviceArea.join(' · ')}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-electric-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-electric-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-electric-300"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>

              {siteConfig.phoneDisplay && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-2 transition-colors hover:text-electric-300"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              )}

              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.addressSuburb}, {siteConfig.addressState}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip. ABN and legal entity name are the trust signals
            Australian business buyers look for before engaging. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <p className="text-navy-400">
            {siteConfig.abn} &nbsp;·&nbsp; {siteConfig.addressState}, Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
