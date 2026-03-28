import { vi } from "vitest";

class MockToast {
  textContent = "";
  show = vi.fn((text?: string) => {
    if (text != undefined) {
      this.textContent = text;
    }
  });
  hide = vi.fn();
}

class MockConfetti {
  start = vi.fn();
}

class MockSpinner {
  constructor(size: number) {
    let el = document.createElement("div");
    el.dataset.spinner = String(size);
    return el as unknown as MockSpinner;
  }
}

vi.mock("htm-elements", () => {
  return {
    Confetti: MockConfetti,
    Spinner: MockSpinner,
    Toast: MockToast,
  };
});

Object.defineProperty(window, "gtag", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "matchMedia", {
  value: (query: string) => {
    let listeners: Array<(e: MediaQueryListEvent) => void> = [];
    let instance = {
      addEventListener: (
        _: string,
        listener: (e: MediaQueryListEvent) => void,
      ) => listeners.push(listener),
      dispatchEvent: (event: MediaQueryListEvent) => {
        for (let listener of listeners) {
          listener(event);
        }
        return true;
      },
      matches: false,
      media: query,
      removeEventListener: () => undefined,
    };
    let globalMatchMedia = globalThis as typeof globalThis & {
      __lastMatchMedia?: unknown;
      __matchMediaByQuery?: Record<string, unknown>;
    };
    globalMatchMedia.__lastMatchMedia = instance;
    globalMatchMedia.__matchMediaByQuery ??= {};
    globalMatchMedia.__matchMediaByQuery[query] = instance;
    return instance;
  },
  writable: true,
});

Object.defineProperty(window.navigator, "clipboard", {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, "requestAnimationFrame", {
  value: (callback: FrameRequestCallback) => {
    return setTimeout(() => callback(Date.now()), 0);
  },
  writable: true,
});

Object.defineProperty(window, "cancelAnimationFrame", {
  value: (id: number) => clearTimeout(id),
  writable: true,
});

Object.defineProperty(HTMLMediaElement.prototype, "play", {
  value: vi.fn(() => Promise.resolve()),
  writable: true,
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => {
    return {
      arc: vi.fn(),
      beginPath: vi.fn(),
      createRadialGradient: vi.fn(() => {
        return {
          addColorStop: vi.fn(),
        };
      }),
      ellipse: vi.fn(),
      fill: vi.fn(),
      fillRect: vi.fn(),
      fillStyle: "",
      fillText: vi.fn(),
      font: "",
      globalAlpha: 1,
      lineTo: vi.fn(),
      lineWidth: 0,
      measureText: vi.fn((text: string) => {
        return { width: text.length * 10 };
      }),
      moveTo: vi.fn(),
      restore: vi.fn(),
      save: vi.fn(),
      setTransform: vi.fn(),
      stroke: vi.fn(),
      strokeStyle: "",
      textAlign: "",
      textBaseline: "",
    };
  },
  writable: true,
});

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
  value: vi.fn(() => "data:image/png;base64,TEST"),
  writable: true,
});

Object.defineProperty(document, "fonts", {
  value: {
    ready: Promise.resolve(),
  },
  writable: true,
});

class MockBroadcastChannel {
  static channels = new Map<string, Set<MockBroadcastChannel>>();
  onmessage: ((event: MessageEvent) => void) | null = null;
  name: string;

  constructor(name: string) {
    this.name = name;
    let set = MockBroadcastChannel.channels.get(name);
    if (!set) {
      set = new Set();
      MockBroadcastChannel.channels.set(name, set);
    }
    set.add(this);
  }

  postMessage(data: unknown) {
    let set = MockBroadcastChannel.channels.get(this.name);
    if (!set) {
      return;
    }
    for (let channel of set) {
      if (channel != this && channel.onmessage) {
        channel.onmessage({ data } as MessageEvent);
      }
    }
  }

  close() {
    let set = MockBroadcastChannel.channels.get(this.name);
    if (set) {
      set.delete(this);
    }
  }
}

Object.defineProperty(window, "BroadcastChannel", {
  value: MockBroadcastChannel,
  writable: true,
});

Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
  value: () => undefined,
  writable: true,
});

Object.defineProperty(HTMLDialogElement.prototype, "close", {
  value: () => undefined,
  writable: true,
});

try {
  Object.defineProperty(window.location, "replace", {
    value: vi.fn(),
    writable: true,
  });
  Object.defineProperty(window.location, "reload", {
    value: vi.fn(),
    writable: true,
  });
} catch {
  // ignore if jsdom prevents redefinition
}

vi.stubGlobal("location", {
  origin: "http://localhost",
  pathname: "/",
  reload: vi.fn(),
  replace: vi.fn(),
});

Object.defineProperty(HTMLAnchorElement.prototype, "click", {
  value: () => undefined,
  writable: true,
});
