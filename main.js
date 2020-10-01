var list = new List();
var userInterest = new UserInterest(techData, wellnessData);
var savedEvent = new Save();
var map = new CurrentMap(userInterest, mapApi);
var startApp = new App(list, userInterest, savedEvent, map, pexelsApi);
startApp.start();
