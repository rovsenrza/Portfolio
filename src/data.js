const img = (path) => `${import.meta.env.BASE_URL}img/${path}`;

export const contact = {
  email: "rovsen.rzayev.2009@gmail.com",
  phone: "+994 50 719 31 49",
  phoneHref: "tel:+994507193149",
  whatsapp: "https://wa.me/994507193149",
  linkedin: "https://www.linkedin.com/in/rovshanrzayev/",
  github: "https://github.com/rovsenrza",
  cv: `${import.meta.env.BASE_URL}Rovshan-Rzayev-CV.pdf`,
};

export const phoneScreens = [
  { id: "today", label: "Today", src: img("ios/today.webp") },
  { id: "apps", label: "Apps", src: img("ios/apps.webp") },
  { id: "search", label: "Search", src: img("ios/search.webp") },
  { id: "account", label: "Account", src: img("ios/account.webp") },
];

export const iosProjects = [
  {
    name: "Ru App Store",
    role: "Freelance, built solo",
    summary:
      "A live iOS app storefront with the feel of the App Store: Today stories, curated Apps, Search, Library and Account. The SwiftUI client talks to a Laravel REST API described in OpenAPI, and operators manage the catalog from an admin panel with TOTP sign-in.",
    stack: ["SwiftUI", "URLSession", "Deep links", "XCTest", "Laravel API", "OpenAPI"],
    image: img("projects/asostore.webp"),
    links: [
      { label: "Visit ruappstore.com", href: "https://ruappstore.com" },
      { label: "Source on GitHub", href: "https://github.com/rovsenrza/ASOStore" },
    ],
  },
  {
    name: "MyGov",
    role: "EPAM Systems, outstaff iOS engineer",
    summary:
      "Contributed to refactoring the national MyGov app toward a modular architecture: reusable components, a shared Design System and MVVM-C, in sprints with backend, QA and design teams.",
    stack: ["Swift", "SwiftUI", "UIKit", "MVVM-C", "Modular architecture", "Design System"],
    image: null,
    links: [],
  },
  {
    name: "Green & Tasty",
    role: "EPAM iOS program",
    summary:
      "Restaurant app with reservations, pre-orders, feedback and separate customer, waiter and admin flows. Layered architecture with local Swift packages for networking, sessions and design, token refresh, SwiftLint and 743 passing unit, API-contract and UI tests.",
    stack: ["SwiftUI", "Swift Packages", "Kingfisher", "Swift Testing", "XCTest", "XCUITest"],
    image: img("projects/greentasty.webp"),
    links: [{ label: "Source on GitHub", href: "https://github.com/rovsenrza/Green-Tasty" }],
  },
  {
    name: "Marketplace",
    role: "ABB Tech bootcamp",
    summary:
      "Two native apps on a shared Firebase backend: a UIKit shopping app built with Coordinator + MVVM (Google and Apple Sign-In, cart, checkout, real-time support chat) and a SwiftUI admin app for catalog, orders and chat.",
    stack: ["UIKit", "SwiftUI", "Combine", "SnapKit", "Firebase", "Swift Concurrency"],
    image: img("projects/marketplace.webp"),
    links: [{ label: "Source on GitHub", href: "https://github.com/rovsenrza/MarketPlace-ECommerce" }],
  },
];

export const experience = [
  {
    company: "EPAM Systems",
    title: "iOS Software Engineer",
    period: "Apr 2026 – Sep 2026",
    text: "MyGov modular refactoring as an outstaff engineer, iOS traineeship and delivery projects in Agile/Scrum.",
  },
  {
    company: "Freelance",
    title: "iOS Developer",
    period: "Nov 2025 – now",
    text: "Client iOS apps from requirements and architecture to TestFlight and App Store. Built Ru App Store.",
  },
  {
    company: "Economic Scientific Research Institution",
    title: "Leading Researcher",
    period: "Sep 2025 – Nov 2025",
    text: "Modernized the institution’s official website.",
  },
  {
    company: "Okmedia MMC",
    title: "Frontend Developer",
    period: "Feb 2023 – Apr 2026",
    text: "Responsive web apps in React and JavaScript, built from Figma into reusable components.",
  },
];

export const webProjects = [
  { name: "RVD Cabinet", note: "React + TypeScript dashboard", image: img("projects/rvd.webp"), href: "https://rvd-dashboard.vercel.app" },
  { name: "Media-Ideya", note: "Agency site, Figma to DLE", image: img("projects/mediaideya.webp"), href: "https://github.com/rovsenrza/Media-Ideya" },
  { name: "LaoCar", note: "Premium car rental", image: img("projects/laocar.webp"), href: "https://laocar.by" },
  { name: "Ascalini", image: img("ascalini.png") },
  { name: "Afgen GDM", image: img("afgen-new.png") },
  { name: "Ertok LLC", image: img("ertok.png") },
  { name: "Azdizayn LLC", image: img("azdizayn.png") },
  { name: "Amazon Travel", image: img("amazon.png") },
  { name: "NFlowers", image: img("nflowers.png") },
  { name: "Az Cosmetics", image: img("az-cosmetics.png") },
  { name: "Prime Appliance Repair", image: img("prime.png") },
  { name: "Unilift", image: img("unilift.png") },
  { name: "Giani Milani", image: img("giani.png") },
  { name: "Siren Trading", image: img("siren.png") },
  { name: "Azeturizm", image: img("azeturizm.png") },
  { name: "Integro Group", image: img("integro.png") },
  { name: "Labor LLC", image: img("labor.png") },
];

export const skills = [
  { group: "Languages and UI", items: "Swift, Objective-C, SwiftUI, UIKit, Combine, Swift Concurrency, SnapKit, Lottie" },
  { group: "Architecture", items: "MVVM-C, MVVM, MVC, VIPER, Clean Architecture, SOLID, dependency injection, modular apps, design systems" },
  { group: "Data and services", items: "URLSession, Alamofire, Moya, Core Data, Core Location, MapKit, UserNotifications, Firebase, REST APIs" },
  { group: "Quality and shipping", items: "XCTest, Swift Testing, XCUITest, TDD, code review, CI/CD, Git, SPM, CocoaPods, TestFlight, App Store Connect" },
];
