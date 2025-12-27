<template>
  <div class="layout">
    <div class="modal">
      <h1 class="modal__title">Translates Test App</h1>

      <div class="modal__content">
        <p>Hello world from i18n: {{ $t("hello-world") }}</p>

        <p>Hello world from typed i18n: {{ $tt("hello-world") }}</p>

        <p>Hello name from i18n: {{ $t("hello-name", { name }) }}</p>

        <p>Hello name from typed i18n: {{ $tt("hello-name", { name }) }}</p>

        <input v-model="name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  width: 100dvw;
  height: 100dvh;
  background: linear-gradient(256deg, #e0eafd, #f6ebf1);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  max-height: 75%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 16px;
  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &__title {
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      margin: 0;
    }
  }
}
</style>
