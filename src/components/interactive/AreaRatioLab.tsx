import { useState } from 'react';
export default function AreaRatioLab() {
  const [land, setLand] = useState(1000);
  const [coverage, setCoverage] = useState(50);
  const [floorRatio, setFloorRatio] = useState(200);
  const footprint = Math.round(land * coverage / 100);
  const grossArea = Math.round(land * floorRatio / 100);
  const equivalentFloors = Math.round(grossArea / footprint * 10) / 10;
  return <section className="interactive-widget" aria-label="건폐율 및 용적률 실험">
    <div className="widget-kicker">INTERACTIVE LAB / 02</div><h3 className="widget-title">내 땅에 얼마나 지을 수 있을까?</h3><p className="widget-description">건폐율과 용적률을 움직여 대지면적·건축면적·용적률 산정용 연면적의 관계를 살펴보세요. 실제 인허가 가능 규모를 뜻하지는 않습니다.</p>
    <div className="control-set"><label htmlFor="land">대지면적 <strong>{land.toLocaleString()}㎡</strong></label><input id="land" type="range" min="200" max="3000" step="100" value={land} onChange={e=>setLand(Number(e.target.value))}/></div>
    <div className="control-set"><label htmlFor="coverage">건폐율 <strong>{coverage}%</strong></label><input id="coverage" type="range" min="10" max="80" step="5" value={coverage} onChange={e=>setCoverage(Number(e.target.value))}/></div>
    <div className="control-set"><label htmlFor="far">용적률 <strong>{floorRatio}%</strong></label><input id="far" type="range" min="50" max="600" step="10" value={floorRatio} onChange={e=>setFloorRatio(Number(e.target.value))}/></div>
    <div className="lab-metrics"><div><span>건축면적 상한 예시</span><strong>{footprint.toLocaleString()}㎡</strong></div><div><span>연면적 상한 예시</span><strong>{grossArea.toLocaleString()}㎡</strong></div><div><span>단순 환산 층수</span><strong>약 {equivalentFloors}층</strong></div></div><small className="lab-caveat">층수는 각 층 면적이 동일하다고 가정한 수학적 환산값입니다. 실제 층수·면적은 높이, 도로, 일조, 제외면적, 용도지역 등 다른 조건에 따라 달라집니다.</small>
  </section>;
}
