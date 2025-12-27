import { createApp } from "vue";
import App from "./App.vue";
import "@/app/assets/styles/index.scss";
import { i18n, installTypedI18n } from "./app/providers/i18n";

const app = createApp(App);

installTypedI18n(app);

app.use(i18n);
app.mount("#app");
