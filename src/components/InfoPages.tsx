import { L } from '@/content';
import { Tx, useLang } from '@/i18n';
import { ABOUT, HISTORY, JOIN, PROJECTS, type Tri } from '@/pagesContent';
import { Clover, Logo, NewsForm } from './common';

/* The four in-depth pages. Each opens with its own colour field and title, then goes further than the home page. */

function useTr() {
  const { lang, tPlain } = useLang();
  return { tr: (x: Tri) => x[L[lang]], tPlain };
}

const LIGHT = ['field-paper', 'field-stone', 'field-white'];
function PageHead({ field, title, lede, id }: { field: string; title: Tri; lede: Tri; id: string }) {
  const { tr } = useTr();
  const light = LIGHT.includes(field);
  return (
    <header className={`field ${field} page-head` + (light ? '' : ' on-color')}>
      <a className="logo-link" href="#" aria-label="HCSD Macao"><Logo variant={light ? 'ink' : 'paper'} /></a>
      <div className="wrap section-head" data-rise>
        <h1 id={id} className="display">{tr(title)}</h1>
        <p className="lede">{tr(lede)}</p>
      </div>
    </header>
  );
}

function Figure({ src, alt, cap, className }: { src: string; alt: Tri; cap?: Tri; className?: string }) {
  const { tr } = useTr();
  return (
    <figure className={'fig ' + (className || '')} data-rise>
      <img src={src} alt={tr(alt)} loading="lazy" decoding="async" />
      {cap && <figcaption>{tr(cap)}</figcaption>}
    </figure>
  );
}

const mail = (subject: string) => `mailto:info@hcsdmacao.org?subject=${encodeURIComponent(subject)}`;

