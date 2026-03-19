import type { ComponentType } from "react";
import OpenClawConnectTelegramEn from "@/content/courses/ai/foundation/openclaw/connect-telegram/en.mdx";
import OpenClawConnectTelegramZh from "@/content/courses/ai/foundation/openclaw/connect-telegram/zh.mdx";
import OpenClawStarterStudioEn from "@/content/courses/ai/foundation/openclaw/starter-studio/en.mdx";
import OpenClawStarterStudioZh from "@/content/courses/ai/foundation/openclaw/starter-studio/zh.mdx";
import OriginmanOverviewEn from "@/content/courses/robot/humanoid/originman/overview/en.mdx";
import OriginmanOverviewZh from "@/content/courses/robot/humanoid/originman/overview/zh.mdx";
import OriginmanQuickStartEn from "@/content/courses/robot/humanoid/originman/quick-start/en.mdx";
import OriginmanQuickStartZh from "@/content/courses/robot/humanoid/originman/quick-start/zh.mdx";
import OriginmanUserGuideEn from "@/content/courses/robot/humanoid/originman/user-guide/en.mdx";
import OriginmanUserGuideZh from "@/content/courses/robot/humanoid/originman/user-guide/zh.mdx";

type LessonModule = ComponentType;

export const lessonContentRegistry: Record<
  string,
  {
    en: LessonModule;
    zh?: LessonModule;
  }
> = {
  "originman-home": {
    en: OriginmanOverviewEn,
    zh: OriginmanOverviewZh,
  },
  "originman-quick-start": {
    en: OriginmanQuickStartEn,
    zh: OriginmanQuickStartZh,
  },
  "originman-user-guide": {
    en: OriginmanUserGuideEn,
    zh: OriginmanUserGuideZh,
  },
  "openclaw-starter-studio": {
    en: OpenClawStarterStudioEn,
    zh: OpenClawStarterStudioZh,
  },
  "openclaw-connect-telegram": {
    en: OpenClawConnectTelegramEn,
    zh: OpenClawConnectTelegramZh,
  },
};
