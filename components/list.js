class List{
  constructor(){
    this.handleSaveClick = this.handleSaveClick.bind();
  }

  updateDateTitle(){
    var date = new Date();
    var currentMonth = date.toLocaleString('default', { month: 'long' });
    var currentDate = date.getDate();
    var currentDay = date.toLocaleDateString('default', { weekday: 'long' });
    var today = document.getElementById('today')
    today.textContent = currentDay+", "+currentMonth+" "+ currentDate;
  }

  renderList(listData, index){
    var titleContent = listData.name;
    var dayContent = listData.local_date;
    var timeContent = listData.local_time;

    var coverImgElt = document.createElement('img')
    var rowElt = document.createElement('div');
    var titleElt = document.createElement('h3');
    var dayElt = document.createElement('h4');
    var timeElt = document.createElement('h4');
    var heartElt = document.createElement('img');

    coverImgElt.src = this.generateImage(index);
    rowElt.setAttribute('class', 'row-item');
    titleElt.textContent = titleContent;
    dayElt.textContent = dayContent;
    timeElt.textContent = timeContent;
    heartElt.classList.add('save');
    heartElt.src = 'icon/heart-hollow.png';
    heartElt.alt = 'save this event';
    heartElt.id = 'hollow';
    heartElt.addEventListener('click', this.handleSaveClick);

    rowElt.appendChild(coverImgElt);
    rowElt.appendChild(titleElt);
    rowElt.appendChild(dayElt);
    rowElt.appendChild(timeElt);
    rowElt.appendChild(heartElt);

    return rowElt;
  }

  addListToPage(data){
    var listAreaElt = document.getElementById('listArea');
    listAreaElt.innerHTML="";
    for (var i=0; i<data.events.length; i++){
      var listElt = this.renderList(data.events[i], i);
      listAreaElt.appendChild(listElt);
    }
  }

  generateImage(index){
    if (index <= this.images.length) {
      var imageUrl = this.images[index].src.middle;
    } else {
      var randomIndex = Math.floor(Math.random() * this.images.length);
      imageUrl = this.images[randomIndex].src.middle;
    }
    return imageUrl;
  }

  handleSaveClick(e){
    var heartElt = e.target;
    if (heartElt.id === 'hollow'){
      heartElt.src = 'icon/heart-red.png';
      heartElt.alt = 'unsave this event';
      heartElt.id = 'red';
    } else {
      heartElt.src = 'icon/heart-hollow.png';
      heartElt.alt = 'save this event';
      heartElt.id = 'hollow';
    }
  }

}
