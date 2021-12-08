import { $, $input } from "../../lib/dom";

type Theme = "dark" | "light";

export default {
  init: () => {
    const theme = getLocalTheme() ?? getPrefersColorScheme();

    checkThemeInput(theme);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener(
        "change",
        (event: MediaQueryListEvent) =>
          !getLocalTheme() && changeThemeWithPrefersColorScheme(event)
      );

    $input("[name='theme']").addEventListener("change", changeThemeWithToggle);
  },
};

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
  const themeColorScheme = event.matches ? "dark" : "light";
  checkThemeInput(themeColorScheme);
  setTheme(themeColorScheme);
}

function setTheme(theme: Theme) {
  $("html").dataset.theme = theme === "light" ? "cupcake" : "synthwave";
}

function checkThemeInput(theme: Theme) {
  const toggle = $input("[name='theme']");
  toggle.checked = theme === "light";
  toggle.classList.remove("hidden");
}
