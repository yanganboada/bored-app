class UserInterest {
  constructor(techData, wellnessData){
    this.handleInterestClick = this.handleInterestClick.bind(this);
    this.techData = techData;
    this.wellnessData = wellnessData;
    this.eventData = this.wellnessData;
    this.imageStyle = "wellness"
  }

  onInterestClick(){
    var notCodeBtn = document.getElementById('notCode');
    var codeBtn = document.getElementById('code');
    notCodeBtn.addEventListener('click', this.handleInterestClick);
    codeBtn.addEventListener('click', this.handleInterestClick);
  }

  handleInterestClick(e){
    e.preventDefault();
    if (e.target.textContent === "!CODE") {
      var titleContent = "Health Wellness Events";
      this.imageStyle = "wellness"
      this.eventData = this.wellnessData;
    } else {
      titleContent = "Tech Ralated Events";
      this.imageStyle = "coding+tech";
      this.eventData = this.techData;
    }
    this.updatePageTitle(titleContent);
    var currentData ={
      eventData: this.eventData,
      imageStyle: this.imageStyle
    }
    return currentData;
  }

  updatePageTitle(titleContent) {
    var titleElt = document.getElementById('title');
    titleElt.textContent = titleContent;
  }
}
