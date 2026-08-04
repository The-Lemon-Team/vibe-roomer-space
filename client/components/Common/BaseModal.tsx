import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

/** Tracks stacked BaseModals so Escape closes only the topmost one. */
let openModalCount = 0;

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  systemTag?: string;
  maxWidth?: string;
  borderColor?: string;
  shadowClass?: string;
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
  headerIcon?: string;
  headerClass?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  systemTag,
  maxWidth = 'max-w-md',
  borderColor = 'border-cyan-500/50',
  shadowClass = 'shadow-[0_0_30px_rgba(0,255,204,0.15)]',
  closeOnBackdropClick = true,
  showCloseButton = true,
  headerIcon,
  headerClass,
  containerClassName = '',
  children,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [stackDepth, setStackDepth] = useState(0);

  // Register in the modal stack before paint so z-index is correct for nested modals.
  useLayoutEffect(() => {
    if (!isOpen) {
      setStackDepth(0);
      return;
    }

    openModalCount += 1;
    const depth = openModalCount;
    setStackDepth(depth);

    return () => {
      openModalCount -= 1;
    };
  }, [isOpen]);

  // Only the topmost open modal should handle Escape (stacked create + add-image).
  useEffect(() => {
    if (!isOpen || stackDepth === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stackDepth === openModalCount) {
        onCloseRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stackDepth]);

  if (!isOpen) return null;

  // Close only when the backdrop itself is pressed — not when a bubbled click
  // from an input lands on the overlay after scroll-into-view shifts layout.
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onCloseRef.current();
    }
  };

  const zIndex = 60 + stackDepth;

  // Portal to document.body so nested modals are not trapped inside parent <form>s
  // (invalid nested forms make Search/submit buttons appear to do nothing).
  return createPortal(
    <div
      onMouseDown={handleBackdropMouseDown}
      style={{ zIndex }}
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md font-mono overflow-y-auto animate-fadeIn"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidth} bg-zinc-950 border ${borderColor} rounded-lg ${shadowClass} text-zinc-100 my-auto overflow-hidden ${containerClassName}`}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.closeModal')}
            className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-zinc-900"
          >
            <span className="material-symbols-outlined text-xl leading-none">close</span>
          </button>
        )}

        {/* Optional Modal Header */}
        {(systemTag || title) && (
          <div className={`p-6 pb-3 border-b border-zinc-800 ${headerClass || ''}`}>
            {systemTag && (
              <div className="text-sm text-cyan-400 font-bold tracking-wider uppercase mb-1">
                {systemTag}
              </div>
            )}
            {title && (
              <div className="flex items-center space-x-2">
                {headerIcon && (
                  <span className="material-symbols-outlined text-cyan-400 text-lg">{headerIcon}</span>
                )}
                <h2 className="text-xl font-bold tracking-tight text-zinc-100">{title}</h2>
              </div>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