/* ---------- About us ---------- */
const ROLES = [0, 4, 5, 6, 1, 2, 3, 7];
export function AboutPage() {
  const { tr, tPlain } = useTr();
  return (
    <>
      <PageHead field="field-night" title={ABOUT.title} lede={ABOUT.lede} id="about-h" />
      <section className="field field-paper" aria-labelledby="who-h">
        <div className="wrap split">
          <div className="copy" data-rise>
            <h2 id="who-h" className="display">{tr(ABOUT.whoH)}</h2>
            {ABOUT.who.map((p, i) => <p key={i} className={i === 0 ? 'lede' : 'text'}>{tr(p)}</p>)}
          </div>
          <Figure src="img/a-cheok-ka.jpg" alt={ABOUT.whoCap} cap={ABOUT.whoCap} />
        </div>
      </section>
      <section className="field field-stone" aria-labelledby="name-h">
        <div className="wrap">
          <h2 id="name-h" className="display block-h" data-rise>{tr(ABOUT.nameH)}</h2>
          <div className="pair">
            {ABOUT.name.map(([t, p], i) => <div key={i} data-rise><h3 className="title">{tr(t)}</h3><p className="text">{tr(p)}</p></div>)}
          </div>
        </div>
      </section>
      <section className="field field-cobalt on-color" aria-labelledby="how-h">
        <div className="wrap">
          <h2 id="how-h" className="display block-h" data-rise>{tr(ABOUT.howH)}</h2>
          <div className="trio">
            {ABOUT.how.map((c, i) => (
              <article key={i} className="card" data-rise>
                <h3 className="title">{tr(c.t)}</h3>
                <p>{tr(c.p)}</p>
                <ul>{c.li.map((x, j) => <li key={j}>{tr(x)}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="field field-paper" aria-labelledby="believe-h">
        <div className="wrap">
          <h2 id="believe-h" className="display block-h" data-rise>{tr(ABOUT.beliefH)}</h2>
          <div className="pair quad">
            {ABOUT.beliefs.map(([t, p], i) => <div key={i} data-rise><h3 className="title">{tr(t)}</h3><p className="text">{tr(p)}</p></div>)}
          </div>
        </div>
      </section>
      <section className="field field-white" aria-labelledby="people-h">
        <div className="wrap">
          <div className="section-head" data-rise>
            <h2 id="people-h" className="display">{tr(ABOUT.teamH)}</h2>
            <p className="lede">{tr(ABOUT.teamLede)}</p>
          </div>
          <ul className="team-grid">
            {ROLES.map((r, i) => (
              <li key={i} data-rise>
                <div className="portrait" role="img" aria-label={tPlain('portrait')}><Clover fill={i % 4 === 3 ? '#FFFFFF' : '#FBFBF8'} /></div>
                <span className="name">{tPlain('name')}</span>
                <span className="role">{tPlain(`role${r}`)}</span>
                <span className="bio">{tr(ABOUT.bio)}</span>
              </li>
            ))}
          </ul>
          <p className="team-more">{tr(ABOUT.joinTeam)} <a href="#join">{tPlain('vol_cta')}</a></p>
        </div>
      </section>
    </>
  );
}

/* ---------- Projects ---------- */
export function ProjectsPage() {
  const { tr } = useTr();
  return (
    <>
      <PageHead field="field-paper" title={PROJECTS.title} lede={PROJECTS.lede} id="projects-h" />
      {PROJECTS.list.map((p, n) => {
        const light = LIGHT.includes(p.field);
        return (
          <section key={p.id} id={`project-${p.id}`} className={`field ${p.field} project-page` + (light ? '' : ' on-color')} aria-labelledby={`${p.id}-h`}>
            <div className={'wrap split' + (n % 2 ? ' flip' : '')}>
              <div className="copy" data-rise>
                <div className="head"><h2 id={`${p.id}-h`} className="display">{tr(p.title)}</h2><span className="tag">{tr(PROJECTS.planned)}</span></div>
                <p className="lede">{tr(p.intro)}</p>
              </div>
              <Figure src={p.img} alt={p.alt} cap={p.cap} />
            </div>
            <div className="wrap detail">
              <div data-rise><h3 className="title">{tr(p.whyH)}</h3><p className="text">{tr(p.why)}</p></div>
              <div data-rise>
                <h3 className="title">{tr(p.stepsH)}</h3>
                <ol className="steps">{p.steps.map(([t, d], i) => <li key={i}><b>{tr(t)}</b> {tr(d)}</li>)}</ol>
              </div>
              <div data-rise>
                <h3 className="title">{tr(p.outH)}</h3>
                <ul className="plain-list">{p.out.map((x, i) => <li key={i}>{tr(x)}</li>)}</ul>
                <h3 className="title part-h">{tr(p.partH)}</h3>
                <p className="text">{tr(p.part)}</p>
                <a className={'pill ' + (light ? 'pill-ink' : 'pill-white')} href="#join">{tr(p.cta)}</a>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ---------- History ---------- */
export function HistoryPage() {
  const { tr } = useTr();
  return (
    <>
      <PageHead field="field-night" title={HISTORY.title} lede={HISTORY.lede} id="history-h" />
      <section className="field field-night on-color band-sec" aria-label={tr(HISTORY.bandCap)}>
        <div className="wrap"><Figure className="band" src="img/h-harbour-sunqua.jpg" alt={HISTORY.bandAlt} cap={HISTORY.bandCap} /></div>
      </section>
      <section className="field field-paper chapters" aria-labelledby="history-h">
        <div className="wrap">
          {HISTORY.chapters.map((c, i) => (
            <article key={i} className={'chapter' + (c.img ? '' : ' no-fig')} aria-labelledby={`ch-${i}`}>
              <p className="yr" data-rise>{c.years}</p>
              <div className="copy" data-rise>
                <h2 id={`ch-${i}`} className="title">{tr(c.title)}</h2>
                {c.text.map((t, j) => <p key={j} className="text">{tr(t)}</p>)}
              </div>
              {c.img && c.alt && <Figure src={c.img} alt={c.alt} cap={c.cap} />}
            </article>
          ))}
          <p className="small note-line">{tr(HISTORY.note)}</p>
        </div>
      </section>
    </>
  );
}

/* ---------- Join & contact ---------- */
export function JoinPage() {
  const { tr, tPlain } = useTr();
  const email = tPlain('email_ph');
  return (
    <>
      <PageHead field="field-cobalt" title={JOIN.title} lede={JOIN.lede} id="join-h" />
      <section className="field field-paper" aria-labelledby="vol-h">
        <div className="wrap">
          <div className="section-head" data-rise>
            <h2 id="vol-h" className="display">{tr(JOIN.volH)}</h2>
            <p className="lede">{tr(JOIN.vol)}</p>
          </div>
          <ul className="roles">
            {JOIN.roles.map(([t, d], i) => <li key={i} data-rise><h3 className="title">{tr(t)}</h3><p>{tr(d)}</p></li>)}
          </ul>
          <a className="pill pill-ink cta-after" href={mail('Volunteer')}>{tr(JOIN.volCta)}</a>
        </div>
      </section>
      <section className="field field-stone" aria-label={`${tr(JOIN.memH)} · ${tr(JOIN.donH)}`}>
        <div className="wrap pair">
          <div className="stack" data-rise>
            <h2 className="display">{tr(JOIN.memH)}</h2>
            <p className="lede">{tr(JOIN.mem)}</p>
            <p className="text">{tr(JOIN.memGet)}</p>
            <p className="text">{tr(JOIN.memPay)}</p>
            <a className="pill pill-cobalt" href={mail('Membership')}>{tr(JOIN.memCta)}</a>
          </div>
          <div className="stack" data-rise>
            <h2 className="display">{tr(JOIN.donH)}</h2>
            <p className="lede">{tr(JOIN.don)}</p>
            <p className="text">{tr(JOIN.donHow)}</p>
            <a className="pill pill-ink" href={mail('Donation')}>{tr(JOIN.donCta)}</a>
          </div>
        </div>
      </section>
      <section className="field field-night on-color" aria-labelledby="faq-h">
        <div className="wrap">
          <h2 id="faq-h" className="display block-h" data-rise>{tr(JOIN.faqH)}</h2>
          <dl className="faq">
            {JOIN.faq.map(([q, a], i) => <div key={i} data-rise><dt>{tr(q)}</dt><dd>{tr(a)}</dd></div>)}
          </dl>
        </div>
      </section>
      <section className="field field-cobalt on-color" id="join-contact" aria-labelledby="touch-h">
        <div className="wrap contact page-contact">
          <div className="lines" data-rise>
            <h2 id="touch-h" className="display">{tr(JOIN.contactH)}</h2>
            <a className="email" href={`mailto:${email}`}>{email}</a>
            <span className="socials"><a href="#join-contact">[Instagram]</a><a href="#join-contact">[Facebook]</a><a href="#join-contact">[WeChat]</a><a href="#join-contact">[Xiaohongshu]</a></span>
            <Tx k="address" as="span" />
          </div>
          <NewsForm id="news-page" labelKey="news_label" after={<Tx k="news_freq" as="p" className="small" style={{ color: '#C9CCF6' }} />} />
        </div>
      </section>
    </>
  );
}
