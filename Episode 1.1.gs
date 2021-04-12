function myFunction() {
  const map = Maps.newStaticMap()
  .setCenter('3901 Locust Walk, Philadelphia, PA')
  .setSize(1000, 500)
  .setMarkerStyle(Maps.StaticMap.MarkerSize.MID, Maps.StaticMap.Color.YELLOW, 'L')
  .addMarker('The Liberty Bell')
  .setMarkerStyle(Maps.StaticMap.MarkerSize.MID, Maps.StaticMap.Color.GREEN, 'R')
  .addMarker('3901 Locust Walk, Philadelphia, PA')
  .setPathStyle(5, Maps.StaticMap.Color.ORANGE, Maps.StaticMap.Color.BLACK)
  .beginPath()
  .addAddress('3901 Locust Walk, Philadelphia, PA')
  .addAddress('The Liberty Bell')
  .endPath()
  .getMapUrl();

  GmailApp.sendEmail('weissdav@sas.upenn.edu', 'Check out this Map made in Apps Script!', `See the map at this link: ${map}&key=AIzaSyDK6lJ75F8eS8qCpDuZBrgsIr94R7YKwp0`);
}
