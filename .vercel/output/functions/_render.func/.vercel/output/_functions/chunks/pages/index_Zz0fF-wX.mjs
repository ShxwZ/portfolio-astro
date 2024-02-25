import i18next, { t, changeLanguage } from 'i18next';
import '@proload/core';
import '@proload/plugin-tsm';
import { c as createAstro, d as createComponent, r as renderTemplate, i as renderComponent, u as unescapeHTML, j as Fragment, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, k as renderSlot, l as renderHead, n as createTransitionScope, o as defineStyleVars } from '../astro_rOnFu1no.mjs';
import { P, T } from './404_erL9Ozoc.mjs';
import 'kleur/colors';
/* empty css                          */
import localeEmoji from 'locale-emoji';
import ISO6991 from 'iso-639-1';
import 'clsx';
import { $ as $$Image } from './generic_L1FW2COi.mjs';

const interpolate = (i18nKey, referenceString, namespace = null) => {
  const localizedString = t(i18nKey, { ns: namespace });
  if (localizedString === i18nKey) {
    console.warn(`WARNING(astro-i18next): missing translation key ${i18nKey}.`);
    return referenceString;
  }
  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;
  const referenceStringMatches = referenceString.match(tagsRegex);
  if (!referenceStringMatches) {
    console.warn(
      "WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly."
    );
    return localizedString;
  }
  const referenceTags = [];
  referenceStringMatches.forEach((tagNode) => {
    const [, name, attributes] = tagsRegex.exec(tagNode);
    referenceTags.push({ name, attributes });
    tagsRegex.exec("");
  });
  let interpolatedString = localizedString;
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    interpolatedString = interpolatedString.replaceAll(
      `<${index}>`,
      `<${referencedTag.name}${referencedTag.attributes}>`
    );
    interpolatedString = interpolatedString.replaceAll(
      `</${index}>`,
      `</${referencedTag.name}>`
    );
  }
  return interpolatedString;
};
const createReferenceStringFromHTML = (html) => {
  const allowedTags = ["strong", "br", "em", "i", "b"];
  let forbiddenStrings = [];
  if (i18next.options) {
    forbiddenStrings = [
      "keySeparator",
      "nsSeparator",
      "pluralSeparator",
      "contextSeparator"
    ].map((key) => {
      return {
        key,
        str: i18next.options[key]
      };
    }).filter(function(val) {
      return typeof val !== "undefined";
    });
  }
  const tagsRegex = /<([\w\d]+)([^>]*)>/gi;
  const referenceStringMatches = html.match(tagsRegex);
  if (!referenceStringMatches) {
    console.warn(
      "WARNING(astro-i18next): default slot does not include any HTML tag to interpolate! You should use the `t` function directly."
    );
    return html;
  }
  const referenceTags = [];
  referenceStringMatches.forEach((tagNode) => {
    const [, name, attributes] = tagsRegex.exec(tagNode);
    referenceTags.push({ name, attributes });
    tagsRegex.exec("");
  });
  let sanitizedString = html.replace(/\s+/g, " ").trim();
  for (let index = 0; index < referenceTags.length; index++) {
    const referencedTag = referenceTags[index];
    if (allowedTags.includes(referencedTag.name) && referencedTag.attributes.trim().length === 0) {
      continue;
    }
    sanitizedString = sanitizedString.replaceAll(
      new RegExp(`<${referencedTag.name}[^>]*?\\s*\\/>`, "gi"),
      `<${index}/>`
    );
    sanitizedString = sanitizedString.replaceAll(
      `<${referencedTag.name}${referencedTag.attributes}>`,
      `<${index}>`
    );
    sanitizedString = sanitizedString.replaceAll(
      `</${referencedTag.name}>`,
      `</${index}>`
    );
  }
  for (let index = 0; index < forbiddenStrings.length; index++) {
    const { key, str } = forbiddenStrings[index];
    if (sanitizedString.includes(str)) {
      console.warn(
        `WARNING(astro-i18next): "${str}" was found in a <Trans> translation key, but it is also used as ${key}. Either explicitly set an i18nKey or change the value of ${key}.`
      );
    }
  }
  return sanitizedString;
};

const $$Astro$V = createAstro();
const $$Trans = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$V, $$props, $$slots);
  Astro2.self = $$Trans;
  const { i18nKey, ns } = Astro2.props;
  const referenceString = await Astro2.slots.render("default");
  let key;
  if (typeof i18nKey === "string") {
    key = i18nKey;
  } else {
    key = createReferenceStringFromHTML(referenceString);
  }
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(interpolate(key, referenceString, ns))}` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/node_modules/astro-i18next/src/components/Trans.astro", void 0);

const $$Astro$U = createAstro();
const $$LanguageSelector = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$U, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const supportedLanguages = i18next.languages;
  const currentLanguage = i18next.language;
  const { pathname } = Astro2.url;
  const { showFlag = false, languageMapping, ...attributes } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<select onchange="location = this.value;"${spreadAttributes(attributes)}> ${supportedLanguages.map((supportedLanguage) => {
    let value = P(pathname, supportedLanguage);
    const flag = showFlag ? localeEmoji(supportedLanguage) + " " : "";
    let nativeName = "";
    if (languageMapping && languageMapping.hasOwnProperty(supportedLanguage)) {
      nativeName = languageMapping[supportedLanguage];
    } else {
      nativeName = ISO6991.getNativeName(supportedLanguage);
    }
    const label = flag + nativeName;
    return renderTemplate`<option${addAttribute(value, "value")}${addAttribute(supportedLanguage === currentLanguage, "selected")}> ${label} </option>`;
  })} </select>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/node_modules/astro-i18next/src/components/LanguageSelector.astro", void 0);

const $$Astro$T = createAstro();
const $$HeadHrefLangs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$T, $$props, $$slots);
  Astro2.self = $$HeadHrefLangs;
  const supportedLanguages = i18next.languages;
  const currentUrl = Astro2.url.href;
  return renderTemplate`${supportedLanguages.map((supportedLanguage) => renderTemplate`<link rel="alternate"${addAttribute(supportedLanguage, "hreflang")}${addAttribute(T(currentUrl, supportedLanguage), "href")}>`)}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/node_modules/astro-i18next/src/components/HeadHrefLangs.astro", void 0);

const $$Astro$S = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$S, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$R = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$R, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<html", ' class="dark"', '> <head><meta charset="UTF-8"><meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f5f5"><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#010409"><!-- Primary Meta Tags --><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://gabrielgarcia.vercel.app/"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image" content="/banner_og.png"><!-- Open Graph Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://gabrielgarcia.vercel.app/"><meta name="twitter:site" content="@ShxwZs"><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image" content="/banner_og.png"><meta name="viewport" content="width=device-width"><!--meta name="robots" content="all" /--><link rel="icon" type="image/svg+xml" href="/favicon.svg">', "<title>", "</title>", "", "</head> <body> ", '  <script>\n      function playSound(src) {\n        const audio = new Audio(src ?? "/sounds/click.mp3");\n        audio.autoplay = true;\n        audio.play();\n      }\n      document.addEventListener("astro:after-swap", () => {\n        const theme = (() => {\n          if (\n            typeof localStorage !== "undefined" &&\n            localStorage.getItem("theme")\n          ) {\n            return localStorage.getItem("theme");\n          }\n          return "dark";\n        })();\n\n        if (theme === "light") {\n          document.documentElement.classList.remove("dark");\n        } else {\n          document.documentElement.classList.add("dark");\n        }\n\n        window.localStorage.setItem("theme", theme);\n      });\n      const theme = (() => {\n        if (\n          typeof localStorage !== "undefined" &&\n          localStorage.getItem("theme")\n        ) {\n          return localStorage.getItem("theme");\n        }\n        return "dark";\n      })();\n\n      if (theme === "light") {\n        document.documentElement.classList.remove("dark");\n      } else {\n        document.documentElement.classList.add("dark");\n      }\n\n      window.localStorage.setItem("theme", theme);\n    <\/script> </body> </html>'])), addAttribute(i18next.language, "lang"), addAttribute(createTransitionScope($$result, "smooz4hq"), "data-astro-transition-persist"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderComponent($$result, "HeadHrefLangs", $$HeadHrefLangs, {}), title, renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/layouts/Layout.astro", "self");

