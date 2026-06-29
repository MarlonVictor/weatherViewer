import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, Trash2, MapPin, Wind, Droplets, Thermometer, X, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';
import { WeatherIcon } from "../components/WeatherIcon";

const cn = (...classes) => classes.filter(Boolean).join(' ');

const appId = '1a788676b927fd9d836e736fd6e92e25';
const FAVS_KEY = "aurora.favorites.v1";

const DEFAULT_FAVORITES = ["Rio de Janeiro"];

function loadFavs() {
  if (typeof window === "undefined") return DEFAULT_FAVORITES;
  try {
    const raw = localStorage.getItem(FAVS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_FAVORITES;
  } catch {
    return DEFAULT_FAVORITES;
  }
}

function formatTemp(tempC, unit, short = false) {
  if (tempC === null || tempC === undefined) return "--";
  const val = unit === "C" ? tempC : unit === "F" ? tempC * 9 / 5 + 32 : tempC + 273.15;
  if (short) return `${Math.round(val)}°`;
  return `${Math.round(val)}${unit === "K" ? "K" : "°" + unit}`;
}

export default function WeatherDashboard() {
  const [unit, setUnit] = useState("C");
  const [query, setQuery] = useState("");
  const [favFilter, setFavFilter] = useState("");
  const [current, setCurrent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favData, setFavData] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState("");
  const [searchNotice, setSearchNotice] = useState(null);
  const searchNoticeTimer = useRef(null);

  const fetchBgImage = async (cityName, countryCode) => {
    try {
      let res = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`);
      if (res.data?.originalimage?.source) return res.data.originalimage.source;
    } catch (e) {}

    try {
      let res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`);
      if (res.data?.originalimage?.source) return res.data.originalimage.source;
    } catch (e) {}

    try {
      const countryName = new Intl.DisplayNames(['pt'], { type: 'region' }).of(countryCode);
      let res = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`);
      if (res.data?.originalimage?.source) return res.data.originalimage.source;
    } catch (e) {}
    
    return "";
  };

  useEffect(() => {
    if (current) {
      fetchBgImage(current.city, current.country).then(url => setBgImage(url));
    }
  }, [current]);

  useEffect(() => {
    setFavorites(loadFavs());
  }, []);

  useEffect(() => {
    try {
      if (favorites.length > 0) localStorage.setItem(FAVS_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    return () => {
      if (searchNoticeTimer.current) clearTimeout(searchNoticeTimer.current);
    };
  }, []);

  function showSearchNotice(message) {
    if (searchNoticeTimer.current) clearTimeout(searchNoticeTimer.current);
    setSearchNotice(message);
    searchNoticeTimer.current = setTimeout(() => setSearchNotice(null), 3500);
  }

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&lang=pt_br`);
      const data = res.data;
      return {
        city: data.name,
        country: data.sys.country,
        tempC: data.main.temp - 273.15,
        feelsLikeC: data.main.feels_like - 273.15,
        highC: data.main.temp_max - 273.15,
        lowC: data.main.temp_min - 273.15,
        windKmh: Math.round(data.wind.speed * 3.6),
        windDir: data.wind.deg + '°',
        humidity: data.main.humidity,
        dewPointC: data.main.temp - 273.15 - ((100 - data.main.humidity)/5),
        condition: data.weather[0].main,
        conditionLabel: data.weather[0].description
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    const favs = loadFavs();
    setFavorites(favs);
    
    const init = async () => {
      setLoading(true);
      const data = await fetchWeather(favs[0] || "Rio de Janeiro");
      if (data) setCurrent(data);
      setLoading(false);
      
      // Load favorites data
      const fData = {};
      for (const fav of favs) {
        const d = await fetchWeather(fav);
        if (d) fData[fav] = d;
      }
      setFavData(fData);
    };
    init();
  }, []);

  const isFavorite = current ? favorites.includes(current.city) : false;

  const favoriteSnapshots = useMemo(() => {
    return favorites
      .map((name) => favData[name] || { city: name, tempC: null, condition: 'Clear', country: '' })
      .filter((c) => c.city.toLowerCase().includes(favFilter.trim().toLowerCase()));
  }, [favorites, favFilter, favData]);

  async function selectCity(cityName) {
    const data = await fetchWeather(cityName);
    if (data) {
      setCurrent(data);
      setQuery("");
      setShowSuggestions(false);
    } else {
      showSearchNotice("Cidade não encontrada. Verifique o nome e tente novamente.");
    }
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await fetchWeather(query);
    if (data) {
      setCurrent(data);
      setQuery("");
      setShowSuggestions(false);
    } else {
      showSearchNotice("Cidade não encontrada. Verifique o nome e tente novamente.");
    }
  }

  async function toggleFavorite() {
    if (!current) return;
    setFavorites((prev) => {
      const isFav = prev.includes(current.city);
      if (isFav) {
        return prev.filter((c) => c !== current.city);
      } else {
        const next = [...prev, current.city];
        if (!favData[current.city]) {
          setFavData((fd) => ({ ...fd, [current.city]: current }));
        }
        return next;
      }
    });
  }

  function removeFavorite(city) {
    setFavorites((prev) => prev.filter((c) => c !== city));
  }

  const savedCityItems = favoriteSnapshots.map((snap) => {
    const active = current && snap.city === current.city;
    return (
      <div
        key={snap.city}
        className={cn(
          "group flex items-center justify-between p-3 rounded-xl ring-1 transition-all cursor-pointer",
          active
            ? "bg-white/10 ring-white/20 shadow-sm"
            : "bg-transparent ring-transparent hover:bg-white/5 hover:ring-white/10",
        )}
        onClick={() => selectCity(snap.city)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <WeatherIcon
            condition={snap.condition}
            className="size-5 shrink-0 text-muted-foreground"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{snap.city}</p>
            <p className="text-xs text-muted-foreground truncate">{snap.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "text-sm font-medium tabular-nums",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {formatTemp(snap.tempC, unit, true)}
          </span>
          <button
            type="button"
            aria-label={`Remover ${snap.city} dos favoritos`}
            onClick={(e) => {
              e.stopPropagation();
              removeFavorite(snap.city);
            }}
            className="p-1 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition lg:opacity-0 lg:group-hover:opacity-100"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    );
  });

  const emptyFavoritesMessage =
    favorites.length === 0
      ? "Nenhuma cidade salva ainda. Toque na estrela para favoritar."
      : "Nenhum resultado para esse filtro.";

  return (
    <div className="min-h-screen lg:h-full flex flex-col lg:flex-row bg-background text-foreground relative overflow-x-hidden lg:overflow-hidden">
      {bgImage && (
        <>
          <div
            className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 blur-sm scale-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="fixed inset-0 z-0 bg-black/40" />
        </>
      )}

      <main className="flex-1 flex flex-col min-w-0 min-h-0 relative z-10 lg:overflow-hidden">
        <header className="px-4 sm:px-6 lg:px-10 py-3 lg:h-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-20 shrink-0">
          <form onSubmit={handleSearchSubmit} className="w-full sm:flex-1 sm:max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cidade..."
              className="w-full bg-black/40 border border-white/10 py-2.5 pl-11 pr-10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/50 shadow-sm transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpar"
              >
                <X className="size-4" />
              </button>
            )}
            <AnimatePresence>
              {searchNotice && (
                <motion.div
                  key="search-notice"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 px-4 py-3 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-2.5"
                  role="alert"
                >
                  <AlertCircle className="size-4 text-rose-300 shrink-0" />
                  <p className="text-sm text-white/90">{searchNotice}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="flex items-center justify-end sm:justify-start shrink-0">
            <div className="flex bg-black/40 p-1 rounded-xl ring-1 ring-white/10 shadow-inner relative h-[2.5rem] sm:h-[2.625rem]">
              {["C", "F", "K"].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={cn(
                    "relative px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors z-10",
                    unit === u
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {unit === u && (
                    <motion.div
                      layoutId="active-unit"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {u === "K" ? "K" : `°${u}`}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="flex-1 min-h-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-4 xl:py-10 lg:overflow-hidden flex flex-col justify-center">
          {loading || !current ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-white/70">
              Carregando...
            </div>
          ) : (
            <div className="max-w-4xl w-full mx-auto">
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left gap-6 lg:gap-10">
                <div className="w-full min-w-0 flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 justify-center lg:justify-start flex-wrap">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-muted-foreground">
                      {current.city}, {current.country}
                    </h1>
                    <button
                      type="button"
                      onClick={toggleFavorite}
                      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      aria-pressed={isFavorite}
                      className={cn(
                        "p-1.5 rounded-xl transition hover:scale-105",
                        isFavorite
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Star
                        className="size-5"
                        fill={isFavorite ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  <div className="size-24 sm:size-28 lg:hidden bg-black/30 ring-1 ring-white/10 rounded-xl shadow-xl grid place-items-center backdrop-blur-md mb-4">
                    <WeatherIcon
                      condition={current.condition}
                      className="size-14 sm:size-16 text-primary"
                    />
                  </div>

                  <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-3">
                    <span className="text-[4.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[10rem] font-bold text-white leading-none tracking-tighter tabular-nums drop-shadow-md">
                      {Math.round(
                        unit === "C"
                          ? current.tempC
                          : unit === "F"
                            ? current.tempC * 9 / 5 + 32
                            : current.tempC + 273.15,
                      )}
                      <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-primary align-top ml-1 sm:ml-2">
                        {unit === "K" ? "K" : `°${unit}`}
                      </span>
                    </span>
                    <div className="flex flex-col items-center lg:items-start gap-1">
                      <span className="text-lg sm:text-xl lg:text-3xl font-medium text-primary capitalize">
                        {current.conditionLabel}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Máxima de {formatTemp(current.highC, unit)} • Mínima de{" "}
                        {formatTemp(current.lowC, unit)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex justify-end shrink-0">
                  <div className="size-40 xl:size-48 bg-black/30 ring-1 ring-white/10 rounded-xl shadow-xl grid place-items-center backdrop-blur-md">
                    <WeatherIcon
                      condition={current.condition}
                      className="size-24 xl:size-28 text-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-4 xl:gap-6 mt-8 lg:mt-6 xl:mt-12">
                <MetricCard
                  icon={<Thermometer className="size-4" />}
                  label="Sensação Térmica"
                  value={formatTemp(current.feelsLikeC, unit)}
                  detail={
                    current.feelsLikeC > current.tempC
                      ? "Levemente mais quente devido à umidade."
                      : current.feelsLikeC < current.tempC
                        ? "Sensação mais fria por causa do vento."
                        : "Equivalente à temperatura real."
                  }
                />
                <MetricCard
                  icon={<Wind className="size-4" />}
                  label="Velocidade do Vento"
                  value={`${current.windKmh} km/h`}
                  detail={`Direção ${current.windDir}.`}
                />
                <MetricCard
                  icon={<Droplets className="size-4" />}
                  label="Umidade do Ar"
                  value={`${current.humidity}%`}
                  detail={`Ponto de orvalho em ${formatTemp(current.dewPointC, unit)}.`}
                />
              </div>
            </div>
          )}
        </section>
      </main>

      <aside className="w-[calc(100%-2rem)] mx-4 mb-[max(1rem,env(safe-area-inset-bottom))] lg:w-80 lg:mx-0 lg:mr-4 lg:my-4 lg:shrink-0 lg:min-h-0 bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col relative z-10 rounded-xl shadow-2xl lg:h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-2rem)] lg:overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10 shrink-0">
          <h2 className="text-[11px] font-medium text-white/70 tracking-[0.18em] uppercase mb-3 sm:mb-4">
            Cidades Salvas
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/50" />
            <input
              type="text"
              value={favFilter}
              onChange={(e) => setFavFilter(e.target.value)}
              placeholder="Filtrar favoritos..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/50 shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-1.5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain favorites-scroll">
          {favoriteSnapshots.length === 0 && (
            <p className="text-xs text-muted-foreground px-3 py-4 sm:py-6 text-center">
              {emptyFavoritesMessage}
            </p>
          )}
          {savedCityItems}
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] shrink-0">
          {favorites.length} {favorites.length === 1 ? "cidade" : "cidades"}
        </div>
      </aside>
    </div>
  );
}

function MetricCard({ icon, label, value, detail }) {
  return (
    <div className="bg-black/30 p-4 sm:p-5 lg:p-4 xl:p-6 rounded-xl ring-1 ring-white/10 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 mb-3 sm:mb-4 text-white/70">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-xl sm:text-2xl lg:text-3xl font-medium tabular-nums text-white">{value}</p>
      <p className="text-xs text-white/50 mt-1.5 text-pretty">{detail}</p>
    </div>
  );
}