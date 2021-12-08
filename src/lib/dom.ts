export const $ = (query: string) => <HTMLElement>document.querySelector(query);

export const $input = (query: string) => <HTMLInputElement>$(`input${query}`);

export const $$ = (element: string) =>
  <NodeListOf<HTMLElement>>document.querySelectorAll(element);

export const $$input = (query: string) =>
  <NodeListOf<HTMLInputElement>>$$(`input${query}`);

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
