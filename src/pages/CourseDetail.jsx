import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { defaultCourses, sampleLessons } from '../data/courses';

function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = u.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('lms_courses');
    let list = saved ? JSON.parse(saved) : null;

    if (list && Array.isArray(list)) {
      list = list.map((c) => {
        const def = defaultCourses.find((d) => d.id === c.id);
        if (def && !c.video && def.video) return { ...c, video: def.video };
        return c;
      });
    } else {
      list = defaultCourses;
    }

    const found = list.find((c) => c.id === Number(id)) || defaultCourses[0];
    setCourse(found);
    setActiveIndex(0);
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const lessons =
    sampleLessons[course.title] ||
    sampleLessons.default.map((l) => ({
      ...l,
      video: l.video || course.video || '',
    }));

  // Video aktif = video lesson, fallback ke video course
  const activeLesson = lessons[activeIndex] || lessons[0];
  const currentVideoUrl = activeLesson?.video || course.video || '';
  const youtubeId = getYoutubeId(currentVideoUrl);

  const selectLesson = (index) => {
    setActiveIndex(index);
    // Scroll ke video player
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const goNext = () => {
    if (activeIndex < lessons.length - 1) {
      selectLesson(activeIndex + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      selectLesson(activeIndex - 1);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>{course.title}</h1>
        <Link to="/courses" className="btn btn-secondary">
          ← Kembali
        </Link>
      </div>

      <div className="course-detail-header" ref={videoRef}>
        <div className="video-player">
          {youtubeId ? (
            <iframe
              key={youtubeId + '-' + activeIndex}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
              title={activeLesson?.title || course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                alt="Instructor"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/800x450/1e3a5f/ffffff?text=Video+Course';
                }}
              />
              <div className="play-overlay">
                <div
                  className="play-btn"
                  style={{
                    cursor: 'default',
                    fontSize: '0.7rem',
                    width: 140,
                    borderRadius: 12,
                    textAlign: 'center',
                    padding: 8,
                    lineHeight: 1.3,
                  }}
                >
                  Belum ada video
                  <br />
                  Edit course (admin)
                </div>
              </div>
            </>
          )}
        </div>

        <div className="course-info">
          <h1>{course.title}</h1>
          <div className="instructor">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              className="instructor-avatar"
              alt="Instructor"
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/48/f5b800/1a1a1a?text=I';
              }}
            />
            <div>
              <strong>Instructor LMS</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Senior Web Developer
              </div>
            </div>
          </div>
          <p className="desc">{course.desc}</p>

          {/* Materi yang sedang diputar */}
          <div
            style={{
              background: 'rgba(245, 184, 0, 0.1)',
              border: '1px solid var(--yellow)',
              borderRadius: 10,
              padding: '12px 14px',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--yellow)', marginBottom: 4 }}>
              Sedang diputar · Materi {activeIndex + 1}/{lessons.length}
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {activeLesson?.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {activeLesson?.duration}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={goPrev}
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.4 : 1 }}
            >
              ← Sebelumnya
            </button>
            <button
              className="btn btn-primary"
              onClick={goNext}
              disabled={activeIndex >= lessons.length - 1}
              style={{ opacity: activeIndex >= lessons.length - 1 ? 0.4 : 1 }}
            >
              Lanjut Belajar →
            </button>
          </div>
        </div>
      </div>

      <div className="lessons-list">
        <h3>Daftar Materi</h3>
        {lessons.map((l, i) => (
          <div
            key={i}
            className={`lesson-item ${i === activeIndex ? 'active' : ''}`}
            onClick={() => selectLesson(i)}
            style={{ cursor: 'pointer' }}
          >
            <div className="lesson-num">{i + 1}</div>
            <div className="lesson-title">
              {l.title}
              {getYoutubeId(l.video || course.video) && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: '0.7rem',
                    color: 'var(--yellow)',
                  }}
                >
                  ▶
                </span>
              )}
            </div>
            <div className="lesson-duration">{l.duration}</div>
          </div>
        ))}
      </div>
    </>
  );
}
