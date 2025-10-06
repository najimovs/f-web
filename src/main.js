import "@app/ui.css"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl"

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibmFqaW1vdiIsImEiOiJjbTBnbWJ3ZGwwMXdqMnFyMXlxY3FsaTJ6In0.TWo-dOdTkiREW-ugZQevpw"

const map = new mapboxgl.Map( {
	accessToken: MAPBOX_ACCESS_TOKEN,
	container: "map",
	center: [ 69.24842475092007, 41.31645300793667 ],
	zoom: 9,
	hash: true,
} )



map.on( "load", () => {

	const button = document.querySelector( "button" )

	button.onclick = () => {

		const onSucess = position => {

			const { longitude, latitude } = position.coords

			const myPoint = { // GeoJSON
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [ longitude, latitude ],
				},
			}

			map.addSource( "myPoint", { type: "geojson", data: myPoint } )

			map.addLayer( {
				id: "myPoint",
				source: "myPoint",
				type: "circle",
				paint: {
					"circle-radius": 10,
					"circle-color": "#ff00ff",
					"circle-stroke-width": 4,
					"circle-stroke-color": "#ffffff",
				}
			} )

			map.flyTo( {
				center: [ longitude, latitude ],
				essential: true,
			} )

			console.log( "Successfull" )
		}

		const onError = error => {

			console.log( error )
		}

		navigator.geolocation.getCurrentPosition( onSucess, onError )
	}
} )
