import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { defaultCourses } from '../data/courses';
import { getExamForCourse } from '../data/exams';

export default function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // index -> selected option
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('lms_courses');
    const list = saved ? JSON.parse(saved) : defaultCourses;
    const found = list.find((c) => c.id === Number(id)) || defaultCourses[0];
    setCourse(found);
    setQuestions(getExamForCourse(found.title));
    setAnswers({});
    setCurrent(0);
  }, [id]);

  if (!course || questions.length === 0) {
    return <div style={{ padding: 28 }}>Loading exam...</div>;
  }

  const q = questions[current];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [current]: optionIndex }));
  };

  const goNext = () => {
    if (current < total - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    if (answeredCount < total) {
      const ok = window.confirm(
        `Masih ada ${total - answeredCount} soal belum dijawab. Submit sekarang?`
      );
      if (!ok) return;
    }

    // Hitung skor
    let correct = 0;
    questions.forEach((item, i) => {
      if (answers[i] === item.correct) correct += 1;
    });
    const score = Math.round((correct / total) * 100);

    const result = {
      courseId: course.id,
      courseTitle: course.title,
      score,
      correct,
      total,
      answers,
      questions,
      finishedAt: new Date().toISOString(),
    };

    // Simpan hasil (history per user)
    const key = 'lms_exam_results';
    const prev = JSON.parse(localStorage.getItem(key) || '[]');
    prev.unshift(result);
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 50))); // max 50

    // Simpan hasil terakhir per course
    localStorage.setItem(`lms_exam_last_${course.id}`, JSON.stringify(result));

    navigate(`/courses/${course.id}/exam/result`, { state: { result } });
  };

  return (
    <>
      <div className="page-header">
        <h1>Exam: {course.title}</h1>
        <Link to={`/courses/${course.id}`} className="btn btn-secondary">
          ← Kembali ke Course
        </Link>
      </div>

      {/* Progress */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Soal {current + 1} dari {total}
          </span>
          <div
            style={{
              marginTop: 8,
              height: 8,
              width: 200,
              maxWidth: '100%',
              background: 'var(--bg-input)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((current + 1) / total) * 100}%`,
                background: 'var(--yellow)',
                transition: 'width 0.2s',
              }}
            />
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Terjawab: {answeredCount}/{total}
        </div>
      </div>

      {/* Question card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: 28,
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: '1.15rem', marginBottom: 20, lineHeight: 1.5 }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, oi) => {
            const selected = answers[current] === oi;
            return (
              <button
                key={oi}
                type="button"
                onClick={() => selectAnswer(oi)}
                style={{
                  textAlign: 'left',
                  padding: '14px 18px',
                  borderRadius: 10,
                  border: selected
                    ? '2px solid var(--yellow)'
                    : '1px solid var(--border)',
                  background: selected
                    ? 'rgba(245, 184, 0, 0.12)'
                    : 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    background: selected ? 'var(--yellow)' : 'var(--border)',
                    color: selected ? '#1a1a1a' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                  }}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation nomor soal */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 20,
        }}
      >
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border:
                i === current
                  ? '2px solid var(--yellow)'
                  : '1px solid var(--border)',
              background:
                answers[i] !== undefined
                  ? 'rgba(245, 184, 0, 0.2)'
                  : 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary"
          onClick={goPrev}
          disabled={current === 0}
          style={{ opacity: current === 0 ? 0.4 : 1 }}
        >
          ← Sebelumnya
        </button>
        {current < total - 1 ? (
          <button className="btn btn-primary" onClick={goNext}>
            Selanjutnya →
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Exam
          </button>
        )}
        {current < total - 1 && answeredCount === total && (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Exam
          </button>
        )}
      </div>
    </>
  );
}
