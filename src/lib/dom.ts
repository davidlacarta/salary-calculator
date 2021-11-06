export const $ = (element: string) => document.getElementById(element);

export const $i = (element: string) => $(element) as HTMLInputElement;

export const $c = (className: string) =>
  document.querySelectorAll(
    `[class~="${className}"]`
  ) as NodeListOf<HTMLElement>;

export const $dk = (key: string) =>
  document.querySelectorAll(`[data-${key}]`) as NodeListOf<HTMLElement>;

export const $idkv = (key: string, value: string) =>
  document.querySelector(`input[data-${key}="${value}"]`) as HTMLInputElement;

export const $in = (name: string) =>
  document.querySelectorAll(
    `input[name="${name}"]`
  ) as NodeListOf<HTMLInputElement>;

export const $inc = (name: string) =>
  document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;

export function bindInputs(origin: HTMLInputElement, target: HTMLInputElement) {
  syncValueOnInput(origin, target);
  syncValueOnInput(target, origin);
}

function syncValueOnInput(origin: HTMLInputElement, target: HTMLInputElement) {
  origin.addEventListener("input", () => {
    target.value = origin.value;
  });
}
