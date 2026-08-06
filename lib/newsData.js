import { dummyImage } from "@/lib/siteImages";

/* News posts shown on the home page and the news page.
   Drop matching photos into public/images/news/ named news-1, news-2, ...
   (any of .jpg/.jpeg/.png/.webp). */

export const NEWS = [
  {
    base: "images/news/news-1",
    fallback: dummyImage("ciba-n1", 900, 600),
    tag: "Announcement",
    title: "Central Interior Business Accelerator Appoints New Executive Director",
    text: "Visionary leader brings 15+ years of experience driving regional innovation and business growth across the Central Interior.",
  },
  {
    base: "images/news/news-2",
    fallback: dummyImage("ciba-n2", 640, 400),
    tag: "Press Release",
    title: "AI Skills Accelerator program launches to help small and medium-sized businesses",
    text: "KAMLOOPS, BC — A new program helping small and medium-sized businesses put practical AI skills to work.",
  },
  {
    base: "images/news/news-3",
    fallback: dummyImage("ciba-n3", 640, 400),
    tag: "Success Story",
    title: "How Sweláps Market Transformed Their Business with Smart Technology",
    text: "In the competitive grocery industry, independent stores often struggle to keep pace — here's how Sweláps Market did it.",
  },
];
