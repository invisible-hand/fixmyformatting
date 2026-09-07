/**
 * Deliberately narrow: only a plain decimal integer or fraction becomes a real
 * numeric cell. Leading zeros (`007`), a leading `+`, thousands separators,
 * currency symbols, percent signs, exponents and padded values all stay text,
 * because in every one of those cases the exact string the user typed is the
 * information. Shared by the .xlsx writer and the preview grid so what the
 * preview right-aligns is exactly what Excel will treat as a number.
 */
const numericExpression = /^-?(0|[1-9]\d*)(\.\d+)?$/;

export const isNumericCell = (cell: string) => numericExpression.test(cell) && Number.isFinite(Number(cell));