const $$Astro$Q = createAstro();
const $$MenuIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$Q, $$props, $$slots);
  Astro2.self = $$MenuIcon;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Menu icon" role="img"${spreadAttributes(Astro2.props)}> <title>Menu</title> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <g clip-path="url(#clip0_429_11066)"> <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath> <rect width="24" height="24" fill="currentColor" transform="translate(0 0.000915527)"></rect> </clipPath> </defs> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/header/icons/MenuIcon.astro", void 0);

const $$Astro$P = createAstro();
const $$CloseIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$P, $$props, $$slots);
  Astro2.self = $$CloseIcon;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Close icon" role="img"${spreadAttributes(Astro2.props)}> <title>Cerrar</title> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <g clip-path="url(#clip0_429_11083)"> <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath> <rect width="24" height="24" fill="currentColor"></rect> </clipPath> </defs> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/header/icons/CloseIcon.astro", void 0);

const $$Astro$O = createAstro();
const $$ButtonContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$O, $$props, $$slots);
  Astro2.self = $$ButtonContainer;
  const { classesOutside = "", classesInside = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${classesOutside} shadow hover:shadow-none cursor-pointer bg-[--border-button-color] rounded-md p-0.5 hover:filter hover:brightness-[110%] dark:hover:brightness-[160%]`, "class")} data-astro-cid-visvxtn7> <div${addAttribute(`${classesInside} button-inside bg-[--secondary-bg-color] overflow-hidden opacity-[85%] hover:opacity-[85%] rounded-[--radius-button] h-full`, "class")} data-astro-cid-visvxtn7> ${renderSlot($$result, $$slots["default"])} </div> </div> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/ButtonContainer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$N = createAstro();
const $$ThemeButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$N, $$props, $$slots);
  Astro2.self = $$ThemeButton;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '  <script>\n  const handleToggleClick = () => {\n    const element = document.documentElement;\n    element.classList.toggle("dark");\n\n    const isDark = element.classList.contains("dark");\n    localStorage.setItem("theme", isDark ? "dark" : "light");\n  };\n  document\n    .getElementById("themeToggle")\n    .addEventListener("click", handleToggleClick);\n  document.addEventListener("astro:after-swap", () => {\n    document\n      .getElementById("themeToggle")\n      .addEventListener("click", handleToggleClick);\n  });\n<\/script>'])), renderComponent($$result, "ButtonContainer", $$ButtonContainer, { "classesInside": "bg-[--bg-color]", "data-astro-cid-uq2tgudr": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center bg-[--bg-color]" data-astro-cid-uq2tgudr> <input type="checkbox" name="themeToggle" id="themeToggle" data-astro-cid-uq2tgudr> <label onclick="playSound('/sounds/switch.mp3')" class="relative cursor-pointer p-2" for="themeToggle" data-astro-cid-uq2tgudr>.
<svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-label="Light theme icon" role="img" data-astro-cid-uq2tgudr> <title>${t("BUTTONS.THEME.1")}</title> <path class="fill-[--primary-color]" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" data-astro-cid-uq2tgudr></path> <path class="fill-[--secondary-color]" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" data-astro-cid-uq2tgudr></path> </svg> <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-label="Dark theme icon" role="img" data-astro-cid-uq2tgudr> <title>${t("BUTTONS.THEME.0")}</title> <path class="fill-[--primary-color]" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" data-astro-cid-uq2tgudr></path> <path class="fill-[--secondary-color]" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" data-astro-cid-uq2tgudr></path> </svg> </label> </div> ` }));
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/ThemeButton.astro", void 0);

const $$Astro$M = createAstro();
const $$LangSelectable = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$M, $$props, $$slots);
  Astro2.self = $$LangSelectable;
  const { text, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="flex items-center cursor-pointer h-full bg-[--border-button-color]" onclick="playSound()"> <span class="px-2 w-fit"> ${text} </span> </a>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/LangSelectable.astro", void 0);

const $$Astro$L = createAstro();
const $$LangSelected = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$L, $$props, $$slots);
  Astro2.self = $$LangSelected;
  const { text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span class="flex items-center cursor-default h-full opacity-100"> <span class="w-fit px-2 font-[600]"> ${text} </span> </span>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/LangSelected.astro", void 0);

const $$Astro$K = createAstro();
const $$LangSwitch = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$K, $$props, $$slots);
  Astro2.self = $$LangSwitch;
  const currentLocale = i18next.language;
  return renderTemplate`${renderComponent($$result, "ButtonContainer", $$ButtonContainer, { "classesInside": "bg-[--bg-color] " }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="select-lang bg-[--bg-color] justify-between flex items-center w-full h-full text-center"> ${currentLocale === "es" ? renderTemplate`${renderComponent($$result2, "LangSelected", $$LangSelected, { "text": "ES" })}` : renderTemplate`${renderComponent($$result2, "LangSelectable", $$LangSelectable, { "url": "/", "text": "ES" })}`} ${currentLocale === "en" ? renderTemplate`${renderComponent($$result2, "LangSelected", $$LangSelected, { "text": "EN" })}` : renderTemplate`${renderComponent($$result2, "LangSelectable", $$LangSelectable, { "url": "/en", "text": "EN" })}`} </div> ` })} `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/LangSwitch.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$J = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$J, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate(_a || (_a = __template(["", '<header class="flex justify-center items-center" data-astro-cid-pwmmw5ba> <div class="menu-container flex justify-center items-center w-100 relative" data-astro-cid-pwmmw5ba> <!-- Menu mobile --> <input type="checkbox" id="nav_checkbox" aria-label="Open menu mobile" name="nav_checkbox" data-astro-cid-pwmmw5ba> <label for="nav_checkbox" class="nav_toggle" aria-labelledby="nav_checkbox" data-astro-cid-pwmmw5ba>.\n', " ", ` </label> <div class="menu_wrap" data-astro-cid-pwmmw5ba> <nav class="nav_menu flex flex-row" data-astro-cid-pwmmw5ba> <!-- Logo name '> Gabriel Garc\xEDa _' --> <a class="flex logo justify-between items-center gap-2 font-bold text-nowrap text-[--primary-color] opacity-100 z-[10]" href="#home" data-astro-cid-pwmmw5ba> <span class="text-[--color-violet-one]" data-astro-cid-pwmmw5ba>&#62;</span> Gabriel Garc\xEDa
<span class="text-[--color-violet-one]" data-astro-cid-pwmmw5ba>&#95;</span> </a> <!--  Navegation website  --> <div class="nav_links absolute flex justify-center right-0 gap-x-10 w-full h-full items-center" data-astro-cid-pwmmw5ba> <a href="#about-me" data-nav-checkbox data-astro-cid-pwmmw5ba>`, '</a> <a href="#experience" data-nav-checkbox data-astro-cid-pwmmw5ba>', '</a> <a href="#projects" data-nav-checkbox data-astro-cid-pwmmw5ba>', '</a> <a href="#contact" data-nav-checkbox data-astro-cid-pwmmw5ba>', '</a> <!--  Theme toggle & Language  --> <div class="toogles absolute flex gap-x-5" data-astro-cid-pwmmw5ba> ', " ", ' </div> </div> </nav> </div> </div> </header> <script>\n  document.addEventListener("DOMContentLoaded", () => {\n    const checkbox = document.getElementById("nav_checkbox");\n    const links = document.querySelectorAll(".nav_menu [data-nav-checkbox]");\n\n    links.forEach((link) => {\n      link.addEventListener("click", () => {\n        checkbox.checked = false;\n      });\n    });\n  });\n<\/script> '])), maybeRenderHead(), renderComponent($$result, "MenuIcon", $$MenuIcon, { "class": "open", "data-astro-cid-pwmmw5ba": true }), renderComponent($$result, "CloseIcon", $$CloseIcon, { "class": "close", "data-astro-cid-pwmmw5ba": true }), t("NAVBAR.ABOUT_ME"), t("NAVBAR.EXPERIENCE"), t("NAVBAR.PROJECTS"), t("NAVBAR.CONTACT"), renderComponent($$result, "ThemeToggle", $$ThemeButton, { "data-astro-cid-pwmmw5ba": true }), renderComponent($$result, "LangSwitch", $$LangSwitch, { "data-astro-cid-pwmmw5ba": true }));
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/header/Header.astro", void 0);

const $$Astro$I = createAstro();
const $$AngularIcon$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$I, $$props, $$slots);
  Astro2.self = $$AngularIcon$1;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg xml:space="preserve" viewBox="0 0 960 960" stroke="currentColor" fill="currentColor" aria-label="Angular icon" aire-hidden="true" role="img"> <title>Angular</title> <path d="m562.6 109.8 241.5 519.7 25.1-396.4zm62.3 546.1H334.3l-37.1 89.9 182.4 104 182.4-104zM384.1 539.3h191.1L479.6 307zm12.5-429.5L130 233.1l25.1 396.4z"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/AngularIcon.astro", void 0);

const $$Astro$H = createAstro();
const $$CopilotIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$H, $$props, $$slots);
  Astro2.self = $$CopilotIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg id="icon-copilot" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aire-hidden="true" aria-label="Copilot icon" role="img"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M4 18v-5.5c0 -.667 .167 -1.333 .5 -2"></path> <path d="M12 7.5c0 -1 -.01 -4.07 -4 -3.5c-3.5 .5 -4 2.5 -4 3.5c0 1.5 0 4 3 4c4 0 5 -2.5 5 -4z"></path> <path d="M4 12c-1.333 .667 -2 1.333 -2 2c0 1 0 3 1.5 4c3 2 6.5 3 8.5 3s5.499 -1 8.5 -3c1.5 -1 1.5 -3 1.5 -4c0 -.667 -.667 -1.333 -2 -2"></path> <path d="M20 18v-5.5c0 -.667 -.167 -1.333 -.5 -2"></path> <path d="M12 7.5l0 -.297l.01 -.269l.027 -.298l.013 -.105l.033 -.215c.014 -.073 .029 -.146 .046 -.22l.06 -.223c.336 -1.118 1.262 -2.237 3.808 -1.873c2.838 .405 3.703 1.797 3.93 2.842l.036 .204c0 .033 .01 .066 .013 .098l.016 .185l0 .171l0 .49l-.015 .394l-.02 .271c-.122 1.366 -.655 2.845 -2.962 2.845c-3.256 0 -4.524 -1.656 -4.883 -3.081l-.053 -.242a3.865 3.865 0 0 1 -.036 -.235l-.021 -.227a3.518 3.518 0 0 1 -.007 -.215z"></path> <path d="M10 15v2"></path> <path d="M14 15v2"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/CopilotIcon.astro", void 0);

