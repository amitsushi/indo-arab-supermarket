# Indo&Arab Supermarket — Static Website

A GitHub Pages–ready supermarket template (no build step).
It mimics a modern hypermarket layout with:
- Home page (categories + featured deals)
- Category listing (`listing.html?cat=Category`)
- Product page (`product.html?id=ID`)
- Cart using localStorage (`cart.html`)
- EN/AR toggle (RTL support)
- Prices in QAR

## How to use (GitHub Pages)
1. Create a new GitHub repo, e.g. `indo-arab-supermarket`.
2. Upload **all files** from the zip to the repo root (not in a subfolder).
3. In GitHub → Settings → Pages → set **Source: Deploy from a branch**, branch **main**, folder **/root**.
4. Your site will appear at `https://<your-username>.github.io/<repo>/`.

## Customize
- Replace `assets/logo.svg` with your logo (same filename).
- Edit `products.json` to add your inventory.
- Edit texts/colors in `styles.css` and `app.js` (i18n section).
- Add banners on the home page (`index.html` → `.banner`).

## Notes
- This is front-end only. For real orders and payments (Stripe, Tap, PayTabs), you’ll need a backend or service.
- SEO: add meta tags, Open Graph images, and a sitemap when you go live.
