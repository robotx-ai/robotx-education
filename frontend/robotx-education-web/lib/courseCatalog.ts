export type Locale = "en" | "zh";

export type LocaleText = {
  en: string;
  zh: string;
};

export type LessonAccess = "open" | "edu" | "paid";

export type LessonRecord = {
  id: string;
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  access: LessonAccess;
  duration: LocaleText;
};

export type CourseRecord = {
  id: string;
  category: string;
  subcategory: string;
  slug: string;
  title: LocaleText;
  tagline: LocaleText;
  description: LocaleText;
  heroMedia: {
    type: "image" | "video";
    src: string;
    poster?: string;
  };
  heroEyebrow: LocaleText;
  lessons: LessonRecord[];
};

export type CategoryRecord = {
  slug: string;
  title: LocaleText;
  description: LocaleText;
  accentClassName: string;
};

export type SubcategoryRecord = {
  category: string;
  slug: string;
  title: LocaleText;
  description: LocaleText;
};

export const courseCategories: CategoryRecord[] = [
  {
    slug: "robot",
    title: { en: "Robotics", zh: "机器人" },
    description: {
      en: "Build intuition for hardware, control, and embodied AI through real robot systems.",
      zh: "通过真实机器人系统建立硬件、控制与具身智能的直觉。",
    },
    accentClassName: "course-category-robot",
  },
  {
    slug: "ai",
    title: { en: "Artificial Intelligence", zh: "人工智能" },
    description: {
      en: "Learn practical AI workflows, creative tooling, and model-driven productivity.",
      zh: "学习实用 AI 工作流、创作工具和模型驱动的生产力方法。",
    },
    accentClassName: "course-category-ai",
  },
];

export const courseSubcategories: SubcategoryRecord[] = [
  {
    category: "robot",
    slug: "humanoid",
    title: { en: "Humanoid Robots", zh: "人形机器人" },
    description: {
      en: "Lessons focused on humanoid setup, motion systems, and interactive behaviors.",
      zh: "聚焦人形机器人搭建、运动系统与交互行为的课程。",
    },
  },
  {
    category: "ai",
    slug: "foundation",
    title: { en: "AI Foundations", zh: "AI 基础应用" },
    description: {
      en: "Foundational AI tutorials for students, educators, and nonprofit teams.",
      zh: "面向学生、教育工作者和非营利团队的 AI 课程。",
    },
  },
];

export const courseCatalog: CourseRecord[] = [
  {
    id: "originman",
    category: "robot",
    subcategory: "humanoid",
    slug: "originman",
    title: { en: "OriginMan", zh: "OriginMan" },
    tagline: {
      en: "Humanoid setup, ROS2 workflows, and hands-on experimentation.",
      zh: "人形机器人搭建、ROS2 工作流与实操实验。",
    },
    description: {
      en: "OriginMan is a future-oriented intelligent desktop humanoid robot and the first fully open-source ROS2 desktop humanoid robot project, aimed at letting every participant enjoy the fun of robot development.",
      zh: "OriginMan是一款面向未来的智能桌面人形机器人，同时也是首个全开源的ROS2桌面人形机器人开源项目，旨在让每一位参与者享受机器人开发的乐趣。",
    },
    heroMedia: {
      type: "image",
      src: "/assets/courses/originman/originman-1.png",
    },
    heroEyebrow: { en: "Robot Course", zh: "机器人课程" },
    lessons: [
      {
        id: "originman-home",
        slug: "overview",
        title: { en: "OriginMan Overview", zh: "OriginMan 概览" },
        summary: {
          en: "Explore the open-source philosophy, intelligent platform stack, and full hardware specification of OriginMan.",
          zh: "了解 OriginMan 的开源理念、智能平台架构与完整硬件规格。",
        },
        access: "open",
        duration: { en: "15 min", zh: "15 分钟" },
      },
      {
        id: "originman-quick-start",
        slug: "quick_start",
        title: { en: "Quick Start", zh: "快速开始" },
        summary: {
          en: "Boot, connect, and run your first hands-on OriginMan example.",
          zh: "完成开机、远程连接并运行第一个 OriginMan 实操示例。",
        },
        access: "edu",
        duration: { en: "18 min", zh: "18 分钟" },
      },
      {
        id: "originman-user-guide",
        slug: "user_guide",
        title: { en: "User Guide", zh: "用户指南" },
        summary: {
          en: "Understand network setup, startup status, and guided follow-up practice.",
          zh: "理解网络连接、启动状态与后续练习方法。",
        },
        access: "edu",
        duration: { en: "14 min", zh: "14 分钟" },
      },
    ],
  },
  {
    id: "openclaw",
    category: "ai",
    subcategory: "foundation",
    slug: "openclaw",
    title: { en: "OpenClaw", zh: "OpenClaw" },
    tagline: {
      en: "AI tooling, structured prompting, and productivity workflows for real teams.",
      zh: "面向真实团队的 AI 工具、结构化提示词与效率工作流。",
    },
    description: {
      en: "OpenClaw teaches practical AI usage through visible workflows, examples, and guided production patterns.",
      zh: "OpenClaw 通过可见的工作流、示例与引导式生产模式教授实用 AI 应用。",
    },
    heroMedia: {
      type: "video",
      src: "/assets/home/agibot-x2-20s.mp4",
      poster: "/assets/home/openclaw-learn.webp",
    },
    heroEyebrow: { en: "AI Course", zh: "AI 课程" },
    lessons: [
      {
        id: "openclaw-starter-studio",
        slug: "starter-studio",
        title: { en: "Starter Guide", zh: "部署指南" },
        summary: {
          en: "A public introduction to the OpenClaw workflow and the tools behind it.",
          zh: "公开介绍 OpenClaw 工作流及其背后的工具组合。",
        },
        access: "open",
        duration: { en: "10 min", zh: "10 分钟" },
      },
      {
        id: "openclaw-connect-telegram",
        slug: "connect-telegram",
        title: { en: "Connect Telegram", zh: "连接Telegram" },
        summary: {
          en: "A verified-education lesson on reusable prompting systems and project workflow design.",
          zh: "面向认证教育用户的提示词系统与项目工作流设计课程。",
        },
        access: "edu",
        duration: { en: "16 min", zh: "16 分钟" },
      },
    ],
  },
];

export function getCategory(slug: string) {
  return courseCategories.find((item) => item.slug === slug) ?? null;
}

export function getSubcategory(category: string, slug: string) {
  return (
    courseSubcategories.find(
      (item) => item.category === category && item.slug === slug,
    ) ?? null
  );
}

export function getCourse(category: string, subcategory: string, course: string) {
  return (
    courseCatalog.find(
      (item) =>
        item.category === category &&
        item.subcategory === subcategory &&
        item.slug === course,
    ) ?? null
  );
}

export function getCourseLesson(
  category: string,
  subcategory: string,
  course: string,
  lesson: string,
) {
  const courseRecord = getCourse(category, subcategory, course);
  if (!courseRecord) return null;
  return courseRecord.lessons.find((item) => item.slug === lesson) ?? null;
}

export function pickLocaleText(text: LocaleText, locale: Locale) {
  return text[locale];
}

export function getCourseBasePath(course: CourseRecord) {
  return `/courses/${course.category}/${course.subcategory}/${course.slug}`;
}

export function getLessonHref(course: CourseRecord, lesson: LessonRecord) {
  const basePath = getCourseBasePath(course);
  return lesson.slug === "home" ? basePath : `${basePath}/${lesson.slug}`;
}
