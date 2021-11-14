import { Props } from "./index";

export function validate({
  babiesNumber,
  childrenNumber,
  annualPaymentsNumber,
}: Partial<Props>) {
  if (childrenNumber! < 0) {
    throw Error("Invalid children number: " + childrenNumber);
  }

  if (babiesNumber! < 0 || babiesNumber! > childrenNumber!) {
    throw Error("Invalid babies number: " + babiesNumber);
  }

  if (![12, 14].includes(annualPaymentsNumber!)) {
    throw Error("Invalid annual payments number: " + annualPaymentsNumber);
  }
}
