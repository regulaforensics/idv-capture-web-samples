import { IdvIntegrationService, IdvModules } from '@regulaforensics/idv-capture-web';


function idvEventListener(data) {
    console.log(data);
}

const service = new IdvIntegrationService();
service.sessionRestoreMode = true;
service.eventListener = idvEventListener;

(async function () {
    const initResult = await service.initialize({
      modulesConfig: {
        docreader: {
          devLicense: 'Base64License',
        }
      },
      includedModules: [IdvModules.LIVENESS, IdvModules.DOC_READER],
    });
    if (initResult.error) {
      console.log(initResult.error);
      return;
    }

    const configureResult = await service.configure({
      host: "", // set host
      userName: "", // set user name
      password: "", // set password
    });
    console.log(configureResult);
    if (configureResult.error) {
      console.log(configureResult.error);
      return;
    }
    const prepareResult = await service.prepareWorkflow({
      workflowId: "", // set workflow id
    });
    if (prepareResult.error) {
      console.log(prepareResult.error);
      return;
    }
    const metadata = { test: true };
    const startWorkflowResult = await service?.startWorkflow({
      metadata: metadata,
      locale: 'en',
    });
    if (startWorkflowResult.error) {
      console.log(startWorkflowResult.error);
      return;
    }
    console.log("WORKFLOW FINISHED :", startWorkflowResult);
  })();