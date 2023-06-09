# Markdown AST to React Node

This package provides a utility for converting Markdown AST nodes to React nodes. It exports two components: `MarkdownRenderer` and `MarkdownASTRenderer`, as well as a set of types.

## Installation

````sh
npm install @md-parser/react

```sh
yarn add @md-parser/react
````

## Usage

### Define components

See the components defined in the [examples](examples/next/src/components/Renderers.tsx ':include :type=code typescript')

```tsx
import { MarkdownRenderer } from '@md-parser/react';
import { components } from './components';

export const Markdown = ({ markdown }: { markdown: string }) => (
  <MarkdownRenderer components={components}>{markdown}</MarkdownRenderer>;
)
```
