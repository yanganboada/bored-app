class Send {
  constructor (){
    this.handSendClick = this.handSendClick.bind(this);
  }

  onSendClick(){
    var sendListElt = document.querySelector('.send-list');
    sendListElt.addEventListener('click', this.handleSendClick);
  }

  handSendClick(e){
    console.log(e);
  }

}
