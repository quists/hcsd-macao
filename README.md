# HCSD Macao website

React 19 + Vite + TypeScript + Tailwind 4, with GSAP (ScrollTrigger) and Lenis for the scroll story.
`npm run build` makes one self-contained `dist/index.html` (code and styles inlined) plus `dist/img` and `dist/media`.

```
npm install
npm run dev        # local preview
npm run typecheck
npm run build      # -> dist/
```

## Design

One page, told in full colour fields (after Sébastien Graf's portfolio) with Macao's name set huge in a Chinese serif over its photographs (after Fudo).

- Type: Funnel Display for Latin headings, Funnel Sans for text, Noto Serif TC for all Chinese. Five size roles in `src/index.css` (`--fs-small` to `--fs-display`).
- Colour: cobalt #3E46E0 (opening and close), paper, near-black #101816 (Macao, history), stone grey, temple red #A8322B, dark grey. Red also marks small tags.
- Shapes: round pills for every control; photographs with an 18px radius.
- Motion: Lenis smooth scroll; the statement fills from grey to ink as you read; blocks rise a little as they enter; the menu floods out from its button.

## Where things are

- `src/content.ts`: every word in English, Traditional Chinese (Macao) and European Portuguese. Placeholders are in [brackets].
- `src/components/Page.tsx`: the page, section by section (opening, statement, Macao and 1844, what we do, projects, history, team, join, footer).
- `src/components/Shell.tsx`: logo loader, top bar, menu.
- `src/index.css`: tokens and styles. Tokens are also exposed under shadcn names (`--primary`, `--muted`, ...).
- `public/img`, `public/media`: photographs, logos, logo animations.

## Adding 21st.dev components

The project is set up for the shadcn CLI (`components.json`, `@/` alias, `cn()` in `src/lib/utils.ts`).
With a 21st.dev API key in the environment as `API_KEY_21ST`:

```
npx shadcn@latest add "https://21st.dev/r/<author>/<component>?api_key=$API_KEY_21ST"
```

Components land in `src/components/ui/`. Installed so far: `image-compare` (Hirael, by Mohammad Shehadeh, MIT), used for the 1844 / today comparison and dressed in the page's parts at the end of `src/index.css`. Their Tailwind colour classes (`bg-background`, `text-muted-foreground`, `bg-primary`)
resolve to the HCSD palette.

## Publishing (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

1. In the repository: Settings > Pages > Build and deployment > Source: **GitHub Actions**.
2. Push to `main`. The site appears at `https://<owner>.github.io/<repo>/`.
3. Custom domain: put the domain in `public/CNAME` (one line, e.g. `hcsdmacao.org`), push, and enter the same domain under Settings > Pages > Custom domain. At the domain's registrar add:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www`: `<owner>.github.io`

   Then tick "Enforce HTTPS" once GitHub has issued the certificate.
