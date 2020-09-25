class App {
  constructor(data, list){
    this.data = data;
    this.list = list;
    this.handleGetEventSuccess = this.handleGetEventSuccess.bind();
    this.handleGetEventError = this.handleGetEventError.bind();
  }

  start(){
    this.getEvent();
    this.list.date();
    this.list.interest();
    this.list.addListToPage(data);
  }

  getEvent() {
    // $.ajax({
      //   method: "GET",
      //   url: "https://api.meetup.com/find/upcoming_events?page=20&text="+this.getDataByInterest,
      //   success: this.handleGetEventSuccess,
      //   error: this.handleGetEventError
      // })
      this.handleGetEventSuccess(data);
    }

  handleGetEventSuccess(data){
    console.log(data);
    // this.list.addListToPage(data);
  }

  handleGetEventError(error){
    console.error(error);
  }

}
