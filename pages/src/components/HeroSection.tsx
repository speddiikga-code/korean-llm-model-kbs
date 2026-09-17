// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 alibaba/open-code-review Contributors
// Modified for the KBS Korean edition, 2026.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { useCopyToast } from '../hooks/useCopyToast';
import '../styles/edition.css';

export const SOURCE_URL = 'https://github.com/speddiikga-code/korean-llm-model-kbs';
export const SOURCE_COMMAND = `git clone ${SOURCE_URL}.git\ncd korean-llm-model-kbs`;

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState<'windows' | 'unix'>('windows');
  const { toastVisible, handleCopy } = useCopyToast();
  const command = `${SOURCE_COMMAND}\ngo build -o ${platform === 'windows' ? 'ocr.exe' : 'ocr'} ./cmd/opencodereview`;

  return (
    <section className="kbs-hero">
      <div className="kbs-hero-grid">
        <div>
          <div className="kbs-eyebrow"><span />{t('edition.eyebrow')}</div>
          <h1>{t('hero.title').split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</h1>
          <p className="kbs-description">{t('hero.description')}</p>
          <div className="kbs-actions">
            <Link className="kbs-primary" to="/docs/quickstart">{t('hero.quickStart')} <span aria-hidden="true">↗</span></Link>
            <a className="kbs-secondary" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">{t('edition.source')} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="kbs-badges">{['edition.badge1', 'edition.badge2', 'edition.badge3'].map(key => <span key={key}>{t(key)}</span>)}</div>
        </div>
        <div className="kbs-terminal">
          <div className="kbs-terminal-bar"><span className="kbs-dots" aria-hidden="true">● ● ●</span><span>kbs / code review</span><span>ko-KR</span></div>
          <div className="kbs-terminal-body">
            <code><span className="kbs-green">$</span> ocr review</code>
            <div className="kbs-terminal-separator" />
            <div className="kbs-file">src/api/users.ts:42</div>
            <pre><span className="kbs-muted">41 </span> const name = req.query.name;{'\n'}<span className="kbs-muted">42 </span> <span className="kbs-risk">db.query(`SELECT * FROM users{'\n'}    WHERE name = '${'{'}name{'}'}'`);</span></pre>
            <div className="kbs-review">
              <span className="kbs-severity">P1 · SQL Injection</span>
              <p>{t('edition.finding')}</p>
              <p className="kbs-muted">{t('edition.suggestion')}</p>
              <code>db.query('SELECT * FROM users{'\n'}  WHERE name = ?', [name]);</code>
            </div>
            <p className="kbs-example">{t('edition.demo')}</p>
          </div>
        </div>
      </div>
      <div className="kbs-install">
        <div className="kbs-install-heading"><span>{t('edition.sourceBuild')}</span><div className="kbs-platforms">
          <button type="button" aria-pressed={platform === 'windows'} onClick={() => setPlatform('windows')}>Windows</button>
          <button type="button" aria-pressed={platform === 'unix'} onClick={() => setPlatform('unix')}>macOS / Linux</button>
        </div></div>
        <div className="kbs-command"><pre>{command}</pre><button type="button" onClick={() => handleCopy(command)} aria-label={t('docs.copy')}>{toastVisible ? t('hero.copied') : t('docs.copy')}</button></div>
        <p className="kbs-notice">{t('edition.notice')}</p>
      </div>
    </section>
  );
};

export default HeroSection;
