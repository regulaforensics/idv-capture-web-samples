import { IdvIntegrationService } from '@regulaforensics/idv-capture-web';
import { FaceIdv } from '@regulaforensics/idv-face';
import { DocumentIdv } from '@regulaforensics/idv-document';

function idvEventListener(data) {
    console.log(data);
}

const service = new IdvIntegrationService();
service.sessionRestoreMode = true;
service.eventListener = idvEventListener;
console.log(service.version);

(async function () {
    const initResult = await service.initialize({
      modulesConfig: {
        docreader: {
          devLicense: 'your base64 license',
        }
      },
      includedModules: [FaceIdv, DocumentIdv],
    });
    if (initResult.error) {
      console.log(initResult.error);
      return;
    }

    const configureResult = await service.configure({
      host: "", // set host
      userName: "", // set user name
      password: "",  // set password
    });
    console.log({configureResult});
    if (configureResult?.error) {
      console.log(configureResult.error);
      return;
    }
    const prepareResult = await service.prepareWorkflow({
      workflowId: "", // set workflow id
    });
    console.log({prepareResult});
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