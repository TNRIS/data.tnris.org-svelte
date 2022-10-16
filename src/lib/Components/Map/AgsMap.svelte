<script>
  import MapView from "@arcgis/core/views/MapView";

  const createMap = (domNode) => {
    const view = new MapView({
      container: domNode,
      map: {
        basemap: "streets-vector",
      },
      zoom: 5,
      center: [-97.743057, 30.267153], // longitude, latitude
    });
  };
  /* const map = new Map({
          basemap: "arcgis-topographic" // Basemap layer service
        });

        const view = new MapView({
          map: map,
          center: [-118.805, 34.027], // Longitude, latitude
          zoom: 13, // Zoom level
          container: "viewDiv" // Div element
        });

      }); */
</script>

<div id="viewDiv" use:createMap />

<style>
  #viewDiv {
    width: 100%;
    height: 100%;
  }
</style>
