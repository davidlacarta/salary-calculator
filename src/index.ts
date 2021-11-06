import grossToNetSalary, { Result } from "./lib/grossToNetSalary";
import { $, $i, $c, $dk, $idkv, $in, $inc, bindInputs } from "./lib/dom";
import formatNumber from "./lib/formatNumber";

window.addEventListener("input", update);

bindInputs($i("annual-gross-salary"), $i("annual-gross-salary-range"));

Array.from($in("children")).forEach((child) =>
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
  const annualGrossSalary = Number($i("annual-gross-salary").value);
  const annualPaymentsNumber = Number($inc("annual-payments-number").value) as
    | 12
    | 14;
  const childrenNumber = Number($inc("children").value) as number;
  const babiesNumber = Number($inc("babies").value) as number;

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
  $("monthly-net-salary")!.textContent = formatNumber(monthlyNetSalary);
  $("monthly-net-salary-extra")!.textContent = monthlyNetSalaryExtra
    ? formatNumber(monthlyNetSalaryExtra)
    : "";
  $("monthly-net-salary-extra-divider")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("monthly-net-salary-extra-wrapper")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("annual-net-salary")!.textContent = formatNumber(annualNetSalary);
  $i("annual-withholding")!.textContent = formatNumber(annualWithholding);
  $i("monthly-withholding")!.textContent = formatNumber(annualWithholding / 12);
  $i("annual-fee")!.textContent = formatNumber(annualFee);
  $i("monthly-fee")!.textContent = formatNumber(annualFee / 12);
}

function updateBabies(child: HTMLInputElement) {
  const childrenNumber = Number(child.value);
  const showBabies = childrenNumber > 0;

  Array.from($c("babies")).forEach((baby) => {
    if (showBabies) {
      baby.classList.remove("hidden");
    } else {
      baby.classList.add("hidden");
    }
  });

  Array.from($dk("index")).forEach((baby) => {
    const babyNumber = Number(baby.dataset.index);
    if (childrenNumber >= babyNumber) {
      baby.classList.remove("hidden");
      baby.removeAttribute("disabled");
    } else {
      baby.classList.add("hidden");
      baby.setAttribute("disabled", "true");
    }

    const isBabyOverflow =
      (baby as HTMLInputElement).checked && babyNumber > childrenNumber;
    if (isBabyOverflow) {
      $idkv("index", child.value).checked = true;
    }
  });
}
