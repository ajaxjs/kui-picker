import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import LmCard from "./components/LmCard.vue";

import KuiPicker from "../packages/index";

createApp(App).use(KuiPicker).component("LmCard", LmCard).mount("#app");
