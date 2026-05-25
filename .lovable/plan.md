# Personal Portfolio — l4rp.wtf style

A moody, minimal personal site with three tabs (Home, Socials, Contact). Each tab is a centered "card" with an image and text beside it, over a fullscreen looping video background with ambient audio.

## Pages & content

**Home `/`** — main landing
- Card image: your forest/hooded pfp
- Title: `keno` (placeholder — tell me if you want different)
- Subtitle: *Java Developer, also working with C++ & C#*
- Two nav buttons under subtitle: `SOCIALS`, `CONTACT`
- No "← return" here (it's the home)

**Socials `/socials`**
- Same card layout, "← return" top-left
- Title: `socials`
- Buttons: `DISCORD` (opens `https://discord.com/users/1432773324143988747`), `TIKTOK` (opens `https://www.tiktok.com/@wbu5s`)

**Contact `/contact`**
- Same card layout, "← return" top-left
- Title: `contact`
- Buttons: `EMAIL` (`mailto:kenostreaming@gmail.com`), `DISCORD` (`https://discord.com/users/1432773324143988747`)

## Visual design

Matching the reference screenshot:
- Fullscreen looping `<video>` background (the uploaded mp4) with a dark overlay (~55% black) for legibility
- Center composition: portrait-aspect image on the left, text block on the right with serif title (à la Cormorant/Playfair), small italic subtitle, monospace uppercase buttons with thin border
- Top-left `← return` link in mono font on inner pages
- Subtle entrance animation when switching tabs (fade + slight scale, ~400ms) to evoke the "rotate to enter" feel
- Bottom-right small audio toggle (🔊/🔇) — required because browsers block autoplay-with-sound; starts muted, user click unmutes
- Color tokens in `src/styles.css`: near-black bg, off-white foreground, muted gray for subtitle, thin white borders for buttons

## Technical implementation

```
src/assets/
  bg-video.mp4          (copied from upload)
  pfp.png               (copied from forest hooded image)
src/components/
  VideoBackground.tsx   (fixed video + overlay + audio toggle, mounted in __root)
  TabCard.tsx           (shared card layout: image left, title/subtitle/buttons right, optional return link)
src/routes/
  __root.tsx            (add <VideoBackground/> behind <Outlet/>)
  index.tsx             (Home using TabCard, no return link, nav to socials/contact)
  socials.tsx           (TabCard with discord + tiktok buttons)
  contact.tsx           (TabCard with email + discord buttons)
src/styles.css          (dark theme tokens, serif + mono font imports via @import url)
```

- Each route gets its own `head()` with unique title/description/og tags
- Video element: `autoPlay loop playsInline`, starts `muted`, audio toggle flips `muted` state
- Page transitions via Framer Motion `AnimatePresence` keyed on pathname
- Fonts: Cormorant Garamond (serif title) + JetBrains Mono (buttons/return link), loaded from Google Fonts in `__root` head

## Out of scope (ask if you want them)

- 3D rotation between tabs (reference uses a simple fade — keeping it lightweight unless you want a real 3D carousel)
- Additional projects list on Home (you only gave the one-line bio)
