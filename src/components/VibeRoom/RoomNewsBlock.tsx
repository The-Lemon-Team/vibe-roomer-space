import React, { useState } from 'react';
import { CreatedRoom, useAtmosphericStore } from '../../store/useAtmosphericStore';
import { useAuthStore } from '../../store/useAuthStore';
import { checkRoomPostingPermission } from '../../utils/roomPermissions';

interface RoomNewsBlockProps {
  room: CreatedRoom;
}

export const RoomNewsBlock: React.FC<RoomNewsBlockProps> = ({ room }) => {
  const { addRoomNews, deleteRoomNews } = useAtmosphericStore();
  const { isAuthenticated, user, setAuthModalOpen } = useAuthStore();

  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const permission = checkRoomPostingPermission(room, user, isAuthenticated);
  const newsList = room.news || [];

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
      return;
    }

    if (!newsTitle.trim() || !newsContent.trim()) return;

    addRoomNews(room.id, {
      title: newsTitle.trim(),
      content: newsContent.trim(),
    });

    setNewsTitle('');
    setNewsContent('');
    setIsFormOpen(false);
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 font-mono space-y-4 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-amber-400 text-base">newspaper</span>
          <h3 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
            [ATTACHED_ROOM_NEWS]
          </h3>
          <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
            {newsList.length} ANNOUNCEMENTS
          </span>
        </div>

        {permission.isCreator && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="text-xs px-3 py-1 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/60 text-amber-300 rounded flex items-center space-x-1 transition-colors self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">
              {isFormOpen ? 'close' : 'add'}
            </span>
            <span>{isFormOpen ? 'CANCEL' : '+ ADD NEWS'}</span>
          </button>
        )}
      </div>

      {/* Add News Form */}
      {isFormOpen && permission.isCreator && (
        <form
          onSubmit={handleCreateNews}
          className="bg-zinc-950 border border-amber-500/30 rounded-lg p-3 space-y-3 shadow-inner"
        >
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest border-b border-zinc-800 pb-1">
            // PUBLISH ROOM ANNOUNCEMENT
          </div>

          <div>
            <input
              type="text"
              placeholder="News headline title..."
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-amber-200 placeholder-zinc-600 outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <textarea
              rows={3}
              placeholder="News transmission body text..."
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 placeholder-zinc-600 outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs rounded hover:text-white transition-colors"
            >
              DISCARD
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-amber-400 text-black font-bold text-xs rounded hover:bg-amber-300 transition-colors uppercase flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-sm">campaign</span>
              <span>PUBLISH NEWS</span>
            </button>
          </div>
        </form>
      )}

      {/* Permission hint if cannot post */}
      {!permission.canPost && !newsList.length && (
        <div className="text-center py-6 bg-zinc-950/60 rounded-lg border border-zinc-800/80 text-xs text-zinc-500">
          No news published for this room yet.
        </div>
      )}

      {/* News Items List */}
      <div className="space-y-3">
        {newsList.map((item) => {
          const canDelete =
            isAuthenticated &&
            user &&
            (user.id === item.authorId || user.username === item.authorName || permission.isCreator);

          return (
            <div
              key={item.id}
              className="p-3.5 bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/40 rounded-lg space-y-2 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      {item.title}
                    </h4>
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center space-x-2 pl-4">
                    <span>@{item.authorName}</span>
                    <span>•</span>
                    <span>{item.createdAt}</span>
                  </div>
                </div>

                {canDelete && (
                  <button
                    onClick={() => deleteRoomNews(room.id, item.id)}
                    className="text-zinc-600 hover:text-red-400 text-xs transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete News Announcement"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed pl-4 border-l border-amber-500/20">
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
