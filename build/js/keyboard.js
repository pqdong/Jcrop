class Keyboard {
  constructor(cropper) {
    this.cropper = cropper;
    this.attach();
  }

  attach() {
    const c = this.cropper;
    c.el.addEventListener('keyup',(e) => {
      const d = e.shiftKey ? 10: 1;
      switch(e.key) {
        case 'ArrowRight': c.nudge(d); break;
        case 'ArrowLeft': c.nudge(-d); break;
        case 'ArrowUp': c.nudge(0,-d); break;
        case 'ArrowDown': c.nudge(0,d); break;
        case 'Delete': case 'Backspace': c.emit('crop.remove'); break;
        default: console.log(e); break;
      }
    });
  }
}

export default Keyboard;
