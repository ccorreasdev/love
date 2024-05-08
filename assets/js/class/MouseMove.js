import ScaleValue from "./ScaleValue.js";
import scaleValue from "./ScaleValue.js";

export default class MouseMove {

    posX;
    posY;

    getMousePosition() {
        return ({
            posX: this.posX,
            posY: this.posY
        })

    }

    mouseMoveListener() {
        document.addEventListener("mousemove", (e) => {
            const scaleValue = new ScaleValue();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            this.posX = scaleValue.scaleValue(mouseX, 0, window.innerWidth, -50, 50);
            this.posY = scaleValue.scaleValue(mouseY, 0, window.innerHeight, -50, 50);
            //console.log(this.getMousePosition());
        });
    }



}