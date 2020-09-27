class UserInterest {
  constructor(techData, wellnessData, list){
    this.handleInterestClick = this.handleInterestClick.bind(this);
    this.list = list;
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
    console.log(e);
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
    this.list.addListToPage(this.eventData);
  }

  updatePageTitle(titleContent) {
    var titleElt = document.getElementById('title');
    titleElt.textContent = titleContent;
  }
}
