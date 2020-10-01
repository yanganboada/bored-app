class App {
  constructor(list, userInterest, savedEvent, map, pexelsApi){
    this.handleGetImageSuccess = this.handleGetImageSuccess.bind(this);
    this.handleGetImageError = this.handleGetImageError.bind(this);
    this.getImage = this.getImage.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.list = list;
    this.userInterest = userInterest;
    this.savedEvent = savedEvent;
    this.map = map;
    this.pexelsApi = pexelsApi;
  }

  start(){
    this.getImage();
    this.list.updateDateTitle();
    this.userInterest.updatePageTitle("Health Wellness Events");
    this.userInterest.onInterestClick();
    this.userInterest.setImageCallback(this.getImage);
    this.userInterest.setMapCallback(this.updateMap);
    this.savedEvent.onSavedClick();
    this.savedEvent.onModalCloseClick();
    this.map.onViewTypeClick();
    this.map.addScriptTag();
  }

  getImage() {
    $.ajax({
      method: "GET",
      url: "https://api.pexels.com/v1/search"
      + "?query=" + this.userInterest.imageStyle,
      headers:{
        "authorization": this.pexelsApi
      },
      success: this.handleGetImageSuccess,
      error: this.handleGetImageError
    })
  }

  handleGetImageSuccess(response) {
    var images = response.photos;
    this.list.addListToPage(this.userInterest.eventData, images)
  }

  handleGetImageError(error) {
    console.error(error);
  }

  updateMap(){
    this.map.data = this.userInterest.eventData;
    this.map.initMap();
  }

}
