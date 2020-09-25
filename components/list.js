class List{
  constructor(eventData){
    this.eventData = eventData;
    this.handleInterstClick = this.handleInterstClick.bind();
    this.handleSaveClick = this.handleSaveClick.bind();
  }

  date(){
    var date = new Date();
    var currentMonth = date.toLocaleString('default', { month: 'long' });
    var currentDate = date.getDate();
    var currentDay = date.toLocaleDateString('default', { weekday: 'long' });
    var today = document.getElementById('today')
    today.textContent = currentDay+", "+currentMonth+" "+ currentDate;
  }

  interest(){
    var notCodeBtn = document.getElementById('notCode');
    var codeBtn = document.getElementById('code');
    notCodeBtn.addEventListener('click', this.handleInterstClick);
    codeBtn.addEventListener('click', this.handleInterstClick);
  }

  handleInterstClick(e){
    e.preventDefault();
    if (e.target.textContent === "!CODE"){
      var userInterest = "wellness";
      var titleContent = "Health Wellness Events";
    } else {
      userInterest = "code";
      titleContent = "Tech Ralated Events";
    }
    this.updateTitle(titleContent);
    this.getDataByInterest(userInterest);
  }

  updateTitle(titleContent){
    var titleElt = document.getElementById('title');
    titleElt.textContent = titleContent;
  }

  renderList(listData){
    var titleContent = listData.name;
    var dayContent = listData.local_date;
    var timeContent = listData.local_time;

    var rowElt = document.createElement('div');
    var titleElt = document.createElement('h3');
    var dayElt = document.createElement('h4');
    var timeElt = document.createElement('h4');
    var heartElt = document.createElement('img');

    rowElt.setAttribute('class', 'row-item');
    titleElt.textContent = titleContent;
    dayElt.textContent = dayContent;
    timeElt.textContent = timeContent;
    heartElt.classList.add('save');
    heartElt.setAttribute('src', 'icon/heart-hollow.png');
    heartElt.setAttribute('alt', 'save this event');
    heartElt.setAttribute('id', 'hollow');
    heartElt.addEventListener('click', this.handleSaveClick);

    rowElt.appendChild(titleElt);
    rowElt.appendChild(dayElt);
    rowElt.appendChild(timeElt);
    rowElt.appendChild(heartElt);

    return rowElt;
  }

  addListToPage(data){
    var listAreaElt = document.getElementById('listArea');
    for (var i=0; i<data.events.length; i++){
      var listElt = this.renderList(data.events[i]);
      listAreaElt.appendChild(listElt);
    }
  }

  handleSaveClick(e){
    var heartElt = e.target;
    if (heartElt.id == 'hollow'){
      heartElt.setAttribute('src', 'icon/heart-red.png');
      heartElt.setAttribute('alt', 'unsave this event');
      heartElt.setAttribute('id', 'red');
    } else {
      heartElt.setAttribute('src', 'icon/heart-hollow.png');
      heartElt.setAttribute('alt', 'save this event');
      heartElt.setAttribute('id', 'hollow');
    }
  }

  getDataByInterest(userInterest){
    this.userInterest = userInterest;
  }
}
