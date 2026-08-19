/**
 * DESIGN MEMORY — “Штурманский стол”: paper-like editorial layout, calm nautical hierarchy,
 * and an interactive map as the primary decision surface.
 */
import { RouteMap } from "@/components/RouteMap";
import { primaryStops, reserveStops, type Stop, type StopTheme } from "@/lib/routeData";
import { Anchor, ArrowUpRight, Building2, CalendarDays, ChevronRight, CircleDot, Compass, Footprints, Info, MapPinned, Navigation, Sailboat, ShieldCheck, Waves, Wind } from "lucide-react";
import { useEffect, useState } from "react";

const asset = {
  mark: "/manus-storage/kurs-likii-mark_6956823a.png",
  hero: "/manus-storage/marmaris-gocek-hero_740e0209.jpg",
  kaunos: "/manus-storage/kaunos-river-excursion_fc126225.jpg",
  gemiler: "/manus-storage/gemiler-ruins-excursion_91e17d49.jpg",
};

const icons = { anchor: Anchor, buoy: CircleDot, marina: Building2, shore: Footprints } as const;
const legend: { label: string; icon: typeof Anchor; theme: StopTheme }[] = [
  { label: "Якорь", icon: Anchor, theme: "anchor" },
  { label: "Официальный буй", icon: CircleDot, theme: "buoy" },
  { label: "Марина", icon: Building2, theme: "marina" },
  { label: "Экскурсия", icon: Footprints, theme: "shore" },
];

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function Detail({ stop }: { stop: Stop }) {
  const Icon = icons[stop.theme];
  return <aside className="stop-detail" aria-live="polite">
    <div className="detail-topline"><span>{stop.day}</span><span>{stop.date}</span></div>
    <div className="detail-place"><span className={`detail-icon ${stop.theme}`}><Icon size={19} /></span><h3>{stop.place}</h3></div>
    <p className="detail-label">{stop.label}</p>
    <p className="detail-text">{stop.detail}</p>
    <dl>
      <div><dt>Переход</dt><dd>{stop.miles}</dd></div>
      <div><dt>Стоянка</dt><dd>{stop.mooring}</dd></div>
      <div><dt>На берегу</dt><dd>{stop.activity}</dd></div>
    </dl>
    <div className="detail-note"><Info size={15} /> {stop.note}</div>
  </aside>;
}

