import type { LocaleBundle } from "@/lib/i18n/types";
import { ui } from "./ui";
import { tools } from "./tools/core";
import { brand } from "./tools/brand";
import { guideChrome, pages, workspace } from "./chrome";
import { stats } from "./stats";

export const bundle: LocaleBundle = { code: "ja", ui, pages, workspace, guideChrome, stats, tools, brand };