const $$Astro$G = createAstro();
const $$AstroIcon$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$G, $$props, $$slots);
  Astro2.self = $$AstroIcon$1;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 128 128" stroke="currentColor" aria-label="Astro icon" role="img" aire-hidden="true"> <path d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/AstroIcon.astro", void 0);

const $$Astro$F = createAstro();
const $$TypescriptIcon$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$F, $$props, $$slots);
  Astro2.self = $$TypescriptIcon$1;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg id="icon-typescript" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-label="Typescript icon" role="img" aire-hidden="true"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5"></path> <path d="M9 12h4"></path> <path d="M11 12v6"></path> <path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/TypescriptIcon.astro", void 0);

const $$Astro$E = createAstro();
const $$StarIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$E, $$props, $$slots);
  Astro2.self = $$StarIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg id="icon-spark" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-label="Star icon" aire-hidden="true" role="img"> <path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 3l-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/StarIcon.astro", void 0);

const $$Astro$D = createAstro();
const $$ReactIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$D, $$props, $$slots);
  Astro2.self = $$ReactIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-label="React icon" aire-hidden="true" role="img"> <path stroke="none" d="M0 0h24v24H0z"></path> <path d="M6.357 9C3.72 9.68 2 10.845 2 12.175 2 14.282 6.405 16 11.85 16c.74 0 1.26-.039 1.95-.097"></path> <path d="M9.837 15.9c-.413-.596-.806-1.133-1.18-1.8-2.751-4.9-3.488-9.77-1.63-10.873 1.15-.697 3.047.253 4.974 2.254"></path> <path d="M6.429 15.387c-.702 2.688-.56 4.716.56 5.395 1.783 1.08 5.387-1.958 8.043-6.804.36-.67.683-1.329.968-1.978"></path> <path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253 1.85-1.102 1.121-5.972-1.633-10.873-.384-.677-.777-1.204-1.18-1.8"></path> <path d="M17.66 15c2.612-.687 4.34-1.85 4.34-3.176C22 9.714 17.592 8 12.155 8c-.747 0-1.266.029-1.955.087"></path> <path d="M8 12c.285-.66.607-1.308.968-1.978 2.647-4.844 6.253-7.89 8.046-6.801 1.11.679 1.262 2.706.56 5.393m-5.314 3.401h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/ReactIcon.astro", void 0);

const $$Astro$C = createAstro();
const $$CSharpIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$C, $$props, $$slots);
  Astro2.self = $$CSharpIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-label="CSharp icon" aire-hidden="true" role="img"> <path stroke="none" d="M0 0h24v24H0z"></path> <path d="M10 9a3 3 0 0 0-3-3h-.5A3.5 3.5 0 0 0 3 9.5v5A3.5 3.5 0 0 0 6.5 18H7a3 3 0 0 0 3-3m6-8-1 10m5-10-1 10m-5-7h7.5m-.5 4h-7.5"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/CSharpIcon.astro", void 0);

const $$Astro$B = createAstro();
const $$VSCodeIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$B, $$props, $$slots);
  Astro2.self = $$VSCodeIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-label="VSCode icon" role="img" aire-hidden="true"> <path stroke="none" d="M0 0h24v24H0z"></path> <path d="M16 3v18l4-2.5v-13zM9.165 13.903 5 17.5l-2-1L7.333 12m1.735-1.802L16 3v5l-4.795 4.141"></path> <path d="M16 16.5 5 6.5l-2 1L16 21"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/VSCodeIcon.astro", void 0);

const $$Astro$A = createAstro();
const $$GithubIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$A, $$props, $$slots);
  Astro2.self = $$GithubIcon;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${Astro2.props.class} icon`, "class")}> <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-label="Github icon" aire-hidden="true" role="img"> <path stroke="none" d="M0 0h24v24H0z"></path> <path fill="currentColor" stroke="none" d="M5.315 2.1c.791-.113 1.9.145 3.333.966l.272.161.16.1.397-.083a13.3 13.3 0 0 1 4.59-.08l.456.08.396.083.161-.1c1.385-.84 2.487-1.17 3.322-1.148l.164.008.147.017.076.014.05.011.144.047a1 1 0 0 1 .53.514 5.2 5.2 0 0 1 .397 2.91l-.047.267-.046.196.123.163c.574.795.93 1.728 1.03 2.707l.023.295L21 9.5c0 3.855-1.659 5.883-4.644 6.68l-.245.061-.132.029.014.161.008.157.004.365-.002.213L16 21a1 1 0 0 1-.883.993L15 22H9a1 1 0 0 1-.993-.883L8 21v-.734c-1.818.26-3.03-.424-4.11-1.878l-.535-.766c-.28-.396-.455-.579-.589-.644l-.048-.019a1 1 0 0 1 .564-1.918c.642.188 1.074.568 1.57 1.239l.538.769c.76 1.079 1.36 1.459 2.609 1.191L8 17.562l-.018-.168a5.03 5.03 0 0 1-.021-.824l.017-.185.019-.12-.108-.024c-2.976-.71-4.703-2.573-4.875-6.139l-.01-.31L3 9.5a5.6 5.6 0 0 1 .908-3.051l.152-.222.122-.163-.045-.196a5.2 5.2 0 0 1 .145-2.642l.1-.282.106-.253a1 1 0 0 1 .529-.514l.144-.047.154-.03z"></path> </svg> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/icons/GithubIcon.astro", void 0);

const $$Astro$z = createAstro();
const $$Orbit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$z, $$props, $$slots);
  Astro2.self = $$Orbit;
  return renderTemplate`${maybeRenderHead()}<article class="orbit-component"> <div class="container-orbit"> <div class="name"> <h1>Gabriel García</h1> <h2 class="subtitle"> <span class="software">Software</span> <span class="dev">Developer</span> </h2> </div> <div class="orbit-outside-zone"> <div class="orbit-outside"> ${renderComponent($$result, "AngularIcon", $$AngularIcon$1, { "class": "outside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "outside" })} ${renderComponent($$result, "TypescriptIcon", $$TypescriptIcon$1, { "class": "outside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "outside" })} ${renderComponent($$result, "ReactIcon", $$ReactIcon, { "class": "outside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "outside" })} ${renderComponent($$result, "CSharpIcon", $$CSharpIcon, { "class": "outside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "outside" })} </div> </div> <div class="orbit-zone"> <div class="orbit"> ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "inside" })} ${renderComponent($$result, "CopilotIcon", $$CopilotIcon, { "class": "inside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "inside" })} ${renderComponent($$result, "VSCodeIcon", $$VSCodeIcon, { "class": "inside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "inside" })} ${renderComponent($$result, "GithubIcon", $$GithubIcon, { "class": "inside" })} ${renderComponent($$result, "StarIcon", $$StarIcon, { "class": "inside" })} ${renderComponent($$result, "AstroIcon", $$AstroIcon$1, { "class": "inside" })} </div> </div> <div class="blurry-background"></div> </div> </article> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/orbit/Orbit.astro", void 0);

