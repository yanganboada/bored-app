var list = new List();
var userInterest = new UserInterest(techData, wellnessData);
var savedEvent = new Save(list);
var map = new CurrentMap(userInterest, mapApi);
var startApp = new App(list, userInterest, savedEvent, map, pexelsApi, emailJsApi, recaptcha);
startApp.start();
