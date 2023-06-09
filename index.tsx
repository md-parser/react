import { parseMarkdown, MarkdownNode, ParserConfig } from '@md-parser/parser';
import { FC, Fragment, ReactNode } from 'react';

export type MapMarkdownNodeToReactNode<T extends MarkdownNode> = {
  [K in T['type']]: ConvertMarkdownNodeToReactProps<Extract<T, { type: K }>>;
};

// Convert MarkdownNode to ReactNode
export type ConvertMarkdownNodeToReactProps<T extends MarkdownNode> = {
  [K in Exclude<keyof T, 'type'>]: T[K] extends MarkdownNode | MarkdownNode[] ? ReactNode : T[K];
};

export type MarkdownComponents = {
  blockquote: FC<MapMarkdownNodeToReactNode<MarkdownNode>['blockquote']>;
  checkbox: FC<MapMarkdownNodeToReactNode<MarkdownNode>['checkbox']>;
  code: FC<MapMarkdownNodeToReactNode<MarkdownNode>['code']>;
  divider: FC<MapMarkdownNodeToReactNode<MarkdownNode>['divider']>;
  emphasis: FC<MapMarkdownNodeToReactNode<MarkdownNode>['emphasis']>;
  heading: FC<MapMarkdownNodeToReactNode<MarkdownNode>['heading']>;
  image: FC<MapMarkdownNodeToReactNode<MarkdownNode>['image']>;
  inlineCode: FC<MapMarkdownNodeToReactNode<MarkdownNode>['inlineCode']>;
  link: FC<MapMarkdownNodeToReactNode<MarkdownNode>['link']>;
  list: FC<MapMarkdownNodeToReactNode<MarkdownNode>['list']>;
  listItem: FC<MapMarkdownNodeToReactNode<MarkdownNode>['listItem']>;
  paragraph: FC<MapMarkdownNodeToReactNode<MarkdownNode>['paragraph']>;
  strikeThrough: FC<MapMarkdownNodeToReactNode<MarkdownNode>['strikeThrough']>;
  strong: FC<MapMarkdownNodeToReactNode<MarkdownNode>['strong']>;
  subscript: FC<MapMarkdownNodeToReactNode<MarkdownNode>['subscript']>;
  superscript: FC<MapMarkdownNodeToReactNode<MarkdownNode>['superscript']>;
  table: FC<MapMarkdownNodeToReactNode<MarkdownNode>['table']>;
  tableData: FC<MapMarkdownNodeToReactNode<MarkdownNode>['tableData']>;
  tableHeader: FC<MapMarkdownNodeToReactNode<MarkdownNode>['tableHeader']>;
  tableRow: FC<MapMarkdownNodeToReactNode<MarkdownNode>['tableRow']>;
};

export type MarkdownRendererProps = {
  children: string;
  components: Partial<MarkdownComponents>;
  debug?: boolean;
  logger?: (message: string) => void;
} & ParserConfig;

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  components,
  debug,
  logger,
  presets,
}) => {
  const ast = parseMarkdown(children || '', { presets });

  return <MarkdownASTRenderer nodes={ast} components={components} debug={debug} logger={logger} />;
};

export type MarkdownASTRendererProps = {
  components: MarkdownRendererProps['components'];
  nodes: MarkdownNode[];
  // We use this to prevent React from complaining about missing keys
  keyPrefix?: string;
  debug?: boolean;
  logger?: (message: string) => void;
};

const isValidRenderer = (
  components: MarkdownRendererProps['components'],
  nodeType: Omit<MarkdownNode['type'], 'text'>,
): components is Required<MarkdownRendererProps['components']> =>
  components[nodeType as keyof typeof components] !== undefined;

export const MarkdownASTRenderer: FC<MarkdownASTRendererProps> = ({
  nodes,
  components,
  keyPrefix = '',
  debug = false,
  logger,
}) => (
  <>
    {nodes.map((node, index) => {
      const key = `${keyPrefix}.${index}`;

      if (node.type === 'text') {
        return <Fragment key={key}>{node.value}</Fragment>;
      }

      if (node.type === 'lineBreak') {
        return <br key={key} />;
      }

      if (!isValidRenderer(components, node.type)) {
        if (debug) {
          return (
            <span key={key} style={{ color: 'red' }}>
              Pass in a rendered for `{node.type}`
            </span>
          );
        }

        if (logger) {
          logger(`Pass in a rendered for \`${node.type}\``);
        }

        return null;
      }

      switch (node.type) {
        case 'heading': {
          const Component = components[node.type];
          return (
            <Component key={key} level={node.level}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'image': {
          const Component = components[node.type];
          return <Component key={key} src={node.src} alt={node.alt} title={node.title} />;
        }
        case 'link': {
          const Component = components[node.type];
          return (
            <Component key={key} href={node.href} title={node.title}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'inlineCode': {
          const Component = components[node.type];
          return <Component key={key} value={node.value} />;
        }
        case 'code': {
          const Component = components[node.type];
          return <Component key={key} language={node.language} value={node.value} />;
        }
        case 'divider': {
          const Component = components[node.type];
          return <Component key={key} />;
        }
        case 'list': {
          const Component = components[node.type];
          return (
            <Component key={key} ordered={node.ordered} start={node.start}>
              <MarkdownASTRenderer nodes={node.children} components={components} keyPrefix={key} />
            </Component>
          );
        }
        case 'listItem': {
          const Component = components[node.type];
          return (
            <Component key={key}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'table': {
          const Component = components[node.type];
          return (
            <Component
              key={key}
              header={<MarkdownASTRenderer nodes={[node.header]} components={components} />}
              rows={<MarkdownASTRenderer nodes={node.rows} components={components} />}
            />
          );
        }
        case 'tableRow': {
          const Component = components[node.type];
          return (
            <Component key={key}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'tableHeader': {
          const Component = components[node.type];
          return (
            <Component key={key} align={node.align}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'tableData': {
          const Component = components[node.type];
          return (
            <Component key={key} align={node.align}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'checkbox': {
          const Component = components[node.type];
          return (
            <Component key={key} checked={node.checked}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        case 'paragraph':
        case 'strong':
        case 'emphasis':
        case 'strikeThrough':
        case 'subscript':
        case 'superscript':
        case 'blockquote': {
          const Component = components[node.type];
          return (
            <Component key={key}>
              <MarkdownASTRenderer nodes={node.children} components={components} />
            </Component>
          );
        }
        default: {
          return (
            <span key={key} style={{ color: 'red' }}>
              Unsupported node found in MarkdownRenderer. Type: `{(node as MarkdownNode).type}`
            </span>
          );
        }
      }
    })}
  </>
);
