function doGet() {
  return HtmlService.createTemplateFromFile('elevateMyRun').evaluate().setTitle('Elevate My Run');
}

function includeExternalFile(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getMapData(origin, destination) {
  const directions = Maps.newDirectionFinder()
  .setOrigin(origin)
  .setDestination(destination)
  .setMode(Maps.DirectionFinder.Mode.WALKING)
  .getDirections();

  const bestRoute = directions.routes[0];

  const elevation = Maps.newElevationSampler()
  .samplePath(bestRoute.overview_polyline.points, 30);

  const map = Maps.newStaticMap()
  .setMarkerStyle(Maps.StaticMap.MarkerSize.MID, Maps.StaticMap.Color.RED, 'A')
  .addMarker(origin)
  .setMarkerStyle(Maps.StaticMap.MarkerSize.MID, Maps.StaticMap.Color.RED, 'B')
  .addMarker(destination)
  .addPath(bestRoute.overview_polyline.points)
  .getMapUrl();

  return {
    'distance': bestRoute.legs[0].distance,
    'map': `${map}&key=AIzaSyApJz-40tdyIAd8ZMMfdHWli0Eq5BMIIeg`,
    'elevation': elevation,
  };
}




function demoSampleLocation() {
  const elevation = Maps.newElevationSampler()
  .sampleLocation(27.9881, 86.9250); // Mt. Everest

  Logger.log(elevation);
}
