import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { ECHO, L, T, type Lang } from './content';

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** The string for a key, as HTML (may hold <em> or <a>). */
  t: (k: string) => string;
  /** The same string as plain text, for attributes and aria labels. */
  tPlain: (k: string) => string;
};
const Ctx = createContext<LangCtx | null>(null);

const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('hcsd-lang');
    if (saved === 'en' || saved === 'zh' || saved === 'pt') return saved;
  } catch { /* storage blocked: fall through */ }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  if (/^zh/i.test(nav)) return 'zh';
  if (/^pt/i.test(nav)) return 'pt';
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : lang;
    try { localStorage.setItem('hcsd-lang', lang); } catch { /* not saved */ }
  }, [lang]);
  const value = useMemo<LangCtx>(() => {
    const t = (k: string) => (T[k] ? T[k][L[lang]] : k);
    return { lang, setLang, t, tPlain: (k: string) => plain(t(k)) };
  }, [lang, setLang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang outside LangProvider');
  return v;
}

// Any other attribute (href, htmlFor, type, aria-*) passes through to the element.
type TxProps = { k: string; as?: ElementType; className?: string; style?: CSSProperties; id?: string; [attr: string]: unknown };
/** A translated string. Our own copy, so HTML (<em>, <a>) is rendered as written. */
export function Tx({ k, as: Tag = 'span', ...rest }: TxProps) {
  const { t } = useLang();
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}

/** The second line under a heading: Chinese under English and Portuguese, English under Chinese. */
export function Echo({ k, as: Tag = 'p', className = 'echo', style }: { k: string; as?: ElementType; className?: string; style?: CSSProperties }) {
  const { lang } = useLang();
  const v = ECHO[k];
  if (!v) return null;
  return <Tag className={className} style={style} lang={lang === 'zh' ? 'en' : 'zh-Hant'}>{v[L[lang]]}</Tag>;
}
