import { beforeEach, describe, expect, it, vi } from "vitest";

interface NavigateOptions {
  replace?: boolean;
}

type Navigate = (path: string, options?: NavigateOptions) => void;

interface LocationState {
  hash: string;
  href: string;
  origin: string;
  pathname: string;
  reload: ReturnType<typeof vi.fn>;
  replace: ReturnType<typeof vi.fn>;
  search: string;
}

let initUI = vi.fn();
let homeCleanup = vi.fn();
let learnCleanup = vi.fn();
let shareCleanup = vi.fn();
let statsCleanup = vi.fn();
let shareNavigate: Navigate | null = null;

let mountHomePage = vi.fn((main: HTMLElement) => {
  let heading = document.createElement("h1");
  heading.textContent = "Home";
  main.replaceChildren(heading);
  return homeCleanup;
});

let mountLearnPage = vi.fn((main: HTMLElement) => {
  let heading = document.createElement("h1");
  heading.textContent = "How to Play";
  main.replaceChildren(heading);
  return learnCleanup;
});

let mountSharePage = vi.fn((main: HTMLElement, navigate: Navigate) => {
  shareNavigate = navigate;
  let heading = document.createElement("h1");
  heading.textContent = "Share Results";
  main.replaceChildren(heading);
  return shareCleanup;
});

let mountStatsPage = vi.fn((main: HTMLElement) => {
  let heading = document.createElement("h1");
  heading.textContent = "Your Stats";
  main.replaceChildren(heading);
  return statsCleanup;
});

vi.mock("lib/ui", () => {
  return {
    initUI,
  };
});

vi.mock("root/app", () => {
  return {
    mountHomePage,
  };
});

vi.mock("learn/app", () => {
  return {
    mountLearnPage,
  };
});

vi.mock("share/app", () => {
  return {
    mountSharePage,
  };
});

vi.mock("stats/app", () => {
  return {
    mountStatsPage,
  };
});

