import {Controller} from "stimulus";
import App from "app";

class Test extends Controller {
  static targets = [ "title", "output", "notification"];
  connect() {
    this.notificationTarget.classList.add('is-hidden');
  }

  greet(e) {
    e.preventDefault();
    this.notificationTarget.classList.remove('is-hidden');
    this.outputTarget.textContent = `${this.titleTarget.value}`;
  }

  cancel(e) {
    e.preventDefault();
    this.notificationTarget.classList.add('is-hidden');
  }
}

App.register('test', Test);

export default Test;