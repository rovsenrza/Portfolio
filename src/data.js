const img = (path) => `${import.meta.env.BASE_URL}img/${path}`;

export const contact = {
  email: "rovsen.rzayev.2009@gmail.com",
  phone: "(+99450) 719 31 49",
  phoneHref: "tel:+994507193149",
  whatsapp: "https://wa.me/994507193149",
  linkedin: "https://www.linkedin.com/in/rovshanrzayev/",
  github: "https://github.com/rovsenrza",
  facebook: "https://www.facebook.com/profile.php?id=100091345232600",
  instagram: "https://www.instagram.com/rzayevv.o52/",
  cv: `${import.meta.env.BASE_URL}Rovshan-Rzayev-CV.pdf`,
};

export const skills = {
  ios: ["Swift", "SwiftUI", "UIKit", "Combine", "MVVM-C", "SnapKit", "Firebase", "XCTest"],
  web: ["JavaScript", "TypeScript", "React", "HTML", "CSS / SCSS", "Tailwind", "Laravel", "Figma"],
};

// Mixed on purpose: iOS and web work side by side, strongest first.
export const projects = [
  {
    name: "Ru App Store",
    type: "ios",
    note: "SwiftUI storefront with its own API and admin panel",
    image: img("work/ruappstore.webp"),
    center: true,
    href: "https://ruappstore.com",
  },
  {
    name: "RVD Cabinet",
    type: "web",
    note: "React + TypeScript customer dashboard",
    image: img("work/rvd-devices.webp"),
    center: true,
    href: "https://rvd-dashboard.vercel.app",
  },
  {
    name: "Green & Tasty",
    type: "ios",
    note: "SwiftUI restaurant app, 743 tests",
    image: img("work/greentasty.webp"),
    center: true,
    href: "https://github.com/rovsenrza/Green-Tasty",
  },
  {
    name: "Media-Ideya",
    type: "web",
    note: "Cross-marketing advertising agency",
    image: img("work/mediaideya-devices.webp"),
    center: true,
    href: "https://mediaideya.ru",
  },
  {
    name: "Marketplace",
    type: "ios",
    note: "UIKit shop + SwiftUI admin on Firebase",
    image: img("work/marketplace.webp"),
    center: true,
    href: "https://github.com/rovsenrza/MarketPlace-ECommerce",
  },
  {
    name: "LaoCar",
    type: "web",
    note: "Premium car rental in Minsk",
    image: img("work/laocar-devices.webp"),
    center: true,
    href: "https://laocar.by",
  },
  {
    name: "MyGov",
    type: "ios",
    note: "Modular refactoring and Design System at EPAM",
    image: img("work/mygov.webp"),
    center: true,
    href: "https://apps.apple.com/az/app/mygov/id1533956540",
  },
  { name: "Galva Tech", type: "web", note: "Electroplating equipment and chemicals", image: img("work/galvatech-devices.webp"), center: true, href: "https://galva-tech.ru" },
  { name: "Astana Taxi", type: "web", note: "Car rental for taxi drivers in Astana", image: img("work/astanataxi-devices.webp"), center: true, href: "https://astanataxi.kz" },
  { name: "OV Cosmetology", type: "web", note: "Online cosmetology school", image: img("work/ovcosmetology-devices.webp"), center: true, href: "https://ovcosmetology.group" },
  { name: "Jeywa Studio", type: "web", note: "Web design and development studio", image: img("work/jeywa-devices.webp"), center: true, href: "https://jeywastudio.com/az" },
  { name: "Azeturizm", type: "web", note: "Travel and tours", image: img("work/azeturizm-devices.webp"), center: true, href: "https://azeturizm.az" },
  { name: "Amazon Travel", type: "web", note: "Travel agency with tour search", image: img("work/amazontravel-devices.webp"), center: true, href: "https://amazontravel.az" },
  { name: "Little Barista", type: "web", note: "Mobile catering in Moscow", image: img("work/littlebarista-devices.webp"), center: true, href: "https://littlebarristafoodtruck.ru" },
  { name: "Vega", type: "web", note: "Electronics online store", image: img("work/vega-devices.webp"), center: true, href: "https://vegamsk.ru" },
  { name: "Az Cosmetics", type: "web", note: "Cosmetology equipment store", image: img("work/azcosmetics-devices.webp"), center: true, href: "https://az-cosmetics.az" },
  { name: "Tutti", type: "web", note: "Furniture hardware catalog", image: img("work/tutti-devices.webp"), center: true, href: "https://tutti.az" },
];
