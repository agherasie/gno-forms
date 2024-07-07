import { FieldData, FieldType } from "../type";

export const buildDataJson = (fields: FieldData[]) =>
  JSON.stringify(
    fields.map(
      (field): { label: string; required: boolean; fieldType: string } => {
        if (
          field.fieldType === FieldType.CHOICE ||
          field.fieldType === FieldType.MULTI_CHOICE
        ) {
          const openBracket = field.fieldType === FieldType.CHOICE ? "[" : "{";
          const closeBracket = field.fieldType === FieldType.CHOICE ? "]" : "}";
          return {
            fieldType: `${openBracket}${
              field.options?.join("|") ?? ""
            }${closeBracket}`,
            label: field.label,
            required: field.required,
          };
        }
        return {
          fieldType: field.fieldType,
          label: field.label,
          required: field.required,
        };
      }
    )
  );

export const parseDataJson = (data: string) =>
  JSON.parse(data.slice(2, -'" string)'.length).replaceAll("\\", ""));

export function selectColor(number: number, saturation = 50, lightness = 75) {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

export const translateFieldType = (fieldType: string): FieldType => {
  if (fieldType.startsWith("[") && fieldType.endsWith("]"))
    return FieldType.CHOICE;
  if (fieldType.startsWith("{") && fieldType.endsWith("}"))
    return FieldType.MULTI_CHOICE;
  return fieldType as FieldType;
};

export const parseChoices = (fieldType: string) =>
  fieldType.slice(1, -1).split("|");
