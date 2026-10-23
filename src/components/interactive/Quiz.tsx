import { useState } from 'react';
type Props = { question: string; choices: string[]; answer: number; explanation: string };
export default function Quiz({ question, choices, answer, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === answer;
  return <section className="interactive-widget" aria-label="이해도 확인 퀴즈">
    <div className="widget-kicker">CHECK YOUR UNDERSTANDING</div>
    <h3 className="widget-title">{question}</h3>
    <div className="quiz-options">{choices.map((choice, i) => <button key={i} type="button" className={`quiz-choice ${selected === i ? 'selected' : ''}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="quiz-index">{String.fromCharCode(65 + i)}</span>{choice}</button>)}</div>
    {selected !== null && <div className={`quiz-result ${correct ? 'correct' : 'incorrect'}`} role="status"><strong>{correct ? '정답입니다.' : '다시 생각해 보세요.'}</strong><span>{explanation}</span><button type="button" onClick={() => setSelected(null)}>다시 풀기 ↗</button></div>}
  </section>;
}
