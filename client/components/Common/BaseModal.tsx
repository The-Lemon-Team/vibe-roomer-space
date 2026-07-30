import React, { useEffect, useRef } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md font-mono select-none overflow-y-auto animate-fadeIn"
    >
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} bg-zinc-950 border ${borderColor} rounded-lg ${shadowClass} text-zinc-100 my-auto overflow-hidden ${containerClassName}`}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-zinc-900"
          >
            <span className="material-symbols-outlined text-xl leading-none">close</span>
          </button>
        )}

        {/* Optional Modal Header */}
        {(systemTag || title) && (
          <div className={`p-6 pb-3 border-b border-zinc-800 ${headerClass || ''}`}>
            {systemTag && (
              <div className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase mb-1">
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
    </div>
  );
};
