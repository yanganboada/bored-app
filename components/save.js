class Save{
  constructor(){
    this.handleSavedEventsClick = this.handleSavedEventsClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  onSavedClick(){
    var savedEventsElt = document.getElementById('savedEvent');
    savedEventsElt.addEventListener('click', this.handleSavedEventsClick);
  }

  handleSavedEventsClick(e){
    e.preventDefault();
    var modalElt = document.getElementById('saveModal');
    modalElt.classList.remove('hide');
    var modalListElt = document.getElementById('saved');
    var savedArray =localStorage.getItem('savedEvent');
    for (var i = 0; i < savedArray.length; i++){
      if (!savedArray.length){
        var emptyElt = document.createElement('p');
        emptyElt.textContent = "Currently No Saved Event"
        modalListElt.appendChild(emptyElt);
      }
      // var key = localStorage.key(i);
      // var value = localStorage.getItem(key);
      modalListElt+=savedArray[i].innerHTML;
    }
    var deleteElt = document.createElement('img')
    deleteElt.src = 'icon/delete.png';
    deleteElt.alt = 'delete this event';
    deleteElt.id = 'delete';
    var heartElt = document.querySelector('.save');
    // modalListElt.replaceChild(heartElt, deleteElt);
  }

  onModalCloseClick(){
    var closeELt = document.querySelector('.close');
    closeELt.addEventListener('click', this.handleCloseClick);
  }

  handleCloseClick(e){
    var modalElt = document.getElementById('saveModal');
    var modalListElt = document.getElementById('saved');
    modalElt.classList.add('hide');
    modalListElt.innerHTML=""
  }
}
