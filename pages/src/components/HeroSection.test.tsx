// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 alibaba/open-code-review Contributors
// Copyright 2026 korean llm model kbs Contributors

import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../i18n';
import HeroSection, { SOURCE_URL } from './HeroSection';
import { edition } from '../i18n/edition';

function renderHero() {
  render(<MemoryRouter><LanguageProvider><HeroSection /></LanguageProvider></MemoryRouter>);
}

describe('Korean edition homepage', () => {
  beforeEach(() => localStorage.clear());

  it('starts in Korean, identifies the fork, and describes the model requirement', () => {
    renderHero();
    expect(document.documentElement.lang).toBe('ko');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(edition.ko['hero.title'].replace('\n', ''));
    expect(screen.getByText(edition.ko['edition.notice'])).toBeTruthy();
    expect(screen.getByRole('link', { name: /GitHub/ }).getAttribute('href')).toBe(SOURCE_URL);
    expect(screen.getByText(/go build -o ocr.exe/)).toBeTruthy();
  });

  it('switches build commands using keyboard-accessible platform buttons', async () => {
    const user = userEvent.setup();
    renderHero();
    const unix = screen.getByRole('button', { name: 'macOS / Linux' });
    unix.focus();
    await user.keyboard('{Enter}');
    expect(unix.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/go build -o ocr \.\/cmd\/opencodereview/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Windows' }));
    expect(screen.getByText(/go build -o ocr.exe/)).toBeTruthy();
  });

  it('respects an explicitly saved English preference', () => {
    localStorage.setItem('kbs-lang', 'en');
    renderHero();
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByText(edition.en['edition.notice'])).toBeTruthy();
  });
});