describe("root/main", () => {
  let clickListener: null | ((event: MouseEvent) => void);
  let documentAddEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let locationState: LocationState;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    initUI = vi.fn();
    homeCleanup = vi.fn();
    learnCleanup = vi.fn();
    shareCleanup = vi.fn();
    statsCleanup = vi.fn();
    shareNavigate = null;
    clickListener = null;

    mountHomePage.mockImplementation((main: HTMLElement) => {
      let heading = document.createElement("h1");
      heading.textContent = "Home";
      main.replaceChildren(heading);
      return homeCleanup;
    });
    mountLearnPage.mockImplementation((main: HTMLElement) => {
      let heading = document.createElement("h1");
      heading.textContent = "How to Play";
      main.replaceChildren(heading);
      return learnCleanup;
    });
    mountSharePage.mockImplementation(
      (main: HTMLElement, navigate: Navigate) => {
        shareNavigate = navigate;
        let heading = document.createElement("h1");
        heading.textContent = "Share Results";
        main.replaceChildren(heading);
        return shareCleanup;
      },
    );
    mountStatsPage.mockImplementation((main: HTMLElement) => {
      let heading = document.createElement("h1");
      heading.textContent = "Your Stats";
      main.replaceChildren(heading);
      return statsCleanup;
    });

    localStorage.clear();
    sessionStorage.clear();

    document.head.innerHTML = `
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta name="twitter:description" content="" />
    `;
    document.body.innerHTML = "";
    document.body.className = "";

    locationState = {
      hash: "",
      href: "http://localhost/nope/",
      origin: "http://localhost",
      pathname: "/nope/",
      reload: vi.fn(),
      replace: vi.fn(),
      search: "",
    };

    vi.stubGlobal("location", locationState);

    let addEventListener = document.addEventListener.bind(document);
    documentAddEventListenerSpy = vi
      .spyOn(document, "addEventListener")
      .mockImplementation(
        ((
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: AddEventListenerOptions | boolean,
        ) => {
          if (type == "click") {
            clickListener = listener as (event: MouseEvent) => void;
          }

          return addEventListener(type, listener, options);
        }) as typeof document.addEventListener,
      );

    vi.spyOn(history, "pushState").mockImplementation(((...args) => {
      let url = args[2];
      if (url != undefined) {
        updateLocationState(locationState, url);
      }
    }) as typeof history.pushState);
    vi.spyOn(history, "replaceState").mockImplementation(((...args) => {
      let url = args[2];
      if (url != undefined) {
        updateLocationState(locationState, url);
      }
    }) as typeof history.replaceState);
  });

  it("renders routes, handles click navigation, and covers router branches", async () => {
    let router = await import("root/main");

    expect(clickListener).toBeTruthy();
    expect(locationState.pathname).toBe("/");
    expect(history.replaceState).toHaveBeenCalledWith(null, "", "/");
    expect(document.body.dataset.route).toBe("home");
    expect(document.title).toBe("Venzle");
    expect(document.querySelector("main h1")?.textContent).toBe("Home");
    expect(document.querySelector("header .site-logo")).toBeTruthy();
    expect(document.querySelector("header a[href='/stats']")?.textContent).toBe(
      "Your Stats",
    );
    expect(document.querySelector("footer a[href='/learn']")?.textContent).toBe(
      "How to Play",
    );
    expect(
      document.querySelector<HTMLMetaElement>("meta[name='description']")
        ?.content,
    ).toContain("Play now!");
    expect(initUI).toHaveBeenCalledTimes(1);
    expect(mountHomePage).toHaveBeenCalledTimes(1);

    let clickRegistrationCount = getClickRegistrationCount(
      documentAddEventListenerSpy,
    );

    router.mountRouter();
    expect(mountHomePage).toHaveBeenCalledTimes(1);
    expect(getClickRegistrationCount(documentAddEventListenerSpy)).toBe(
      clickRegistrationCount,
    );

    expectNoHistoryChange(locationState, () => {
      clickListener?.(createClickEvent(document, {}));
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(createClickEvent(document.body, {}));
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), {}, true),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), { button: 1 }),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), {
          metaKey: true,
        }),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), {
          ctrlKey: true,
        }),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), {
          shiftKey: true,
        }),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/learn/"), {
          altKey: true,
        }),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(
          createLink("http://localhost/learn/", { target: "_blank" }),
          {},
        ),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(
          createLink("http://localhost/learn/", { download: "router.txt" }),
          {},
        ),
      );
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("https://example.com/learn/"), {}),
      );
    });

    expectNoHistoryChange(locationState, () => {
      let previousOrigin = locationState.origin;
      let previousHref = locationState.href;

      locationState.origin = "ftp://localhost";
      locationState.href = "ftp://localhost/";
      clickListener?.(
        createClickEvent(createLink("ftp://localhost/share/"), {}),
      );

      locationState.origin = previousOrigin;
      locationState.href = previousHref;
    });

    expectNoHistoryChange(locationState, () => {
      clickListener?.(
        createClickEvent(createLink("http://localhost/missing/"), {}),
      );
    });

    let shareEvent = createClickEvent(
      createLink("http://localhost/share/?view=card#top"),
      {},
    );
    clickListener?.(shareEvent);
    expect(shareEvent.defaultPrevented).toBe(true);
    expect(locationState.pathname).toBe("/share");
    expect(locationState.search).toBe("?view=card");
    expect(locationState.hash).toBe("#top");
    expect(document.body.dataset.route).toBe("share");
    expect(document.title).toBe("Share Results | Venzle");
    expect(document.querySelector("main h1")?.textContent).toBe(
      "Share Results",
    );
    expect(
      Array.from(document.querySelectorAll("header a")).some(
        (link) => link.textContent == "Return Home",
      ),
    ).toBe(true);
    expect(
      document.querySelector<HTMLMetaElement>("meta[name='description']")
        ?.content,
    ).toContain("Share your results!");
    expect(shareNavigate).toBeTypeOf("function");
    expect(homeCleanup).toHaveBeenCalledTimes(1);

    let pushStateCalls = vi.mocked(history.pushState).mock.calls.length;
    shareNavigate?.("/share/?view=card#top");
    expect(vi.mocked(history.pushState).mock.calls.length).toBe(pushStateCalls);
    expect(mountSharePage).toHaveBeenCalledTimes(2);
    expect(shareCleanup).toHaveBeenCalledTimes(1);

    shareNavigate?.("/not-a-route?from=share#oops");
    expect(locationState.pathname).toBe("/");
    expect(locationState.search).toBe("?from=share");
    expect(locationState.hash).toBe("#oops");
    expect(document.body.dataset.route).toBe("home");
    expect(document.title).toBe("Venzle");
    expect(shareCleanup).toHaveBeenCalledTimes(2);

    let learnEvent = createClickEvent(
      createLink("http://localhost/learn/?from=home#faq"),
      {},
    );
    clickListener?.(learnEvent);
    expect(learnEvent.defaultPrevented).toBe(true);
    expect(locationState.pathname).toBe("/learn");
    expect(locationState.search).toBe("?from=home");
    expect(locationState.hash).toBe("#faq");
    expect(document.body.dataset.route).toBe("learn");
    expect(document.title).toBe("How to Play | Venzle");
    expect(document.querySelector("main h1")?.textContent).toBe("How to Play");
    expect(
      document.querySelector<HTMLMetaElement>("meta[name='description']")
        ?.content,
    ).toContain("Learn to play!");

    let statsEvent = createClickEvent(
      createLink("http://localhost/stats/"),
      {},
    );
    clickListener?.(statsEvent);
    expect(statsEvent.defaultPrevented).toBe(true);
    expect(locationState.pathname).toBe("/stats");
    expect(locationState.search).toBe("");
    expect(locationState.hash).toBe("");
    expect(document.body.dataset.route).toBe("stats");
    expect(document.title).toBe("Your Stats | Venzle");
    expect(document.querySelector("main h1")?.textContent).toBe("Your Stats");
    expect(
      document.querySelector<HTMLMetaElement>("meta[name='description']")
        ?.content,
    ).toContain("View your stats!");
    expect(learnCleanup).toHaveBeenCalledTimes(1);

    locationState.href = "http://localhost";
    locationState.pathname = "";
    locationState.search = "";
    locationState.hash = "";
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(document.body.dataset.route).toBe("home");
    expect(document.title).toBe("Venzle");
    expect(statsCleanup).toHaveBeenCalledTimes(1);

    expect(initUI).toHaveBeenCalledTimes(7);
    expect(mountHomePage).toHaveBeenCalledTimes(3);
    expect(mountLearnPage).toHaveBeenCalledTimes(1);
    expect(mountSharePage).toHaveBeenCalledTimes(2);
    expect(mountStatsPage).toHaveBeenCalledTimes(1);
  });
});

