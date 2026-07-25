import type { LocaleBundle } from "@/lib/i18n/types";
import { ui } from "./ui";
import { tools } from "./tools/core";
import { brand } from "./tools/brand";
import { guideChrome, pages, workspace } from "./chrome";
import { stats } from "./stats";
import { figures } from "./figures";
import { guides } from "./guides";

export const bundle: LocaleBundle = { code: "pt", ui, pages, workspace, guideChrome, stats, figures, tools, brand, guides };
