import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const navToggle = document.querySelector(".nav-toggle");
const navToggleMenu = document.querySelector(".nav-toggle-menu");
const navToggleClose = document.querySelector(".nav-toggle-close");
const menu = document.querySelector(".menu");
const menuBg = document.getElementById("menu-path");
const menuBgSvg = document.querySelector(".menu-bg-svg");
const menuLogo = document.querySelector(".menu-logo");
const menuLinks = document.querySelectorAll(".menu-col-links a");
const menuInfoItems = document.querySelectorAll(
  ".menu-col-info p, .menu-col-info h3, .menu-col-info h6",
);

const svgWidth = menuBgSvg.viewBox.baseVal.width;
const svgHeight = menuBgSvg.viewBox.baseVal.height;
const svgCenterX = svgWidth / 2;

const OPEN_HIDDEN = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,0 L${svgWidth},0 Z`;
const OPEN_BULGE = `M${svgWidth},345 Q${svgCenterX},620 0,345 L0,0 L${svgWidth},0 Z`;
const OPEN_FULL = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 L${svgWidth},0 Z`;
const CLOSE_START = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
const CLOSE_BULGE = `M${svgWidth},350 Q${svgCenterX},130 0,350 L0,${svgHeight} L${svgWidth},${svgHeight} Z`;
const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,${svgHeight} L${svgWidth},${svgHeight} Z`;

gsap.set(menuBg, { attr: { d: OPEN_HIDDEN } });

const splits = [];
menuLinks.forEach((link) => {
  const split = new SplitText(link, { type: "chars", charsClass: "char" });
  splits.push(split);
  gsap.set(split.chars, { opacity: 0, x: "750%" });
});

gsap.set(menuInfoItems, { opacity: 0, y: 100 });

navToggle.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  isOpen = !isOpen;
  isOpen ? openMenu() : closeMenu();
});

let isOpen = false;
let isAnimating = false;

const openMenu = () => {
  menu.classList.add("is-open");

  gsap.to(navToggleMenu, { duration: 0.25, opacity: 0, ease: "none" });
  gsap.to(navToggleClose, {
    duration: 0.25,
    opacity: 1,
    ease: "none",
    delay: 0.25,
  });

  const tl = gsap.timeline({
  onComplete: () => {
    isAnimating = false;
  },
});

    tl.to(menuBg, {
        duration: 0.5,
        attr: { d: OPEN_BULGE },
        ease: "power4.in",
    }).to(menuBg, { duration: 0.5, attr: { d: OPEN_FULL }, ease: "power4.out" });

    tl.to(menuLogo, { duration: 0.1, opacity: 1, ease: "none" }, "-=0.75");

    tl.to(
        menuInfoItems,
    {
        duration: 0.75,
        opacity: 1,
        y: 0,
        ease: "power3.out",
        stagger: 0.075,
    },
    "-=0.35",
    );

    const menuLinksChars = splits.flatMap((s) => s.chars);

    tl.to(
        menuLinksChars,
        {
            duration: 1.5,
            x: "0%",
            ease: "elastic.out(1, 0.25)",
            stagger: 0.01,
        },
        0.45,
    );

    tl.to(
        menuLinksChars,
        {
            duration: 0.75,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.01,
        },
        0.45,
    );
};

const closeMenu = () => {
  gsap.set(menuBg, { attr: { d: CLOSE_START } });

  gsap.to(navToggleClose, { duration: 0.3, opacity: 0, ease: "none" });
  gsap.to(navToggleMenu, {
    duration: 0.3,
    opacity: 1,
    ease: "none",
    delay: 0.25,
  });

  const tl = gsap.timeline({
    onComplete: () => {
        menu.classList.remove("is-open");
        gsap.set(menuBg, { attr: { d: OPEN_HIDDEN } });
        splits.forEach((split) => {
            gsap.set(split.chars, { opacity: 0, x: "750%" });
        });
        gsap.set(menuLinks, { opacity: 1 });
        gsap.set(menuInfoItems, { opacity: 0, y: 100 });
        isAnimating = false;
    },
});

tl.to(menuLogo, { duration: 0.3, opacity: 0 })
    .to(menuLinks, { duration: 0.3, opacity: 0 }, "<")
    .to(menuInfoItems, { duration: 0.3, opacity: 0 }, "<");

tl.to(
    menuBg,
    { duration: 0.5, attr: { d: CLOSE_BULGE }, ease: "power3.in" },
    "<",
).to(menuBg, {
    duration: 0.5,
    attr: { d: CLOSE_HIDDEN },
    ease: "power3.out",
});
};