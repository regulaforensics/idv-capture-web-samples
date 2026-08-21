<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IdvIntegrationService, type IdvMessageEvent } from '@regulaforensics/idv-capture-web'
import { FaceIdv } from '@regulaforensics/idv-face'
import { DocumentIdv } from '@regulaforensics/idv-document'

const searchParams = new URLSearchParams(window.location.search);
/** get token from the URL */
/** for example, we get the search parameter "workflow" */
/** This is one of the ways to transfer the token to the application page. */
/** You can also transfer the token to the app using props. */
const workflowToken = searchParams.get("workflow");

const service = ref<IdvIntegrationService | null>(null)

const listener = (event: IdvMessageEvent) => {
  console.log(event)
}

onMounted(() => {
  if (!workflowToken) {
    console.log("The workflow token was not found");
    return;
  }

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
      url: workflowToken
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

