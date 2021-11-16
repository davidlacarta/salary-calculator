import { calculateBabiesBonus } from "./calculateBabiesBonus";
import { calculateChildrenBonus } from "./calculateChildrenBonus";
import { calculateDisabilityBonus } from "./calculateDisabilityBonus";
import { calculateTaxableBase } from "./calculateTaxableBase";
import { FRACTION_DIGITS } from "./index";

export interface Props {
  taxBase: number;
  childrenNumber: number;
  babiesNumber: number;
  disabilityPercentage: number;
}

export function calculateWithholdingFee({
  taxBase,
  childrenNumber,
  babiesNumber,
  disabilityPercentage,
}: Props) {
  const baseBonus = 5550;
  const childrenBonus = calculateChildrenBonus(childrenNumber) / 2;
  const babiesBonus = calculateBabiesBonus(babiesNumber) / 2;
  const disabilityBonus = calculateDisabilityBonus(disabilityPercentage);
  const bonus = baseBonus + childrenBonus + babiesBonus + disabilityBonus;
  const withholdingFee = Number(
    (calculateTaxableBase(taxBase) - calculateTaxableBase(bonus)).toFixed(
      FRACTION_DIGITS
    )
  );

  if (withholdingFee < 0) {
    return 0;
  }

  return Number(withholdingFee.toFixed(FRACTION_DIGITS));
}
