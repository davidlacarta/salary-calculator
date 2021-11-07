export const $ = (query: string) =>
  document.querySelector(query) as HTMLElement;

export const $input = (query: string) => $(`input${query}`) as HTMLInputElement;

export const $$ = (element: string) =>
  document.querySelectorAll(element) as NodeListOf<HTMLElement>;

export const $$input = (query: string) =>
  $$(`input${query}`) as NodeListOf<HTMLInputElement>;

export const hide = (element: HTMLElement) => element.classList.add("hidden");

export const show = (element: HTMLElement) =>
  element.classList.remove("hidden");

export const disable = (element: HTMLElement) =>
  element.setAttribute("disabled", "true");

export const enable = (element: HTMLElement) =>
  element.removeAttribute("disabled");

export function bindInputs(origin: HTMLInputElement, target: HTMLInputElement) {
  syncValueOnInput(origin, target);
  syncValueOnInput(target, origin);
}

function syncValueOnInput(origin: HTMLInputElement, target: HTMLInputElement) {
  origin.addEventListener("input", () => {
    target.value = origin.value;
  });
}
