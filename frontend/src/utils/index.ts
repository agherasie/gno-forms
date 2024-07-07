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
