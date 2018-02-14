import {Controller} from "stimulus";
import App from "app";

class Test extends Controller {
  static targets = [ "name", "output" ];

  greet() {
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`;
  }
}

App.register('test', Test);

export default Test;