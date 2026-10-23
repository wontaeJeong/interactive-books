import { useEffect, useMemo, useState } from 'react';

type Book = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categoryLabel: string;
  level: string;
  cover: string;
  glyph: string;
  volume: number;
  chapterCount: number;
  href: string;
  chapterIds: string[];
};

const options = [
  { value: 'all', label: '모든 분야' },
  { value: 'ai', label: '인공지능' },
  { value: 'engineering', label: '개발·엔지니어링' },
  { value: 'life', label: '생활·경제' },
];

export default function BookExplorer({ books }: { books: Book[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { setReadMap(JSON.parse(localStorage.getItem('interactive-books:read') || '{}')); } catch (_) {}
  }, []);
  const filtered = useMemo(() => books.filter(book => {
    const matchesCategory = category === 'all' || book.category === category;
    const text = `${book.title} ${book.subtitle} ${book.description} ${book.categoryLabel}`.toLowerCase();
    return matchesCategory && text.includes(query.trim().toLowerCase());
  }), [books, category, query]);

  return <section className="catalog" aria-label="책 목록">
    <div className="catalog-toolbar">
      <div className="filter-group" role="group" aria-label="분야 선택">
        {options.map(option => <button type="button" key={option.value} className={`filter-btn ${category === option.value ? 'active' : ''}`} aria-pressed={category === option.value} onClick={() => setCategory(option.value)}>{option.label}</button>)}
      </div>
      <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">책 검색</span><input type="search" placeholder="책 제목이나 주제 검색" value={query} onChange={e => setQuery(e.target.value)} /></label>
    </div>
    <div className="catalog-count">{filtered.length}권의 책 <span>· 주제를 선택하고 읽기를 시작하세요</span></div>
    <div className="book-grid">
      {filtered.map(book => {
        const done = book.chapterIds.filter(id => readMap[id]).length;
        return <a className="book-card" href={book.href} key={book.slug}>
          <div className={`book-cover ${book.cover}`}>
            <div className="cover-no">COLLECTION / {String(book.volume).padStart(2,'0')}</div>
            <div className="cover-art" aria-hidden="true"><span>{book.glyph}</span></div>
            <div className="cover-bottom"><span>{book.title}</span><small>{book.subtitle}</small></div>
          </div>
          <div className="book-meta"><div className="eyebrow">{book.categoryLabel} <span>·</span> {book.level}</div><h3>{book.title}</h3><p>{book.description}</p>
            <div className="book-foot"><span>{book.chapterCount}개 챕터</span><span>{done > 0 ? `${done}/${book.chapterCount} 읽음` : '책 펼치기'} <span aria-hidden="true">↗</span></span></div>
          </div>
        </a>;
      })}
    </div>
    {filtered.length === 0 && <div className="empty-state">검색 결과가 없어요. 다른 키워드나 분야를 선택해 주세요.</div>}
  </section>;
}
