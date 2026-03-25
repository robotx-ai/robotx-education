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
  duration: LocaleText;
  supportedLocales?: Locale[];
  pdfAssetPath?: string;
};

export type CourseRecord = {
  id: string;
  slug: string;
  title: LocaleText;
  summary: LocaleText;
  access: LessonAccess;
  duration: LocaleText;
  lessons: LessonRecord[];
};

export type SubjectRecord = {
  id: string;
  category: string;
  pathSegment: string;
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
  pathLabel: LocaleText;
  pathDescription: LocaleText;
  courses: CourseRecord[];
};

export type CategoryRecord = {
  slug: string;
  title: LocaleText;
  description: LocaleText;
  accentClassName: string;
};

const rosIntroLessonsRaw: LessonRecord[] = [
  {
    id: "ros-intro-lesson-01",
    slug: "lesson-01",
    title: { en: "Lesson 1: Course Introduction", zh: "? 1 ?:????" },
    summary: {
      en: "An overview of the ROS learning path, course expectations, and how the subject is organized.",
      zh: "?? ROS ?????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/1-course-Intro.pdf",
  },
  {
    id: "ros-intro-lesson-02",
    slug: "lesson-02",
    title: { en: "Lesson 2: Install Linux", zh: "? 2 ?:?? Linux" },
    summary: {
      en: "Prepare the operating system foundation required for ROS development and future labs.",
      zh: "?? ROS ????? Linux ????,??????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/2-install-Linux.pdf",
  },
  {
    id: "ros-intro-lesson-03",
    slug: "lesson-03",
    title: { en: "Lesson 3: Linux Basics", zh: "? 3 ?:Linux ??" },
    summary: {
      en: "Review essential shell, filesystem, and command-line concepts for robotics workflows.",
      zh: "?????????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/3-Linux-basic.pdf",
  },
  {
    id: "ros-intro-lesson-04",
    slug: "lesson-04",
    title: { en: "Lesson 4: Programming Basics", zh: "? 4 ?:????" },
    summary: {
      en: "Establish the software development basics needed before writing ROS nodes and packages.",
      zh: "???? ROS ??????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/4-programming-basic.pdf",
  },
  {
    id: "ros-intro-lesson-05",
    slug: "lesson-05",
    title: { en: "Lesson 5: Install ROS", zh: "? 5 ?:?? ROS" },
    summary: {
      en: "Walk through the core ROS installation process and environment preparation steps.",
      zh: "?? ROS ????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/5-install-ROS.pdf",
  },
  {
    id: "ros-intro-lesson-06",
    slug: "lesson-06",
    title: { en: "Lesson 6: ROS Introduction", zh: "? 6 ?:ROS ??" },
    summary: {
      en: "Introduce the motivation, ecosystem, and role of ROS in modern robotics development.",
      zh: "?? ROS ??????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/6-ROS-intro.pdf",
  },
  {
    id: "ros-intro-lesson-07",
    slug: "lesson-07",
    title: { en: "Lesson 7: ROS Core Concepts", zh: "? 7 ?:ROS ????" },
    summary: {
      en: "Cover the core abstractions that make ROS-based systems modular and collaborative.",
      zh: "???? ROS ????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/7-ROS-core-concept.pdf",
  },
  {
    id: "ros-intro-lesson-08",
    slug: "lesson-08",
    title: { en: "Lesson 8: ROS Commands", zh: "? 8 ?:ROS ????" },
    summary: {
      en: "Learn the practical command-line tools used to inspect, run, and debug ROS systems.",
      zh: "???????????? ROS ???????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/8-ROS-command.pdf",
  },
  {
    id: "ros-intro-lesson-09",
    slug: "lesson-09",
    title: { en: "Lesson 9: Create Workspace", zh: "? 9 ?:??????" },
    summary: {
      en: "Build the first ROS workspace and understand how packages are organized for development.",
      zh: "????? ROS ????,????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/9-create-workspace.pdf",
  },
  {
    id: "ros-intro-lesson-10",
    slug: "lesson-10",
    title: { en: "Lesson 10: Program Publisher", zh: "? 10 ?:?? Publisher" },
    summary: {
      en: "Implement a publishing node and understand how ROS topics transmit data streams.",
      zh: "????????,??? ROS ??????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/10-program-publisher.pdf",
  },
  {
    id: "ros-intro-lesson-11",
    slug: "lesson-11",
    title: { en: "Lesson 11: Program Subscriber", zh: "? 11 ?:?? Subscriber" },
    summary: {
      en: "Pair a subscriber with a publisher and observe how topic-driven communication works.",
      zh: "??????????????,????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/11-program-subscriber.pdf",
  },
  {
    id: "ros-intro-lesson-12",
    slug: "lesson-12",
    title: { en: "Lesson 12: ROS Messages", zh: "? 12 ?:ROS ??" },
    summary: {
      en: "Study standard and custom ROS message structures used for node communication.",
      zh: "?? ROS ????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/12-ROS-message.pdf",
  },
  {
    id: "ros-intro-lesson-13",
    slug: "lesson-13",
    title: { en: "Lesson 13: Program Client", zh: "? 13 ?:?? Client" },
    summary: {
      en: "Introduce the client side of request-response interactions in ROS services.",
      zh: "?? ROS ??????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/13-program-client.pdf",
  },
  {
    id: "ros-intro-lesson-14",
    slug: "lesson-14",
    title: { en: "Lesson 14: Program Server", zh: "? 14 ?:?? Server" },
    summary: {
      en: "Build the server side of ROS service communication and manage request handling.",
      zh: "?? ROS ?????,??????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/14-program-server.pdf",
  },
  {
    id: "ros-intro-lesson-15",
    slug: "lesson-15",
    title: { en: "Lesson 15: ROS Service Data", zh: "? 15 ?:ROS ????" },
    summary: {
      en: "Understand the service data model and how request-response payloads are defined.",
      zh: "?? ROS ?????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/15-ros-service-data.pdf",
  },
  {
    id: "ros-intro-lesson-16",
    slug: "lesson-16",
    title: { en: "Lesson 16: ROS Parameter Server", zh: "? 16 ?:ROS ?????" },
    summary: {
      en: "Learn how to configure runtime behavior through ROS parameters and shared values.",
      zh: "???? ROS ????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/16-ros-parameter-server.pdf",
  },
  {
    id: "ros-intro-lesson-17",
    slug: "lesson-17",
    title: { en: "Lesson 17: Coordinate System Management", zh: "? 17 ?:??????" },
    summary: {
      en: "Understand how coordinate frames are organized and maintained in robotics systems.",
      zh: "???????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/17-coordinate-system-management.pdf",
  },
  {
    id: "ros-intro-lesson-18",
    slug: "lesson-18",
    title: { en: "Lesson 18: TF Coordinate System", zh: "? 18 ?:TF ????" },
    summary: {
      en: "Study TF transforms and how spatial relationships are propagated across a robot model.",
      zh: "?? TF ????????????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/18-tf-coordinate-system.pdf",
  },
  {
    id: "ros-intro-lesson-19",
    slug: "lesson-19",
    title: { en: "Lesson 19: ROS Launch", zh: "? 19 ?:ROS Launch" },
    summary: {
      en: "Coordinate multi-node execution and startup configuration using ROS launch tools.",
      zh: "???? ROS ???????????????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/19-ros-launch.pdf",
  },
  {
    id: "ros-intro-lesson-20",
    slug: "lesson-20",
    title: { en: "Lesson 20: ROS Visual Tools", zh: "? 20 ?:ROS ?????" },
    summary: {
      en: "Explore the visual tooling used to inspect graph structure, data flow, and robot state.",
      zh: "????????????????????? ROS ??????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/20-ROS-visual-tools.pdf",
  },
  {
    id: "ros-intro-lesson-21",
    slug: "lesson-21",
    title: { en: "Lesson 21: Course Summary", zh: "? 21 ?:????" },
    summary: {
      en: "Wrap up the core ROS concepts covered across the course and prepare for further study.",
      zh: "????????? ROS ????,??????????",
    },
    duration: { en: "Slides", zh: "??" },
    supportedLocales: ["en"],
    pdfAssetPath: "robot/ROS/intro21/21-course-summary.pdf",
  },
];

const rosLessonZhTitles = [
  "第1课：课程介绍",
  "第2课：安装 Linux",
  "第3课：Linux 基础",
  "第4课：编程基础",
  "第5课：安装 ROS",
  "第6课：ROS 介绍",
  "第7课：ROS 核心概念",
  "第8课：ROS 常用命令",
  "第9课：创建工作空间",
  "第10课：编写 Publisher",
  "第11课：编写 Subscriber",
  "第12课：ROS 消息",
  "第13课：编写 Client",
  "第14课：编写 Server",
  "第15课：ROS 服务数据",
  "第16课：ROS 参数服务器",
  "第17课：坐标系统管理",
  "第18课：TF 坐标系统",
  "第19课：ROS Launch",
  "第20课：ROS 可视化工具",
  "第21课：课程总结",
] as const;

const rosIntroLessons: LessonRecord[] = rosIntroLessonsRaw.map((lesson, index) => ({
  ...lesson,
  title: {
    en: lesson.title.en,
    zh: rosLessonZhTitles[index] ?? `第${index + 1}课`,
  },
  summary: {
    en: lesson.summary.en,
    zh: "本课时内容请参考配套 PDF 课件。",
  },
  duration: {
    en: lesson.duration.en,
    zh: "课件",
  },
  supportedLocales: ["zh"],
}));

export const courseCategories: CategoryRecord[] = [
  {
    slug: "robot",
    title: { en: "Robotics", zh: "\u673a\u5668\u4eba" },
    description: {
      en: "Build intuition for hardware, control, and embodied AI through real robot systems.",
      zh: "\u901a\u8fc7\u771f\u5b9e\u673a\u5668\u4eba\u7cfb\u7edf\u5b66\u4e60\u786c\u4ef6\u3001\u63a7\u5236\u4e0e\u5177\u8eab\u667a\u80fd\u3002",
    },
    accentClassName: "course-category-robot",
  },
  {
    slug: "ai",
    title: { en: "Artificial Intelligence", zh: "\u4eba\u5de5\u667a\u80fd" },
    description: {
      en: "Learn practical AI workflows, creative tooling, and model-driven productivity.",
      zh: "\u5b66\u4e60\u5b9e\u7528 AI \u5de5\u4f5c\u6d41\u3001\u5de5\u5177\u96c6\u6210\u4e0e\u751f\u4ea7\u529b\u65b9\u6cd5\u3002",
    },
    accentClassName: "course-category-ai",
  },
];

export const subjectCatalog: SubjectRecord[] = [
  {
    id: "originman",
    category: "robot",
    pathSegment: "humanoid",
    slug: "originman",
    title: { en: "OriginMan", zh: "OriginMan" },
    tagline: {
      en: "An open humanoid robot subject built around ROS2, embodied intelligence, and hands-on development.",
      zh: "\u56f4\u7ed5 ROS2\u3001\u5177\u8eab\u667a\u80fd\u4e0e\u52a8\u624b\u5f00\u53d1\u7684\u4eba\u5f62\u673a\u5668\u4eba\u4e3b\u9898\u8bfe\u7a0b\u3002",
    },
    description: {
      en: "OriginMan is a future-oriented desktop humanoid robot project. Learners move from system understanding to setup practice and guided operation through a structured sequence of courses.",
      zh: "OriginMan \u662f\u4e00\u4e2a\u9762\u5411\u672a\u6765\u7684\u684c\u9762\u4eba\u5f62\u673a\u5668\u4eba\u9879\u76ee\uff0c\u5b66\u4e60\u8005\u5c06\u4ece\u7cfb\u7edf\u8ba4\u77e5\u8d70\u5411\u914d\u7f6e\u5b9e\u8df5\u4e0e\u64cd\u4f5c\u5e94\u7528\u3002",
    },
    heroMedia: {
      type: "image",
      src: "/assets/courses/originman/originman-1.png",
    },
    heroEyebrow: { en: "Robot Subject", zh: "\u673a\u5668\u4eba\u4e3b\u9898" },
    pathLabel: { en: "Humanoid Robots", zh: "\u4eba\u5f62\u673a\u5668\u4eba" },
    pathDescription: {
      en: "Courses focused on humanoid setup, motion systems, and interactive behaviors.",
      zh: "\u805a\u7126\u4eba\u5f62\u673a\u5668\u4eba\u642d\u5efa\u3001\u8fd0\u52a8\u7cfb\u7edf\u4e0e\u4ea4\u4e92\u884c\u4e3a\u7684\u8bfe\u7a0b\u4f53\u7cfb\u3002",
    },
    courses: [
      {
        id: "originman-overview-course",
        slug: "overview",
        title: { en: "Overview", zh: "\u6982\u89c8" },
        summary: {
          en: "Start with the project philosophy, intelligent platform architecture, and the complete OriginMan hardware profile.",
          zh: "\u4ece\u9879\u76ee\u7406\u5ff5\u3001\u667a\u80fd\u5e73\u53f0\u67b6\u6784\u4e0e\u786c\u4ef6\u80fd\u529b\u5f00\u59cb\u5efa\u7acb\u6574\u4f53\u8ba4\u77e5\u3002",
        },
        access: "open",
        duration: { en: "15 min", zh: "15 \u5206\u949f" },
        lessons: [
          {
            id: "originman-home",
            slug: "lesson-1",
            title: { en: "OriginMan Overview", zh: "OriginMan \u6982\u89c8" },
            summary: {
              en: "Explore the open-source philosophy, intelligent platform stack, and full hardware specification of OriginMan.",
              zh: "\u4e86\u89e3 OriginMan \u7684\u5f00\u6e90\u7406\u5ff5\u3001\u667a\u80fd\u5e73\u53f0\u67b6\u6784\u4e0e\u5b8c\u6574\u786c\u4ef6\u89c4\u683c\u3002",
            },
            duration: { en: "15 min", zh: "15 \u5206\u949f" },
          },
        ],
      },
      {
        id: "originman-quick-start-course",
        slug: "quick-start",
        title: { en: "Quick Start", zh: "\u5feb\u901f\u5f00\u59cb" },
        summary: {
          en: "Boot, connect, and run the first guided OriginMan workflow.",
          zh: "\u5b8c\u6210\u5f00\u673a\u3001\u8fde\u63a5\u4e0e\u7b2c\u4e00\u6761 OriginMan \u53d7\u5f15\u5bfc\u7684\u5de5\u4f5c\u6d41\u3002",
        },
        access: "edu",
        duration: { en: "18 min", zh: "18 \u5206\u949f" },
        lessons: [
          {
            id: "originman-quick-start",
            slug: "lesson-1",
            title: { en: "Quick Start Walkthrough", zh: "\u5feb\u901f\u5f00\u59cb\u5b9e\u64cd" },
            summary: {
              en: "Learn the first connection, startup confirmation, and basic motion demo with OriginMan.",
              zh: "\u5b66\u4e60 OriginMan \u7684\u9996\u6b21\u8fde\u63a5\u3001\u542f\u52a8\u786e\u8ba4\u4e0e\u57fa\u7840\u52a8\u4f5c\u6f14\u793a\u3002",
            },
            duration: { en: "18 min", zh: "18 \u5206\u949f" },
          },
        ],
      },
      {
        id: "originman-user-guide-course",
        slug: "user-guide",
        title: { en: "User Guide", zh: "\u7528\u6237\u6307\u5357" },
        summary: {
          en: "Understand startup behavior, networking, and follow-up practice after the first deployment.",
          zh: "\u7406\u89e3\u542f\u52a8\u72b6\u6001\u3001\u7f51\u7edc\u8fde\u63a5\u4e0e\u540e\u7eed\u7ec3\u4e60\u65b9\u6cd5\u3002",
        },
        access: "edu",
        duration: { en: "14 min", zh: "14 \u5206\u949f" },
        lessons: [
          {
            id: "originman-user-guide",
            slug: "lesson-1",
            title: { en: "User Guide Walkthrough", zh: "\u7528\u6237\u6307\u5357\u8bb2\u89e3" },
            summary: {
              en: "Review startup behavior, network access, and how to continue with the guided examples.",
              zh: "\u56de\u987e\u5f00\u673a\u72b6\u6001\u3001\u7f51\u7edc\u63a5\u5165\u65b9\u5f0f\uff0c\u4ee5\u53ca\u5982\u4f55\u7ee7\u7eed\u4f7f\u7528\u914d\u5957\u793a\u4f8b\u3002",
            },
            duration: { en: "14 min", zh: "14 \u5206\u949f" },
          },
        ],
      },
    ],
  },
  {
    id: "ros",
    category: "robot",
    pathSegment: "ros",
    slug: "robot-operating-system",
    title: { en: "Robot Operating System (ROS)", zh: "\u673a\u5668\u4eba\u64cd\u4f5c\u7cfb\u7edf\uff08ROS\uff09" },
    tagline: {
      en: "A structured ROS subject that starts with environment preparation and grows into core communication, services, TF, launch, and visualization.",
      zh: "\u4ece\u73af\u5883\u51c6\u5907\u51fa\u53d1\uff0c\u9010\u6b65\u8fdb\u5165 ROS \u901a\u4fe1\u3001\u670d\u52a1\u3001TF\u3001Launch \u4e0e\u53ef\u89c6\u5316\u7684\u7cfb\u7edf\u5316\u4e3b\u9898\u8bfe\u7a0b\u3002",
    },
    description: {
      en: "Introduction to ROS is an education-access course built from 21 lesson slide decks. Learners progress from Linux and installation fundamentals to ROS topics, services, parameters, transforms, and launch workflows.",
      zh: "Introduction to ROS \u662f\u4e00\u95e8\u9762\u5411\u6559\u80b2\u8ba4\u8bc1\u7528\u6237\u7684\u8bfe\u7a0b\uff0c\u7531 21 \u4e2a\u8bfe\u65f6\u8bfe\u4ef6\u7ec4\u6210\u3002\u5b66\u4e60\u8005\u5c06\u4ece Linux \u4e0e\u5b89\u88c5\u57fa\u7840\uff0c\u9010\u6b65\u5b66\u5230 ROS \u8bdd\u9898\u3001\u670d\u52a1\u3001\u53c2\u6570\u3001\u5750\u6807\u53d8\u6362\u4e0e\u542f\u52a8\u6d41\u7a0b\u3002",
    },
    heroMedia: {
      type: "image",
      src: "/assets/courses/ros/ros-title.png",
    },
    heroEyebrow: { en: "Robot Subject", zh: "\u673a\u5668\u4eba\u4e3b\u9898" },
    pathLabel: { en: "ROS Foundations", zh: "ROS \u57fa\u7840" },
    pathDescription: {
      en: "Curriculum focused on foundational ROS concepts, command-line fluency, and robotics software architecture.",
      zh: "\u805a\u7126 ROS \u57fa\u7840\u6982\u5ff5\u3001\u547d\u4ee4\u884c\u5de5\u4f5c\u6d41\u4e0e\u673a\u5668\u4eba\u8f6f\u4ef6\u67b6\u6784\u7684\u8bfe\u7a0b\u4f53\u7cfb\u3002",
    },
    courses: [
      {
        id: "ros-introduction-course",
        slug: "introduction-to-ros",
        title: { en: "Introduction to ROS", zh: "ROS \u5165\u95e8" },
        summary: {
          en: "A 21-lesson education-access course that presents the foundations of ROS through slide-based instruction.",
          zh: "\u901a\u8fc7 21 \u4e2a\u8bfe\u65f6\u7684\u8bfe\u4ef6\u5f62\u5f0f\uff0c\u7cfb\u7edf\u5b66\u4e60 ROS \u7684\u57fa\u7840\u77e5\u8bc6\u4e0e\u5f00\u53d1\u903b\u8f91\u3002",
        },
        access: "edu",
        duration: { en: "21 lessons", zh: "21 \u4e2a\u8bfe\u65f6" },
        lessons: rosIntroLessons,
      },
    ],
  },
  {
    id: "openclaw",
    category: "ai",
    pathSegment: "foundation",
    slug: "openclaw",
    title: { en: "OpenClaw", zh: "OpenClaw" },
    tagline: {
      en: "A practical AI subject focused on visible workflows, integration, and deployment-ready habits.",
      zh: "\u805a\u7126\u53ef\u89c6\u5316\u5de5\u4f5c\u6d41\u3001\u5de5\u5177\u96c6\u6210\u4e0e\u90e8\u7f72\u4e60\u60ef\u7684\u5b9e\u7528 AI \u4e3b\u9898\u8bfe\u7a0b\u3002",
    },
    description: {
      en: "OpenClaw helps learners move from foundational setup to real workflow connections, using structured tutorials that make AI systems easier to understand and reproduce.",
      zh: "OpenClaw \u901a\u8fc7\u7ed3\u6784\u5316\u6559\u7a0b\u5e2e\u52a9\u5b66\u4e60\u8005\u4ece\u57fa\u7840\u90e8\u7f72\u8d70\u5411\u771f\u5b9e\u5de5\u4f5c\u6d41\u8fde\u63a5\u3002",
    },
    heroMedia: {
      type: "video",
      src: "/assets/home/agibot-x2-20s.mp4",
      poster: "/assets/home/openclaw-learn.webp",
    },
    heroEyebrow: { en: "AI Subject", zh: "AI \u4e3b\u9898" },
    pathLabel: { en: "AI Foundations", zh: "AI \u57fa\u7840\u5e94\u7528" },
    pathDescription: {
      en: "Foundational AI tutorials for students, educators, and nonprofit teams.",
      zh: "\u9762\u5411\u5b66\u751f\u3001\u6559\u80b2\u5de5\u4f5c\u8005\u4e0e\u975e\u8425\u5229\u56e2\u961f\u7684 AI \u5165\u95e8\u4e0e\u5e94\u7528\u8bfe\u7a0b\u3002",
    },
    courses: [
      {
        id: "openclaw-starter-studio-course",
        slug: "starter-studio",
        title: { en: "Starter Studio", zh: "\u90e8\u7f72\u6307\u5357" },
        summary: {
          en: "Set up OpenClaw and understand the deployment workflow, key hooks, and project structure.",
          zh: "\u5b8c\u6210 OpenClaw \u90e8\u7f72\uff0c\u5e76\u7406\u89e3\u5de5\u4f5c\u6d41\u3001\u5173\u952e\u94a9\u5b50\u4e0e\u9879\u76ee\u7ed3\u6784\u3002",
        },
        access: "open",
        duration: { en: "10 min", zh: "10 \u5206\u949f" },
        lessons: [
          {
            id: "openclaw-starter-studio",
            slug: "lesson-1",
            title: { en: "Deployment Lesson", zh: "\u90e8\u7f72\u8bfe\u7a0b" },
            summary: {
              en: "A complete setup-focused lesson that walks through OpenClaw deployment fundamentals.",
              zh: "\u56f4\u7ed5 OpenClaw \u90e8\u7f72\u57fa\u7840\u5c55\u5f00\u7684\u5b8c\u6574\u5165\u95e8\u8bfe\u7a0b\u3002",
            },
            duration: { en: "10 min", zh: "10 \u5206\u949f" },
          },
        ],
      },
      {
        id: "openclaw-connect-telegram-course",
        slug: "connect-telegram",
        title: { en: "Connect Telegram", zh: "\u8fde\u63a5 Telegram" },
        summary: {
          en: "Connect OpenClaw to Telegram and build a messaging-based interaction workflow.",
          zh: "\u5c06 OpenClaw \u8fde\u63a5\u5230 Telegram\uff0c\u5e76\u6784\u5efa\u57fa\u4e8e\u6d88\u606f\u7684\u4ea4\u4e92\u5de5\u4f5c\u6d41\u3002",
        },
        access: "edu",
        duration: { en: "16 min", zh: "16 \u5206\u949f" },
        lessons: [
          {
            id: "openclaw-connect-telegram",
            slug: "lesson-1",
            title: { en: "Telegram Integration Lesson", zh: "Telegram \u96c6\u6210\u8bfe\u7a0b" },
            summary: {
              en: "Configure Telegram integration, environment values, and validation steps for OpenClaw.",
              zh: "\u914d\u7f6e Telegram \u96c6\u6210\u3001\u73af\u5883\u53d8\u91cf\u4e0e OpenClaw \u9a8c\u8bc1\u6b65\u9aa4\u3002",
            },
            duration: { en: "16 min", zh: "16 \u5206\u949f" },
          },
        ],
      },
    ],
  },
];

export function getCategory(slug: string) {
  return courseCategories.find((item) => item.slug === slug) ?? null;
}

export function getSubjectsByCategory(category: string) {
  return subjectCatalog.filter((item) => item.category === category);
}

export function getSubject(category: string, pathSegment: string, subject: string) {
  return (
    subjectCatalog.find(
      (item) =>
        item.category === category &&
        item.pathSegment === pathSegment &&
        item.slug === subject,
    ) ?? null
  );
}

export function getSubjectCourse(
  category: string,
  pathSegment: string,
  subject: string,
  course: string,
) {
  const subjectRecord = getSubject(category, pathSegment, subject);
  if (!subjectRecord) return null;
  return subjectRecord.courses.find((item) => item.slug === course) ?? null;
}

export function getCourseLesson(
  category: string,
  pathSegment: string,
  subject: string,
  course: string,
  lesson: string,
) {
  const courseRecord = getSubjectCourse(category, pathSegment, subject, course);
  if (!courseRecord) return null;
  return courseRecord.lessons.find((item) => item.slug === lesson) ?? null;
}

export function getPrimaryLesson(course: CourseRecord) {
  return course.lessons[0] ?? null;
}

export function getLessonSupportedLocales(lesson: LessonRecord): Locale[] {
  return lesson.supportedLocales && lesson.supportedLocales.length > 0
    ? lesson.supportedLocales
    : ["en", "zh"];
}

export function pickLocaleText(text: LocaleText, locale: Locale) {
  return text[locale];
}

export function getSubjectBasePath(subject: SubjectRecord) {
  return `/courses/${subject.category}/${subject.pathSegment}/${subject.slug}`;
}

export function getCoursePath(subject: SubjectRecord, course: CourseRecord) {
  return `${getSubjectBasePath(subject)}/${course.slug}`;
}

export function getCourseLessonPath(
  subject: SubjectRecord,
  course: CourseRecord,
  lesson: LessonRecord,
) {
  const coursePath = getCoursePath(subject, course);
  if (course.lessons.length === 1 && course.lessons[0]?.id === lesson.id) {
    return coursePath;
  }
  return `${coursePath}/${lesson.slug}`;
}

export function getLessonPdfUrl(lesson: LessonRecord) {
  if (!lesson.pdfAssetPath) return null;
  return `/lesson-assets/${lesson.pdfAssetPath}`;
}
