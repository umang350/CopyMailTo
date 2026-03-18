(() => {
  let toastEl = null;
  let hideTimer = null;

  function showToast(email) {
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
      `<span><strong style="display:block;font-size:11px;opacity:0.6;margin-bottom:2px">Email copied</strong>${escapeHtml(email)}</span>`;

    // Trigger show
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

  function getMailtoEmail(target) {
    const anchor = target.closest("a[href]");
    if (!anchor) return null;
    const href = anchor.getAttribute("href") || "";
    if (!href.toLowerCase().startsWith("mailto:")) return null;
    // mailto:email@example.com?subject=... — grab just the address part
    const raw = href.slice("mailto:".length);
    const email = raw.split(/[?&,]/)[0].trim();
    return email || null;
  }

  document.addEventListener(
    "click",
    (e) => {
      const email = getMailtoEmail(e.target);
      if (!email) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      navigator.clipboard.writeText(email).then(() => {
        showToast(email);
      }).catch(() => {
        // Fallback for pages where clipboard API is restricted
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.documentElement.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        showToast(email);
      });
    },
    true // capture phase so we intercept before any page handler
  );
})();
