<script>
    import { onMount } from "svelte";
    import Map from "ol/Map";
    import TileLayer from "ol/layer/Tile";
    import View from "ol/View";
    import { defaults as defaultControls, FullScreen } from "ol/control";
    import XYZ from "ol/source/XYZ";

    let map;

    onMount(() => {
        this.map = new Map({
            controls: defaultControls().extend([new FullScreen()]),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    }),
                }),
            ],
            target: "map",
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });
    });
</script>

<div id="map"></div>

<style>
    #map {
        height: 100%;
        width: 100%;
    }
</style>
