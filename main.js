var list = new List();
var userInterest = new UserInterest(techData, wellnessData, list);
var startApp = new App(userInterest, pexelsApi);

startApp.start();
