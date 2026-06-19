import { toValue } from "vue";

export function getMedUnitLevel(objTarget, id) {
  return toValue(objTarget).find((unit) => unit.id == id).level;
}
export function getMedUnitName(objTarget, id) {
  console.log("We Have: " + toValue(objTarget));
  return toValue(objTarget)?.find((unit) => unit?.id == id)?.unit;
}
