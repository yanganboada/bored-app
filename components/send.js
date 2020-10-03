class send{
  constructor (){
    this.handleSendClick = this.handleSendClick.bind(this);

  }

  onSendClick(){
    var sendListElt = document.getElementById('sendList');
    sendListElt.addEventListener('click', this.handleSendClick);
  }

  handSendClick(){

  }

}
