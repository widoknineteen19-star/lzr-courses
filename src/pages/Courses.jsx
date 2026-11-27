import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { defaultCourses } from '../data/courses';

export default function Courses() {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', desc: '', video: '' });

  useEffect(() => {
    const saved = localStorage.getItem('lms_courses');
    let list = saved ? JSON.parse(saved) : null;

    if (list && Array.isArray(list) && list.length > 0) {
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

  const adminLabel = user?.name || user?.username || 'Admin';

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
            className="course-card-v2"
            onClick={() => navigate(`/courses/${c.id}`)}
          >
            {/* Thumbnail biru + icon grid seperti desain */}
            <div className="course-thumb-v2">
              <div className="course-window-icon">
                <span /><span /><span />
                <span /><span /><span />
                <span /><span /><span />
              </div>
            </div>

            {/* Body: judul + deskripsi singkat + meta + aksi */}
            <div className="course-footer-v2">
              <div className="course-footer-top">
                <div className="course-footer-text">
                  <div className="course-title-v2">{c.title}</div>
                  {isAdmin && (
                    <div className="course-sub-v2">{adminLabel}</div>
                  )}
                </div>
                {isAdmin && (
                  <div
                    className="course-icons-v2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="icon-btn-v2"
                      title="Hapus"
                      onClick={() => handleDelete(c.id)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="icon-btn-v2"
                      title="Edit"
                      onClick={() => openModal(c)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <p className="course-desc-v2">
                {c.desc
                  ? c.desc.length > 90
                    ? c.desc.slice(0, 90) + '...'
                    : c.desc
                  : 'Belum ada deskripsi.'}
              </p>

              <div className="course-meta-v2">
                <span>{c.lessons || 10} Lessons</span>
                <span>{c.video ? '▶ Video' : 'Beginner'}</span>
              </div>

              {!isAdmin && (
                <button
                  type="button"
                  className="btn-mulai-v2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/courses/${c.id}`);
                  }}
                >
                  Mulai Belajar
                </button>
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
                Paste link YouTube di sini, lalu Simpan.
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
