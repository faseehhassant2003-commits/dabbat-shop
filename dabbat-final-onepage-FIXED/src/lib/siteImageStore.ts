export interface SiteImages {
  hero: string;
  editorial: string;
  shirts: string;
  trousers: string;
}

export const SITE_IMAGES_STORAGE_KEY = "dabbat-site-images";

export const defaultSiteImages: SiteImages = {
  hero: "/images/hero-editorial.svg",
  editorial: "/images/ChatGPT%20Image%20Sep%2013,%202026,%2012_35_46%20AM.png",
  shirts: "/images/shirt_banner%20(2).svg",
  trousers: "/images/trousers_banner.svg",
};

export function getSiteImages(): SiteImages {
  if (typeof window === "undefined") return defaultSiteImages;

  try {
    const saved = window.localStorage.getItem(SITE_IMAGES_STORAGE_KEY);
    return saved ? { ...defaultSiteImages, ...JSON.parse(saved) } : defaultSiteImages;
  } catch {
    return defaultSiteImages;
  }
}

export function saveSiteImages(images: SiteImages): void {
  window.localStorage.setItem(SITE_IMAGES_STORAGE_KEY, JSON.stringify(images));
  window.dispatchEvent(new CustomEvent("dabbat-site-images-updated"));
}
