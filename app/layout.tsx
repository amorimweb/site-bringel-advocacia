import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bringel Advocacia · Advocacia Previdenciária em Parauapebas',
  description: 'Duas advogadas especialistas em Direito Previdenciário em Parauapebas/PA: aposentadoria, benefícios por incapacidade, revisões e planejamento.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
