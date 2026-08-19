/** DESIGN MEMORY — “Штурманский стол”: route facts power every map and card. */
export type StopTheme = "anchor" | "buoy" | "marina" | "shore";

export type Stop = {
  id: string;
  date: string;
  day: string;
  place: string;
  coordinates: { lat: number; lng: number };
  miles: string;
  mooring: "Якорь" | "Буй" | "Марина" | "Якорь + береговой конец";
  label: string;
  note: string;
  detail: string;
  activity: string;
  theme: StopTheme;
};

export const primaryStops: Stop[] = [
  {
    id: "marmaris", date: "3 октября · 16:00", day: "Старт", place: "Мармарис",
    coordinates: { lat: 36.852, lng: 28.273 }, miles: "0 NM", mooring: "Марина", theme: "marina",
    label: "Выход из базы", note: "Короткий вечерний переход; берег оставляем до сумерек.",
    detail: "Приёмка яхты занимает утро и ранний день. Выход — только после брифинга экипажа и проверки снабжения.",
    activity: "Закупки и настройка команды",
  },
  {
    id: "kumlu", date: "3 октября · вечер", day: "День 1", place: "Кюмлюбюк",
    coordinates: { lat: 36.729, lng: 28.253 }, miles: "5–7 NM", mooring: "Якорь", theme: "anchor",
    label: "Короткая первая ночь", note: "Только при спокойном E–SE прогнозе и безопасном дневном заходе.",
    detail: "Не пытаемся успеть экскурсию. Вечер нужен, чтобы спокойно встать, поужинать и войти в ритм моря.",
    activity: "Купание и тихий ужин на борту",
  },
  {
    id: "ekincik", date: "4–5 октября", day: "Дни 2–3", place: "Экынчик",
    coordinates: { lat: 36.828, lng: 28.555 }, miles: "16–19 NM", mooring: "Якорь + береговой конец", theme: "shore",
    label: "Две ночи и день Кауноса", note: "Главный экскурсионный резерв маршрута.",
    detail: "Яхта остаётся в бухте, а команда едет на заранее заказанном речном катере в Дальян и Каунос. Частный тузик по реке не планируем.",
    activity: "Каунос · Дальян · скальные гробницы",
  },
  {
    id: "aga", date: "6 октября", day: "День 4", place: "Ага-Лиманы",
    coordinates: { lat: 36.62, lng: 28.873 }, miles: "20–22 NM", mooring: "Якорь + береговой конец", theme: "anchor",
    label: "Тихая защищённая стоянка", note: "Длинный, но комфортный дневной переход после экскурсии.",
    detail: "День про море, купание и ранний ужин. Ставим яхту без спешки и сохраняем силы на следующий участок.",
    activity: "Каяк, купание, ужин на палубе",
  },
  {
    id: "sarsala", date: "7 октября", day: "День 5", place: "Сарсала",
    coordinates: { lat: 36.714, lng: 28.955 }, miles: "8–11 NM", mooring: "Буй", theme: "buoy",
    label: "Официальный экологический буй", note: "Буй подтверждаем заранее; сначала швартовка, потом прогулка.",
    detail: "Самый лёгкий переход недели. Оставляем пространство для восстановления, купания и короткой прогулки по берегу.",
    activity: "Пляж, вода и пауза без расписания",
  },
  {
    id: "gemiler", date: "8 октября", day: "День 6", place: "Гемилер",
    coordinates: { lat: 36.558, lng: 29.062 }, miles: "12–15 NM", mooring: "Якорь + береговой конец", theme: "shore",
    label: "Византийские руины на острове", note: "Высадка только после устойчивой постановки и с возвратом до темноты.",
    detail: "Прогулка занимает 2–3 часа: нижние руины, цистерна, процессуальный коридор и верхняя церковь. Нужна закрытая обувь.",
    activity: "Остров Гемилер · тропа и руины",
  },
  {
    id: "gocek", date: "9 октября · до 17:00", day: "Финиш", place: "D‑Marin Göcek",
    coordinates: { lat: 36.748, lng: 28.942 }, miles: "12–14 NM", mooring: "Марина", theme: "marina",
    label: "Финиш с запасом по времени", note: "Целевой приход 14:00–15:00; формальный дедлайн — 17:00.",
    detail: "Сдаём яхту без аврала. Вечер оставляем на набережную, душ и спокойную упаковку перед трансфером в аэропорт утром 10 октября.",
    activity: "Прогулка по набережной и финальный ужин",
  },
];

export const reserveStops: Stop[] = primaryStops.filter(stop => stop.id !== "kumlu").map(stop => {
  if (stop.id === "marmaris") return { ...stop, date: "4 октября · 10:30", day: "Резервный старт", label: "Утренний выход из базы", note: "При задержке приёмки ночуем в марине и стартуем утром." };
  if (stop.id === "ekincik") return { ...stop, miles: "20–22 NM", label: "Прямой приход из Мармариса" };
  return stop;
});
