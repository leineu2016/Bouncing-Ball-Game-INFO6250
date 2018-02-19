export const KeyListenerFactory = (gameInfo) => {
    class KeyListener {
        constructor() {
                this.pressedKeys = [];
                this.keydown = function(e) {
                    this.pressedKeys[e.keyCode] = true;
                };
                this.keyup = function(e) {
                    this.pressedKeys[e.keyCode] = false;
                };
            }

        isPressed(key) {
            return this.pressedKeys[key] ? true : false;
        }
    }

    return new KeyListener();
};