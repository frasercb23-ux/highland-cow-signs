# Highland Cow Signs Co. — Website

A full multi-page static e-commerce website for Highland Cow Signs Co., ready to deploy on GitHub Pages.

---

## Files

```
/
├── index.html          Homepage
├── collections.html    Shop — filterable product grid
├── product.html        Product detail page (example: A4 Metal Sign)
├── personalised.html   Personalised sign builder with live preview
├── about.html          About, Trade, FAQs, Contact
├── css/
│   └── style.css       Full design system + all page styles
├── js/
│   └── main.js         Cart drawer, mobile menu, animations, interactions
└── README.md           This file
```

---

## Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `highland-cow-signs` (or whatever you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload the files

**Option A — Drag and drop (easiest)**
1. On your new repo page, click **uploading an existing file**
2. Drag the entire `2026-05-23-highland-cow-signs-website/` folder contents in
3. Click **Commit changes**

**Option B — Git command line**
```bash
cd "path/to/2026-05-23-highland-cow-signs-website"
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/highland-cow-signs.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Set branch to `main`, folder to `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes — your site will be live at:
   `https://YOUR-USERNAME.github.io/highland-cow-signs/`

---

## Swapping in Your Real Photos

All placeholder images use `picsum.photos`. Every image slot is labelled with a `<!-- 📸 PHOTO SLOT N: description -->` comment in the HTML. 

To replace a placeholder, find the comment and update the `src` attribute on the `<img>` or the `background-image` URL in the `style` attribute:

```html
<!-- BEFORE (placeholder) -->
<img src="https://picsum.photos/seed/highland-cow-product-1/500/500" alt="...">

<!-- AFTER (your real photo) -->
<img src="images/highland-cow-sign-front.jpg" alt="...">
```

Create an `images/` folder in the project root and put your photos there.

### Your 11 Photo Slots

| # | File label | Where used | Ideal shot |
|---|---|---|---|
| 1 | `hero-main.jpg` | `index.html` hero background | Wide Highland landscape, misty glen |
| 2 | `product-front.jpg` | `product.html` gallery main | Product front-on, clean/white background |
| 3 | `product-wall.jpg` | `product.html` gallery thumb 2 | Sign hung on rustic stone or brick wall |
| 4 | `product-detail.jpg` | `product.html` gallery thumb 3 | Close-up of print texture / aged finish |
| 5 | `product-lifestyle.jpg` | `product.html` gallery thumb 4 | Sign in a kitchen or living room setting |
| 6 | `personalised-hero.jpg` | `personalised.html` page hero | Rustic farmhouse interior with signs |
| 7 | `personalised-example-1.jpg` | `personalised.html` examples | Personalised family name sign in home |
| 8 | `personalised-example-2.jpg` | `personalised.html` examples | Personalised wooden sign, lifestyle |
| 9 | `about-hero.jpg` | `about.html` page hero | Highland Cow herd in misty landscape |
| 10 | `workshop.jpg` | `about.html` story section | Workshop / someone crafting a sign |
| 11 | `trade-shop.jpg` | `about.html` trade section | Signs displayed in a gift shop |

Plus these appear inline in the product grid — replace with your actual product shots:
- `collections/product-01.jpg` through `product-16.jpg`

---

## Customising the Brand

All colours, fonts and spacing live in `css/style.css` at the top under `/* 1. DESIGN TOKENS */`.

**To change the brand name:** Find and replace `Highland Cow Signs Co.` across all HTML files.

**To change contact details:** Update in the footer of each page and in `about.html`.

**To add a real domain:** Point your domain to GitHub Pages in **Settings → Pages → Custom domain**.

---

## Next Steps

- [ ] Replace placeholder images with your 11 real photos
- [ ] Update contact details (email, phone)
- [ ] Add Google Analytics or Plausible tracking
- [ ] Connect a real payment system (Shopify Buy Button, Snipcart, or Stripe)
- [ ] Set up a contact form backend (Formspree.io is free and easy)
- [ ] Register your domain at Namecheap or 123-reg

---

*Built May 2026 · Rustic Highland Theme · HTML/CSS/JS · GitHub Pages ready*
