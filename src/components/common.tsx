import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Tx, useLang } from '@/i18n';

/** The English lockup for English and Portuguese, the Chinese lockup for Chinese. Ink on light grounds, paper on colour. */
export function Logo({ variant = 'ink', className = 'logo', style }: { variant?: 'ink' | 'paper'; className?: string; style?: CSSProperties }) {
  const { lang } = useLang();
  const key = lang === 'zh' ? 'zh' : 'en';
  const alt = lang === 'zh' ? '澳門歷史城市與可持續發展研究會' : 'HCSD Macao, Research Society for Historic Cities and Sustainable Development';
  return <img className={className} style={style} src={`img/logo-${key}-${variant}.png`} alt={alt} />;
}

/** Newsletter sign-up. No mailing service is connected yet, and the form says so instead of pretending. */
export function NewsForm({ id, labelKey, after }: { id: string; labelKey: string; after?: ReactNode }) {
  const { tPlain } = useLang();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'' | 'ok' | 'err'>('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    setStatus(ok ? 'ok' : 'err');
    if (!ok) document.getElementById(id)?.focus();
  };
  return (
    <form className="news" noValidate onSubmit={submit} data-rise>
      <Tx k={labelKey} as="label" htmlFor={id} />
      <div className="row">
        <input id={id} type="email" autoComplete="email" placeholder={tPlain('news_ph')} value={value}
          onChange={(e) => setValue(e.target.value)} aria-invalid={status === 'err' ? true : undefined} aria-describedby={`${id}-status`} />
        <Tx k="news_btn" as="button" className="pill pill-ink" type="submit" />
      </div>
      {after}
      <p className="status" id={`${id}-status`} role="status">{status === 'ok' ? tPlain('news_msg') : status === 'err' ? tPlain('news_err') : ''}</p>
    </form>
  );
}

export const Clover = ({ fill = '#FFFFFF' }: { fill?: string }) => (
  <svg viewBox="0 0 100 100" aria-hidden="true"><path fill={fill} d="M33.6 33.6A16.4 16.4 0 0 1 66.4 33.6A16.4 16.4 0 0 1 66.4 66.4A16.4 16.4 0 0 1 33.6 66.4A16.4 16.4 0 0 1 33.6 33.6Z" /></svg>
);
