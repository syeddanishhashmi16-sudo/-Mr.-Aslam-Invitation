# Royal Valima Reception — React Invitation

Mobile-first luxury Islamic wedding invitation built with React, Tailwind CSS, Framer Motion, Lucide React and canvas-confetti.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Music

Your supplied audio is already included as `public/music.mp3` and the app uses:

```js
const BG_MUSIC_URL = "/music.mp3";
```

The music starts when the user taps **Open Invitation**, so it follows browser autoplay rules.

## Event timer

The invitation displays “After Namaz-e-Maghrib”. Since no exact clock time was supplied, the countdown target is kept easy to edit:

```js
const EVENT_DATE = "2026-11-03T18:00:00+05:30";
```

Change that one value if the family has a confirmed event time.

## Customization

All principal names, venue, phone numbers, map link, date, music URL and event target are near the top of `src/main.jsx`.
