let mptok = map_token;
mapboxgl.accessToken = mptok;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: lst.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});


const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(lst.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${lst.title}</h4> <p>Exact Location will be provided after booking </p>`
    ))
    .addTo(map);