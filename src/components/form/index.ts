import {
  $$,
  $$input,
  $input,
  bindInputs,
  disable,
  enable,
  hide,
  show,
} from "../../lib/dom";

export default {
  init: () => {
    bindInputs(
      $input("[name='annual-gross-salary']"),
      $input("[name='annual-gross-salary-range']")
    );

    Array.from($$input("[name='children']")).forEach((child) =>
      child.addEventListener("input", () => updateBabiesInput(child))
    );
  },
};

export function getFormInputs() {
  const annualGrossSalary = Number(
    $input("[name='annual-gross-salary']").value
  );
  const annualPaymentsNumber = Number(
    $input("[name='annual-payments-number']:checked").value
  ) as 12 | 14;
  const childrenNumber = Number(
    $input("[name='children']:checked").value
  ) as number;
  const babiesNumber = Number(
    $input("[name='babies']:checked").value
  ) as number;

  return {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
  };
}

export function updateBabiesInput(child: HTMLInputElement) {
  const childrenNumber = Number(child.value);

  const showBabiesWrapper = childrenNumber > 0;
  Array.from($$("[data-type='babies']")).forEach((babiesWrapper) =>
    (showBabiesWrapper ? show : hide)(babiesWrapper)
  );

  Array.from($$("[data-index][data-type='baby']")).forEach((babyLabel) => {
    const babyNumber = Number(babyLabel.dataset.index);
    const showBabyLabel = childrenNumber >= babyNumber;
    (showBabyLabel ? show : hide)(babyLabel);
  });

  Array.from($$input("[data-index][name='babies']")).forEach((babyInput) => {
    const babyNumber = Number(babyInput.dataset.index);
    const enableBabyInput = childrenNumber >= babyNumber;
    (enableBabyInput ? enable : disable)(babyInput);

    const isBabyOverflow = babyInput.checked && babyNumber > childrenNumber;
    if (isBabyOverflow) {
      $input(`[data-index='${child.value}'][name='babies']`).checked = true;
    }
  });
}