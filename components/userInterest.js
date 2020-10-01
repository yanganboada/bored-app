class UserInterest {
  constructor(techData, wellnessData){
    this.handleInterestClick = this.handleInterestClick.bind(this);
    this.techData = techData;
    this.wellnessData = wellnessData;
    this.eventData = this.wellnessData;
    this.imageStyle = "wellness"
    this.imageCallback = null;
    this.mapCallback =null;
  }

  onInterestClick(){
    var notCodeBtn = document.getElementById('notCode');
    var codeBtn = document.getElementById('code');
    notCodeBtn.addEventListener('click', this.handleInterestClick);
    codeBtn.addEventListener('click', this.handleInterestClick);
  }

  setImageCallback(imageCallback){
    this.imageCallback = imageCallback;
  }

  setMapCallback(mapCallback){
    this.mapCallback = mapCallback;
  }

  handleInterestClick(e){
    e.preventDefault();
    if (e.target.textContent === "!CODE") {
      var titleContent = "Health Wellness Events";
      this.imageStyle = "wellness"
      this.eventData = this.wellnessData;
    } else {
      titleContent = "Tech Related Events";
      this.imageStyle = "coding+tech";
      this.eventData = this.techData;
    }
    this.updatePageTitle(titleContent);
    this.imageCallback();
    this.mapCallback();
  }

  updatePageTitle(titleContent) {
    var titleElt = document.getElementById('title');
    titleElt.textContent = titleContent;
  }
}
