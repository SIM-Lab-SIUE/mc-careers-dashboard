# Mass Communications Careers Dashboard

A SvelteKit-based interactive dashboard that helps students explore mass communications career paths. The dashboard visualizes occupation data, wage information by state, required technologies, and now includes **Recommended Courses** aligned with each job title and track within the SIUE Mass Communications program.

Hosted on the [`gh-pages`](https://github.com/your-org/mc-careers-dashboard/tree/gh-pages) branch as a static site.

---

## 🚀 Features

- 🎯 **Career Explorer**: Filter by academic track and career title
- 💼 **Occupation Descriptions**: View detailed summaries of each Title-Alt role
- 🧠 **Recommended Courses**: Shows relevant SIUE courses to help students prepare for specific roles
- 💻 **Technology Tags**: Displays hot and in-demand technologies linked to each job
- 📈 **Wage Visualization**: Median annual/hourly wage chart by state
- 🌐 **Deployed via GitHub Pages**

---

## 📦 Project Structure

- `src/routes/+page.svelte` – Main dashboard interface
- `src/routes/+page.ts` – Loads and parses CSV data files
- `docs/data/` – Contains CSV data files used in the deployed site
- `static/` – Public static assets (optional fallback for data)
- `gh-pages` branch – Contains built static site

---

## 🛠 Setup & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or open it in the browser automatically:
npm run dev -- --open
````

---

## 🏗️ Building for Production

To build the dashboard for static deployment:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🧪 Updating the Dashboard (Data Flow)

1. Use R to process and clean your datasets:

   * Join Title-Alt occupation data with track recommendations
   * Ensure only one course set per Title-Alt × Track combo
   * Output: `occupations.csv`

2. Copy the updated CSV files to the correct location:

```bash
cp path/to/occupations.csv docs/data/occupations.csv
```

3. Rebuild and commit:

```bash
npm run build
git add docs/data/occupations.csv
git commit -m "Update occupations data with recommended courses"
git push origin main
```

4. Push the contents of `docs/` to the `gh-pages` branch if not using CI.

---

## 📁 Data Files

| File                          | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `occupations.csv`             | Main job listing with descriptions, tracks, and recommended courses |
| `occupation_technologies.csv` | Maps jobs to technology skill IDs                                   |
| `technologies.csv`            | Lists technology tools and examples                                 |
| `state_wages.csv`             | Median wage data by occupation and state                            |

---

## 🧩 Adapter

This project uses [`@sveltejs/adapter-static`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) for GitHub Pages deployment. Be sure `svelte.config.js` includes:

```js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: '/mc-careers-dashboard' // adjust if hosted under a different path
    },
    prerender: {
      default: true
    }
  }
};
```

---

## 📬 Contact

Built and maintained by the [SIM Lab @ SIUE](https://sim-lab-siue.github.io).
