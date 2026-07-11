# 📺 Frynime

> A high-performance, cinematic anime indexing and streaming platform built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

🔗 **Live Demo:** [https://frynime.netlify.app](https://frynime.netlify.app)

---

## 💡 About The Project

Frynime is a frontend architecture exploration project aimed at building a fast, scalable, and responsive media indexing application. It features a dark, cinematic UI inspired by premium streaming platforms, optimized specifically for both desktop and mobile web experiences.

Data is fetched asynchronously using the **Jikan REST API** (Unofficial MyAnimeList API).

---

## 🚀 Features

*   **Cinematic UI/UX:** Dark mode default with sleek, cyberpunk-inspired cyan accents.
*   **Mobile-First Navigation:** Features a custom iOS-style floating pill navigation bar for mobile devices.
*   **Optimized Performance:** Utilizes Next.js native `<Image>` component for lazy loading and auto-compression, achieving high Lighthouse scores.
*   **Resilient Data Fetching:** Implements caching (`revalidate`) and basic retry logic to handle third-party API rate limits.
*   **Core Pages:** Trending, Top Airing, Genres, Dynamic Search, and a Favorites system (Local Storage).

---

## ⚠️ Known Limitations & Disclaimers

Since this project relies on a free, public API (Jikan), there are a few intentional technical constraints:

1.  **Intentional Rate Limiting (Throttling):** Jikan API strictly limits requests to **3 per second**. The application's loading state is intentionally prolonged/throttled in certain areas to prevent server overload and IP blacklisting (Error 504/429).
2.  **Empty Results:** If the search or genre pages return empty results, the API rate limit has likely been exceeded by the current ISP.
3.  **Video Player Issues:** The streaming feature is experimental. Several episodes may not play or will return a "moved page" error due to changes in the upstream source data. 

---

## 🛠️ Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/nblauliadka/frynime.git](https://github.com/nblauliadka/frynime.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd frynime
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:** 
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 License

Distributed under the MIT License. Feel free to fork and explore!
