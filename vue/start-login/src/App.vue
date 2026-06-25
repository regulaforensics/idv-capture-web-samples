<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { IdvIntegrationService, type IdvMessageEvent } from '@regulaforensics/idv-capture-web'
import { FaceIdv } from '@regulaforensics/idv-face'
import { DocumentIdv } from '@regulaforensics/idv-document'

const service = ref<IdvIntegrationService | null>(null)
const isOpen = ref(false)

const listener = (event: IdvMessageEvent) => {
  console.log(event)
}

const startLogin = async () => {
  const loginConfig = {
    applicationId: "", // set application id
    baseUrl: "" , // set base url
    metadata: {
      additionalProp1: {},
    },
    locale: 'en',
  }

  service.value = new IdvIntegrationService()
  service.value.sessionRestoreMode = true
  service.value.eventListener = listener

  const initResult = await service.value.initialize({
    modulesConfig: {
      docreader: {
        devLicense: 'Base64License',
      },
    },
    includedModules: [FaceIdv, DocumentIdv],
  })

  if (initResult?.error) {
    console.log(initResult.error)
    return
  }

  isOpen.value = true

  const startLoginResult = await service.value.startLogin(loginConfig)
  console.log(startLoginResult)

  isOpen.value = false
}

onUnmounted(() => {
  service.value?.deinitialize()
})
</script>

<template>
  <div class="wrapper">
    <button v-if="!isOpen" class="button" @click="startLogin">Start Login</button>
    <div v-else class="container">
      <idv-flow></idv-flow>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

.button {
  padding: 10px 30px;
  color: white;
  font-size: 16px;
  border-radius: 2px;
  background-color: #bd7dff;
  border: 1px solid #bd7dff;
  cursor: pointer;
}
</style>
