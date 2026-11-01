/* ==========================================================================
   2Ball Cleaning — interactions
   - Sticky header state
   - Accessible mobile navigation
   - Scroll reveals (Intersection Observer)
   - Accessible quote modal: focus management, focus trap, scroll lock
   - Client-side validation + configurable form submission
   ========================================================================== */
(() => {
  "use strict";

  const doc = document;
  const body = doc.body;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------ */
  /* Year                                                               */
  /* ------------------------------------------------------------------ */
  doc.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------ */
  /* Header scrolled state                                              */
  /* ------------------------------------------------------------------ */
  const header = doc.querySelector("[data-header]");
  let scrollTicking = false;

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    scrollTicking = false;
  };

  if (header) {
    updateHeader();
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          scrollTicking = true;
          window.requestAnimationFrame(updateHeader);
        }
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                  */
  /* ------------------------------------------------------------------ */
  const navToggle = doc.querySelector(".nav-toggle");
  const mobileMenu = doc.querySelector("#mobile-menu");
  const menuBackground = [
    doc.querySelector("main"),
    doc.querySelector(".site-footer"),
  ].filter(Boolean);
  let menuCloseTimer = null;

  const setMenuBackgroundInert = (inert) => {
    menuBackground.forEach((el) => {
      if (inert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  };

  const menuIsOpen = () =>
    !!navToggle && navToggle.getAttribute("aria-expanded") === "true";

  const closeMobileMenu = (restoreFocus = true) => {
    if (!navToggle || !mobileMenu) return;
    window.clearTimeout(menuCloseTimer);
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    body.classList.remove("nav-open");
    mobileMenu.classList.remove("is-open");
    setMenuBackgroundInert(false);

    menuCloseTimer = window.setTimeout(
      () => {
        if (navToggle.getAttribute("aria-expanded") === "false") {
          mobileMenu.hidden = true;
        }
      },
      prefersReducedMotion ? 0 : 260
    );

    if (restoreFocus) navToggle.focus({ preventScroll: true });
  };

  const openMobileMenu = () => {
    if (!navToggle || !mobileMenu) return;
    window.clearTimeout(menuCloseTimer);
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    body.classList.add("nav-open");
    setMenuBackgroundInert(true);
    mobileMenu.hidden = false;
    // Force a style flush so the transition runs from the closed state.
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add("is-open");

    const firstLink = mobileMenu.querySelector("a[href]");
    if (firstLink) {
      window.setTimeout(
        () => firstLink.focus({ preventScroll: true }),
        prefersReducedMotion ? 0 : 120
      );
    }
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      if (menuIsOpen()) closeMobileMenu();
      else openMobileMenu();
    });

    mobileMenu.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        const targetSelector = link.getAttribute("href");
        closeMobileMenu(false);
        if (targetSelector && targetSelector.startsWith("#")) {
          const target = doc.querySelector(targetSelector);
          if (target) {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000 && menuIsOpen()) closeMobileMenu(false);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveals                                                     */
  /* ------------------------------------------------------------------ */
  const revealEls = doc.querySelectorAll(".reveal, .media-reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Quote modal                                                        */
  /* ------------------------------------------------------------------ */
  const modal = doc.querySelector("#quote-modal");
  if (!modal) return;

  const dialog = modal.querySelector(".modal__dialog");
  const modalBody = modal.querySelector(".modal__body");
  const form = doc.querySelector("#quote-form");
  const statusEl = doc.querySelector("#quote-status");
  const successPanel = doc.querySelector("#quote-success");
  const submitBtn = doc.querySelector("#quote-submit");
  const serviceSelect = doc.querySelector("#quote-service");
  const dateInput = doc.querySelector("#quote-date");
  const honeypot = doc.querySelector("#quote-website");

  const backgroundRegions = [
    doc.querySelector(".skip-link"),
    doc.querySelector(".site-header"),
    doc.querySelector("#mobile-menu"),
    doc.querySelector("main"),
    doc.querySelector(".site-footer"),
  ].filter(Boolean);

  let modalIsOpen = false;
  let lastFocusedElement = null;
  let modalCloseTimer = null;
  let isSubmitting = false;
  let submittedSuccessfully = false;
  const submitBtnMarkup = submitBtn ? submitBtn.innerHTML : "";

  const setBackgroundInert = (inert) => {
    backgroundRegions.forEach((el) => {
      if (inert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  };

  const getFocusable = () => {
    if (!dialog) return [];
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(dialog.querySelectorAll(selector)).filter((el) => {
      if (el.closest("[hidden]")) return false;
      return el.getClientRects().length > 0;
    });
  };

  const localToday = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  };

  const resetFormState = () => {
    if (!form) return;
    form.hidden = false;
    if (successPanel) successPanel.hidden = true;
    form.reset();
    form
      .querySelectorAll('[aria-invalid="true"]')
      .forEach((input) => input.removeAttribute("aria-invalid"));
    form.querySelectorAll(".field__error").forEach((error) => {
      error.textContent = "";
      error.classList.remove("is-visible");
    });
    if (statusEl) {
      statusEl.className = "form-status";
      statusEl.textContent = "";
    }
    if (submitBtn) {
      submitBtn.innerHTML = submitBtnMarkup;
      submitBtn.disabled = false;
    }
    form.removeAttribute("aria-busy");
    submittedSuccessfully = false;
    isSubmitting = false;
  };

  const openModal = (trigger, service) => {
    window.clearTimeout(modalCloseTimer);
    lastFocusedElement =
      trigger instanceof HTMLElement ? trigger : doc.activeElement;

    if (submittedSuccessfully) resetFormState();
    if (statusEl) {
      statusEl.className = "form-status";
      statusEl.textContent = "";
    }
    if (serviceSelect) serviceSelect.value = service || "";

    modal.hidden = false;
    setBackgroundInert(true);
    body.classList.add("modal-open");
    if (modalBody) modalBody.scrollTop = 0;

    // Double frame ensures the transition starts from the hidden state.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => modal.classList.add("is-open"));
    });

    modalIsOpen = true;

    window.setTimeout(
      () => {
        const nameField = dialog && dialog.querySelector("#quote-name");
        if (form && !form.hidden && nameField) {
          nameField.focus({ preventScroll: true });
        } else {
          const closeBtn = dialog && dialog.querySelector(".modal__close");
          if (closeBtn) closeBtn.focus({ preventScroll: true });
        }
      },
      prefersReducedMotion ? 20 : 160
    );
  };

  const closeModal = () => {
    if (!modalIsOpen) return;
    modalIsOpen = false;
    modal.classList.remove("is-open");
    body.classList.remove("modal-open");
    setBackgroundInert(false);

    modalCloseTimer = window.setTimeout(
      () => {
        if (!modalIsOpen) modal.hidden = true;
      },
      prefersReducedMotion ? 0 : 300
    );

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  doc.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-quote]");
    if (trigger) {
      event.preventDefault();
      if (menuIsOpen()) closeMobileMenu(false);
      openModal(trigger, trigger.getAttribute("data-service") || "");
      return;
    }

    const closer = event.target.closest("[data-close-quote]");
    if (closer && modalIsOpen) {
      event.preventDefault();
      closeModal();
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal__backdrop")) closeModal();
  });

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (modalIsOpen) {
        event.preventDefault();
        closeModal();
        return;
      }
      if (menuIsOpen()) {
        event.preventDefault();
        closeMobileMenu();
        return;
      }
    }

    if (!modalIsOpen || event.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = doc.activeElement;
    const focusIsOutside = !dialog.contains(active);

    if (focusIsOutside) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Quote form validation & submission                                 */
  /* ------------------------------------------------------------------ */
  if (!form) return;

  if (dateInput) dateInput.min = localToday();

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fieldMessage = (field) => {
    const value = (field.value || "").trim();
    const digits = value.replace(/\D/g, "");

    if (field.required && !value) {
      if (field.tagName === "SELECT") return "Please choose an option.";
      return "This field is required.";
    }

    if (field.type === "email" && value && !EMAIL_RE.test(value)) {
      return "Please enter a valid email address.";
    }

    if (field.type === "tel" && value) {
      if (digits.length < 7 || digits.length > 15) {
        return "Please enter a valid phone number.";
      }
    }

    if (field.type === "date" && value && value < localToday()) {
      return "Please choose today or a future date.";
    }

    return "";
  };

  const setFieldError = (field, message) => {
    const errorEl = doc.getElementById(`${field.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.toggle("is-visible", Boolean(message));
    }
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  const validateField = (field) => {
    const message = fieldMessage(field);
    setFieldError(field, message);
    return message;
  };

  const fieldsToValidate = Array.from(
    form.querySelectorAll(
      'input[required], select[required], input[type="email"], input[type="tel"], input[type="date"]'
    )
  );

  fieldsToValidate.forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.value.trim() || field.required) validateField(field);
    });
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  const showStatus = (type, html) => {
    if (!statusEl) return;
    statusEl.className = `form-status is-visible is-${type}`;
    statusEl.innerHTML = html;
    if (modalBody) {
      statusEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  const setSubmitting = (submitting) => {
    isSubmitting = submitting;
    if (!submitBtn) return;
    submitBtn.disabled = submitting;
    form.setAttribute("aria-busy", String(submitting));
    submitBtn.innerHTML = submitting
      ? "Sending request…"
      : submitBtnMarkup;
  };

  const showSuccess = () => {
    submittedSuccessfully = true;
    form.hidden = true;
    if (statusEl) {
      statusEl.className = "form-status";
      statusEl.textContent = "";
    }
    if (successPanel) {
      successPanel.hidden = false;
      const heading = successPanel.querySelector("h3");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (honeypot && honeypot.value) return;

    let firstInvalid = null;
    fieldsToValidate.forEach((field) => {
      const message = validateField(field);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      showStatus("warning", "Please check the highlighted fields and try again.");
      firstInvalid.focus({ preventScroll: false });
      return;
    }

    const endpoint = (form.getAttribute("data-endpoint") || "").trim();

    if (!endpoint || !/^https?:\/\//i.test(endpoint)) {
      showStatus(
        "warning",
        'This quote form is not connected to an inbox yet, so your request has not been sent. Please call <a href="tel:+19029169536">(902) 916-9536</a> to reach 2Ball Cleaning.'
      );
      if (window.console && console.warn) {
        console.warn(
          "2Ball Cleaning: quote form endpoint is not configured. Add your Formspree/backend URL to data-endpoint on #quote-form (see README)."
        );
      }
      return;
    }

    if (statusEl) {
      statusEl.className = "form-status";
      statusEl.textContent = "";
    }
    setSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      showSuccess();
    } catch (error) {
      showStatus(
        "error",
        'Sorry — your request could not be sent. Please try again in a moment, or call <a href="tel:+19029169536">(902) 916-9536</a>.'
      );
    } finally {
      setSubmitting(false);
    }
  });
})();