const $$Astro$y = createAstro();
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$y, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`${maybeRenderHead()}<section class="flex justify-center items-center" data-astro-cid-37nrbiej> <div id="home" class="absolute top-0" data-astro-cid-37nrbiej></div> ${renderComponent($$result, "Orbit", $$Orbit, { "data-astro-cid-37nrbiej": true })} </section> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/home/Home.astro", void 0);

const $$Astro$x = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Card;
  const padding = Astro2.props.padding ?? "3rem";
  const classes = Astro2.props.class;
  const $$definedVars = defineStyleVars([{ padding }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${classes} bg-[--border-color] rounded-xl p-1 w-full relative`, "class")} data-astro-cid-gx5ugnmk${addAttribute($$definedVars, "style")}> <div class="inside-card bg-[--secondary-bg-color] overflow-hidden rounded-[--nested-radius] h-full w-full" data-astro-cid-gx5ugnmk${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </div> </div> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/cards/Card.astro", void 0);

const $$Astro$w = createAstro();
const $$BaseBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$BaseBadge;
  return renderTemplate`${maybeRenderHead()}<span aria-label="Badge"${addAttribute(`${Astro2.props.class} text-xs font-medium flex justify-center items-center px-2.5 py-0.5 rounded w-full text-center`, "class")}> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/BaseBadge.astro", void 0);

const $$Astro$v = createAstro();
const $$BlueBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$BlueBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-blue-200 text-blue-800 dark:text-blue-300 dark:bg-blue-900" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/BlueBadge.astro", void 0);

const $$Astro$u = createAstro();
const $$GreenBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$GreenBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-green-200 text-green-800 dark:text-green-300 dark:bg-green-900" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/GreenBadge.astro", void 0);

const $$Astro$t = createAstro();
const $$PinkBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$PinkBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-pink-200 text-pink-800 dark:text-pink-300 dark:bg-pink-900" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/PinkBadge.astro", void 0);

const $$Astro$s = createAstro();
const $$PurpleBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$PurpleBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-purple-200 text-purple-800 dark:text-purple-300 dark:bg-purple-900" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/PurpleBadge.astro", void 0);

const $$Astro$r = createAstro();
const $$RedBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$RedBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-red-200 text-red-800 dark:text-red-300 dark:bg-red-900" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/RedBadge.astro", void 0);

const $$Astro$q = createAstro();
const $$AngularIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$AngularIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" xml:space="preserve" fill="currentColor" aria-label="Logo de Angular" role="img"> <title>Angular</title> <desc>Logo del framework de Angular, compuesto por un escudo con una A blanca en
    el centro.</desc> <g> <polygon points="562.6,109.8 804.1,629.5 829.2,233.1 	"></polygon> <polygon points="624.9,655.9 334.3,655.9 297.2,745.8 479.6,849.8 662,745.8 	"></polygon> <polygon points="384.1,539.3 575.2,539.3 479.6,307 	"></polygon> <polygon points="396.6,109.8 130,233.1 155.1,629.5 	"></polygon> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/icons/AngularIcon.astro", void 0);

const $$Astro$p = createAstro();
const $$Subtitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Subtitle;
  return renderTemplate`${maybeRenderHead()}<h2 class="font-bold text-[--primary-color]" data-astro-cid-nzvc4cbi> ${renderSlot($$result, $$slots["default"])} </h2> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/utils/Subtitle.astro", void 0);

const $$Astro$o = createAstro();
const $$AstroIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$AstroIcon;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${spreadAttributes(Astro2.props)} fill="none" viewBox="0 0 128 128" aria-label="astro logo" role="img"> <title>Astro</title> <desc>Logo de Astro, un marco de front-end moderno. El logo representa un cohete.</desc> <path fill="currentColor" d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z"></path> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/icons/AstroIcon.astro", void 0);

const $$Astro$n = createAstro();
const $$DotNetIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$DotNetIcon;
  return renderTemplate`${maybeRenderHead()}<svg fill="currentColor" viewBox="0 0 32 32" version="1.1"${spreadAttributes(Astro2.props)} aria-label="dotnet logo" xmlns="http://www.w3.org/2000/svg" role="img"> <title>DotNet</title> <desc>Logo de DotNet, un marco de desarrollo de software de Microsoft. El logo
    representa la palabra ".NET".</desc> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M3.175 20.551c-0.001 0.289-0.123 0.549-0.318 0.733l-0.001 0c-0.2 0.188-0.47 0.303-0.767 0.303s-0.568-0.116-0.769-0.304l0.001 0.001c-0.195-0.184-0.317-0.444-0.317-0.732s0.122-0.549 0.318-0.732l0.001-0c0.2-0.188 0.47-0.303 0.767-0.303s0.567 0.115 0.768 0.304l-0.001-0.001c0.195 0.184 0.317 0.444 0.318 0.733v0zM14.051 21.417h-1.947l-5.126-8.088c-0.118-0.182-0.227-0.392-0.314-0.613l-0.009-0.024h-0.045c0.041 0.365 0.064 0.787 0.064 1.215 0 0.104-0.001 0.208-0.004 0.312l0-0.015v7.213h-1.721v-11.003h2.073l4.955 7.898c0.209 0.326 0.344 0.552 0.404 0.675h0.030c-0.050-0.374-0.078-0.806-0.078-1.245 0-0.083 0.001-0.165 0.003-0.248l-0 0.012v-7.093h1.715zM22.433 21.417h-6.025v-11.003h5.786v1.55h-4.005v3.117h3.69v1.542h-3.69v3.254h4.244zM30.996 11.964h-3.084v9.454h-1.781v-9.454h-3.077v-1.55h7.941z"></path> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/icons/DotNetIcon.astro", void 0);

const $$Astro$m = createAstro();
const $$SpringBootIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$SpringBootIcon;
  return renderTemplate`${maybeRenderHead()}<svg fill="currentColor"${spreadAttributes(Astro2.props)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="springboot logo" role="img"> <title>Spring Boot</title> <desc>Logo de Spring Boot, un marco de desarrollo de software de Java. El logo
    representa una hoja de primavera.</desc> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M20.205 16.392c-2.469 3.289-7.741 2.179-11.122 2.338 0 0-.599.034-1.201.133 0 0 .228-.097.519-.198 2.374-.821 3.496-.986 4.939-1.727 2.71-1.388 5.408-4.413 5.957-7.555-1.032 3.022-4.17 5.623-7.027 6.679-1.955.722-5.492 1.424-5.493 1.424a5.28 5.28 0 0 1-.143-.076c-2.405-1.17-2.475-6.38 1.894-8.059 1.916-.736 3.747-.332 5.818-.825 2.208-.525 4.766-2.18 5.805-4.344 1.165 3.458 2.565 8.866.054 12.21zm.042-13.28a9.212 9.212 0 0 1-1.065 1.89 9.982 9.982 0 0 0-7.167-3.031C6.492 1.971 2 6.463 2 11.985a9.983 9.983 0 0 0 3.205 7.334l.22.194a.856.856 0 1 1 .001.001l.149.132A9.96 9.96 0 0 0 12.015 22c5.278 0 9.613-4.108 9.984-9.292.274-2.539-.476-5.763-1.752-9.596"></path> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/icons/SpringBootIcon.astro", void 0);

const $$Astro$l = createAstro();
const $$TypescriptIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$TypescriptIcon;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"${spreadAttributes(Astro2.props)} aria-label="typescript logo"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <title>Typescript</title> <title>
      Logo de Typescript, logo azul con las iniciales de typescript 'TS'
    </title> <rect x="2" y="2" width="28" height="28" rx="1.312" style="fill:currentColor"></rect><path d="M18.245,23.759v3.068a6.492,6.492,0,0,0,1.764.575,11.56,11.56,0,0,0,2.146.192,9.968,9.968,0,0,0,2.088-.211,5.11,5.11,0,0,0,1.735-.7,3.542,3.542,0,0,0,1.181-1.266,4.469,4.469,0,0,0,.186-3.394,3.409,3.409,0,0,0-.717-1.117,5.236,5.236,0,0,0-1.123-.877,12.027,12.027,0,0,0-1.477-.734q-.6-.249-1.08-.484a5.5,5.5,0,0,1-.813-.479,2.089,2.089,0,0,1-.516-.518,1.091,1.091,0,0,1-.181-.618,1.039,1.039,0,0,1,.162-.571,1.4,1.4,0,0,1,.459-.436,2.439,2.439,0,0,1,.726-.283,4.211,4.211,0,0,1,.956-.1,5.942,5.942,0,0,1,.808.058,6.292,6.292,0,0,1,.856.177,5.994,5.994,0,0,1,.836.3,4.657,4.657,0,0,1,.751.422V13.9a7.509,7.509,0,0,0-1.525-.4,12.426,12.426,0,0,0-1.9-.129,8.767,8.767,0,0,0-2.064.235,5.239,5.239,0,0,0-1.716.733,3.655,3.655,0,0,0-1.171,1.271,3.731,3.731,0,0,0-.431,1.845,3.588,3.588,0,0,0,.789,2.34,6,6,0,0,0,2.395,1.639q.63.26,1.175.509a6.458,6.458,0,0,1,.942.517,2.463,2.463,0,0,1,.626.585,1.2,1.2,0,0,1,.23.719,1.1,1.1,0,0,1-.144.552,1.269,1.269,0,0,1-.435.441,2.381,2.381,0,0,1-.726.292,4.377,4.377,0,0,1-1.018.105,5.773,5.773,0,0,1-1.969-.35A5.874,5.874,0,0,1,18.245,23.759Zm-5.154-7.638h4V13.594H5.938v2.527H9.92V27.375h3.171Z" style="fill:var(--secondary-bg-color);fill-rule:evenodd"></path> </g> </svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/icons/TypescriptIcon.astro", void 0);

