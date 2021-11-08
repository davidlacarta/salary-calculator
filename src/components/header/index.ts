import { $, $input } from "../../lib/dom";

export default {
  init: () => {
    initPreferenceTheme();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event: any) => {
        const localTheme = window.localStorage.getItem("theme");
        if (!localTheme) {
          const prefersTheme = event.matches ? "dark" : "light";
          checkThemeInput(prefersTheme);
          setTheme(prefersTheme);
        }
      });

    $input("[name='theme']").addEventListener("change", (event: any) => {
      const theme = event.target.checked ? "light" : "dark";
      setTheme(theme);
      window.localStorage.setItem("theme", theme);
    });
  },
};

function initPreferenceTheme() {
  const localTheme = window.localStorage.getItem("theme") as
    | "light"
    | "dark"
    | null;
  if (localTheme) {
    checkThemeInput(localTheme);
    setTheme(localTheme);
    return;
  }

  const prefersThemeDark = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersTheme = prefersThemeDark.matches ? "dark" : "light";
  checkThemeInput(prefersTheme);
  setTheme(prefersTheme);
}

function setTheme(theme: "dark" | "light") {
  $("html").dataset.theme = theme === "light" ? "cupcake" : "synthwave";
}

function checkThemeInput(theme: "dark" | "light") {
  $input("[name='theme']").checked = theme === "light";
}
