import type { LocaleBundle } from "@/lib/i18n/types";
import { ui } from "./ui";
import { tools } from "./tools/core";
import { brand } from "./tools/brand";
import { guideChrome, pages, workspace } from "./chrome";

export const bundle: LocaleBundle = { code: "zh", ui, pages, workspace, guideChrome, tools, brand };