function createClickEvent(
  target: EventTarget,
  init: MouseEventInit,
  preventDefault = false,
) {
  let event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    ...init,
  });

  if (preventDefault) {
    event.preventDefault();
  }

  Object.defineProperty(event, "target", {
    configurable: true,
    value: target,
  });

  return event;
}

function createLink(
  href: string,
  options?: {
    download?: string;
    target?: string;
  },
) {
  let link = document.createElement("a");
  link.href = href;

  if (options?.target) {
    link.target = options.target;
  }

  if (options?.download) {
    link.setAttribute("download", options.download);
  }

  return link;
}

function getClickRegistrationCount(
  addEventListenerSpy: ReturnType<typeof vi.spyOn>,
) {
  return addEventListenerSpy.mock.calls.filter(
    (call: [string, EventListenerOrEventListenerObject, unknown?]) => {
      return call[0] == "click";
    },
  ).length;
}

function expectNoHistoryChange(
  locationState: LocationState,
  callback: () => void,
) {
  let historyState = {
    hash: locationState.hash,
    href: locationState.href,
    pathname: locationState.pathname,
    pushCalls: vi.mocked(history.pushState).mock.calls.length,
    replaceCalls: vi.mocked(history.replaceState).mock.calls.length,
    search: locationState.search,
  };

  callback();

  expect(vi.mocked(history.pushState).mock.calls.length).toBe(
    historyState.pushCalls,
  );
  expect(vi.mocked(history.replaceState).mock.calls.length).toBe(
    historyState.replaceCalls,
  );
  expect(locationState.href).toBe(historyState.href);
  expect(locationState.pathname).toBe(historyState.pathname);
  expect(locationState.search).toBe(historyState.search);
  expect(locationState.hash).toBe(historyState.hash);
}

function updateLocationState(
  locationState: LocationState,
  url: string | URL | null,
) {
  let nextUrl = new URL(String(url), locationState.origin);
  locationState.href = nextUrl.toString();
  locationState.pathname = nextUrl.pathname;
  locationState.search = nextUrl.search;
  locationState.hash = nextUrl.hash;
}
