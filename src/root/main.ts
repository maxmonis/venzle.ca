import { initUI } from "lib/ui";
import { mountHomePage } from "../home/app";
import { mountLearnPage } from "../learn/app";
import { mountSharePage } from "../share/app";
import { mountStatsPage } from "../stats/app";

interface NavigateOptions {
  replace?: boolean;
}

interface RouteDefinition {
  description: string;
  name: "home" | "learn" | "share" | "stats";
  title: string;
}

let routes: Record<RouteDefinition["name"], RouteDefinition> = {
  home: {
    description:
      "Venzle (Venn Diagram Puzzle) is a word matching free daily online game where players sort items into three overlapping category circles. Play now!",
    name: "home",
    title: "Venzle",
  },
  learn: {
    description:
      "Venzle (Venn Diagram Puzzle) is a word matching free daily online game where players sort items into three overlapping category circles. Learn to play!",
    name: "learn",
    title: "How to Play | Venzle",
  },
  share: {
    description:
      "Venzle (Venn Diagram Puzzle) is a word matching free daily online game where players sort items into three overlapping category circles. Share your results!",
    name: "share",
    title: "Share Results | Venzle",
  },
  stats: {
    description:
      "Venzle (Venn Diagram Puzzle) is a word matching free daily online game where players sort items into three overlapping category circles. View your stats!",
    name: "stats",
    title: "Your Stats | Venzle",
  },
};

let currentCleanup: undefined | (() => void);
let started = false;

export function mountRouter() {
  if (started) {
    return;
  }

  started = true;

  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("popstate", renderCurrentRoute);

  renderCurrentRoute();
}

mountRouter();

function handleDocumentClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button != 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  let { target } = event;
  if (!(target instanceof Element)) {
    return;
  }

  let link = target.closest("a");
  if (!link || link.target || link.hasAttribute("download")) {
    return;
  }

  let url = new URL(link.href, location.href);

  if (
    url.origin != location.origin ||
    (url.protocol != "http:" && url.protocol != "https:")
  ) {
    return;
  }

  if (!getRouteDefinition(url.pathname)) {
    return;
  }

  event.preventDefault();
  navigate(url.pathname + url.search + url.hash);
}

function navigate(path: string, options?: NavigateOptions) {
  let url = new URL(path, location.origin);
  let nextPath = getCanonicalPathname(url.pathname) ?? "/";

  let nextUrl = `${nextPath}${url.search}${url.hash}`;

  if (options?.replace) {
    history.replaceState(null, "", nextUrl);
  } else if (location.pathname + location.search + location.hash != nextUrl) {
    history.pushState(null, "", nextUrl);
  }

  renderCurrentRoute();
}

function renderCurrentRoute() {
  let route = getRouteDefinition(location.pathname);
  if (!route) {
    navigate("/", { replace: true });
    return;
  }

  currentCleanup?.();
  currentCleanup = undefined;

  let main = renderShell(route);
  updateMeta(route);
  initUI();

  window.scrollTo({
    top: 0,
  });

  if (route.name == "home") {
    currentCleanup = mountHomePage(main);
  } else if (route.name == "learn") {
    currentCleanup = mountLearnPage(main);
  } else if (route.name == "share") {
    currentCleanup = mountSharePage(main, navigate);
  } else {
    currentCleanup = mountStatsPage(main);
  }
}

function renderShell(route: RouteDefinition) {
  let header = document.createElement("header");
  header.append(createLogoLink("/"));

  if (route.name == "home") {
    let nav = document.createElement("div");
    nav.append(
      createLink("/stats", "Your Stats"),
      createLink("/learn", "How to Play"),
    );
    header.append(nav);
  } else {
    header.append(createLink("/", "Return Home"));
  }

  let main = document.createElement("main");

  let footer = document.createElement("footer");
  footer.append(createFooterNav(), createFooterText(), createCopyright());

  let bgGradient = document.createElement("div");
  bgGradient.classList.add("bg-gradient");

  document.body.dataset.route = route.name;
  document.body.replaceChildren(header, main, footer, bgGradient);

  return main;
}

function updateMeta(route: RouteDefinition) {
  document.title = route.title;

  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", route.description);
  document
    .querySelector("meta[property='og:description']")
    ?.setAttribute("content", route.description);
  document
    .querySelector("meta[name='twitter:description']")
    ?.setAttribute("content", route.description);
}

function getCanonicalPathname(pathname: string) {
  let route = getRouteDefinition(pathname);

  if (!route) {
    return null;
  }

  if (route.name == "home") {
    return "/";
  }

  return `/${route.name}`;
}

function getRouteDefinition(pathname: string) {
  let normalizedPath = normalizePathname(pathname);

  if (normalizedPath == "/") {
    return routes.home;
  }

  if (normalizedPath == "/learn") {
    return routes.learn;
  }

  if (normalizedPath == "/share") {
    return routes.share;
  }

  if (normalizedPath == "/stats") {
    return routes.stats;
  }

  return null;
}

function normalizePathname(pathname: string) {
  if (pathname != "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

function createLink(href: string, text: string) {
  let link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  return link;
}

function createLogoLink(href: string) {
  let link = createLink(href, "Venzle");
  link.classList.add("site-logo");

  let image = document.createElement("img");
  image.alt = "Venzle logo";
  image.height = 40;
  image.src = "/icon192.png";
  image.width = 40;

  link.textContent = "";
  link.append(image, "Venzle");
  return link;
}

function createFooterNav() {
  let nav = document.createElement("div");

  nav.append(
    ...(
      [
        ["/", "Home"],
        ["/stats", "Your Stats"],
        ["/learn", "How to Play"],
      ] as Array<[string, string]>
    ).map(([href, text]) => {
      return createLink(href, text);
    }),
  );

  return nav;
}

function createFooterText() {
  let paragraph = document.createElement("p");
  paragraph.append(
    "New puzzles released daily! Want to contribute? Send your ideas to ",
    createEmailLink(),
    " with the name you'd like us to use when crediting you 🙏",
  );
  return paragraph;
}

function createEmailLink() {
  let link = document.createElement("a");
  link.href = "mailto:submissions@venzle.ca";
  link.textContent = "submissions@venzle.ca";
  return link;
}

function createCopyright() {
  let wrapper = document.createElement("div");
  wrapper.classList.add("copyright");

  let copyrightParagraph = document.createElement("p");
  copyrightParagraph.append(
    "© ",
    createAuthorLink(),
    " ",
    createCopyrightYear(),
    ".",
  );

  let rightsParagraph = document.createElement("p");
  rightsParagraph.textContent = "All Rights Reserved.";

  wrapper.append(copyrightParagraph, rightsParagraph);
  return wrapper;
}

function createAuthorLink() {
  let link = document.createElement("a");
  link.href = "https://maxmonis.com";
  link.rel = "noopener";
  link.target = "_blank";
  link.textContent = "Max Monis";
  return link;
}

function createCopyrightYear() {
  let year = document.createElement("span");
  year.classList.add("copyright-year");
  year.textContent = `2025-${new Date().getFullYear()}`;
  return year;
}
