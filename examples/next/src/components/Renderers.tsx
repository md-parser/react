import { Box } from './Box';
import type { MarkdownComponents } from '../../../../';

const headingClasses = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-bold',
  4: 'text-xl font-bold',
  5: 'text-lg font-bold',
  6: 'text-base font-bold',
};

const HeadingRenderer: MarkdownComponents['heading'] = ({ children, level }) => (
  <Box as={`h${level}`} className={headingClasses[level]}>
    {children}
  </Box>
);

const ParagraphRenderer: MarkdownComponents['paragraph'] = ({ children }) => (
  <Box as="p">{children}</Box>
);

const BlockquoteRenderer: MarkdownComponents['blockquote'] = ({ children }) => (
  <Box as="blockquote">{children}</Box>
);

const LinkRenderer: MarkdownComponents['link'] = ({ children, href, title }) => (
  <Box as="a" href={href} title={title}>
    {children}
  </Box>
);

const ListRenderer: MarkdownComponents['list'] = ({ children, ordered, start }) => (
  <Box as={ordered ? 'ol' : 'ul'} start={start} style={{ margin: 0 }}>
    {children}
  </Box>
);

const ListItemRenderer: MarkdownComponents['listItem'] = ({ children }) => <li>{children}</li>;

const ImageRenderer: MarkdownComponents['image'] = ({ alt, src, title }) => (
  <Box loading="lazy" as="img" src={src} alt={alt} title={title} width={700} height={500} />
);

const StrongRenderer: MarkdownComponents['strong'] = ({ children }) => <strong>{children}</strong>;

const ItalicRenderer: MarkdownComponents['emphasis'] = ({ children }) => <em>{children}</em>;

const StrikeThroughRenderer: MarkdownComponents['strikeThrough'] = ({ children }) => (
  <del>{children}</del>
);

const SubscriptRenderer: MarkdownComponents['subscript'] = ({ children }) => <sub>{children}</sub>;

const SuperscriptRenderer: MarkdownComponents['superscript'] = ({ children }) => (
  <sup>{children}</sup>
);

const CodeRenderer: MarkdownComponents['code'] = ({ value }) => <pre>{value}</pre>;

const InlineCodeRenderer: MarkdownComponents['inlineCode'] = ({ value }) => <code>{value}</code>;

const TableRenderer: MarkdownComponents['table'] = ({ header, rows }) => (
  <table className="table-fixed">
    <thead>{header}</thead>
    <tbody>{rows}</tbody>
  </table>
);

const TableRowRenderer: MarkdownComponents['tableRow'] = ({ children }) => <tr>{children}</tr>;

const TableHeaderRenderer: MarkdownComponents['tableHeader'] = ({ children, align }) => (
  <Box as="th" style={{ textAlign: align }}>
    {children}
  </Box>
);

const TableDataRenderer: MarkdownComponents['tableData'] = ({ children, align }) => (
  <Box as="td" style={{ textAlign: align }}>
    {children}
  </Box>
);

const DividerRenderer: MarkdownComponents['divider'] = () => <hr />;

const CheckboxRenderer: MarkdownComponents['checkbox'] = ({ checked, children }) => (
  <label>
    <input type="checkbox" readOnly checked={checked} />
    {children}
  </label>
);

export const components: MarkdownComponents = {
  heading: HeadingRenderer,
  paragraph: ParagraphRenderer,
  divider: DividerRenderer,
  blockquote: BlockquoteRenderer,
  link: LinkRenderer,
  list: ListRenderer,
  listItem: ListItemRenderer,
  image: ImageRenderer,
  strong: StrongRenderer,
  emphasis: ItalicRenderer,
  strikeThrough: StrikeThroughRenderer,
  subscript: SubscriptRenderer,
  superscript: SuperscriptRenderer,
  code: CodeRenderer,
  inlineCode: InlineCodeRenderer,
  table: TableRenderer,
  tableRow: TableRowRenderer,
  tableHeader: TableHeaderRenderer,
  tableData: TableDataRenderer,
  checkbox: CheckboxRenderer,
};
