import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
/** Section wrapper with consistent vertical rhythm and container width. */
export function Section({ id, children, className, dark = false, }) {
    return (_jsx("section", { id: id, className: cn('section-padding', dark && 'bg-navy-950 text-white', className), children: _jsx("div", { className: "container", children: children }) }));
}
/** Consistent section heading: eyebrow, title, optional lead paragraph. */
export function SectionHeading({ eyebrow, title, lead, align = 'center', dark = false, }) {
    return (_jsxs("div", { className: cn('mb-14 max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left'), children: [eyebrow && _jsx("span", { className: "eyebrow", children: eyebrow }), _jsx("h2", { className: cn('heading-lg text-balance', dark ? 'text-white' : 'text-navy-950'), children: title }), lead && (_jsx("p", { className: cn('body-lg mt-4 text-balance', dark && 'text-navy-200'), children: lead }))] }));
}
