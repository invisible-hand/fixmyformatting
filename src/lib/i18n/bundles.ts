import { localeCodes } from "./locales";
import type { LocaleCode } from "./locales";
import type { LocaleBundle, UiMessages } from "./types";
import { bundle as es } from "@/content/i18n/es";
import { bundle as pt } from "@/content/i18n/pt";
import { bundle as de } from "@/content/i18n/de";
import { bundle as fr } from "@/content/i18n/fr";
import { bundle as it } from "@/content/i18n/it";
import { bundle as ja } from "@/content/i18n/ja";
import { bundle as ko } from "@/content/i18n/ko";
import { bundle as zh } from "@/content/i18n/zh";
import { bundle as hi } from "@/content/i18n/hi";
import { bundle as ar } from "@/content/i18n/ar";

export const bundles: Record<LocaleCode, LocaleBundle> = { es, pt, de, fr, it, ja, ko, zh, hi, ar };

/** Chrome strings by locale. Stage 1 replaces direct use with uiFor(locale). */
export const messages = Object.fromEntries(
  localeCodes.map((locale) => [locale, bundles[locale].ui]),
) as Record<LocaleCode, UiMessages>;
