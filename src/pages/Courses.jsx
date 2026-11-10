import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { defaultCourses } from '../data/courses';

export default function Courses() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', desc: '', video: '' });

  useEffect(() => {
    const saved = localStorage.getItem('lzr_courses');
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
      localStorage.setItem('lzr_courses', JSON.stringify(list));
    } else {
      list = defaultCourses;
      localStorage.setItem('lzr_courses', JSON.stringify(list));
    }
    setCourses(list);
  }, []);

  const saveToStorage = (list) => {
    setCourses(list);
    localStorage.setItem('lzr_courses', JSON.stringify(list));
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
            className={`course-card ${isAdmin ? 'admin' : ''}`}
            onClick={() => navigate(`/courses/${c.id}`)}
          >
            <div className="course-thumb">
              <span className="lang-badge">
                {c.title.substring(0, 4).toUpperCase()}
              </span>
            </div>
            <div className="course-body">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="course-meta">
                <span>{c.lessons || 10} Lessons</span>
                <span>{c.video ? '▶ Video' : 'Beginner'}</span>
              </div>
              {isAdmin ? (
                <div
                  className="course-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn-sm btn-yellow"
                    onClick={() => openModal(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-sm btn-danger"
                    onClick={() => handleDelete(c.id)}
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="course-actions">
                  <button className="btn-sm btn-yellow">Mulai Belajar</button>
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
