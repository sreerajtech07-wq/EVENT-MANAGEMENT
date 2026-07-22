# Luxe Events — Premium Event Management Website

A production-quality, fully responsive event management booking website built with modern frontend technologies. Designed with a luxury aesthetic featuring glassmorphism, gradient accents, and professional GSAP animations.

## Project Overview

Luxe Events is a fictional premium event management company website showcasing services for weddings, corporate events, birthday parties, photography, and workshops. The site includes a complete home page with 11 sections, authentication pages, a booking form, and contact page — all built with vanilla HTML, CSS, and JavaScript.

## Folder Structure

```
/
├── index.html          # Home page (Hero, About, Services, Gallery, Events, Pricing, Testimonials, Counters, FAQ, CTA, Footer)
├── login.html          # Login page with glassmorphism form
├── register.html       # Registration with password strength indicator
├── booking.html        # Event booking form
├── contact.html        # Contact page with map and form
├── css/
│   └── styles.css      # Custom styles, design system, dark mode
├── js/
│   ├── main.js         # Navbar, dark mode, forms, FAQ, testimonials, gallery filter
│   └── animations.js   # GSAP ScrollTrigger animations
├── images/             # Image assets (uses Unsplash CDN placeholders)
└── README.md
```

## Features

### Design & UI
- **Black & gold luxury theme** with champagne gradient accents
- **Glassmorphism** cards with backdrop blur and soft shadows
- **Fully responsive** — mobile, tablet, laptop, desktop, large monitors
- **Dark/Light mode toggle** with LocalStorage persistence and animated transitions
- **Premium typography** — Cinzel + Montserrat font pairing

### Home Page Sections
1. Hero with parallax background and floating elements
2. About (Mission, Vision, Why Choose Us)
3. Services (6 service cards with hover effects)
4. Events Gallery with category filters
5. Upcoming Events cards
6. Pricing Packages (Silver, Gold, Platinum)
7. Testimonials auto-slider
8. Animated counters (ScrollTrigger)
9. FAQ accordion
10. CTA banner
11. Full footer with newsletter

### Interactivity
- Sticky navbar with scroll-based background change
- Mobile hamburger menu with smooth animation
- GSAP animations: fade-in, slide-up, parallax, stagger, scale, counters
- Client-side form validation on all forms
- Success modal popups
- Password visibility toggle and strength indicator
- Gallery category filtering

### Accessibility
- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Alt text on images
- Good color contrast ratios

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup |
| CSS3 | Custom design system, animations, glassmorphism |
| Tailwind CSS (CDN) | Utility classes, responsive grid/flex layout |
| GSAP 3.12 + ScrollTrigger (CDN) | Professional scroll and entrance animations |
| Vanilla JavaScript | Dark mode, forms, FAQ, slider, gallery filter |
| Google Fonts | Cinzel + Montserrat |
| Unsplash | High-quality royalty-free placeholder images |

## How to Run Locally

No build tools, package manager, or server required.

1. **Clone or download** the project folder
2. **Open `index.html`** directly in any modern browser (Chrome, Firefox, Edge, Safari)
3. Navigate between pages using the navbar links

> **Note:** An internet connection is required for CDN resources (Tailwind CSS, GSAP, Google Fonts, Unsplash images, Google Maps embed).

### Optional: Local Server

For the best experience (especially with some browser security policies), serve via a local HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx is available)
npx serve .
```

Then visit `http://localhost:8000`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is created for educational and portfolio purposes. Images courtesy of [Unsplash](https://unsplash.com).

---

Built with passion for extraordinary celebrations. **Luxe Events © 2026**
