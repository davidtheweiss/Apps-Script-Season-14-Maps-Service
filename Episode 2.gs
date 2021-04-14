function createTrigger() {
  ScriptApp.newTrigger('sendDirections')
  .forForm('1DPyZAQjQcWXudbcJTHg_Rjomay4fdvRHvrwqDcgMi2I')
  .onFormSubmit()
  .create();
}

function sendDirections(e) {
  const email = e.response.getRespondentEmail();
  const canAttend = e.response.getResponseForItem(e.source.getItemById(1275419724)).getResponse() == 'Yes, I\'ll be there';
  if (!canAttend) return GmailApp.sendEmail(email, 'Sorry you can\'t make it.', 'Maybe next time.');

  const name = e.response.getResponseForItem(e.source.getItemById(360421792)).getResponse();
  const guestAddress = e.response.getResponseForItem(e.source.getItemById(1611351304)).getResponse();
  const disneyWorld = 'Walt Disney World';
  const universalStudios = '6000 Universal Blvd, Orlando, FL 32819';
  const methodOfArriving = e.response.getResponseForItem(e.source.getItemById(2124567779)).getResponse();
  const avoidingItemResponse = e.response.getResponseForItem(e.source.getItemById(234994015));
  const avoiding = avoidingItemResponse == null ? [] : avoidingItemResponse.getResponse();
  
  let buildDirections = `Maps.newDirectionFinder()
  .setOrigin(guestAddress)
  .addWaypoint(disneyWorld)
  .setDestination(universalStudios)
  .setMode(Maps.DirectionFinder.Mode.${methodOfArriving.toUpperCase()})`;
  for (let avoid of avoiding) {
    Logger.log(avoid);
    buildDirections += avoid == 'Highways' ? '.setAvoid(Maps.DirectionFinder.Avoid.HIGHWAYS)' : '.setAvoid(Maps.DirectionFinder.Avoid.TOLLS)';
  }
  buildDirections += '.getDirections()';
  
  const directions = eval(buildDirections)

  const bestRoute = directions.routes[0];
  let htmlSteps = '';
  for (let leg of bestRoute.legs) {
    const steps = leg.steps;
    for (step of steps) {
      htmlSteps += `<p>${step.html_instructions}</p><p>${step.distance.text} | ${step.duration.text}</p><br>`
    }
  }

  const map = Maps.newStaticMap()
  .addMarker(guestAddress)
  .addMarker(disneyWorld)
  .addMarker(universalStudios)
  .addPath(bestRoute.overview_polyline.points)
  .getBlob();


  GmailApp.sendEmail(email, 'See you at the Party!', '', {
    htmlBody: `<p>Hi, ${name}</p><p>Thanks for coming to my party! Here are the directions to the party: </p>${htmlSteps}`,
    attachments: [map]
  });
}