const $$Astro$k = createAstro();
const $$LangsInfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$LangsInfo;
  return renderTemplate`${maybeRenderHead()}<article class="flex flex-col gap-8 relative"${spreadAttributes(Astro2.props)} data-astro-cid-uv64xveh> ${renderComponent($$result, "Subtitle", $$Subtitle, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`${t("ABOUT_ME.LANGUAGES_AND_FRAMEWORKS")}` })} <div class="langs flex flex-row gap-y-5 gap-x-5 flex-wrap justify-center items-center" data-astro-cid-uv64xveh> <a class="lang" rel="nofollow" href="https://angular.dev/" target="_blank" data-astro-cid-uv64xveh> ${renderComponent($$result, "AngularIcon", $$AngularIcon, { "class": "text-red-800 dark:text-red-300", "data-astro-cid-uv64xveh": true })} ${renderComponent($$result, "RedBadge", $$RedBadge, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`Angular` })} </a> <a class="lang" rel="nofollow" href="https://dotnet.microsoft.com/" target="_blank" data-astro-cid-uv64xveh> ${renderComponent($$result, "DotNetIcon", $$DotNetIcon, { "class": "text-purple-800 dark:text-purple-300", "data-astro-cid-uv64xveh": true })} ${renderComponent($$result, "PurpleBadge", $$PurpleBadge, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`.NET` })} </a> <a class="lang" rel="nofollow" href="https://www.typescriptlang.org/" target="_blank" data-astro-cid-uv64xveh> ${renderComponent($$result, "TypescriptIcon", $$TypescriptIcon, { "class": "text-blue-800 dark:text-blue-300", "data-astro-cid-uv64xveh": true })} ${renderComponent($$result, "BlueBadge", $$BlueBadge, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`Typescript` })} </a> <a class="lang" rel="nofollow" href="https://astro.build/" target="_blank" data-astro-cid-uv64xveh> ${renderComponent($$result, "AstroIcon", $$AstroIcon, { "class": "text-pink-800 dark:text-pink-300", "data-astro-cid-uv64xveh": true })} ${renderComponent($$result, "PinkBadge", $$PinkBadge, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`Astro` })} </a> <a class="lang" rel="nofollow" href="https://spring.io/" target="_blank" data-astro-cid-uv64xveh> ${renderComponent($$result, "SpringBootIcon", $$SpringBootIcon, { "class": "text-green-800 dark:text-green-300", "data-astro-cid-uv64xveh": true })} ${renderComponent($$result, "GreenBadge", $$GreenBadge, { "data-astro-cid-uv64xveh": true }, { "default": ($$result2) => renderTemplate`Spring Boot` })} </a> </div> </article> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/LangsInfo.astro", void 0);

const $$Astro$j = createAstro();
const $$Bio = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Bio;
  return renderTemplate`${maybeRenderHead()}<div${spreadAttributes(Astro2.props, void 0, { "class": "astro-ys42dea6" })} data-astro-cid-ys42dea6> <p data-astro-cid-ys42dea6> ${renderComponent($$result, "Trans", $$Trans, { "i18nKey": "ABOUT_ME.DESCRIPTION.FIRST", "data-astro-cid-ys42dea6": true }, { "default": ($$result2) => renderTemplate` <b data-astro-cid-ys42dea6></b><em class="underline-important" data-astro-cid-ys42dea6></em><em class="underline-important" data-astro-cid-ys42dea6></em> ` })} </p> <p data-astro-cid-ys42dea6> ${t("ABOUT_ME.DESCRIPTION.SECOND")} </p> </div> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/Bio.astro", void 0);

const $$Astro$i = createAstro();
const $$Title = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Title;
  return renderTemplate`${maybeRenderHead()}<h1 class="font-bold leading-tight" data-astro-cid-n66xpilj> ${renderSlot($$result, $$slots["default"])} </h1> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/utils/Title.astro", void 0);

const $$Astro$h = createAstro();
const $$DownloadIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$DownloadIcon;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${spreadAttributes(Astro2.props)} viewBox="0 0 24 24" aria-label="download"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/icons/DownloadIcon.astro", void 0);

const $$Astro$g = createAstro();
const $$DownloadButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$DownloadButton;
  return renderTemplate`${renderComponent($$result, "ButtonContainer", $$ButtonContainer, { "classesInside": "bg-[--bg-button-color] " }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a onclick="playSound()" href="/CV.pdf" class="flex opacity-[100%] items-center gap-1 justify-center w-full h-full text-center py-1" download="CV - Gabriel Alberto García Pellizzon.pdf"> <span class="text-nowrap font-medium">${t("ABOUT_ME.DOWNLOAD_CV")}</span> ${renderComponent($$result2, "DownloadIcon", $$DownloadIcon, { "width": "24", "height": "24" })} </a> ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/buttons/DownloadButton.astro", void 0);

const avatar = new Proxy({"src":"/_astro/avatar.SOlv2dpc.png","width":1000,"height":1000,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/images/avatar.png";
							}
							
							return target[name];
						}
					});

const $$Astro$f = createAstro();
const $$Avatar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Avatar;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col justify-center gap-4 w-fit" data-astro-cid-qfjtlvqw> <div class="bg-[--border-button-color] rounded-xl h-fit w-fit p-1 shadow-sm" data-astro-cid-qfjtlvqw> ${renderComponent($$result, "Image", $$Image, { "src": avatar, "alt": "Foto de Gabriel Alberto Garc\xEDa Pellizz\xF3n", "title": "Foto de Gabriel Alberto Garc\xEDa Pellizz\xF3n", "width": 300, "class": "avatar bg-[--secondary-bg-color] rounded-[--nested-radius]", "data-astro-cid-qfjtlvqw": true })} </div> <!--  Download CV Button  --> ${renderComponent($$result, "DownloadButton", $$DownloadButton, { "data-astro-cid-qfjtlvqw": true })} </div> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/Avatar.astro", void 0);

