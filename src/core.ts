import Case from "case";

export type LookupTable = string | { [key: string | number]: LookupTable };

export type OutputFormat = "css" | "scss";

export const FormatPrefixMap: Record<OutputFormat, string> = {
  css: "--",
  scss: "$",
};

export function objectToVars(
  theObject: LookupTable,
  format: OutputFormat = "scss",
  prefix: string = "",
  scope: string = ":root"
): string {
  prefix = `${FormatPrefixMap[format]}${prefix}`;

  const lines = _objectToVars(theObject, format, prefix);
  lines.push("");
  const joinedLines = lines.join(";\n");

  switch (format) {
    case "css":
      return `${scope} {
        ${joinedLines}
      }`;
    case "scss":
      return joinedLines;

    default:
      throw new Error(`Invalid format: "${format}"`);
  }
}

export function _objectToVars(
  theObject: LookupTable,
  format: OutputFormat,
  prefix: string
): string[] {
  return Object.entries(theObject).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      return [
        ...acc,
        ..._objectToVars(value, format, `${prefix}-${Case.kebab(key)}`),
      ];
    } else {
      return [...acc, `${prefix}-${Case.kebab(key)}: "${value}"`];
    }
  }, []);
}
