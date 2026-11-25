/**
 * Soal exam per course (berdasarkan title course).
 * Setiap soal: question, options[], correct (index 0-based)
 */
export const examsByCourse = {
  HTML: [
    {
      question: 'Tag HTML untuk membuat heading level 1 adalah?',
      options: ['<head>', '<h1>', '<header>', '<title>'],
      correct: 1,
    },
    {
      question: 'Atribut yang wajib ada pada tag <img> untuk aksesibilitas adalah?',
      options: ['src', 'alt', 'width', 'href'],
      correct: 1,
    },
    {
      question: 'Tag semantic HTML5 untuk konten utama halaman adalah?',
      options: ['<section>', '<article>', '<main>', '<div>'],
      correct: 2,
    },
    {
      question: 'Tipe input HTML untuk email adalah?',
      options: ['type="text"', 'type="mail"', 'type="email"', 'type="e-mail"'],
      correct: 2,
    },
    {
      question: 'Tag untuk membuat daftar berurutan (numbered list) adalah?',
      options: ['<ul>', '<ol>', '<li>', '<dl>'],
      correct: 1,
    },
  ],
  CSS: [
    {
      question: 'Properti CSS untuk mengubah warna teks adalah?',
      options: ['font-color', 'text-color', 'color', 'background-color'],
      correct: 2,
    },
    {
      question: 'Display yang membuat elemen menjadi flex container adalah?',
      options: ['display: block', 'display: flex', 'display: grid', 'display: inline'],
      correct: 1,
    },
    {
      question: 'Unit relatif terhadap ukuran font root (html) adalah?',
      options: ['em', 'px', 'rem', '%'],
      correct: 2,
    },
    {
      question: 'Properti untuk mengatur jarak di dalam elemen (inner spacing) adalah?',
      options: ['margin', 'padding', 'border', 'gap'],
      correct: 1,
    },
    {
      question: 'Media query biasanya digunakan untuk?',
      options: ['Animasi', 'Responsive design', 'Font loading', 'SEO'],
      correct: 1,
    },
  ],
  PHP: [
    {
      question: 'Ekstensi file PHP biasanya adalah?',
      options: ['.html', '.js', '.php', '.py'],
      correct: 2,
    },
    {
      question: 'Cara menampilkan teks di PHP adalah?',
      options: ['console.log()', 'echo', 'print()', 'document.write()'],
      correct: 1,
    },
    {
      question: 'Variabel di PHP diawali dengan tanda?',
      options: ['@', '#', '$', '%'],
      correct: 2,
    },
    {
      question: 'Superglobal untuk data form method POST adalah?',
      options: ['$_GET', '$_POST', '$_REQUEST', '$_FORM'],
      correct: 1,
    },
    {
      question: 'Fungsi untuk menghubungkan ke database MySQL di PHP modern adalah?',
      options: ['mysql_connect', 'mysqli_connect', 'db_connect', 'pdo_only'],
      correct: 1,
    },
  ],
  Golang: [
    {
      question: 'Keyword untuk mendeklarasikan fungsi di Go adalah?',
      options: ['function', 'func', 'def', 'fn'],
      correct: 1,
    },
    {
      question: 'Package default untuk program yang bisa di-run adalah?',
      options: ['package lib', 'package main', 'package go', 'package app'],
      correct: 1,
    },
    {
      question: 'Cara mencetak ke console di Go adalah?',
      options: ['console.log', 'fmt.Println', 'print()', 'echo'],
      correct: 1,
    },
    {
      question: 'Tipe data untuk bilangan bulat di Go adalah?',
      options: ['number', 'int', 'integer', 'float'],
      correct: 1,
    },
    {
      question: 'Go dikenal bagus untuk?',
      options: ['Hanya frontend', 'Concurrency & backend', 'Hanya database', 'Design grafis'],
      correct: 1,
    },
  ],
  JavaScript: [
    {
      question: 'Cara mendeklarasikan variabel yang bisa diubah di JS modern adalah?',
      options: ['var', 'let', 'const saja', 'define'],
      correct: 1,
    },
    {
      question: 'Method array untuk menambahkan elemen di akhir adalah?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correct: 0,
    },
    {
      question: '=== di JavaScript membandingkan?',
      options: ['Hanya nilai', 'Hanya tipe', 'Nilai dan tipe', 'Referensi saja'],
      correct: 2,
    },
    {
      question: 'Fungsi untuk menyeleksi satu elemen by ID adalah?',
      options: ['querySelectorAll', 'getElementById', 'getElementsByClass', 'findById'],
      correct: 1,
    },
    {
      question: 'Promise digunakan untuk menangani?',
      options: ['CSS animation', 'Operasi asynchronous', 'HTML form', 'Local storage saja'],
      correct: 1,
    },
  ],
  React: [
    {
      question: 'Hook untuk state di functional component adalah?',
      options: ['useEffect', 'useState', 'useContext', 'useRef'],
      correct: 1,
    },
    {
      question: 'JSX harus return satu root element. Alternatifnya memakai?',
      options: ['<div> saja', 'Fragment <>...</>', 'Multiple return', 'Array saja'],
      correct: 1,
    },
    {
      question: 'Props di React bersifat?',
      options: ['Mutable', 'Read-only (immutable dari child)', 'Global', 'Optional selalu'],
      correct: 1,
    },
    {
      question: 'Hook untuk side effect (fetch, subscription) adalah?',
      options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
      correct: 2,
    },
    {
      question: 'Library routing resmi yang sering dipakai dengan React adalah?',
      options: ['React Path', 'React Router', 'Next Link only', 'Vue Router'],
      correct: 1,
    },
  ],
};

/** Fallback exam jika course belum punya soal khusus */
export const defaultExam = [
  {
    question: 'Apa tujuan utama course ini?',
    options: ['Hiburan saja', 'Meningkatkan skill terkait topik course', 'Menghafal saja', 'Tidak ada'],
    correct: 1,
  },
  {
    question: 'Setelah menonton materi, langkah selanjutnya yang disarankan?',
    options: ['Langsung tidur', 'Praktik & kerjakan exam', 'Abaikan', 'Hapus course'],
    correct: 1,
  },
  {
    question: 'Hasil exam membantu untuk?',
    options: ['Tidak berguna', 'Mengukur pemahaman materi', 'Mengganti password', 'Login admin'],
    correct: 1,
  },
  {
    question: 'Skor lulus minimum yang disarankan biasanya?',
    options: ['10%', '30%', '60% atau lebih', '0%'],
    correct: 2,
  },
  {
    question: 'Jika belum lulus exam, sebaiknya?',
    options: ['Menyerah', 'Ulangi materi lalu coba lagi', 'Cheat', 'Hapus akun'],
    correct: 1,
  },
];

export function getExamForCourse(courseTitle) {
  return examsByCourse[courseTitle] || defaultExam;
}

export const PASS_SCORE = 60; // persen
