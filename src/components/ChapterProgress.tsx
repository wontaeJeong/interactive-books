import { useEffect, useState } from 'react';
const KEY = 'interactive-books:read';
export default function ChapterProgress({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    try { setDone(Boolean(JSON.parse(localStorage.getItem(KEY) || '{}')[id])); } catch (_) {}
  }, [id]);
  const toggle = () => {
    try {
      const all = JSON.parse(localStorage.getItem(KEY) || '{}');
      all[id] = !done;
      localStorage.setItem(KEY, JSON.stringify(all));
      setDone(!done);
    } catch (_) { setDone(!done); }
  };
  return <button className={`complete-btn ${done ? 'is-complete' : ''}`} type="button" aria-pressed={done} onClick={toggle}>{done ? '✓ 읽음 완료' : '✓ 읽음으로 표시'}</button>;
}
