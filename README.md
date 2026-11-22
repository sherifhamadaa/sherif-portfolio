# Sherif Hamada, Flutter Developer: portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8080      # then open http://localhost:8080

Fonts load from Google Fonts. Offline, the site falls back to system fonts.

## Edit content
Everything (text, links, skills, projects, timeline) is in `js/content.js`.
- Leave a link as `""` to hide it.
- Add a screenshot: put the image in `assets/`, then add
  `{ type: "image", src: "assets/...", alt: "...", caption: "..." }` to a project's `screens` list.
- Set `repo` on "Route Bank System" to show a "View on GitHub" button for that repository.
- Set `demo` on a project to show a "Live demo" button.

## Files
    index.html        page shell, SEO meta, structured data
    css/styles.css    design tokens (light/dark), layout, responsive rules
    js/content.js     all editable content
    js/main.js        rendering, nav, theme, mobile menu, copy-email, search demo
    assets/           images (islamic-app/splash.jpg is the app's real splash art)

## Deploy
Upload the folder to GitHub Pages, Netlify or Vercel (static site, no build command).
