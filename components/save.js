class Save{
  constructor(){
    this.handleSavedEventsClick = this.handleSavedEventsClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleEmailSentClick = this.handleEmailSentClick.bind(this);
    this.sendEmailCallback = null;
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
    if (!localStorage.length) {
      var emptyElt = document.createElement('p');
      emptyElt.textContent = "Currently No Saved Event"
      modalListElt.appendChild(emptyElt);
    } else {
      for (var i = 0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        modalListElt.innerHTML += value;
        modalListElt.addEventListener('click', this.handleDeleteClick)
      }
    }
  }

  handleDeleteClick(e){
    if(e.target.id){
      e.target.parentElement.remove();
      localStorage.removeItem(e.target.id)
    }
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

  onSendClick() {
    var sendListElt = document.querySelector('.send-list');
    sendListElt.addEventListener('click', this.handleSendClick);
  }

  handleSendClick(e) {
    var modalBtnElt = e.target.parentElement
    var emailFormElt = document.createElement('form')
    var inputDivElt = document.createElement('div')
    var inputElt = document.createElement('input')
    var submitElt = document.createElement('button')
    emailFormElt.className = 'email-div'
    inputElt.type = 'email'
    inputElt.placeholder = 'Enter Your Email'
    inputElt.name = 'email'
    inputElt.id = 'email'
    submitElt.type = 'submit'
    submitElt.textContent = 'Send'
    submitElt.addEventListener('click', this.handleEmailSentClick)
    inputDivElt.appendChild(inputElt)
    inputDivElt.appendChild(submitElt)
    emailFormElt.appendChild(inputDivElt)
    modalBtnElt.appendChild(emailFormElt)
  }

  setSendEmailCallback(sendEmailCallback) {
    this.sendEmailCallback = sendEmailCallback
  }

  handleEmailSentClick(e){
    e.preventDefault()
    var error = document.getElementById('errorMessage')
    if (error){
      error.remove();
    }
    var email = document.getElementById('email').value
    if (!email || !email.includes('@')){
      var errorMessageElt = document.createElement('p')
      errorMessageElt.id = 'errorMessage'
      var emailFormElt = document.querySelector('.email-div')
      errorMessageElt.textContent= '*Please enter a correct email'
      emailFormElt.appendChild(errorMessageElt)
    } else{
      var dataDivElt = document.getElementById('saved')
      var data = dataDivElt.childNodes
      var dataHtml ='<ol>'
      for(var i=3; i<data.length; i++){
        if (i===data.length){
          dataHtml += '<li>'+ data[i].childNodes[1].innerHTML +'</li></ol>'
        } else {
          dataHtml += '<li>' + data[i].childNodes[1].innerHTML + '</li><br />'
        }
      }
      this.sendEmailCallback(email, dataHtml)
    }
  }

}
