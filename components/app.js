class App {
  constructor(list, userInterest, savedEvent, map, pexelsApi, emailJsApi, recaptcha){
    this.handleGetImageSuccess = this.handleGetImageSuccess.bind(this);
    this.handleGetImageError = this.handleGetImageError.bind(this);
    this.getImage = this.getImage.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.list = list;
    this.userInterest = userInterest;
    this.savedEvent = savedEvent;
    this.map = map;
    this.pexelsApi = pexelsApi;
    this.emailJsApi = emailJsApi;
    this.recaptcha = recaptcha;
  }

  start(){
    this.getImage();
    this.list.updateDateTitle();
    this.userInterest.updatePageTitle("Health Wellness Events");
    this.userInterest.onInterestClick();
    this.userInterest.setImageCallback(this.getImage);
    this.userInterest.setMapCallback(this.updateMap);
    this.savedEvent.onSavedClick();
    this.savedEvent.onModalCloseClick();
    this.savedEvent.onSendClick();
    this.savedEvent.setSendEmailCallback(this.sendEmail);
    this.map.onViewTypeClick();
    this.map.addScriptTag();
  }

  getImage() {
    $.ajax({
      method: "GET",
      url: "https://api.pexels.com/v1/search"
      + "?query=" + this.userInterest.imageStyle,
      headers:{
        "authorization": this.pexelsApi
      },
      beforeSend: function () {
        var loaderElt = document.getElementById('loader')
        loaderElt.classList.remove('hide');
      },
      complete: function () {
        var loaderElt = document.getElementById('loader')
        loaderElt.classList.add('hide');
      },
      success: this.handleGetImageSuccess,
      error: this.handleGetImageError
    })
  }

  handleGetImageSuccess(response) {
    var images = response.photos;
    this.list.addListToPage(this.userInterest.eventData, images, this.userInterest.imageStyle);
  }

  handleGetImageError(error) {
    console.error(error);
  }

  updateMap(){
    this.map.data = this.userInterest.eventData;
    this.map.initMap();
  }

  sendEmail(email, dataHtml){
    var data = {
      service_id: this.emailJsApi.serviceId,
      template_id: 'template_bored',
      user_id: this.emailJsApi.user,
      template_params: {
        'to_email': email,
        'reply_to': 'yanganboada@gmail.com',
        'my_html': dataHtml
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(function () {
      var formElt = document.querySelector('.email-div')
      formElt.remove()
      alert('Your mail is sent!');
    }).fail(function (error) {
      alert('Oops... ' + JSON.stringify(error));
    });
  }

}