const $$Astro$e = createAstro();
const $$AboutMe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$AboutMe;
  return renderTemplate`${maybeRenderHead()}<div id="about-me" data-astro-cid-3iwxj6t3></div> <article class="pt-24 px-4 flex flex-col gap-2" data-astro-cid-3iwxj6t3> ${renderComponent($$result, "Card", $$Card, { "padding": "2.5rem", "data-astro-cid-3iwxj6t3": true }, { "default": ($$result2) => renderTemplate` <div class="flex gap-x-5" data-astro-cid-3iwxj6t3> <div class="flex flex-col gap-5 w-full" data-astro-cid-3iwxj6t3> <!--  Title  --> ${renderComponent($$result2, "Title", $$Title, { "data-astro-cid-3iwxj6t3": true }, { "default": ($$result3) => renderTemplate`${t("ABOUT_ME.TITLE")}` })} <div class="flex about-content gap-5" data-astro-cid-3iwxj6t3> <div class="text-wrap flex flex-col gap-y-2" data-astro-cid-3iwxj6t3> <!--  Bio Text  --> ${renderComponent($$result2, "Bio", $$Bio, { "class": "flex flex-col gap-2 basis-3/4", "data-astro-cid-3iwxj6t3": true })} </div> <!--  Avatar Mobile --> <div class="content-avatar-mobile justify-center" data-astro-cid-3iwxj6t3> ${renderComponent($$result2, "Avatar", $$Avatar, { "data-astro-cid-3iwxj6t3": true })} </div> </div> </div> <div class="content-avatar flex items-center justify-center w-[40%] pt-6" data-astro-cid-3iwxj6t3> <!--  Avatar  --> ${renderComponent($$result2, "Avatar", $$Avatar, { "data-astro-cid-3iwxj6t3": true })} </div> </div> ` })} <div class="p-[0.5rem] mt-5" data-astro-cid-3iwxj6t3> <!--  Langs & Tech Info  --> ${renderComponent($$result, "LangsInfo", $$LangsInfo, { "data-astro-cid-3iwxj6t3": true })} </div> </article> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/about-me/AboutMe.astro", void 0);

const $$Astro$d = createAstro();
const $$GrayBadge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$GrayBadge;
  return renderTemplate`${renderComponent($$result, "BaseBadge", $$BaseBadge, { "class": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ring-gray-700 ring-1 ring-inset" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/badges/GrayBadge.astro", void 0);

const $$Astro$c = createAstro();
const $$CardProject = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$CardProject;
  const model = Astro2.props;
  model.data.techs = model.data.techs || [];
  return renderTemplate`${maybeRenderHead()}<li class="card-project flex flex-col mx-auto outline outline-[0.25rem] outline-[--border-color] rounded-xl flex-1 w-auto bg-[--secondary-bg-color] overflow-hidden" data-astro-cid-fu3gs4h3> <div class="flex-shrink-0 overflow-hidden" data-astro-cid-fu3gs4h3> ${renderComponent($$result, "Image", $$Image, { "class": "card-img-project h-auto w-full object-cover rounded-t-lg", "src": model.data.image, "alt": model.data.title ?? "Generic", "width": "479", "data-astro-cid-fu3gs4h3": true })} </div> <div class="h-full flex flex-col" data-astro-cid-fu3gs4h3> <div class="px-6 pt-6 h-full" data-astro-cid-fu3gs4h3> <div class="flex-1 flex flex-col h-full" data-astro-cid-fu3gs4h3> <h2 class="font-bold" data-astro-cid-fu3gs4h3> ${model.data.title ?? "Generic"} </h2> <div class="mt-2 mb-auto flex gap-2 flex-wrap" data-astro-cid-fu3gs4h3> ${model.data.techs.map((tech) => renderTemplate`<span data-astro-cid-fu3gs4h3> ${renderComponent($$result, "GrayBadge", $$GrayBadge, { "data-astro-cid-fu3gs4h3": true }, { "default": ($$result2) => renderTemplate`${tech}` })} </span>`)} </div> <div class="description-container py-3 flex-1" data-astro-cid-fu3gs4h3> <p class="mt-2 description" data-astro-cid-fu3gs4h3> ${model.data.description} </p> </div> </div> </div> <div class="card-buttons gap-4 flex px-6 w-full cursor-pointer mb-3" data-astro-cid-fu3gs4h3> ${renderComponent($$result, "ButtonContainer", $$ButtonContainer, { "classesOutside": "w-full", "classesInside": "bg-[--bg-button-color]", "data-astro-cid-fu3gs4h3": true }, { "default": ($$result2) => renderTemplate` <a${addAttribute(model.data.url, "href")} onclick="playSound()" target="_blank" rel="noopener noreferrer" class="inline-flex w-full opacity-[100%] gap-1 items-center justify-center px-5 py-1 border border-transparent text-base font-medium" data-astro-cid-fu3gs4h3> <span data-astro-cid-fu3gs4h3> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[1.1rem]" data-astro-cid-fu3gs4h3> <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" data-astro-cid-fu3gs4h3></path> <path d="M9 18c-4.51 2-5-2-7-2" data-astro-cid-fu3gs4h3></path> </svg> </span> ${t("BUTTONS.VIEW_CODE")} <span data-astro-cid-fu3gs4h3> <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.1rem]" viewBox="0 0 24 24" data-astro-cid-fu3gs4h3> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5" data-astro-cid-fu3gs4h3></path> </svg> </span> </a> ` })} </div> </div> </li> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/projects/CardProject.astro", void 0);

const satix_web_api = new Proxy({"src":"/_astro/satix_web_api.DajEfT04.png","width":960,"height":540,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/images/projects/satix_web_api.png";
							}
							
							return target[name];
						}
					});

const satix_mobile = new Proxy({"src":"/_astro/satix_mobile.XPVWdGyM.png","width":960,"height":540,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/images/projects/satix_mobile.png";
							}
							
							return target[name];
						}
					});

const portfolio = new Proxy({"src":"/_astro/portfolio.uAkBeNtz.png","width":960,"height":540,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/images/projects/portfolio.png";
							}
							
							return target[name];
						}
					});

const $$Astro$b = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Projects;
  const translations = t(
    "PROJECTS.PROJECTS",
    { returnObjects: true }
  );
  const data = [
    {
      title: translations[0].TITLE,
      description: translations[0].DESCRIPTION,
      techs: ["Java", "Spring Boot", "Thymeleaf"],
      image: satix_web_api,
      url: "https://github.com/ShxwZ/SaTix-Web-Api"
    },
    {
      title: translations[1].TITLE,
      description: translations[1].DESCRIPTION,
      techs: ["Java", "Android"],
      image: satix_mobile,
      url: "https://github.com/ShxwZ/SaTix-Android"
    },
    {
      title: translations[2].TITLE,
      description: translations[2].DESCRIPTION,
      techs: ["Astro", "Typescript", "TailwindCSS"],
      image: portfolio,
      url: "https://github.com/ShxwZ/portfolio-astro"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div id="projects"></div> <article class="w-full pt-24 px-4"> <div class="text-center py-10"> ${renderComponent($$result, "Title", $$Title, {}, { "default": ($$result2) => renderTemplate`${t("PROJECTS.TITLE")}` })} </div> <div class="py-10"> <ul class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(270px,1fr))] justify-center"> ${data.map((data2) => renderTemplate`${renderComponent($$result, "CardProject", $$CardProject, { "data": { ...data2 } })}`)} </ul> </div> </article> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/projects/Projects.astro", void 0);

const $$Astro$a = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Section;
  return renderTemplate`${maybeRenderHead()}<section> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/section/Section.astro", void 0);

const $$Astro$9 = createAstro();
const $$TimelineCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TimelineCard;
  const { model } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full timeline-card" data-astro-cid-ddhdunhg> <div class="relative flex gap-3 w-full" data-astro-cid-ddhdunhg> <!--  Line & Point  --> <div class="timeline-point flex flex-col relative items-center w-5 pr-5" data-astro-cid-ddhdunhg> <!-- Point --> <div class="w-5 h-5 absolute top-6 dark:bg-purple-700 bg-purple-600 rounded-full" data-astro-cid-ddhdunhg></div> <!-- Line --> <div${addAttribute(`time-line w-px h-full bg-[--secondary-border-color] ${model.ACTUAL && "mt-6"}`, "class")} data-astro-cid-ddhdunhg></div> </div> <div class="w-full" data-astro-cid-ddhdunhg> <!-- Date --> <div class="timeline-badges flex-row pb-5 pl-2 pt-6 flex gap-2 justify-start" data-astro-cid-ddhdunhg> <div data-astro-cid-ddhdunhg> ${renderComponent($$result, "PurpleBadge", $$PurpleBadge, { "data-astro-cid-ddhdunhg": true }, { "default": ($$result2) => renderTemplate`${model.DATE}` })} </div> ${model.ACTUAL ? renderTemplate`<div class="relative" data-astro-cid-ddhdunhg> ${renderComponent($$result, "GreenBadge", $$GreenBadge, { "data-astro-cid-ddhdunhg": true }, { "default": ($$result2) => renderTemplate`Actual` })} </div>` : renderTemplate`<div data-astro-cid-ddhdunhg> ${renderComponent($$result, "GrayBadge", $$GrayBadge, { "data-astro-cid-ddhdunhg": true }, { "default": ($$result2) => renderTemplate`${model.DURATION}` })} </div>`} </div> <!-- Card --> <div class="pb-10" data-astro-cid-ddhdunhg> ${renderComponent($$result, "Card", $$Card, { "padding": "1rem", "data-astro-cid-ddhdunhg": true }, { "default": ($$result2) => renderTemplate` <div class="relative z-20 p-4" data-astro-cid-ddhdunhg> <!--  Name of company  --> ${renderComponent($$result2, "Subtitle", $$Subtitle, { "data-astro-cid-ddhdunhg": true }, { "default": ($$result3) => renderTemplate`${model.TITLE}` })} <!--  Text  --> <p data-astro-cid-ddhdunhg> ${model.DESCRIPTION} </p> </div> ` })} </div> </div> </div> </div> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/experience/Timeline/TimelineCard.astro", void 0);

const $$Astro$8 = createAstro();
const $$Timeline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Timeline;
  const data = t("EXPERIENCE.JOBS", {
    returnObjects: true
  });
  return renderTemplate`${maybeRenderHead()}<article class="items-center"> <div class="justify-center px-4 py-4 pl-8 mx-auto"> <!--  Title  --> <div class="text-center py-10"> ${renderComponent($$result, "Title", $$Title, {}, { "default": ($$result2) => renderTemplate`${t("EXPERIENCE.TITLE")}` })} </div> <!--  Time Line Card  --> ${data.map((item) => renderTemplate`${renderComponent($$result, "TimelineCard", $$TimelineCard, { "model": item })}`)} </div> </article>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/experience/Timeline/Timeline.astro", void 0);

const $$Astro$7 = createAstro();
const $$Experience = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Experience;
  return renderTemplate`${maybeRenderHead()}<div id="experience"></div> <article class="pt-24"> ${renderComponent($$result, "Timeline", $$Timeline, {})} </article>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/experience/Experience.astro", void 0);

