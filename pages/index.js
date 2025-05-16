import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedDrill, setSelectedDrill] = useState('');
  const [score, setScore] = useState(5);
  const [yourFeedback, setYourFeedback] = useState('');
  const [mahsaFeedback, setMahsaFeedback] = useState('');
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);

  const drills = [
    'تمرین Line-Up',
    'تمرین Long Potting',
    'تمرین Safety',
    'تمرین Break Building',
  ];

  useEffect(() => {
    const stored = localStorage.getItem('breakbuilder');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fa-IR'),
      drill: selectedDrill,
      score,
      yourFeedback,
      mahsaFeedback,
    };

    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem('breakbuilder', JSON.stringify(updated));

    setSelectedDrill('');
    setScore(5);
    setYourFeedback('');
    setMahsaFeedback('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>BreakBuilder</h1>

      <label>تمرین امروز:</label>
      <select
        value={selectedDrill}
        onChange={(e) => setSelectedDrill(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      >
        <option value="">-- انتخاب کن --</option>
        {drills.map((drill) => (
          <option key={drill} value={drill}>{drill}</option>
        ))}
      </select>

      <label>امتیاز از ۱۰:</label>
      <input
        type="number"
        value={score}
        min={1}
        max={10}
        onChange={(e) => setScore(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />

      <label>فیدبک تو:</label>
      <textarea
        value={yourFeedback}
        onChange={(e) => setYourFeedback(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <label>فیدبک مهسا:</label>
      <textarea
        value={mahsaFeedback}
        onChange={(e) => setMahsaFeedback(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />

      <button onClick={handleSave} style={{ padding: '10px 20px' }}>
        ذخیره کن
      </button>

      {saved && <p style={{ color: 'green' }}>ذخیره شد!</p>}

      <hr style={{ margin: '30px 0' }} />

      <h2>تاریخچه تمرین‌ها</h2>
      {history.length === 0 && <p>هنوز چیزی ثبت نشده.</p>}
      {history.length > 0 && (
        <table border="1" cellPadding="5" style={{ width: '100%', marginTop: 10 }}>
          <thead>
            <tr>
              <th>تاریخ</th>
              <th>تمرین</th>
              <th>امتیاز</th>
              <th>فیدبک تو</th>
              <th>فیدبک مهسا</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.drill}</td>
                <td>{item.score}</td>
                <td>{item.yourFeedback}</td>
                <td>{item.mahsaFeedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
