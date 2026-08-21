<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { IdvIntegrationService, type IdvMessageEvent } from '@regulaforensics/idv-capture-web'
import { FaceIdv } from '@regulaforensics/idv-face'
import { DocumentIdv } from '@regulaforensics/idv-document'

const service = ref<IdvIntegrationService | null>(null)

const listener = (event: IdvMessageEvent) => {
  console.log(event)
}

onMounted(() => {
  service.value = new IdvIntegrationService()
  service.value.sessionRestoreMode = true
  service.value.eventListener = listener

  const serviceRun = async () => {
    const initResult = await service.value?.initialize({
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

    const configureResult = await service.value?.configure({
      baseUrl: "", // set host
      apiKey: "", // set api key
      ttl: 86400, // set time to live
    })
    console.log(configureResult)
    if (configureResult?.error) {
      console.log(configureResult.error)
      return
    }

    const prepareResult = await service.value?.prepareWorkflow({
      workflowId: '', // set workflow id
    })
    if (prepareResult?.error) {
      console.log(prepareResult.error)
      return
    }

    const metadata = { test: true }
    const startWorkflowResult = await service.value?.startWorkflow({
      metadata: metadata,
      locale: 'en',
    })
    if (startWorkflowResult?.error) {
      console.log(startWorkflowResult.error)
      return
    }
    console.log('WORKFLOW FINISHED :', startWorkflowResult)
  }

  serviceRun()
})

onUnmounted(() => {
  service.value?.deinitialize()
})
</script>

<template>
  <div class="container">
    <idv-flow></idv-flow>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
