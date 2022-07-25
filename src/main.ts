import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/src/message.scss";
import "uno.css";
import "~/styles/index.scss";

const app = createApp(App);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

app.mount("#app");
