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

  renderList(listData, image, index){
    var titleContent = listData.name;
    var dayContent = listData.local_date;
    var timeContent = listData.local_time;

    var coverImgElt = document.createElement('img')
    var rowElt = document.createElement('div');
    var rowContentElt = document.createElement('div');
    var titleElt = document.createElement('h3');
    var dayElt = document.createElement('h4');
    var timeElt = document.createElement('h4');
    var detailElt = document.createElement('a');
    var heartElt = document.createElement('img');
    var onlineElt = document.createElement('p');

    coverImgElt.src = image;
    coverImgElt.classList.add("cover");
    rowElt.setAttribute('class', 'row-item');
    rowElt.setAttribute('data-index', index);
    rowContentElt.setAttribute('class', 'row-content');
    titleElt.textContent = titleContent;
    dayElt.textContent = dayContent;
    timeElt.textContent = timeContent;
    detailElt.textContent = 'View Details>'
    detailElt.target = "_blank"
    detailElt.setAttribute('class','view-on-meetup')
    detailElt.setAttribute('href', listData.link)
    heartElt.classList.add('save');
    heartElt.src = 'icon/heart-hollow.png';
    heartElt.alt = 'save this event';
    heartElt.id = 'hollow';
    heartElt.addEventListener('click', this.handleSaveClick);

    rowContentElt.appendChild(titleElt);
    rowContentElt.appendChild(dayElt);
    rowContentElt.appendChild(timeElt);
    rowContentElt.appendChild(detailElt);
    rowElt.appendChild(coverImgElt);
    rowElt.appendChild(rowContentElt);
    rowElt.appendChild(heartElt);

    if(listData.is_online_event){
      onlineElt.textContent = "Online";
      onlineElt.classList.add('online', 'tag');
      rowElt.appendChild(onlineElt);
    } else {
      onlineElt.textContent = "Local";
      onlineElt.classList.add('local', 'tag');
      rowElt.appendChild(onlineElt);
    }
    return rowElt;
  }

  addListToPage(data, images){
    console.log(data, images)
    this.resetRow();
    var listAreaElt = document.getElementById('listArea');
    for (var i=0; i<data.events.length; i++){
      var image = this.generateImage(images, i);
      var listElt = this.renderList(data.events[i], image, i);
      listAreaElt.appendChild(listElt);
    }
  }

  resetRow(){
    var listAreaElt = document.getElementById('listArea');
    listAreaElt.innerHTML = "";
  }

  generateImage(images, index){
    if (images.length > index) {
      var imageUrl = images[index].src.landscape;
    } else {
      var randomIndex = Math.floor(Math.random() * images.length);
      imageUrl = images[randomIndex].src.landscape;
    }
    return imageUrl;
  }

  handleSaveClick(e){
    var heartElt = e.target;
    var rowDivElt = heartElt.parentElement;
    var value = rowDivElt.outerHTML;
    var key = heartElt.parentElement.dataset.index;
    console.log(key, value);
    console.log(localStorage)
    if (heartElt.id === 'hollow'){
      heartElt.src = 'icon/heart-red.png';
      heartElt.alt = 'Un-save This Event';
      heartElt.id = 'red';
      localStorage.setItem(key, value);
    } else {
      heartElt.src = 'icon/heart-hollow.png';
      heartElt.alt = 'Save This Event';
      heartElt.id = 'hollow';
      localStorage.removeItem(key);
    }
  }

}
