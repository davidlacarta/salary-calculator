import {
  $,
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
  init: ({
    minimal = false,
    embed = false,
  }: { minimal?: boolean; embed?: boolean } = {}) => {
    $("form").addEventListener("submit", (event) => event.preventDefault());

    bindInputs(
      $input("[name='annual-gross-salary']"),
      $input("[name='annual-gross-salary-range']")
    );

    if (minimal) {
      return;
    }

    Array.from($$input("[name='children']")).forEach((child) =>
      child.addEventListener("input", () => {
        updateOutput("children");
        updateBabiesFieldset(child, { scrollBabbies: !embed });
      })
    );

    Array.from($$input("[name='babies']")).forEach((baby) =>
      baby.addEventListener("input", () => updateOutput("babies"))
    );
  },
};

function updateOutput(name: string) {
  const checkedInput = $input(`[name='${name}']:checked`);
  const labelCheckedInput = $(`label[for='${checkedInput.id}']>span`);

  const output = $(`[name='${name}-result']`);

  output.textContent = labelCheckedInput?.textContent ?? "";
}

export function getFormInputs({ minimal = false }: { minimal: boolean }) {
  const annualGrossSalary = Number(
    $input("[name='annual-gross-salary']").value
  );
  const annualPaymentsNumber = Number(
    $input("[name='annual-payments-number']:checked").value
  ) as 12 | 14;

  if (minimal) {
    return {
      annualGrossSalary,
      annualPaymentsNumber,
      childrenNumber: 0,
      babiesNumber: 0,
      disabilityPercentage: 0,
    };
  }

  const childrenNumber = Number($input("[name='children']:checked").value);
  const babiesNumber = Number($input("[name='babies']:checked").value);
  const disabilityPercentage = Number(
    $input("[name='disability-percentage']:checked").value
  );

  return {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
    disabilityPercentage,
  };
}

export function updateBabiesFieldset(
  child: HTMLInputElement,
  { scrollBabbies = false }: { scrollBabbies?: boolean } = {}
) {
  const childrenNumber = Number(child.value);

  const showBabies = childrenNumber > 0;
  Array.from($$("[data-type='babies']")).forEach((babiesWrapper) =>
    (showBabies ? show : hide)(babiesWrapper)
  );

  if (showBabies && scrollBabbies) {
    $("#babies").scrollIntoView({ behavior: "smooth" });
  }

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

  updateOutput("babies");
}
