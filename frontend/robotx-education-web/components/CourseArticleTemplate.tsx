"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-");
}

type CourseArticleTemplateProps = {
  children: React.ReactNode;
  tocTitle: string;
  pagesTitle: string;
  pagesButtonLabel: string;
  pages: Array<{
    label: string;
    href: string;
  }>;
};

export default function CourseArticleTemplate({
  children,
  tocTitle,
  pagesTitle,
  pagesButtonLabel,
  pages,
}: CourseArticleTemplateProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const headingElements = Array.from(root.querySelectorAll("h1, h2, h3, h4"));
    const idCount = new Map<string, number>();

    const items = headingElements.map((heading) => {
      const level = Number.parseInt(heading.tagName.replace("H", ""), 10);
      const text = heading.textContent?.trim() || "";

      let id = heading.id;
      if (!id) {
        const base = slugify(text) || "section";
        const used = idCount.get(base) || 0;
        idCount.set(base, used + 1);
        id = used === 0 ? base : `${base}-${used}`;
        heading.id = id;
      }

      return { id, text, level };
    });

    setTocItems(items);
  }, [children]);

  const tocContent = useMemo(
    () => (
      <nav>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{tocTitle}</h2>
        <ul className="space-y-2 text-sm">
          {tocItems.map((item) => (
            <li key={item.id} className={item.level >= 3 ? "ml-3" : ""}>
              <a
                href={`#${item.id}`}
                className="text-gray-700 hover:text-black"
                onClick={() => setMobilePagesOpen(false)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    ),
    [tocItems, tocTitle],
  );

  return (
    <div className="course-template-shell">
      <aside className="course-template-sidebar course-template-sidebar-left">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{pagesTitle}</h2>
        <ul className="space-y-2 text-sm">
          {pages.map((page) => {
            const current = pathname === page.href;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className={`block rounded px-2 py-1 ${
                    current ? "bg-black text-white" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {page.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <article ref={contentRef} className="course-article">
        {children}
      </article>

      <aside className="course-template-sidebar course-template-sidebar-right">
        {tocContent}
      </aside>

      <button
        type="button"
        aria-label={pagesButtonLabel}
        className="course-template-mobile-trigger"
        onClick={() => setMobilePagesOpen((prev) => !prev)}
      >
        <span aria-hidden="true">≡</span>
      </button>

      {mobilePagesOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobilePagesOpen(false)}>
          <div className="course-template-mobile-sheet" onClick={(event) => event.stopPropagation()}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{pagesTitle}</h2>
            <ul className="space-y-2 text-sm">
              {pages.map((page) => {
                const current = pathname === page.href;
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className={`block rounded px-2 py-2 ${
                        current ? "bg-black text-white" : "text-gray-700 hover:text-black"
                      }`}
                      onClick={() => setMobilePagesOpen(false)}
                    >
                      {page.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
