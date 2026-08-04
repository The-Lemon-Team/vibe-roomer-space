import React from 'react';
import { useTranslation } from 'react-i18next';
import type { VibeItem } from '../../store/useAtmosphericStore';
import { BaseModal } from '../Common/BaseModal';

interface DeleteVibeModalProps {
  vibe: VibeItem | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteVibeModal: React.FC<DeleteVibeModalProps> = ({
  vibe,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <BaseModal
      isOpen={Boolean(vibe)}
      onClose={onCancel}
      systemTag={t('deleteVibe.systemTag')}
      headerIcon="warning"
      borderColor="border-red-500/60"
      shadowClass="shadow-[0_0_25px_rgba(239,68,68,0.25)]"
      headerClass="bg-red-950/40 border-red-500/40"
      maxWidth="max-w-md"
    >
      {vibe && (
        <div className="p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <p className="text-zinc-200 font-sans text-sm font-semibold">
              {t('deleteVibe.confirm')}
            </p>
            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded space-y-1 text-[11px] font-mono">
              <div className="text-amber-400 font-bold truncate">{t('deleteVibe.title')} {vibe.title}</div>
              <div className="text-zinc-400">{t('deleteVibe.author')} @{vibe.authorName}</div>
              <div className="text-zinc-500">{t('deleteVibe.id')} {vibe.id}</div>
              {vibe.tags && vibe.tags.length > 0 && (
                <div className="text-cyan-400/80 text-[10px] truncate">
                  {t('deleteVibe.tags')} {vibe.tags.join(', ')}
                </div>
              )}
            </div>
            <p className="text-red-400/90 text-[11px] leading-relaxed">
              {t('deleteVibe.warning')}
            </p>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded font-bold uppercase transition-colors"
            >
              {t('deleteVibe.abort')}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded uppercase shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all flex items-center space-x-1"
            >
              <span>{t('deleteVibe.confirmDelete')}</span>
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
