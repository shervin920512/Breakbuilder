import { useState } from 'react';

export default function Home() {
  const [selectedDrill, setSelectedDrill] = useState('');
  const [score, setScore] = useState(5);
  const [yourFeedback, setYourFeedback] = useState('');
  const [mahsaFeedback, setMahsaFeedback] = useState('');
  const [saved, setSaved] = useState(false);

  const drills = [
    'تمرین Line-Up',
    'تمرین Long Potting',
    'تمرین Safety',
    'تمرین Break Building',
  ];

  const handleSave = () => {
    console.log({
      drill: selectedDrill,
      score,
      yourFeedback,
      mahsaFeedback,
    });
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
    </main>
  );
}