const $$Astro$6 = createAstro();
const $$CardBackground = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$CardBackground;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-full bg-[--border-color]" viewBox="0 0 800 800"><g stroke-width="3.5" class="stroke-[--primary-color]" fill="none" stroke-linecap="round"><line x1="0" y1="0" x2="64" y2="64" opacity="1.00"></line><line x1="128" y1="0" x2="64" y2="64" opacity="0.92"></line><line x1="128" y1="0" x2="192" y2="64" opacity="0.85"></line><line x1="192" y1="0" x2="256" y2="64" opacity="0.77"></line><line x1="320" y1="0" x2="256" y2="64" opacity="0.70"></line><line x1="320" y1="0" x2="384" y2="64" opacity="0.62"></line><line x1="384" y1="0" x2="448" y2="64" opacity="0.54"></line><line x1="448" y1="0" x2="512" y2="64" opacity="0.47"></line><line x1="576" y1="0" x2="512" y2="64" opacity="0.39"></line><line x1="640" y1="0" x2="576" y2="64" opacity="0.32"></line><line x1="704" y1="0" x2="640" y2="64" opacity="0.24"></line><line x1="768" y1="0" x2="704" y2="64" opacity="0.16"></line><line x1="768" y1="0" x2="832" y2="64" opacity="0.09"></line><line x1="0" y1="64" x2="64" y2="128" opacity="1.00"></line><line x1="128" y1="64" x2="64" y2="128" opacity="0.92"></line><line x1="128" y1="64" x2="192" y2="128" opacity="0.85"></line><line x1="192" y1="64" x2="256" y2="128" opacity="0.77"></line><line x1="320" y1="64" x2="256" y2="128" opacity="0.70"></line><line x1="384" y1="64" x2="320" y2="128" opacity="0.62"></line><line x1="448" y1="64" x2="384" y2="128" opacity="0.54"></line><line x1="512" y1="64" x2="448" y2="128" opacity="0.47"></line><line x1="512" y1="64" x2="576" y2="128" opacity="0.39"></line><line x1="576" y1="64" x2="640" y2="128" opacity="0.32"></line><line x1="704" y1="64" x2="640" y2="128" opacity="0.24"></line><line x1="704" y1="64" x2="768" y2="128" opacity="0.16"></line><line x1="768" y1="64" x2="832" y2="128" opacity="0.09"></line><line x1="64" y1="128" x2="0" y2="192" opacity="1.00"></line><line x1="128" y1="128" x2="64" y2="192" opacity="0.92"></line><line x1="192" y1="128" x2="128" y2="192" opacity="0.85"></line><line x1="192" y1="128" x2="256" y2="192" opacity="0.77"></line><line x1="256" y1="128" x2="320" y2="192" opacity="0.70"></line><line x1="320" y1="128" x2="384" y2="192" opacity="0.62"></line><line x1="448" y1="128" x2="384" y2="192" opacity="0.54"></line><line x1="512" y1="128" x2="448" y2="192" opacity="0.47"></line><line x1="512" y1="128" x2="576" y2="192" opacity="0.39"></line><line x1="576" y1="128" x2="640" y2="192" opacity="0.32"></line><line x1="704" y1="128" x2="640" y2="192" opacity="0.24"></line><line x1="768" y1="128" x2="704" y2="192" opacity="0.16"></line><line x1="832" y1="128" x2="768" y2="192" opacity="0.09"></line><line x1="64" y1="192" x2="0" y2="256" opacity="1.00"></line><line x1="128" y1="192" x2="64" y2="256" opacity="0.92"></line><line x1="128" y1="192" x2="192" y2="256" opacity="0.85"></line><line x1="256" y1="192" x2="192" y2="256" opacity="0.77"></line><line x1="256" y1="192" x2="320" y2="256" opacity="0.70"></line><line x1="384" y1="192" x2="320" y2="256" opacity="0.62"></line><line x1="384" y1="192" x2="448" y2="256" opacity="0.54"></line><line x1="448" y1="192" x2="512" y2="256" opacity="0.47"></line><line x1="576" y1="192" x2="512" y2="256" opacity="0.39"></line><line x1="576" y1="192" x2="640" y2="256" opacity="0.32"></line><line x1="704" y1="192" x2="640" y2="256" opacity="0.24"></line><line x1="704" y1="192" x2="768" y2="256" opacity="0.16"></line><line x1="768" y1="192" x2="832" y2="256" opacity="0.09"></line><line x1="0" y1="256" x2="64" y2="320" opacity="1.00"></line><line x1="128" y1="256" x2="64" y2="320" opacity="0.92"></line><line x1="192" y1="256" x2="128" y2="320" opacity="0.85"></line><line x1="192" y1="256" x2="256" y2="320" opacity="0.77"></line><line x1="320" y1="256" x2="256" y2="320" opacity="0.70"></line><line x1="384" y1="256" x2="320" y2="320" opacity="0.62"></line><line x1="384" y1="256" x2="448" y2="320" opacity="0.54"></line><line x1="512" y1="256" x2="448" y2="320" opacity="0.47"></line><line x1="512" y1="256" x2="576" y2="320" opacity="0.39"></line><line x1="640" y1="256" x2="576" y2="320" opacity="0.32"></line><line x1="640" y1="256" x2="704" y2="320" opacity="0.24"></line><line x1="704" y1="256" x2="768" y2="320" opacity="0.16"></line><line x1="832" y1="256" x2="768" y2="320" opacity="0.09"></line><line x1="64" y1="320" x2="0" y2="384" opacity="1.00"></line><line x1="64" y1="320" x2="128" y2="384" opacity="0.92"></line><line x1="192" y1="320" x2="128" y2="384" opacity="0.85"></line><line x1="256" y1="320" x2="192" y2="384" opacity="0.77"></line><line x1="320" y1="320" x2="256" y2="384" opacity="0.70"></line><line x1="320" y1="320" x2="384" y2="384" opacity="0.62"></line><line x1="384" y1="320" x2="448" y2="384" opacity="0.54"></line><line x1="448" y1="320" x2="512" y2="384" opacity="0.47"></line><line x1="512" y1="320" x2="576" y2="384" opacity="0.39"></line><line x1="576" y1="320" x2="640" y2="384" opacity="0.32"></line><line x1="640" y1="320" x2="704" y2="384" opacity="0.24"></line><line x1="768" y1="320" x2="704" y2="384" opacity="0.16"></line><line x1="768" y1="320" x2="832" y2="384" opacity="0.09"></line><line x1="0" y1="384" x2="64" y2="448" opacity="1.00"></line><line x1="64" y1="384" x2="128" y2="448" opacity="0.92"></line><line x1="128" y1="384" x2="192" y2="448" opacity="0.85"></line><line x1="192" y1="384" x2="256" y2="448" opacity="0.77"></line><line x1="256" y1="384" x2="320" y2="448" opacity="0.70"></line><line x1="320" y1="384" x2="384" y2="448" opacity="0.62"></line><line x1="448" y1="384" x2="384" y2="448" opacity="0.54"></line><line x1="448" y1="384" x2="512" y2="448" opacity="0.47"></line><line x1="576" y1="384" x2="512" y2="448" opacity="0.39"></line><line x1="640" y1="384" x2="576" y2="448" opacity="0.32"></line><line x1="640" y1="384" x2="704" y2="448" opacity="0.24"></line><line x1="704" y1="384" x2="768" y2="448" opacity="0.16"></line><line x1="832" y1="384" x2="768" y2="448" opacity="0.09"></line><line x1="64" y1="448" x2="0" y2="512" opacity="1.00"></line><line x1="128" y1="448" x2="64" y2="512" opacity="0.92"></line><line x1="192" y1="448" x2="128" y2="512" opacity="0.85"></line><line x1="192" y1="448" x2="256" y2="512" opacity="0.77"></line><line x1="320" y1="448" x2="256" y2="512" opacity="0.70"></line><line x1="384" y1="448" x2="320" y2="512" opacity="0.62"></line><line x1="448" y1="448" x2="384" y2="512" opacity="0.54"></line><line x1="448" y1="448" x2="512" y2="512" opacity="0.47"></line><line x1="576" y1="448" x2="512" y2="512" opacity="0.39"></line><line x1="640" y1="448" x2="576" y2="512" opacity="0.32"></line><line x1="640" y1="448" x2="704" y2="512" opacity="0.24"></line><line x1="704" y1="448" x2="768" y2="512" opacity="0.16"></line><line x1="768" y1="448" x2="832" y2="512" opacity="0.09"></line><line x1="64" y1="512" x2="0" y2="576" opacity="1.00"></line><line x1="64" y1="512" x2="128" y2="576" opacity="0.92"></line><line x1="192" y1="512" x2="128" y2="576" opacity="0.85"></line><line x1="192" y1="512" x2="256" y2="576" opacity="0.77"></line><line x1="256" y1="512" x2="320" y2="576" opacity="0.70"></line><line x1="320" y1="512" x2="384" y2="576" opacity="0.62"></line><line x1="448" y1="512" x2="384" y2="576" opacity="0.54"></line><line x1="512" y1="512" x2="448" y2="576" opacity="0.47"></line><line x1="576" y1="512" x2="512" y2="576" opacity="0.39"></line><line x1="576" y1="512" x2="640" y2="576" opacity="0.32"></line><line x1="704" y1="512" x2="640" y2="576" opacity="0.24"></line><line x1="704" y1="512" x2="768" y2="576" opacity="0.16"></line><line x1="768" y1="512" x2="832" y2="576" opacity="0.09"></line><line x1="0" y1="576" x2="64" y2="640" opacity="1.00"></line><line x1="64" y1="576" x2="128" y2="640" opacity="0.92"></line><line x1="192" y1="576" x2="128" y2="640" opacity="0.85"></line><line x1="192" y1="576" x2="256" y2="640" opacity="0.77"></line><line x1="320" y1="576" x2="256" y2="640" opacity="0.70"></line><line x1="320" y1="576" x2="384" y2="640" opacity="0.62"></line><line x1="384" y1="576" x2="448" y2="640" opacity="0.54"></line><line x1="512" y1="576" x2="448" y2="640" opacity="0.47"></line><line x1="576" y1="576" x2="512" y2="640" opacity="0.39"></line><line x1="640" y1="576" x2="576" y2="640" opacity="0.32"></line><line x1="640" y1="576" x2="704" y2="640" opacity="0.24"></line><line x1="704" y1="576" x2="768" y2="640" opacity="0.16"></line><line x1="768" y1="576" x2="832" y2="640" opacity="0.09"></line><line x1="64" y1="640" x2="0" y2="704" opacity="1.00"></line><line x1="64" y1="640" x2="128" y2="704" opacity="0.92"></line><line x1="192" y1="640" x2="128" y2="704" opacity="0.85"></line><line x1="256" y1="640" x2="192" y2="704" opacity="0.77"></line><line x1="320" y1="640" x2="256" y2="704" opacity="0.70"></line><line x1="384" y1="640" x2="320" y2="704" opacity="0.62"></line><line x1="448" y1="640" x2="384" y2="704" opacity="0.54"></line><line x1="512" y1="640" x2="448" y2="704" opacity="0.47"></line><line x1="512" y1="640" x2="576" y2="704" opacity="0.39"></line><line x1="640" y1="640" x2="576" y2="704" opacity="0.32"></line><line x1="640" y1="640" x2="704" y2="704" opacity="0.24"></line><line x1="704" y1="640" x2="768" y2="704" opacity="0.16"></line><line x1="768" y1="640" x2="832" y2="704" opacity="0.09"></line><line x1="0" y1="704" x2="64" y2="768" opacity="1.00"></line><line x1="128" y1="704" x2="64" y2="768" opacity="0.92"></line><line x1="192" y1="704" x2="128" y2="768" opacity="0.85"></line><line x1="192" y1="704" x2="256" y2="768" opacity="0.77"></line><line x1="320" y1="704" x2="256" y2="768" opacity="0.70"></line><line x1="384" y1="704" x2="320" y2="768" opacity="0.62"></line><line x1="384" y1="704" x2="448" y2="768" opacity="0.54"></line><line x1="448" y1="704" x2="512" y2="768" opacity="0.47"></line><line x1="512" y1="704" x2="576" y2="768" opacity="0.39"></line><line x1="640" y1="704" x2="576" y2="768" opacity="0.32"></line><line x1="704" y1="704" x2="640" y2="768" opacity="0.24"></line><line x1="704" y1="704" x2="768" y2="768" opacity="0.16"></line><line x1="832" y1="704" x2="768" y2="768" opacity="0.09"></line><line x1="64" y1="768" x2="0" y2="832" opacity="1.00"></line><line x1="64" y1="768" x2="128" y2="832" opacity="0.92"></line><line x1="128" y1="768" x2="192" y2="832" opacity="0.85"></line><line x1="256" y1="768" x2="192" y2="832" opacity="0.77"></line><line x1="256" y1="768" x2="320" y2="832" opacity="0.70"></line><line x1="384" y1="768" x2="320" y2="832" opacity="0.62"></line><line x1="448" y1="768" x2="384" y2="832" opacity="0.54"></line><line x1="448" y1="768" x2="512" y2="832" opacity="0.47"></line><line x1="576" y1="768" x2="512" y2="832" opacity="0.39"></line><line x1="576" y1="768" x2="640" y2="832" opacity="0.32"></line><line x1="640" y1="768" x2="704" y2="832" opacity="0.24"></line><line x1="704" y1="768" x2="768" y2="832" opacity="0.16"></line><line x1="768" y1="768" x2="832" y2="832" opacity="0.09"></line></g></svg>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/contact/background/CardBackground.astro", void 0);

