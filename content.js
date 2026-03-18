(() => {
  let toastEl = null;
  let hideTimer = null;

  function showToast(label, value) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "__copymailto_toast__";
      Object.assign(toastEl.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: "2147483647",
        background: "#1a1a1a",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: "13px",
        lineHeight: "1.4",
        padding: "10px 14px",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        maxWidth: "320px",
        wordBreak: "break-all",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        opacity: "0",
        transform: "translateY(8px)",
        pointerEvents: "none",
      });
      document.documentElement.appendChild(toastEl);
    }

    toastEl.innerHTML =
      `<span style="font-size:15px">📋</span>` +
      `<span><strong style="display:block;font-size:11px;opacity:0.6;margin-bottom:2px">${escapeHtml(label)}</strong>${escapeHtml(value)}</span>`;

    requestAnimationFrame(() => {
      toastEl.style.opacity = "1";
      toastEl.style.transform = "translateY(0)";
    });

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translateY(8px)";
    }, 2500);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getLink(target) {
    const anchor = target.closest("a[href]");
    if (!anchor) return null;
    const href = anchor.getAttribute("href") || "";
    const lower = href.toLowerCase();

    if (lower.startsWith("mailto:")) {
      const raw = href.slice("mailto:".length);
      const value = raw.split(/[?&,]/)[0].trim();
      return value ? { label: "Email copied", value } : null;
    }

    if (lower.startsWith("tel:")) {
      const value = href.slice("tel:".length).trim();
      return value ? { label: "Phone number copied", value } : null;
    }

    return null;
  }

  function copyAndToast(link) {
    navigator.clipboard.writeText(link.value).then(() => {
      showToast(link.label, link.value);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = link.value;
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.documentElement.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast(link.label, link.value);
    });
  }

  document.addEventListener(
    "click",
    (e) => {
      const link = getLink(e.target);
      if (!link) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      copyAndToast(link);
    },
    true
  );
})();
