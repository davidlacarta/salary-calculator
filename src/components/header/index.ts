import { $, $input } from "../../lib/dom";

type Theme = "dark" | "light";

export default {
  init: () => {
    initPreferenceTheme();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", changeThemeWithPrefersColorScheme);

    $input("[name='theme']").addEventListener("change", changeThemeWithToggle);
  },
};

function initPreferenceTheme() {
  const localTheme = getLocalTheme();
  if (localTheme) {
    checkThemeInput(localTheme);
    setTheme(localTheme);
    return;
  }

  const prefersTheme = getPrefersColorScheme();
  checkThemeInput(prefersTheme);
  setTheme(prefersTheme);
}

function getLocalTheme() {
  return <Theme | null>window.localStorage.getItem("theme");
}

function getPrefersColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function changeThemeWithToggle(event: Event) {
  const theme = (event.target as HTMLInputElement).checked ? "light" : "dark";
  setTheme(theme);
  window.localStorage.setItem("theme", theme);
}

function changeThemeWithPrefersColorScheme(event: MediaQueryListEvent) {
  const localTheme = getLocalTheme();
  if (localTheme) {
    return;
  }

  const themeColorScheme = event.matches ? "dark" : "light";
  checkThemeInput(themeColorScheme);
  setTheme(themeColorScheme);
}

function setTheme(theme: Theme) {
  $("html").dataset.theme = theme === "light" ? "cupcake" : "synthwave";
}

function checkThemeInput(theme: Theme) {
  $input("[name='theme']").checked = theme === "light";
}
