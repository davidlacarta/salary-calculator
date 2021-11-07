import grossToNetSalary, { Result } from "./lib/grossToNetSalary";
import {
  $,
  $input,
  $$,
  $$input,
  hide,
  show,
  enable,
  disable,
  bindInputs,
} from "./lib/dom";
import formatNumber from "./lib/formatNumber";

window.addEventListener("input", update);

bindInputs(
  $input("[name='annual-gross-salary']"),
  $input("[name='annual-gross-salary-range']")
);

Array.from($$input("[name='children']")).forEach((child) =>
  child.addEventListener("input", () => updateBabies(child))
);

function update() {
  const {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
  } = getFormInputs();

  console.log({ childrenNumber, babiesNumber });

  const {
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  } = grossToNetSalary({
    annualGrossSalary,
    annualPaymentsNumber,
  });

  updateResult({
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  });
}

function getFormInputs() {
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

function updateResult({
  monthlyNetSalary,
  annualNetSalary,
  annualWithholding,
  annualFee,
  monthlyNetSalaryExtra,
}: Result) {
  $("#monthly-net-salary")!.textContent = formatNumber(monthlyNetSalary);
  $("#monthly-net-salary-extra")!.textContent = monthlyNetSalaryExtra
    ? formatNumber(monthlyNetSalaryExtra)
    : "";
  $("#monthly-net-salary-extra-divider")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("#monthly-net-salary-extra-wrapper")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("#annual-net-salary")!.textContent = formatNumber(annualNetSalary);
  $("#annual-withholding")!.textContent = formatNumber(annualWithholding);
  $("#monthly-withholding")!.textContent = formatNumber(annualWithholding / 12);
  $("#annual-fee")!.textContent = formatNumber(annualFee);
  $("#monthly-fee")!.textContent = formatNumber(annualFee / 12);
}

function updateBabies(child: HTMLInputElement) {
  const childrenNumber = Number(child.value);

  const showBabies = childrenNumber > 0;
  Array.from($$("[data-type='babies']")).forEach((babiesWrapper) => {
    if (showBabies) {
      show(babiesWrapper);
    } else {
      hide(babiesWrapper);
    }
  });

  Array.from($$("[data-index][data-type='baby']")).forEach((babyLabel) => {
    const babyNumber = Number(babyLabel.dataset.index);
    if (childrenNumber >= babyNumber) {
      show(babyLabel);
    } else {
      hide(babyLabel);
    }
  });

  Array.from($$input("[data-index][name='babies']")).forEach((babyInput) => {
    const babyNumber = Number(babyInput.dataset.index);
    if (childrenNumber >= babyNumber) {
      enable(babyInput);
    } else {
      disable(babyInput);
    }

    const isBabyOverflow = babyInput.checked && babyNumber > childrenNumber;
    if (isBabyOverflow) {
      $input(`[data-index='${child.value}'][name='babies']`).checked = true;
    }
  });
}
