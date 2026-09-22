/**
 * Site-wide configuration.
 *
 * The items marked TODO are the facts I do not have. Fill them in and the
 * Organisation schema in App.tsx becomes valid automatically — no other file
 * needs to change.
 */
export const siteConfig = {
  legalName: 'Ausstech Consulting Services Pty Ltd',
  tradingName: 'Ausstech Consulting',
  url: 'https://www.auss-tech.com.au',

  // TODO: confirm — used in the footer and the contact section.
  abn: 'ABN to be confirmed',

  // TODO: confirm — a phone number converts far better than a form for local
  // IT support. Leave as an empty string to hide the button entirely.
  phone: '',
  // Display form, e.g. '(02) 9000 0000'
  phoneDisplay: '',

  email: 'info@auss-tech.com.au',

  // TODO: confirm your actual coverage. These are shown as trust indicators
  // and fed into the schema.org areaServed field.
  serviceArea: ['Sydney Metro', 'New South Wales', 'Remote Australia-wide'],

  addressSuburb: 'Sydney',
  addressState: 'NSW',

  // TODO: confirm years operating. Used in the stats band.
  yearsOperating: null as number | null,

  /**
   * Statistics shown in the trust band.
   *
   * Deliberately EMPTY. I will not put invented client counts or uptime
   * percentages on a site whose whole purpose is to build trust — a business
   * buyer who checks one false number distrusts everything else on the page.
   *
   * Replace with real figures once known. Until then the band shows honest
   * qualitative commitments, which need no numbers and cannot be disproved.
   */
  stats: [] as Array<{ value: string; label: string }>,

  /** Trust band fallback — true statements that need no measurement. */
  commitments: [
    {
      title: 'Local Australian support',
      detail: 'Australian-based, no offshore call centre.',
    },
    {
      title: 'Fixed-scope quotes',
      detail: 'Priced before work begins. No surprise invoices.',
    },
    {
      title: 'Direct engineer access',
      detail: 'You speak to the person doing the work.',
    },
    {
      title: 'Plain-English reporting',
      detail: 'Findings written for business owners, not technicians.',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
