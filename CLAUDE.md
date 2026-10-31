# HCSD Macao website

## Every change ships in two places

After any change to the site, update BOTH, every time:

1. **The live site**: commit and push to `main` on `quists/hcsd-macao`. GitHub Actions builds it and publishes it to https://hcsdmacao.org (GitHub Pages, DNS at Cloudflare). Watch the run until it succeeds.
2. **The Claude artifact "HCSD Macao"**: https://claude.ai/artifact/7B7to2mSt8GCHggtp1UCWG (slug `32008482-9fd4-4f7e-a45e-6cac55b08505`). Run `npm run build`, then republish `dist/index.html` as `index.html`, plus any changed files under `dist/img` and `dist/media` at the same paths, with the artifacts publish-from-files tool (base_version = the live version from get_artifact).

## Project

React + Vite + Tailwind, one page, three languages (English, Traditional Chinese for Macao, European Portuguese). See README.md for the design system and where things are.

- Each language version shows only its own language (the footer credits and the language switcher are the exceptions).
- English and Portuguese use the English logo; Chinese uses the Chinese logo.
- The intro film (`public/media/intro.mp4`, 1080p H.264 without sound, encoded from the original in the GitHub release `intro-video`) plays in full on every visit, in a centred frame. Visitors can only Skip it: no controls, no pausing, no context menu, picture-in-picture, casting, fullscreen or download. If the browser refuses to autoplay, the logo shows with a Play intro button.