const $$Astro$5 = createAstro();
const $$ContactCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ContactCard;
  return renderTemplate`${maybeRenderHead()}<div class="contact-card relative shadow-xl select-none hover:shadow-2xl hover:scale-[1.03] transition-[box-shadow,transform] duration-200 cursor-pointer overflow-hidden outline outline-[--border-color] max-w-[370px] w-full rounded-md p-5"> <a class="opacity-100 hover:opacity-100 w-fit transition-none" href="mailto:correo@gabriel.dev"> <div class="absolute z-[-1] h-full w-full bottom-0 left-0"> ${renderComponent($$result, "CardBackground", $$CardBackground, {})} </div> <div class="flex flex-col gap-3 mb-10 w-full items-center"> <div class="h-3 shadow-inner rounded-full outline outline-[--border-color] w-[40%] bg-[--bg-color]"></div> <div class="h-[200px] w-full flex justify-start items-center"> ${renderComponent($$result, "Image", $$Image, { "src": avatar, "alt": "Gabriel Garc\xEDa", "width": 150, "class": "rounded-full shadow-inner outline outline-[--border-color] bg-[--bg-color]" })} </div> <div class="flex flex-col dark:bg-[--bg-color-light] outline outline-[--border-color] shadow-[inset_0_-2px_2px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-[--bg-color-dark] w-full p-4 rounded-md dark:text-[--primary-color-light] text-[--primary-color-dark]"> <div class="flex gap-2 items-center"> <h2 class="font-bold text-xl">Gabriel García</h2> <span class="font-thin text-sm">(he/him)</span> </div> <span class="flex flex-col"> <span class="font-medium">Software <span class="text-[--color-violet-one]">Developer</span></span> <div class="flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"></path> </svg> <span>contact@gabriel.dev</span> </div> </span> </div> </div> </a> </div>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/contact/ContactCard.astro", void 0);

const $$Astro$4 = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead()}<div id="contact" data-astro-cid-pbekeiqa></div> <article class="py-24 w-full" data-astro-cid-pbekeiqa> <div class="w-full" data-astro-cid-pbekeiqa> <!--  Title  --> <div class="text-center py-10" data-astro-cid-pbekeiqa> ${renderComponent($$result, "Title", $$Title, { "data-astro-cid-pbekeiqa": true }, { "default": ($$result2) => renderTemplate`${t("CONTACT.TITLE")}` })} </div> <div class="contact-content flex justify-between items-center w-full" data-astro-cid-pbekeiqa> <div class="flex-1 card p-5 flex justify-start" data-astro-cid-pbekeiqa> ${renderComponent($$result, "ContactCard", $$ContactCard, { "data-astro-cid-pbekeiqa": true })} </div> <div class="flex-1 links w-full flex justify-center gap-10" data-astro-cid-pbekeiqa> <div class="separator max-w-fit" data-astro-cid-pbekeiqa></div> <ul class="card-rrss max-w-fit gap-3 flex flex-col text-[73px] justify-center items-start text-left" data-astro-cid-pbekeiqa> <li data-astro-cid-pbekeiqa> <a href="https://www.linkedin.com/in/gabriel-gp/" data-astro-cid-pbekeiqa> <svg xmlns="http://www.w3.org/2000/svg" class="w-[--font-size-rrss] h-[--font-size-rrss]" viewBox="0 0 24 24" data-astro-cid-pbekeiqa> <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" data-astro-cid-pbekeiqa></path> </svg> <span data-astro-cid-pbekeiqa>LinkedIn</span> </a> </li> <li data-astro-cid-pbekeiqa> <a href="https://github.com/ShxwZ" data-astro-cid-pbekeiqa> <svg xmlns="http://www.w3.org/2000/svg" class="w-[--font-size-rrss] h-[--font-size-rrss]" viewBox="0 0 24 24" data-astro-cid-pbekeiqa><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4.44c-.32-.07-.33-.68-.33-.89l.01-2.47c0-.84-.29-1.39-.61-1.67c2.01-.22 4.11-.97 4.11-4.44c0-.98-.35-1.79-.92-2.42c.09-.22.4-1.14-.09-2.38c0 0-.76-.23-2.48.93c-.72-.2-1.48-.3-2.25-.31c-.76.01-1.54.11-2.25.31c-1.72-1.16-2.48-.93-2.48-.93c-.49 1.24-.18 2.16-.09 2.38c-.57.63-.92 1.44-.92 2.42c0 3.47 2.1 4.22 4.1 4.47c-.26.2-.49.6-.57 1.18c-.52.23-1.82.63-2.62-.75c0 0-.48-.86-1.38-.93c0 0-.88 0-.06.55c0 0 .59.28 1 1.32c0 0 .52 1.75 3.03 1.21l.01 1.53c0 .21-.02.82-.34.89H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor" data-astro-cid-pbekeiqa></path> </svg> <span data-astro-cid-pbekeiqa>GitHub</span> </a> </li> </ul> </div> </div> </div> </article> `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/contact/Contact.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="w-full text-center text-[--primary-color] py-2"> <p class="font-light opacity-75 align-middle"> ${t("FOOTER.NAME")} - <a href="https://github.com/ShxwZ/portfolio-astro" target="_blank" rel="noopener noreferrer">${t("FOOTER.CREATED_WITH")}</a> </p> </footer>`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/footer/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$App = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$App;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("TITLE_SEO"), "description": t("DESCRIPTION_SEO") }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="flex flex-col gap-10"> ${renderComponent($$result2, "Home", $$Home, {})} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "AboutMe", $$AboutMe, {})} ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Experience", $$Experience, {})} ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Projects", $$Projects, {})} ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Contact", $$Contact, {})} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })} `;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/components/App.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  changeLanguage("en");
  return renderTemplate`${renderComponent($$result, "App", $$App, {})}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/pages/en/index.astro", void 0);

const $$file$1 = "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/pages/en/index.astro";
const $$url$1 = "/en";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  changeLanguage("es");
  return renderTemplate`${renderComponent($$result, "App", $$App, {})}`;
}, "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Shaw/Documents/Projects/portfolio-astro/portfolio/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
