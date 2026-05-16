import { cn } from '@/lib/utils';

export function StatusCard({ title, value, detail, tone = 'cyan' }: { title: string; value: string; detail: string; tone?: 'cyan' | 'violet' | 'green' }) {
  const tones = { cyan: 'border-protocol-cyan/30 text-protocol-cyan', violet: 'border-protocol-violet/30 text-protocol-violet', green: 'border-emerald-400/30 text-emerald-300' };
  return (
    <article className={cn('rounded-2xl border bg-white/[0.04] p-6 shadow-glow', tones[tone])}>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <h3 className="mt-4 text-3xl font-semibold text-white">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
    </article>
  );
}
