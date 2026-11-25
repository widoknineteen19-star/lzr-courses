import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { PASS_SCORE } from '../data/exams';

export default function ExamResult() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(location.state?.result || null);

  useEffect(() => {
    if (!result) {
      const saved = localStorage.getItem(`lzr_exam_last_${id}`);
      if (saved) {
        setResult(JSON.parse(saved));
      }
    }
  }, [id, result]);

  if (!result) {
    return (
      <div style={{ padding: 28 }}>
        <p>Belum ada hasil exam untuk course ini.</p>
        <Link to={`/courses/${id}`} className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
          Kembali ke Course
        </Link>
      </div>
    );
  }

  const passed = result.score >= PASS_SCORE;
  const finishedLabel = result.finishedAt
    ? new Date(result.finishedAt).toLocaleString('id-ID')
    : '-';

  return (
    <>
      <div className="page-header">
        <h1>Hasil Exam</h1>
        <Link to="/courses" className="btn btn-secondary">
          ← Daftar Courses
        </Link>
      </div>

      {/* Score card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: `2px solid ${passed ? 'var(--success)' : 'var(--danger)'}`,
          borderRadius: 16,
          padding: 32,
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: 8,
          }}
        >
          {result.courseTitle}
        </div>
        <div
          style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: passed ? 'var(--success)' : 'var(--danger)',
            lineHeight: 1.1,
          }}
        >
          {result.score}%
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'inline-block',
            padding: '6px 18px',
            borderRadius: 20,
            background: passed
              ? 'rgba(34, 197, 94, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
            color: passed ? 'var(--success)' : 'var(--danger)',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}
        >
          {passed ? '✓ LULUS' : '✗ BELUM LULUS'}
        </div>
        <p style={{ marginTop: 16, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Benar {result.correct} dari {result.total} soal
          {passed
            ? ' — Selamat, pemahamanmu sudah bagus!'
            : ` — Minimal lulus ${PASS_SCORE}%. Pelajari ulang materi lalu coba lagi.`}
        </p>
        <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Selesai: {finishedLabel}
        </p>
      </div>

      {/* Review jawaban */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            fontSize: '1rem',
          }}
        >
          Review Jawaban
        </h3>
        {(result.questions || []).map((q, i) => {
          const userAns = result.answers?.[i];
          const isCorrect = userAns === q.correct;
          const unanswered = userAns === undefined;
          return (
            <div
              key={i}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: unanswered
                      ? 'var(--bg-input)'
                      : isCorrect
                        ? 'var(--success)'
                        : 'var(--danger)',
                    color: unanswered ? 'var(--text-muted)' : '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: 8 }}>{q.question}</div>
                  <div style={{ fontSize: '0.85rem' }}>
                    {unanswered ? (
                      <span style={{ color: 'var(--text-muted)' }}>Tidak dijawab</span>
                    ) : (
                      <span
                        style={{
                          color: isCorrect ? 'var(--success)' : 'var(--danger)',
                        }}
                      >
                        Jawabanmu: {q.options[userAns]}
                      </span>
                    )}
                    {!isCorrect && (
                      <div style={{ color: 'var(--success)', marginTop: 4 }}>
                        Jawaban benar: {q.options[q.correct]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/courses/${id}/exam`)}
        >
          Ulangi Exam
        </button>
        <Link to={`/courses/${id}`} className="btn btn-secondary">
          Kembali ke Materi
        </Link>
        <Link to="/courses" className="btn btn-secondary">
          Courses Lain
        </Link>
      </div>
    </>
  );
}