export default function Home() {
  const [scenario, setScenario] = useState<"primary" | "reserve">("primary");
  const [selectedId, setSelectedId] = useState("kumlu");
  const stops = scenario === "primary" ? primaryStops : reserveStops;
  const selectedStop = stops.find(stop => stop.id === selectedId) ?? stops[0];

  useEffect(() => { if (scenario === "reserve" && selectedId === "kumlu") setSelectedId("marmaris"); }, [scenario, selectedId]);
  const chooseScenario = (value: "primary" | "reserve") => { setScenario(value); setSelectedId(value === "primary" ? "kumlu" : "marmaris"); };
  const selectStop = (id: string) => setSelectedId(id);

  return <div className="min-h-screen overflow-x-hidden bg-[#f4f0e6] text-[#12384b]">
    <header className="site-header">
      <button className="brand" onClick={() => go("route-map")} aria-label="К карте маршрута"><img src={asset.mark} alt="" /><span><em>Курс</em> Ликии</span></button>
      <nav aria-label="Основная навигация"><button onClick={() => go("route-map")}>Карта</button><button onClick={() => go("journey")}>Стоянки</button><button onClick={() => go("excursions")}>Экскурсии</button></nav>
      <div className="header-date"><CalendarDays size={15} /> 3–10 октября · 2026</div>
    </header>

    <main>
      <section className="hero-section">
        <img className="hero-image" src={asset.hero} alt="Яхта идёт по побережью между Мармарисом и Гёчеком" />
        <div className="hero-veil" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-navigation" aria-hidden="true">
          <svg viewBox="0 0 640 340" fill="none" preserveAspectRatio="none"><path d="M28 90C125 62 171 191 280 169c93-18 125-98 203-65 49 21 71 58 130 45" stroke="rgba(255,253,246,.8)" strokeWidth="2" strokeDasharray="9 8" /><path d="M28 90C125 62 171 191 280 169c93-18 125-98 203-65 49 21 71 58 130 45" stroke="#E05D3A" strokeWidth="5" strokeDasharray="7 19" /></svg>
          <span className="hero-route-dot dot-one">01<small>MAR</small></span><span className="hero-route-dot dot-two">04<small>EKİ</small></span><span className="hero-route-dot dot-three">07<small>GÖC</small></span>
          <div className="hero-bearings"><span>ПЕЛЕНГ 072°</span><span>36° 49′ N / 28° 16′ E</span></div>
        </div>
        <div className="hero-content">
          <p className="eyebrow light"><span /> частный яхтенный план</p>
          <h1>Мармарис<br /><i>→</i> Гёчек</h1>
          <p className="hero-copy">Одна неделя по Ликийскому берегу: спокойные бухты, Каунос, Гемилер и финиш в марине до 17:00.</p>
          <div className="hero-actions"><button className="coral-button" onClick={() => go("route-map")}>Открыть карту <ArrowUpRight size={17} /></button><span className="hero-stat"><Sailboat size={17} /> 78–88 NM</span></div>
        </div>
        <div className="hero-note"><span>План на море</span><strong>6 ночей</strong><small>2 сценария старта</small></div>
      </section>

      <section className="intro-strip" aria-label="Ключевые условия маршрута">
        <div><span className="strip-icon"><Navigation size={18} /></span><p><b>Маршрут без гонки.</b> Переходы до 22 NM, основной день — не более 25 NM.</p></div>
        <div><span className="strip-icon"><Wind size={18} /></span><p><b>Погода принимает решение.</b> Каждый вечер — брифинг перед новой стоянкой.</p></div>
        <div><span className="strip-icon"><ShieldCheck size={18} /></span><p><b>Финиш защищён.</b> D‑Marin Göcek 9 октября, целевой приход в 14:00–15:00.</p></div>
      </section>

      <section id="route-map" className="map-section section-anchor">
        <div className="section-heading map-heading">
          <div><p className="eyebrow"><span /> маршрутная карта</p><h2>Выберите сценарий<br />и пройдите путь <i>по точкам.</i></h2></div>
          <div className="scenario-toggle" role="group" aria-label="Сценарий старта">
            <button className={scenario === "primary" ? "is-selected" : ""} onClick={() => chooseScenario("primary")}><b>03</b><span>Выход 16:00</span></button>
            <button className={scenario === "reserve" ? "is-selected" : ""} onClick={() => chooseScenario("reserve")}><b>04</b><span>Резерв 10:30</span></button>
          </div>
        </div>
        <div className="map-shell">
          <div className="map-frame">
            <RouteMap stops={stops} selectedId={selectedStop.id} onSelect={selectStop} />
            <div className="map-corner-title"><Compass size={15} /><span>Ликийское побережье</span></div>
            <div className="map-marginalia"><span>КУРС 072°</span><b>{stops.length.toString().padStart(2, "0")} ТОЧЕК</b><span>ПРИХОД 09.10</span></div>
            <svg className="chart-route-overlay" viewBox="0 0 600 530" aria-hidden="true"><path d="M80 424C94 373 157 370 191 323S243 239 293 260s78 14 103-38 58-79 115-104" /><circle cx="80" cy="424" r="7" /><circle cx="135" cy="366" r="7" /><circle cx="191" cy="323" r="7" /><circle cx="293" cy="260" r="7" /><circle cx="396" cy="222" r="7" /><circle cx="456" cy="156" r="7" /><circle cx="511" cy="118" r="7" /></svg>
            <div className="map-legend">{legend.map(item => { const Icon = item.icon; return <span key={item.label} className={item.theme}><Icon size={13} /> {item.label}</span>; })}</div>
            <div className="map-scale"><span>36° N</span><i /><span>28° E</span></div>
          </div>
          <Detail stop={selectedStop} />
        </div>
      </section>

      <section id="journey" className="journey-section section-anchor">
        <div className="section-heading journey-heading"><div><p className="eyebrow"><span /> лента пути</p><h2>Шесть ночей.<br /><i>Каждая — со своим смыслом.</i></h2></div><p>Нажмите на карточку, чтобы открыть точку на карте. Коралловый курс показывает выбранный сценарий.</p></div>
        <div className="route-rail" aria-hidden="true"><span /></div>
        <div className="stops-grid">{stops.map((stop, index) => { const Icon = icons[stop.theme]; return <button className={`stop-card ${stop.theme} ${selectedStop.id === stop.id ? "is-selected" : ""}`} key={`${scenario}-${stop.id}`} onClick={() => { selectStop(stop.id); go("route-map"); }}>
          <div className="stop-card-top"><span className={`sequence ${stop.theme}`}>{String(index + 1).padStart(2, "0")}</span><span className={`type-chip ${stop.theme}`}><Icon size={13} /> {stop.mooring}</span></div>
          <p className="stop-date">{stop.date}</p><h3>{stop.place}</h3><p className="stop-label">{stop.label}</p><div className="stop-bottom"><span>{stop.miles}</span><ChevronRight size={16} /></div>
        </button>; })}</div>
      </section>

      <section id="excursions" className="excursions-section section-anchor">
        <div className="section-heading excursion-heading"><div><p className="eyebrow"><span /> сход на берег</p><h2>Две экскурсии,<br /><i>ради которых стоит идти дальше.</i></h2></div><p>Маршрут оставляет для них место, но не превращает их в жёсткую обязанность: сначала безопасная постановка, затем — берег.</p></div>
        <div className="excursion-grid">
          <article className="excursion-card"><img src={asset.kaunos} alt="Река Дальян и скальные гробницы Кауноса" /><div className="card-shade" /><span className="photo-coordinate">36° 50′ N · день 03</span><div className="excursion-copy"><div className="image-tag">День 3 · 6–8 часов</div><h3>Каунос<br /><i>из Экынчика</i></h3><p>Речной катер, фасады скальных гробниц, античный театр и акрополь. Оставляем один день без перехода, чтобы пройти это спокойно.</p><div className="card-footer"><span><MapPinned size={15} /> Дальян</span><span><Waves size={15} /> Локальный катер</span></div></div></article>
          <article className="excursion-card"><img src={asset.gemiler} alt="Руины византийского поселения на острове Гемилер" /><div className="card-shade" /><span className="photo-coordinate">36° 33′ N · день 06</span><div className="excursion-copy"><div className="image-tag">День 6 · 2–3 часа</div><h3>Гемилер<br /><i>до сумерек</i></h3><p>Каменная тропа через церкви, цистерну и процессуальный коридор. Нужны закрытая обувь, вода и чёткое время возвращения.</p><div className="card-footer"><span><Footprints size={15} /> Неровная тропа</span><span><Anchor size={15} /> После постановки</span></div></div></article>
        </div>
      </section>

      <section className="weather-section"><div className="weather-copy"><p className="eyebrow light"><span /> погода — часть маршрута</p><h2>У моря нет<br /><i>«обязательной» точки.</i></h2><p>Октябрь добавляет мягкий свет и меньше лодок, но требует дисциплины. Если стоянка, ветер или свелл некомфортны — день сокращается, а не становится длиннее.</p></div><div className="weather-rules"><div><b>За 7–10 дней</b><span>Подтверждаем буи, трансфер в Дальян и марину Гёчека.</span></div><div><b>Каждое утро</b><span>Сверяем официальный морской прогноз, ветер, волну и видимость.</span></div><div><b>Каждый вечер</b><span>Ставим яхту до темноты и выбираем только следующую точку.</span></div></div></section>
    </main>
    <footer><div className="footer-brand"><img src={asset.mark} alt="" /><span><em>Курс</em> Ликии</span></div><p>Маршрут для команды · Мармарис—Гёчек · 3–10 октября 2026</p><p className="footer-note">Карта — планировочный инструмент, не замена навигационным картам, лоции и решению шкипера.</p></footer>
  </div>;
}
