/* ───────────────────────────────────────────────────────────
   FitNova Navigation, Smooth Scroll & Menu System
   ─────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector("nav");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    // Remove any leftover backdrop elements if they exist
    const existingBackdrop = document.querySelector(".nav-backdrop");
    if (existingBackdrop) {
        existingBackdrop.remove();
    }

    /* ─── Drawer Toggle Functions ────────────────────────────── */
    function openMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.add("active");
        menuToggle.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    // Toggle menu on hamburger button click
    if (menuToggle) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.contains("active") ? closeMenu() : openMenu();
        });
    }

    // Close menu when clicking outside of it
    document.addEventListener("click", (e) => {
        if (
            navMenu &&
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    // Auto-close drawer if screen is resized back to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 860 && navMenu && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    /* ─── Smooth Scrolling for all internal anchor links ───── */
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            // Ignore empty hashes or javascript links
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if it's open
                closeMenu();

                // Calculate position accounting for the fixed navbar height
                const navHeight = navbar ? navbar.offsetHeight : 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (navHeight - 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update URL hash without causing a jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    /* ─── Navbar Scroll & Active Section Spy ────────────────── */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navMenu ul li a");

    function handleScroll() {
        // Add solid background to nav when scrolled
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Active link scroll spy
        const scrollPosition = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
});