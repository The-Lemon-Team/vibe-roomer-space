import React, { useState } from 'react';
import type { CreatedRoom, RoomNoteItem } from '../../store/useAtmosphericStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAuthModalOpen } from '../../store/authSlice';
import {
  useAddRoomNoteMutation,
  useUpdateRoomNoteMutation,
  useDeleteRoomNoteMutation,
} from '../../store/api/roomsApi';
import { checkRoomPostingPermission } from '../../utils/roomPermissions';
import { MarkdownRenderer } from './MarkdownRenderer';

interface RoomNotesBlockProps {
  room: CreatedRoom;
}

export const RoomNotesBlock: React.FC<RoomNotesBlockProps> = ({ room }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const [addRoomNote] = useAddRoomNoteMutation();
  const [updateRoomNote] = useUpdateRoomNoteMutation();
  const [deleteRoomNote] = useDeleteRoomNoteMutation();


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  // Creation form view mode state: 'edit' (raw textarea) vs 'view' (rendered markdown preview)
  const [formViewMode, setFormViewMode] = useState<'edit' | 'view'>('edit');

  // Per-note view mode toggle state: map of noteId -> 'view' | 'edit'
  const [noteViewModes, setNoteViewModes] = useState<Record<string, 'view' | 'edit'>>({});

  // Editing existing note state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const permission = checkRoomPostingPermission(room, user, isAuthenticated);
  const notesList = room.notes || [];

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
      return;
    }

    if (!noteTitle.trim() || !noteContent.trim()) return;

    addRoomNote({ roomId: room.id, title: noteTitle.trim(), content: noteContent.trim() });

    setNoteTitle('');
    setNoteContent('');
    setFormViewMode('edit');
    setIsFormOpen(false);
  };

  const handleStartEditNote = (note: RoomNoteItem) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setNoteViewModes((prev) => ({ ...prev, [note.id]: 'edit' }));
  };

  const handleSaveEditNote = (noteId: string) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    updateRoomNote({ roomId: room.id, noteId, updates: { title: editTitle.trim(), content: editContent.trim() } });
    setEditingNoteId(null);
    setNoteViewModes((prev) => ({ ...prev, [noteId]: 'view' }));
  };

  const toggleNoteViewMode = (noteId: string) => {
    setNoteViewModes((prev) => ({
      ...prev,
      [noteId]: prev[noteId] === 'edit' ? 'view' : 'edit',
    }));
  };

  const insertMarkdownSnippet = (snippet: string) => {
    setNoteContent((prev) => (prev ? `${prev}\n${snippet}` : snippet));
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 font-mono space-y-4 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-cyan-400 text-base">description</span>
          <h3 className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            [ATTACHED_ROOM_NOTES]
          </h3>
          <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full">
            {notesList.length} NOTES (MARKDOWN)
          </span>
        </div>

        {permission.isCreator && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="text-xs px-3 py-1 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/60 text-cyan-300 rounded flex items-center space-x-1 transition-colors self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">
              {isFormOpen ? 'close' : 'note_add'}
            </span>
            <span>{isFormOpen ? 'CANCEL' : '+ ADD MARKDOWN NOTE'}</span>
          </button>
        )}
      </div>

      {/* Add Note Form */}
      {isFormOpen && permission.isCreator && (
        <form
          onSubmit={handleCreateNote}
          className="bg-zinc-950 border border-cyan-500/40 rounded-lg p-3 space-y-3 shadow-inner"
        >
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center space-x-1">
              <span className="material-symbols-outlined text-xs">edit_note</span>
              <span>// CREATE MARKDOWN NOTE</span>
            </div>

            {/* Form Mode Toggle: Raw Editor vs Rendered View Mode */}
            <div className="flex items-center space-x-1 text-[10px]">
              <button
                type="button"
                onClick={() => setFormViewMode('edit')}
                className={`px-2 py-0.5 rounded font-bold uppercase transition-colors flex items-center space-x-1 ${
                  formViewMode === 'edit'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className="material-symbols-outlined text-[12px]">code</span>
                <span>EDIT MODE</span>
              </button>
              <button
                type="button"
                onClick={() => setFormViewMode('view')}
                className={`px-2 py-0.5 rounded font-bold uppercase transition-colors flex items-center space-x-1 ${
                  formViewMode === 'view'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className="material-symbols-outlined text-[12px]">visibility</span>
                <span>VIEW MODE PREVIEW</span>
              </button>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Note title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-cyan-200 placeholder-zinc-600 outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* Quick Markdown Formatting Helper Toolbar */}
          {formViewMode === 'edit' && (
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] bg-zinc-900/60 p-1.5 rounded border border-zinc-800">
              <span className="text-zinc-500 font-bold mr-1">[FMT]:</span>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('# Header')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-cyan-300 rounded"
              >
                # H1
              </button>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('## Subheader')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded"
              >
                ## H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('**bold text**')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-bold"
              >
                **Bold**
              </button>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('```ts\n// code snippet\n```')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-300 rounded"
              >
                ``` Code
              </button>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('- [ ] Task check item')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-purple-300 rounded"
              >
                - [ ] Task
              </button>
              <button
                type="button"
                onClick={() => insertMarkdownSnippet('> Quote block')}
                className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded"
              >
                &gt; Quote
              </button>
            </div>
          )}

          {/* Note Input Body / Rendered View Mode */}
          {formViewMode === 'edit' ? (
            <textarea
              rows={5}
              placeholder="Write note content in Markdown format (# Header, **bold**, - list, ``` code)..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 placeholder-zinc-600 outline-none focus:border-cyan-500 font-mono leading-relaxed"
              required
            />
          ) : (
            <div className="bg-zinc-900 border border-emerald-500/30 rounded p-3 min-h-[120px]">
              {noteContent.trim() ? (
                <MarkdownRenderer content={noteContent} />
              ) : (
                <div className="text-zinc-600 text-xs italic">
                  Markdown preview will render here as you type in edit mode...
                </div>
              )}
            </div>
          )}

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
              className="px-4 py-1 bg-cyan-400 text-black font-bold text-xs rounded hover:bg-cyan-300 transition-colors uppercase flex items-center space-x-1"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>SAVE NOTE</span>
            </button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {!notesList.length && (
        <div className="text-center py-6 bg-zinc-950/60 rounded-lg border border-zinc-800/80 text-xs text-zinc-500">
          No Markdown notes attached to this room yet.
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notesList.map((note) => {
          const currentMode = noteViewModes[note.id] || 'view';
          const isEditingThis = editingNoteId === note.id;

          const canModify =
            isAuthenticated &&
            user &&
            (user.id === note.authorId || user.username === note.authorName || permission.isCreator);

          return (
            <div
              key={note.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 rounded-lg p-4 space-y-3 transition-colors shadow"
            >
              {/* Note Header & View Mode Toggle */}
              <div className="flex justify-between items-start border-b border-zinc-800/80 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-cyan-400 text-sm">article</span>
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                      {isEditingThis ? 'EDITING NOTE' : note.title}
                    </h4>
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center space-x-2 pl-6">
                    <span>@{note.authorName}</span>
                    <span>•</span>
                    <span>{note.updatedAt || note.createdAt}</span>
                  </div>
                </div>

                {/* Controls: View Mode Switch & Actions */}
                <div className="flex items-center space-x-2">
                  {!isEditingThis && permission.isCreator && (
                    <button
                      onClick={() => toggleNoteViewMode(note.id)}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-colors flex items-center space-x-1 border ${
                        currentMode === 'view'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                      title="Switch between Rendered View Mode and Raw Markdown Edit Mode"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {currentMode === 'view' ? 'visibility' : 'code'}
                      </span>
                      <span>{currentMode === 'view' ? 'VIEW MODE' : 'SOURCE MODE'}</span>
                    </button>
                  )}

                  {canModify && (
                    <div className="flex items-center space-x-1 pl-1 border-l border-zinc-800">
                      {isEditingThis ? (
                        <>
                          <button
                            onClick={() => handleSaveEditNote(note.id)}
                            className="text-emerald-400 hover:text-emerald-300 text-xs px-2 py-0.5 bg-emerald-950 border border-emerald-500/50 rounded"
                          >
                            SAVE
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="text-zinc-400 hover:text-white text-xs px-2 py-0.5 bg-zinc-900 rounded"
                          >
                            CANCEL
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEditNote(note)}
                            className="text-zinc-400 hover:text-cyan-300 text-xs p-1"
                            title="Edit Note"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => deleteRoomNote({ roomId: room.id, noteId: note.id })}
                            className="text-zinc-600 hover:text-red-400 text-xs p-1"
                            title="Delete Note"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Note Content Display */}
              {isEditingThis ? (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-cyan-200 outline-none focus:border-cyan-500"
                  />
                  <textarea
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 outline-none focus:border-cyan-500 font-mono leading-relaxed"
                  />
                </div>
              ) : (
                <div className="pt-1">
                  {currentMode === 'view' ? (
                    <MarkdownRenderer content={note.content} className="pl-1" />
                  ) : (
                    <div className="bg-zinc-950 border border-zinc-800/80 rounded p-3 font-mono text-xs text-zinc-400 overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{note.content}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
