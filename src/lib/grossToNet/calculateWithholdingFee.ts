import { calculateBabiesBonus } from "./calculateBabiesBonus";
import { calculateChildrenBonus } from "./calculateChildrenBonus";
import { calculateTaxableBase } from "./calculateTaxableBase";
import { FRACTION_DIGITS } from "./index";

export interface Props {
  taxBase: number;
  childrenNumber: number;
  babiesNumber: number;
}

export function calculateWithholdingFee({
  taxBase,
  childrenNumber,
  babiesNumber,
}: Props) {
  const baseBonus = 5550;
  const childrenBonus = calculateChildrenBonus(childrenNumber) / 2;
  const babiesBonus = calculateBabiesBonus(babiesNumber) / 2;
  const bonus = baseBonus + childrenBonus + babiesBonus;
  const withholdingFee =
    calculateTaxableBase(taxBase) - calculateTaxableBase(bonus);

  if (withholdingFee < 0) {
    return 0;
  }

  return Number(withholdingFee.toFixed(FRACTION_DIGITS));
}
