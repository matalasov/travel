import { RouteMap } from "@/components/RouteMap";
import { actualStops, routePrinciples, type Stop, type StopTheme } from "@/lib/routeData";
import {
  Anchor,
  ArrowDown,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Camera,
  ChevronRight,
  Compass,
  Footprints,
  Info,
  MapPinned,
  Navigation,
  Sailboat,
  Sparkles,
  Utensils,
  Waves,
  Wind,
} from "lucide-react";
import { useState } from "react";

const image = (productionName: string, previewPath: string) =>
  import.meta.env.DEV ? previewPath : `${import.meta.env.BASE_URL}images/${productionName}`;

const asset = {
  mark: image("kurs-likii-mark.webp", "/manus-storage/kurs-likii-mark_5f5a5537.png"),
  hero: image("route-hero.webp", "/manus-storage/turkey-yacht-route-hero_439461a6.jpg"),
  dalyan: image("dalyan-kaunos.webp", "/manus-storage/dalyan-kaunos-experience_9d7447e8.jpg"),
  gocek: image("gocek-swim.webp", "/manus-storage/gocek-swim-experience_c64f98e2.jpg"),
  asi: image("asi-koyu-evening.webp", "/manus-storage/asi-koyu-evening_dd2df53f.jpg"),
};

const icons = { anchor: Anchor, marina: Building2, shore: Footprints } as const;
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

// Add future uploaded photos to `slots`; each day keeps three visual moments ready for the crew's images.
const dayPhotos = [
  { date: "03.10", place: "Чифтлик", title: "Первый закат", slots: [undefined, undefined, undefined] },
  { date: "04.10", place: "Экынчик", title: "Первый парус", slots: [undefined, undefined, undefined] },
  { date: "05.10", place: "Дальян и Каунос", title: "Река и античность", slots: [undefined, undefined, undefined] },
  { date: "06.10", place: "Гёчек", title: "Бирюзовая пауза", slots: [undefined, undefined, undefined] },
  { date: "07.10", place: "Фетхие", title: "Вечер в марине", slots: [undefined, undefined, undefined] },
  { date: "08.10", place: "Аши-Койю", title: "Ночь на оттяжке", slots: [undefined, undefined, undefined] },
  { date: "09.10", place: "Мармарис", title: "Финальный берег", slots: [undefined, undefined, undefined] },
] as const;

