import { Inter } from 'next/font/google';
import { MarkdownRenderer } from '@md-parser/react';
import { components } from '../components/Renderers';
import fs from 'node:fs';
import path from 'node:path';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'markdown.md'), 'utf8');

  return (
    <main className={`container mx-auto px-4 ${inter.className}`}>
      <MarkdownRenderer components={components}>{markdown}</MarkdownRenderer>
    </main>
  );
}
