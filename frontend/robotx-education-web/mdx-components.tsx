import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className = "", ...props }) => (
      <h1 className={`lesson-heading lesson-heading-1 ${className}`.trim()} {...props} />
    ),
    h2: ({ className = "", ...props }) => (
      <h2 className={`lesson-heading lesson-heading-2 ${className}`.trim()} {...props} />
    ),
    h3: ({ className = "", ...props }) => (
      <h3 className={`lesson-heading lesson-heading-3 ${className}`.trim()} {...props} />
    ),
    h4: ({ className = "", ...props }) => (
      <h4 className={`lesson-heading lesson-heading-4 ${className}`.trim()} {...props} />
    ),
    p: ({ className = "", ...props }) => (
      <p className={`lesson-copy ${className}`.trim()} {...props} />
    ),
    ul: ({ className = "", ...props }) => (
      <ul className={`lesson-list ${className}`.trim()} {...props} />
    ),
    ol: ({ className = "", ...props }) => (
      <ol className={`lesson-list lesson-list-ordered ${className}`.trim()} {...props} />
    ),
    li: ({ className = "", ...props }) => (
      <li className={`lesson-list-item ${className}`.trim()} {...props} />
    ),
    blockquote: ({ className = "", ...props }) => (
      <blockquote className={`lesson-callout ${className}`.trim()} {...props} />
    ),
    a: ({ className = "", ...props }) => (
      <a className={`lesson-link ${className}`.trim()} {...props} />
    ),
    img: ({ className = "", alt = "", ...props }) => (
      <img alt={alt} className={`lesson-media-frame ${className}`.trim()} {...props} />
    ),
    video: ({ className = "", ...props }) => (
      <video className={`lesson-media-frame ${className}`.trim()} controls {...props} />
    ),
    iframe: ({ className = "", ...props }) => (
      <iframe className={`lesson-embed-frame ${className}`.trim()} {...props} />
    ),
    pre: ({ className = "", ...props }) => (
      <pre className={`lesson-code-block ${className}`.trim()} {...props} />
    ),
    code: ({ className = "", ...props }) =>
      className ? (
        <code className={className} {...props} />
      ) : (
        <code className="lesson-inline-code" {...props} />
      ),
    table: ({ className = "", ...props }) => (
      <div className="lesson-table-wrap">
        <table className={`lesson-table ${className}`.trim()} {...props} />
      </div>
    ),
    ...components,
  };
}