function Detail({ stop }: { stop: Stop }) {
  const Icon = icons[stop.theme];
  return <aside className="stop-detail" aria-live="polite">
    <div className="detail-topline"><span>{stop.day}</span><span>{stop.date}</span></div>
    <div className="detail-place"><span className={`detail-icon ${stop.theme}`}><Icon size={18} /></span><h3>{stop.place}</h3></div>
    <p className="detail-label">{stop.label}</p>
    <p className="detail-text">{stop.detail}</p>
    <dl>
      <div><dt>Переход</dt><dd>{stop.passage}</dd></div>
      <div><dt>Стоянка</dt><dd>{stop.mooring}</dd></div>
      <div><dt>Главное</dt><dd>{stop.activity}</dd></div>
    </dl>
    <div className="detail-note"><Info size={15} /> {stop.note}</div>
  </aside>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("ciftlik");
  const selectedStop = actualStops.find(stop => stop.id === selectedId) ?? actualStops[0];

  return <div className="site-shell">
    <header className="site-header">
      <button className="brand" onClick={() => go("top")} aria-label="Наверх страницы"><img src={asset.mark} alt="" /><span><em>Курс</em> Ликии</span></button>
      <nav aria-label="Основная навигация">
        <button onClick={() => go("route-map")}>Маршрут</button>
        <button onClick={() => go("experience")}>Впечатления</button>
        <button onClick={() => go("repeat")}>Как повторить</button>
      </nav>
      <div className="header-date"><CalendarDays size={15} /> 03–09 октября · 2026</div>
    </header>

    <main id="top">
      <section className="hero-section">
        <img className="hero-image" src={asset.hero} alt="Парусная яхта у Ликийского побережья" />
        <div className="hero-veil" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow light"><span /> фактический маршрут · Турция</p>
          <h1>Одна неделя.<br /><i>Целое море</i><br />внутри.</h1>
          <p className="hero-copy">Мармарис → Экынчик → Гёчек → Фетхие → Аши-Койю → Мармарис. Реальный поход, в котором паруса, античность, чистая вода и ужины у моря сложились в одну историю.</p>
          <div className="hero-actions"><button className="coral-button" onClick={() => go("route-map")}>Пройти маршрут <ArrowDown size={17} /></button><span className="hero-stat"><Sailboat size={17} /> 7 дней · 6 ночей на воде</span></div>
        </div>
        <div className="hero-note"><span>Ветер в парусах</span><strong>10–15 узлов</strong><small>в нужные дни</small></div>
      </section>

      <section className="intro-strip" aria-label="Почему этот маршрут работает">
        <div><span className="strip-icon"><Waves size={18} /></span><p><b>Не торопиться.</b> Переходы оставляют место для купания, паруса и длинного вечера.</p></div>
        <div><span className="strip-icon"><Compass size={18} /></span><p><b>Менять план по ходу.</b> Лучшие точки маршрута иногда открываются только после выхода в море.</p></div>
        <div><span className="strip-icon"><Sparkles size={18} /></span><p><b>Собирать впечатления.</b> Якорь, ресторанная марина, руины, город и ужин на палубе — в одной неделе.</p></div>
      </section>

      <section id="route-map" className="map-section section-anchor">
        <div className="section-heading map-heading">
          <div><p className="eyebrow"><span /> путь, который случился</p><h2>Не план на бумаге.<br /><i>Настоящая неделя на воде.</i></h2></div>
          <p className="section-sidecopy">Восемь точек, шесть ночей и один маршрут, который можно взять за основу собственного похода.</p>
        </div>
        <div className="map-shell">
          <div className="map-frame">
            <RouteMap stops={actualStops} selectedId={selectedStop.id} onSelect={setSelectedId} />
            <div className="map-corner-title"><Compass size={15} /><span>Ликийское побережье</span></div>
            <div className="map-marginalia"><span>МАРМАРИС</span><b>08 ТОЧЕК</b><span>ФЕТХИЕ</span></div>
            <div className="map-legend"><span className="anchor"><Anchor size={13} /> Якорь и оттяжка</span><span className="marina"><Building2 size={13} /> Марина и причал</span><span className="shore"><Footprints size={13} /> Сход на берег</span></div>
          </div>
          <Detail stop={selectedStop} />
        </div>
      </section>

      <section id="journey" className="journey-section section-anchor">
        <div className="section-heading journey-heading"><div><p className="eyebrow"><span /> лента реального пути</p><h2>Каждая ночь<br /><i>со своим настроением.</i></h2></div><p>Нажмите на карточку — и точка откроется на карте.</p></div>
        <div className="route-rail" aria-hidden="true"><span /></div>
        <div className="stops-grid">{actualStops.map((stop, index) => {
          const Icon = icons[stop.theme];
          return <button className={`stop-card ${stop.theme} ${selectedStop.id === stop.id ? "is-selected" : ""}`} key={stop.id} onClick={() => { setSelectedId(stop.id); go("route-map"); }}>
            <div className="stop-card-top"><span className={`sequence ${stop.theme}`}>{String(index + 1).padStart(2, "0")}</span><span className={`type-chip ${stop.theme}`}><Icon size={13} /> {stop.mooring}</span></div>
            <p className="stop-date">{stop.date}</p><h3>{stop.place}</h3><p className="stop-label">{stop.label}</p><div className="stop-bottom"><span>{stop.passage}</span><ChevronRight size={16} /></div>
          </button>;
        })}</div>
      </section>

      <section className="gallery-section section-anchor" aria-label="Фотодневник маршрута">
        <div className="section-heading gallery-heading"><div><p className="eyebrow"><span /> фотодневник команды</p><h2>Три кадра<br /><i>на каждый день.</i></h2></div><p>21 слот уже ждёт настоящие фотографии команды: атмосфера, люди и главный момент каждого дня маршрута.</p></div>
        <div className="gallery-grid">{dayPhotos.map(photo => <article className="day-gallery-card" key={photo.date}>
          <div className="day-gallery-head"><span>{photo.date} · {photo.place}</span><h3>{photo.title}</h3></div>
          <div className="day-photo-slots">{photo.slots.map((src, index) => <div className={`day-photo-slot ${src ? "has-photo" : ""}`} key={`${photo.date}-${index}`}>
            {src ? <img src={src} alt={`${photo.place}: фотография ${index + 1}`} /> : <div className="photo-placeholder"><Camera size={21} /><small>Кадр {index + 1}</small></div>}
          </div>)}</div>
        </article>)}</div>
      </section>

      <section id="experience" className="experience-section section-anchor">
        <div className="section-heading experience-heading"><div><p className="eyebrow"><span /> ради чего идти</p><h2>Паруса. Вода.<br /><i>И истории, которые остаются.</i></h2></div><p>Маршрут устроен не как список бухт, а как чередование совершенно разных дней.</p></div>
        <div className="experience-grid">
          <article className="experience-card feature"><img src={asset.dalyan} alt="Речной катер у ликийских гробниц Дальяна" /><div className="card-shade" /><div className="experience-copy"><span className="image-tag">День 3 · Дальян и Каунос</span><h3>Поменять<br /><i>море на реку.</i></h3><p>Камышовые протоки, фасады ликийских гробниц, древний город, голубые крабы и обед в месте, куда хочется вернуться.</p><div className="card-footer"><span><MapPinned size={15} /> Экынчик → Дальян</span><span><Footprints size={15} /> Руины Кауноса</span></div></div></article>
          <article className="experience-card"><img src={asset.gocek} alt="Яхта и купание в бирюзовой воде залива Гёчека" /><div className="card-shade" /><div className="experience-copy"><span className="image-tag">День 4 · Гёчек</span><h3>Нырнуть<br /><i>в бирюзу.</i></h3><p>Купание, водная активность и ужин в марине — день, в котором не нужно выбирать между яхтой и берегом.</p><div className="card-footer"><span><Waves size={15} /> Вода весь день</span><span><Utensils size={15} /> Ужин у причала</span></div></div></article>
          <article className="experience-card"><img src={asset.asi} alt="Яхта на оттяжке вечером в бухте Аши-Койю" /><div className="card-shade" /><div className="experience-copy"><span className="image-tag">Ночь 6 · Аши-Койю</span><h3>Закончить<br /><i>на палубе.</i></h3><p>Пятнадцать узлов в парусах, швартовка на оттяжке и последний ужин в бухте перед возвращением в Мармарис.</p><div className="card-footer"><span><Wind size={15} /> Парусный ход</span><span><Anchor size={15} /> Ночь у берега</span></div></div></article>
        </div>
      </section>

      <section className="principles-section">
        <div className="principles-intro"><p className="eyebrow"><span /> почему маршрут хочется повторить</p><h2>Свобода —<br /><i>когда есть хороший ритм.</i></h2><p>Это готовый сценарий для команды, которая хочет не закрывать мили, а прожить красивую неделю у моря.</p></div>
        <div className="principles-list">{routePrinciples.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section id="repeat" className="repeat-section section-anchor">
        <div className="repeat-card"><div><p className="eyebrow light"><span /> для будущей команды</p><h2>Возьмите этот<br /><i>путь за основу.</i></h2><p>Стартуйте из Мармариса. Дайте себе первую якорную ночь. Оставьте день Дальяну и Кауносу. Не отказывайтесь от Гёчека и Фетхие, если море приглашает идти дальше. А последнюю бухту выберите под ветер и настроение команды.</p></div><div className="repeat-rules"><div><b>1</b><span>Оставьте свободные окна: именно они превращают маршрут в путешествие.</span></div><div><b>2</b><span>Чередуйте якорь, марину и ресторанный причал — в этом ритм недели.</span></div><div><b>3</b><span>На финал закладывайте запас на топливо, очередь и ещё одно купание.</span></div><button className="coral-button light-button" onClick={() => go("route-map")}>Смотреть маршрут <ArrowUpRight size={17} /></button></div></div>
      </section>
    </main>
    <footer><div className="footer-brand"><img src={asset.mark} alt="" /><span><em>Курс</em> Ликии</span></div><p>Мармарис · Экынчик · Гёчек · Фетхие · Аши-Койю · Мармарис</p><p className="footer-note">Маршрут, который хочется повторить.</p></footer>
  </div>;
}
