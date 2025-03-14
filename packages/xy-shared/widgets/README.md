# xy-ui/components/widgets

Widgets represent larger building blocks of content like a blog post preview or
interactive code editor. In general, you should prefer defining widgets inside
the projects that use them, but occasionally we need a widget to be available
across multiple sites.

It's common for widgets to be complex enough to warrant multiple files, so we
define each widget its own directory that corresponds to the kebab-cased name
of the widget. For example, a widget named `BlogPostPreview` would be defined
in a directory named `blog-post-preview`.
