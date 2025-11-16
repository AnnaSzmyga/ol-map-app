# Aplikacja mapowa – OpenLayers + React + TypeScript + ol-ext + Vite

Aplikacja prezentuje interaktywną mapę Polski z wykorzystaniem OpenLayers, danych GeoJSON oraz wykresów kołowych generowanych przez ol-ext. Projekt został zbudowany w React + TypeScript i zawiera prosty interfejs do zarządzania widocznością warstw.

## Funkcjonalności

### Mapa OSM (OpenStreetMap)

- Mapa ładuje się na pełnym ekranie.
- Widok został ograniczony do granic Polski.
- Obszar poza granicami Polski jest zakryty maską (półprzezroczysty poligon).

### Warstwy GeoJSON

Aplikacja wczytuje dwie warstwy:

1. Województwa (wojewodztwa.geojson)

- Dane w formacie GeoJSON z projekcją EPSG:4258, konwertowane do EPSG:3857.
- Każde województwo ma właściwości: dane1, dane2, dane3, dane4.

2. Linie (linie.geojson)

- Warstwa zawiera dane liniowe.
- Dane w formacie GeoJSON z projekcją EPSG:2180, konwertowane do EPSG:3857.

### Wykresy kołowe na warstwie województw

- Wykorzystano ol-ext/style/Chart.
- Dla każdego województwa renderowany jest wykres kołowy oparty na wartościach dane1–dane4.
- Wykres umieszczony jest w środku geometrii województwa.
- Aplikacja zawiera legendę opisującą kolory wykresu i odpowiadające im dane.

### Włączanie i wyłączanie warstw

- Aplikacja posiada przycisk „Pokaż warstwy / Ukryj warstwy”.
- Użytkownik może włączać i wyłączać dwie warstwy: warstwę województw i warstwę linii.
- Warstwa OSM oraz maska są zawsze aktywne.

## Technologie

- React + TypeScript
- Vite
- OpenLayers
- ol-ext
- GeoJSON

## Struktura projektu

```css
public/
│── data/
│ ├── wojewodztwa.geojson
│ └── linie.geojson
src/
│── components/
│ └── MapView.tsx
│── utils/
│ ├── layers.ts
│ └── createMaskLayer.ts
│── App.tsx
│── main.tsx
│── constants.ts
│── index.css
└── index.html
```

## Uruchomienie projektu

1. Instalacja zależności

```nginx
npm install
```

2. Uruchomienie projektu w trybie developerskim

```nginx
npm run dev
```

3. Aplikacja będzie dostępna pod http://localhost:5173/

## Przykładowe zastosowania

Projekt demonstruje:

- pracę z danymi przestrzennymi,
- konwersję układów współrzędnych,
- tworzenie niestandardowych styli w OpenLayers,
- obsługę wielu warstw mapowych,
- integrację OpenLayers z React i TypeScript.

## Możliwe rozszerzenia

- Popup z informacjami o danych po kliknięciu na pojedyncze województwo lub wykres
- Optymalizacja płynności działania poligonu
- Animacje przy włączaniu/wyłączaniu warstw

## Licencja

Projekt stworzony jako rozwiązanie zadania rekrutacyjnego.
Dane GeoJSON dostarczone przez organizatora zadania.
