import type { LocaleBundle } from "@/lib/i18n/types";
import { ui } from "./ui";
import { tools } from "./tools/core";
import { brand } from "./tools/brand";

export const bundle: LocaleBundle = { code: "ko", ui, tools, brand };
