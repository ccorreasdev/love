//Imports
import * as THREE from "./build/three.module.js";
import Master from "./class/Master.js";
import TouchControls from "./class/TouchControls.js";
import Models from "./class/Model.js";
import Lights from "./class/Lights.js";
import KeyListener from "./class/KeyListener.js";
import MouseMove from "./class/MouseMove.js";
import ScrollWindow from "./class/ScrollWindow.js";
import ModelMovement from "./class/ModelMovement.js";
import { htmlActionsListener } from "./class/HTMLActions.js";
import { calculateDistance } from "./class/Distances.js";
import { windowResizeListener } from "./class/WindowResize.js"

//Constants and variables
const canvas = document.querySelector("#canvas");
const progressBar = document.querySelector("#progress-bar");
let master = new Master();
let touchControls = new TouchControls();
let models = new Models();
let lights = new Lights();
let keyListener = new KeyListener();
let modelMovement = new ModelMovement();
let mouseMove = new MouseMove();
let scrollWindow = new ScrollWindow();
let bgAnimationTo = false;

const init = async () => {
    //Init master - Camera, scene, lights, renderer...
    master.initCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
    master.camera.position.set(0, 0, 0);
    master.camera.lookAt(0, 0, 0);
    master.initScene();

    lights.initLights(10, 10);

    master.scene.add(lights.getDirectionalLight());
    master.scene.add(lights.getAmbientLight());

    master.initRenderer();
    master.renderer.setPixelRatio(window.devicePixelRatio);
    master.renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.appendChild(master.renderer.domElement);

    master.initOrbitControls();

    //Load 3D Models
    models = new Models();

    await models.loadModelGLTFAnimation("bouquet").then((resolve) => {
        models.percentLoaded = 50;
        return models.loadModelGLTF("heart");
    }).then((resolve) => {
        models.percentLoaded = 100;
    });

    console.log(models.getLoadedModels(0));
    //Add to scene 3D Models
    models.getLoadedModels(0).mixer.clipAction(models.getLoadedModels(0).animations[0]).play();
    models.getLoadedModels(0).model.scale.set(1, 1, 1)
    models.getLoadedModels(0).model.position.x = 0;
    models.getLoadedModels(0).model.position.y = -0.4;
    models.getLoadedModels(0).model.position.z = -2;
    models.getLoadedModels(0).model.rotation.y = 0;
    master.scene.add(models.getLoadedModels(0).model);


    models.getLoadedModels(1).scale.set(1, 1, 1)
    models.getLoadedModels(1).position.x = 0;
    models.getLoadedModels(1).position.y = 0;
    models.getLoadedModels(1).position.z = -200;
    models.getLoadedModels(1).rotation.y = 0;
    master.scene.add(models.getLoadedModels(1));

    //Listeners
    windowResizeListener(master, models.getLoadedModels(0).model, models.getLoadedModels(1));
    mouseMove.mouseMoveListener(models.getLoadedModels(0).model);
    scrollWindow.scrollListener();
    keyListener.init();
    //touchControls.initTouchControls(keyListener.getKeysPressed());
    htmlActionsListener(0);
};


//Render scene
const render = () => {
    master.renderer.render(master.scene, master.camera);
};

//Animate scene
const animate = () => {
    requestAnimationFrame(animate);

    //Wait last model is loaded
    if (models.getLoadedModels(1)) {

        models.getLoadedModels(1).rotation.y += 0.01

        //Movement controller model 1 - Garden
        //modelMovement.moveModel(keyListener, models.getLoadedModels(0).model, 5);

        //Camera follow 3D model 1 - plane
        // let distance = 3.5;
        // const objectPosition = models.getLoadedModels(0).model.position;
        // const cameraPosition = new THREE.Vector3(
        //     objectPosition.x,
        //     objectPosition.y + 1.5,
        //     objectPosition.z - distance
        // );

        // master.camera.position.copy(cameraPosition);
        //master.camera.lookAt(objectPosition);

        //Animations mixer

        models.getLoadedModels(0).mixer.update(0.01);


        //Distances from other models
        //calculateDistance(master.camera.position, models.getLoadedModels(4).position, models.getLoadedModels(5).position);

    }




    render();
};


init();
animate();

