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

// Mixed on purpose: iOS and web work side by side, newest and strongest first.
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
    name: "Ascalini",
    type: "web",
    image: img("work/ascalini.webp"),
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
    name: "Afgen GDM",
    type: "web",
    image: img("work/afgen-new.webp"),
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
    name: "RVD Cabinet",
    type: "web",
    note: "React + TypeScript dashboard",
    image: img("work/rvd.webp"),
    href: "https://rvd-dashboard.vercel.app",
  },
  {
    name: "MyGov",
    type: "ios",
    note: "Modular refactoring and Design System at EPAM",
    image: img("work/mygov.webp"),
    center: true,
    href: "https://apps.apple.com/az/app/mygov/id1533956540",
  },
  { name: "LaoCar", type: "web", note: "Premium car rental site", image: img("projects/laocar.webp"), center: true, href: "https://laocar.by" },
  { name: "Media-Ideya", type: "web", note: "Agency site, Figma to DLE", image: img("projects/mediaideya.webp"), center: true, href: "https://github.com/rovsenrza/Media-Ideya" },
  { name: "Ertok LLC", type: "web", image: img("work/ertok.webp") },
  { name: "Azdizayn LLC", type: "web", image: img("work/azdizayn.webp") },
  { name: "Amazon Travel", type: "web", image: img("work/amazon.webp") },
  { name: "NFlowers", type: "web", image: img("work/nflowers.webp") },
  { name: "Az Cosmetics", type: "web", image: img("work/az-cosmetics.webp") },
  { name: "Prime Appliance Repair LLC", type: "web", image: img("work/prime.webp") },
  { name: "Unilift", type: "web", image: img("work/unilift.webp") },
  { name: "Giani Milani", type: "web", image: img("work/giani.webp") },
  { name: "Siren Trading LLC", type: "web", image: img("work/siren.webp") },
  { name: "Azeturizm", type: "web", image: img("work/azeturizm.webp") },
  { name: "Integro Group LLC", type: "web", image: img("work/integro.webp") },
  { name: "Labor LLC", type: "web", image: img("work/labor.webp") },
];
