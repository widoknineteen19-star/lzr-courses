import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { defaultCourses } from '../data/courses';

function GridIcon() {
  return (
    <div className="grid-icon" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      />
    </svg>
  );
}

export default function Courses() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', desc: '', video: '' });

  useEffect(() => {
    const saved = localStorage.getItem('lms_courses');
    let list = saved ? JSON.parse(saved) : null;

    if (list && Array.isArray(list) && list.length > 0) {
      // Merge video from defaults if missing in old localStorage
      list = list.map((c) => {
        const def = defaultCourses.find((d) => d.id === c.id);
        if (def && !c.video && def.video) {
          return { ...c, video: def.video };
        }
        return { ...c, video: c.video || '' };
      });
      localStorage.setItem('lms_courses', JSON.stringify(list));
    } else {
      list = defaultCourses;
      localStorage.setItem('lms_courses', JSON.stringify(list));
    }
    setCourses(list);
  }, []);

  const saveToStorage = (list) => {
    setCourses(list);
    localStorage.setItem('lms_courses', JSON.stringify(list));
  };

  const openModal = (course = null) => {
    if (course) {
      setEditId(course.id);
      setForm({
        title: course.title || '',
        desc: course.desc || '',
        video: course.video || '',
      });
    } else {
      setEditId(null);
      setForm({ title: '', desc: '', video: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      desc: form.desc.trim(),
      video: form.video.trim(),
    };

    if (editId) {
      const updated = courses.map((c) =>
        c.id === editId ? { ...c, ...payload } : c
      );
      saveToStorage(updated);
    } else {
      saveToStorage([
        ...courses,
        { id: Date.now(), ...payload, lessons: 10 },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus course ini?')) {
      saveToStorage(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Courses</h1>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => openModal()}>
            + Tambah Course
          </button>
        )}
      </div>

      <div className="courses-grid">
        {courses.map((c) => (
          <div
            key={c.id}
            className="course-card"
            onClick={() => navigate(`/courses/${c.id}`)}
          >
            <div className="course-thumb">
              <GridIcon />
            </div>
            <div className="course-footer">
              <div className="course-footer-text">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              {isAdmin && (
                <div
                  className="course-icon-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Hapus ${c.title}`}
                    onClick={() => handleDelete(c.id)}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Edit ${c.title}`}
                    onClick={() => openModal(c)}
                  >
                    <PencilIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`}>
        <div className="modal">
          <h2>{editId ? 'Edit Course' : 'Tambah Course'}</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Judul Course</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Contoh: HTML"
              />
            </div>
            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                rows="3"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                placeholder="Deskripsi singkat"
              />
            </div>
            <div className="form-group">
              <label>Link Video YouTube</label>
              <input
                type="text"
                value={form.video}
                onChange={(e) => setForm({ ...form, video: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=XXXX atau https://youtu.be/XXXX"
              />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Paste link YouTube di sini, lalu Simpan. Video akan muncul di halaman detail.
              </small>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
