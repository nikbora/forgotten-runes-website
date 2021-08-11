import { useEffect } from "react";
// import OpenSeadragon from "openseadragon";

const WizardMap = () => {
  useEffect(() => {
    // @ts-ignore
    let viewer = OpenSeadragon({
      id: "openseadragon",
      prefixUrl: "/static/openseadragon/",
      navigatorSizeRatio: 0.25,
      visibilityRatio: 1.0,
      // //minPixelRatio: 1.0,
      immediateRender: true,
      maxZoomLevel: 18,
      minZoomLevel: 0,
      defaultZoomLevel: 2.0, // set this so we can see inidvidual wizards on page load, but it seems I can't zoom out then
      // @ts-ignore
      maxZoomImageRatio: 1.0,
      minZoomImageRatio: 1.0,
      smoothTileEdgesMinZoom: Infinity,
      tileSources: "/static/wizard-tiles.dzi",
    });

    // @ts-ignore
    viewer.addViewerInputHook({
      hooks: [
        {
          tracker: "viewer",
          handler: "clickHandler",
          hookHandler: onViewerClick,
        },
      ],
    });

    function onViewerClick(event: any) {
      var element = event.originalEvent.target;
      if (element.tagName == "A") {
        event.preventDefaultAction = true;
        window.open(element.getAttribute("href"), "_blank");
      }
    }

    var defaultColor = "#66a670";
    var noLoreColor = "#638596";

    // Disable scroll zooming so the page can scroll
    // @ts-ignore
    viewer.innerTracker.scrollHandler = false;

    let noLoreWizards: number[] = [];

    // Set to true to easily test colors
    if (true) {
      noLoreWizards = [];

      for (var i = 0; i < 9000; i++) {
        // noLoreWizards.push(i);
        if (i % 5 == 0) {
          noLoreWizards.push(i);
        }
      }
    }

    let wizardSize = 400;
    let tilesPerRow = 100;
    let lastWizardZoom = 1;

    // @ts-ignore
    let overlay = viewer.canvasOverlay({
      onRedraw: function () {
        console.log("overlay");
        overlay.context2d().fillStyle = defaultColor;
        overlay.context2d().fillRect(0, 0, 100 * wizardSize, 100 * wizardSize);

        overlay.context2d().fillStyle = noLoreColor;

        for (var i = 0; i < noLoreWizards.length; i++) {
          var coords = getCoords(noLoreWizards[i]);
          //                console.log("Owned wizard at " + coords[0] + "," + coords[1]);
          overlay
            .context2d()
            .fillRect(coords[0], coords[1], wizardSize, wizardSize);
        }
      },
      clearBeforeRedraw: true,
    });

    viewer.addHandler("zoom", function (event) {
      // @ts-ignore
      if (event.zoom < lastWizardZoom) {
        viewer.removeOverlay("wizard-overlay");
      }
    });

    // Assuming we have an OpenSeadragon Viewer called "viewer", we can catch the clicks
    // with addHandler like so:
    viewer.addHandler("canvas-click", function (event) {
      // The canvas-click event gives us a position in web coordinates.
      var webPoint = event.position;

      // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.

      var viewportPoint = viewer.viewport.pointFromPixel(
        webPoint as OpenSeadragon.Point
      );

      // Convert from viewport coordinates to image coordinates.
      var imagePoint =
        viewer.viewport.viewportToImageCoordinates(viewportPoint);

      // Show the results.
      // console.log(webPoint.toString(), viewportPoint.toString(), imagePoint.toString());

      var zoom = viewer.viewport.getZoom();

      // console.log("Current zoom is " + zoom);
      viewer.removeOverlay("wizard-overlay");
      if (zoom >= 8) {
        lastWizardZoom = zoom;
        var wizardIndex = getWizardAt(imagePoint.x, imagePoint.y);
        var elt = document.createElement("a");
        elt.id = "wizard-overlay";
        elt.className = "wizard-overlay-class";
        elt.textContent = "WIZARD #" + wizardIndex + " LORE";
        elt.setAttribute("href", "/lore/" + wizardIndex + "/0");
        elt.setAttribute("target", "_blank");
        var ox = Math.floor(viewportPoint.x * 100) / 100 + 0.005;
        var oy = Math.floor(viewportPoint.y * 100) / 100 + 0.008;

        viewer.addOverlay(
          elt,
          // @ts-ignore
          new OpenSeadragon.Point(ox, oy),
          // @ts-ignore
          OpenSeadragon.Placement.CENTER,
          undefined
        );
      }
    });

    var getCoords = function (index: number) {
      return [(index % 100) * wizardSize, Math.floor(index / 100) * wizardSize];
    };

    var getWizardAt = function (x: number, y: number) {
      console.log("Clicked at X: " + x + ", Y: " + y);
      x = Math.floor(x / wizardSize);
      y = Math.floor(y / wizardSize);
      return y * 100 + x;
    };

    // Cleanup
    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="openseadragon" style={{ width: "100%", height: "700px" }} />;
};

export default WizardMap;
