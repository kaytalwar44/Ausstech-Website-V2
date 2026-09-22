import { cn } from '@/lib/utils';

/** Section wrapper with consistent vertical rhythm and container width. */
export function Section({
  id,
  children,
  className,
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        dark && 'bg-navy-950 text-white',
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/** Consistent section heading: eyebrow, title, optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        'mb-14 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={cn(
          'heading-lg text-balance',
          dark ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('body-lg mt-4 text-balance', dark && 'text-navy-200')}>
          {lead}
        </p>
      )}
    </div>
  );
}
