const CURSOR_REF_ATTR = "data-cursor-ref";

function stripCursorRefs(root: ParentNode = document) {
  root.querySelectorAll(`[${CURSOR_REF_ATTR}]`).forEach((el) => {
    el.removeAttribute(CURSOR_REF_ATTR);
  });
}

function hasReactContainer() {
  return Object.getOwnPropertyNames(document).some((key) =>
    key.startsWith("__reactContainer$"),
  );
}

if (process.env.NODE_ENV === "development") {
  // Cursor's in-editor browser stamps `data-cursor-ref` on nodes before React
  // hydrates, which Next.js reports as a mismatch. hydrateRoot runs inside
  // startTransition, so keep blocking until concurrent hydration can finish.
  stripCursorRefs();

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function setAttribute(name, value) {
    if (name === CURSOR_REF_ATTR) {
      return;
    }
    originalSetAttribute.call(this, name, value);
  };

  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    stripCursorRefs();
    Element.prototype.setAttribute = originalSetAttribute;
  };

  const waitForHydration = () => {
    stripCursorRefs();
    if (hasReactContainer()) {
      setTimeout(restore, 1500);
      return;
    }
    requestAnimationFrame(waitForHydration);
  };

  requestAnimationFrame(waitForHydration);
  setTimeout(restore, 4000);
}
