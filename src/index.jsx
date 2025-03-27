// TODO make a reactive model, set it to window.myModel
import {createRoot} from "react-dom/client";
import { observable } from "mobx";


import {model} from "/src/Model.js"
const reactiveModel= observable(model);


import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);

