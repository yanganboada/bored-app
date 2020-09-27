class App {
  constructor(userInterest, pexelsApi){
    this.userInterest = userInterest;
    this.pexelsApi = pexelsApi;
    this.handleGetImageSuccess = this.handleGetImageSuccess.bind();
    this.handleGetImageError = this.handleGetImageError.bind();
  }

  start(){
    this.userInterest.list.updateDateTitle();
    this.userInterest.list.addListToPage(this.userInterest.eventData);
    console.log(this.userInterest.eventData);
    this.userInterest.updatePageTitle("Health Wellness Events");
    this.userInterest.onInterestClick();
    this.getImage();
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
    console.log(response)
    var images = response.photos;
    this.userInterest.list.images = images;
  }

  handleGetImageError(error) {
    console.error(error);
  }
}
