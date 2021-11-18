import { calculateBabiesBonus } from "./calculateBabiesBonus";
import { calculateChildrenBonus } from "./calculateChildrenBonus";
import { calculateDisabilityBonus } from "./calculateDisabilityBonus";
import { calculateTaxableAmount } from "./calculateTaxableAmount";

export interface Props {
  taxBase: number;
  childrenNumber: number;
  babiesNumber: number;
  disabilityPercentage: number;
}

const BASE_BONUS = 5550;

export function calculateWithholdingFee({
  taxBase,
  childrenNumber,
  babiesNumber,
  disabilityPercentage,
}: Props) {
  const bonus = calculateBonus({
    childrenNumber,
    babiesNumber,
    disabilityPercentage,
  });

  const withholdingFee =
    calculateTaxableAmount(taxBase) - calculateTaxableAmount(bonus);

  return withholdingFee < 0 ? 0 : withholdingFee;
}

function calculateBonus({
  childrenNumber,
  babiesNumber,
  disabilityPercentage,
}: Pick<Props, "childrenNumber" | "babiesNumber" | "disabilityPercentage">) {
  const childrenBonus = calculateChildrenBonus(childrenNumber) / 2;
  const babiesBonus = calculateBabiesBonus(babiesNumber) / 2;
  const disabilityBonus = calculateDisabilityBonus(disabilityPercentage);

  return BASE_BONUS + childrenBonus + babiesBonus + disabilityBonus;
}
