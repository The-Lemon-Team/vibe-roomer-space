import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AppLocale } from '../../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2) as AppLocale;

  const setLocale = (locale: AppLocale) => {
    void i18n.changeLanguage(locale);
  };

  return (
    <div
      className="flex items-center rounded border border-zinc-800 bg-zinc-900 overflow-hidden"
      title={t('lang.switchTo')}
      role="group"
      aria-label={t('lang.switchTo')}
    >
      {(['en', 'ru'] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          className={`px-2 py-1 text-[10px] font-mono font-bold uppercase transition-colors ${
            current === locale
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          aria-pressed={current === locale}
        >
          {t(`lang.${locale}`)}
        </button>
      ))}
    </div>
  );
};
