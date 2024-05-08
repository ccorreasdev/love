import Master from "./Master.js";

export const windowResizeListener = (master) => {


    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        master.camera.aspect = width / height;
        master.camera.updateProjectionMatrix();
        master.renderer.setSize(width, height);
    });
}