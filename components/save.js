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
    for (var i = 0; i<localStorage.length; i++){
      if (!localStorage.length){
        var emptyElt = document.createElement('p');
        emptyElt.textContent = "Currently No Saved Event"
        modalListElt.appendChild(emptyElt);
      }
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      modalListElt.innerHTML += value;
    }
    var deleteElt = document.createElement('img')
    deleteElt.src = 'icon/heart-red.png';
    deleteElt.alt = 'Delete this Event';
    deleteElt.id = 'delete';
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
