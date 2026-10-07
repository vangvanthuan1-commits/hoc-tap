import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Edit3,
  FileText,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  addNote,
  deleteNote,
  updateNote,
  useLearningState,
} from "../lib/store";
import type { LearningNote, SubjectId } from "../types";
import "./learning.css";

interface NotesPanelProps {
  lessonId?: string;
  subjectId?: SubjectId;
  compact?: boolean;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export default function NotesPanel({
  lessonId,
  subjectId,
  compact = false,
}: NotesPanelProps) {
  const state = useLearningState();
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [deletedNote, setDeletedNote] = useState<LearningNote | null>(null);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const notes = useMemo(
    () =>
      state.notes
        .filter(
          (note) =>
            (!lessonId || note.lessonId === lessonId) &&
            note.text
              .toLocaleLowerCase("vi")
              .includes(search.toLocaleLowerCase("vi")),
        )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [state.notes, lessonId, search],
  );

  function saveNote() {
    const text = draft.trim();
    if (!text) return;
    safeAction(() => {
      addNote({ lessonId: lessonId || "personal", subjectId, text });
      setDraft("");
    });
  }

  function safeAction(action: () => void) {
    try {
      action();
      setError("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Không lưu được thay đổi. Bạn hãy giữ lại nội dung và thử lại.",
      );
    }
  }

  return (
    <section
      className={`learning-notes ${compact ? "learning-notes-compact" : ""}`}
      aria-label="Ghi chú học tập"
    >
      <div className="learning-section-heading">
        <div>
          <span className="learning-eyebrow">SỔ TAY CỦA BẠN</span>
          <h2>
            <FileText size={21} /> Ghi lại điều đáng nhớ
          </h2>
        </div>
        <span className="learning-count">{notes.length} ghi chú</span>
      </div>
      <div className="learning-note-composer">
        <label htmlFor={`note-draft-${lessonId || "all"}`}>
          Một ý mới, một lỗi vừa sửa, hoặc câu hỏi còn vướng?
        </label>
        <textarea
          id={`note-draft-${lessonId || "all"}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ví dụ: Sau must dùng động từ nguyên mẫu. Mình hay thêm -s nhầm…"
          rows={compact ? 3 : 4}
        />
        <div className="learning-composer-footer">
          <span>Ghi chú được lưu trên thiết bị ngay.</span>
          <button
            className="learning-button learning-button-primary"
            onClick={saveNote}
            disabled={!draft.trim()}
          >
            <Plus size={16} /> Lưu ghi chú
          </button>
        </div>
      </div>
      {!compact && (
        <label className="learning-search">
          <Search size={18} />
          <input
            aria-label="Tìm ghi chú"
            placeholder="Tìm trong sổ tay…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      )}
      {error && (
        <div
          className="learning-inline-message learning-error-message"
          role="alert"
        >
          {error}
        </div>
      )}
      {deletedNote && (
        <div className="learning-inline-message" role="status">
          Đã xóa ghi chú.
          <button
            onClick={() =>
              safeAction(() => {
                addNote({
                  lessonId: deletedNote.lessonId,
                  subjectId: deletedNote.subjectId,
                  sectionId: deletedNote.sectionId,
                  text: deletedNote.text,
                });
                setDeletedNote(null);
              })
            }
          >
            Hoàn tác
          </button>
          <button
            aria-label="Đóng thông báo"
            onClick={() => setDeletedNote(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}
      <div className="learning-note-grid">
        {notes.length === 0 && (
          <div className="learning-empty">
            <FileText size={30} />
            <h3>
              {search ? "Chưa tìm thấy ghi chú" : "Bắt đầu với một dòng thôi"}
            </h3>
            <p>
              {search
                ? "Thử một từ khóa khác."
                : "Viết lại bằng lời của bạn giúp nhớ lâu hơn."}
            </p>
          </div>
        )}
        {notes.map((note) => (
          <article className="learning-note-card" key={note.id}>
            <div className="learning-note-meta">
              <span>
                {note.lessonId === "personal" ? "Ghi chú riêng" : note.lessonId}
              </span>
              <time dateTime={note.updatedAt}>
                {formatDate(note.updatedAt)}
              </time>
            </div>
            {editing === note.id ? (
              <>
                <textarea
                  aria-label="Sửa ghi chú"
                  rows={5}
                  value={editDraft}
                  onChange={(event) => setEditDraft(event.target.value)}
                />
                <div className="learning-note-actions">
                  <button
                    className="learning-button learning-button-primary"
                    disabled={!editDraft.trim()}
                    onClick={() =>
                      safeAction(() => {
                        updateNote(note.id, editDraft.trim());
                        setEditing(null);
                      })
                    }
                  >
                    <Check size={15} /> Lưu
                  </button>
                  <button
                    className="learning-button"
                    onClick={() => setEditing(null)}
                  >
                    Hủy
                  </button>
                </div>
              </>
            ) : (
              <>
                <p
                  className={
                    !expanded[note.id] && note.text.length > 280
                      ? "learning-note-text learning-note-clamped"
                      : "learning-note-text"
                  }
                >
                  {note.text}
                </p>
                <div className="learning-note-actions">
                  {note.text.length > 280 && (
                    <button
                      className="learning-text-button"
                      onClick={() =>
                        setExpanded((current) => ({
                          ...current,
                          [note.id]: !current[note.id],
                        }))
                      }
                    >
                      {expanded[note.id] ? "Thu gọn" : "Đọc thêm"}
                      <ChevronDown size={14} />
                    </button>
                  )}
                  <button
                    className="learning-icon-button"
                    aria-label="Sửa ghi chú"
                    onClick={() => {
                      setEditing(note.id);
                      setEditDraft(note.text);
                    }}
                  >
                    <Edit3 size={17} />
                  </button>
                  <button
                    className="learning-icon-button learning-danger"
                    aria-label="Xóa ghi chú"
                    onClick={() =>
                      safeAction(() => {
                        deleteNote(note.id);
                        setDeletedNote(note);
                      })
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export { NotesPanel };
