import { useState } from 'react';
export default function ContextBudget() {
  const [limit, setLimit] = useState(32768);
  const [input, setInput] = useState(14000);
  const [output, setOutput] = useState(4000);
  const reserved = input + output;
  const percent = Math.min(100, reserved / limit * 100);
  return <section className="interactive-widget" aria-label="컨텍스트 예산 시뮬레이터">
    <div className="widget-kicker">INTERACTIVE LAB / 01</div><h3 className="widget-title">컨텍스트 윈도우 예산 계산</h3>
    <p className="widget-description">입력 토큰과 최대 출력 토큰을 조정해 컨텍스트 용량의 분배를 확인하세요. 모델별 별도 제약을 제외한 교육용 단순 계산입니다.</p>
    <div className="control-set"><label htmlFor="ctx-limit">컨텍스트 용량 <strong>{limit.toLocaleString()} tokens</strong></label><select id="ctx-limit" value={limit} onChange={e => setLimit(Number(e.target.value))}><option value={32768}>32K</option><option value={65536}>64K</option><option value={131072}>128K</option><option value={262144}>256K</option></select></div>
    <div className="control-set"><label htmlFor="ctx-input">입력 토큰 <strong>{input.toLocaleString()}</strong></label><input id="ctx-input" type="range" min="0" max="250000" step="1000" value={input} onChange={e=>setInput(Number(e.target.value))}/></div>
    <div className="control-set"><label htmlFor="ctx-output">출력 토큰 예약 <strong>{output.toLocaleString()}</strong></label><input id="ctx-output" type="range" min="0" max="32000" step="1000" value={output} onChange={e=>setOutput(Number(e.target.value))}/></div>
    <div className="capacity-track" role="img" aria-label={`컨텍스트 사용량 ${Math.round(percent)}퍼센트`}><div className="capacity-used" style={{width: `${percent}%`, background: reserved > limit ? '#c16961' : undefined}} /></div>
    <div className="capacity-legend"><span>{reserved.toLocaleString()} / {limit.toLocaleString()} tokens</span><strong>{Math.round(percent)}%</strong></div>
    <div className={`lab-output ${reserved > limit ? 'warning' : ''}`}><span>{reserved > limit ? '용량 초과' : '남은 용량'}</span><strong>{Math.abs(limit - reserved).toLocaleString()} tokens</strong></div>
  </section>;
}
