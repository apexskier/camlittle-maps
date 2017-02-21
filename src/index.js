import mapboxgl from "mapbox-gl";

import "./main.css";

const dataFiles = [
    "aishas-walk-in-to-lizard-lake.geojson",
    "aishas-walk-lilylizard.geojson",
    "aishas-walk-lizard-lake-to-lost-lake.geojson",
    "aishas-walk-lost-lake-to-home.geojson",
    "annette-lake.geojson",
    "artist-point.geojson",
    "baker-lake.geojson",
    "bear-creek.geojson",
    "bellingham-circuit.geojson",
    "big-tree-trail.geojson",
    "boulder-river.geojson",
    "cameron-basin.geojson",
    "camp-pan-to-hoh-river-via-blue-glacier.geojson",
    "camp-waskowitz.geojson",
    "canyon-creek.geojson",
    "carbon-river.geojson",
    "cedar-obstruction.geojson",
    "cedar-ponds.geojson",
    "chain-lakes.geojson",
    "chuckanut-ridge.geojson",
    "coal-creek.geojson",
    "corn-maze.geojson",
    "deer-park-hike-in.geojson",
    "fairchild-basin-to-stephen-lake.geojson",
    "ferry-basin-to-queets-basin.geojson",
    "franklin-falls.geojson",
    "geronimos-cave.geojson",
    "gothic-basin-via-weder-creek.geojson",
    "ingalls-creek.geojson",
    "ira-spring-trail-to-mason-lake.geojson",
    "knapsack-pass-to-mount-pleasant-to-spray-park.geojson",
    "lake-angeles.geojson",
    "lake-serene-trailhead-to-lunch-rock-snohomish-county-wa.geojson",
    "lily-lake.geojson",
    "lime-kiln-trail.geojson",
    "little-mt-si.geojson",
    // "little-si-and-rock-garden-loop.geojson",
    "little-si.geojson",
    "little-summit-to-mount-constitution.geojson",
    "lopez-island-bike-ride-2.geojson",
    "lopez-island-bike-ride-3.geojson",
    "lopez-island-bike-ride.geojson",
    "melakwa-lake.geojson",
    "morse-creek-to-lake-creek-to-oscars-gulch.geojson",
    "mount-si-talus-loop.geojson",
    "mount-st-helens-hike-in.geojson",
    "mount-st-helens-hike-out.geojson",
    "mount-st-helens-true-summit.geojson",
    "mount-st-helens-walk.geojson",
    "onp-overlook.geojson",
    "onp.geojson",
    "organ-mountains.geojson",
    "parents-to-onp.geojson",
    "poo-poo-point.geojson",
    "puyallup-river-ride.geojson",
    "queets-to-camp-pan-via-humes-glacier.geojson",
    "raptor-ridge.geojson",
    "rattlesnake-lake-trailhead-to-rattlesnake-ledge-wa-usa.geojson",
    "rattlesnake-ridge.geojson",
    "seven-lakes-basin-canyon-creek-1-in.geojson",
    "seven-lakes-basin-canyon-creek-1-to-lower-bridge-creek.geojson",
    "seven-lakes-basin-lower-bridge-creek-out.geojson",
    "silver-creek-2.geojson",
    "silver-creek.geojson",
    "sky-country-trailhead-pinnacle.geojson",
    "snoquera-falls.geojson",
    "soleduck-falls-to-swimming-bear-lake.geojson",
    "stephen-lake-to-ferry-basin.geojson",
    "swimming-bear-lake-to-ferry-basin-via-mount-carrie.geojson",
    "switchback-trail-to-klahhane-ridge.geojson",
    "talapus-and-olallie-lakes.geojson",
    "teneriffe-falls.geojson",
    "thunder-creek.geojson",
    "tiger-mountain-mushroom-hunting.geojson",
    "tomyhoi-peak-ascent.geojson",
    "tomyhoi-peak-descent.geojson",
    "tomyhoi-peak-scramble.geojson",
    "twin-falls.geojson",
    "wallace-falls.geojson",
    "waptus-lake-early-season.geojson",
    "yellow-hills-to-middle-fork-teanaway-day-1.geojson",
    "yellow-hills-to-middle-fork-teanaway-day-2.geojson",
    "yellow-hills-to-middle-fork-teanaway-day-3.geojson",
];

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const map = new mapboxgl.Map({
    container: "map",
    style: process.env.MAPBOX_STYLE,
    hash: true,
    center: [-121.803, 47.557],
    zoom: 7,
});

map.on("load", () => {
    window.dispatchEvent(new Event("resize"));
    const mapEl = document.getElementById("map");
    mapEl.style.visibility = "visible";
    mapEl.style.opacity = 1;

    dataFiles.forEach(filename => {
        const data = Object.assign({}, require(`./data/${filename}`)); // eslint-disable-line global-require, import/no-dynamic-require
        data.features[0].geometry.coordinates[0] = data.features[0].geometry.coordinates[0].map(c => [c[0], c[1], c[2]]);
        map.addSource(filename, {
            type: "geojson",
            data,
        });

        map.addLayer({
            id: filename,
            type: "line",
            source: filename,
            layer: {
                "line-cap": "round",
            },
            paint: {
                "line-color": "#ff1c9c",
                "line-width": 4,
            },
        });
    });
});
