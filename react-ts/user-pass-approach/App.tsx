import { useEffect, useRef } from "react";
import { IdvIntegrationService, IdvMessageEvent, IdvModules } from "@regulaforensics/idv-capture-web";

function App() {
  const service = useRef<IdvIntegrationService | null>(null);

  const listener = (event: IdvMessageEvent) => {
    console.log(event);
  }

  useEffect(() => {
    service.current = new IdvIntegrationService();
    service.current.sessionRestoreMode = true;
    service.current.eventListener = listener;
    const serviceRun = async () => {
      const initResult = await service.current?.initialize({
        modulesConfig: {
          docreader: {
            devLicense: 'Base64License',
          }
        },
        includedModules: [IdvModules.LIVENESS, IdvModules.DOC_READER],
      });
      if (initResult?.error) {
        console.log(initResult.error);
        return;
      }
  
      const configureResult = await service.current?.configure({
        host: "", // set host
        userName: "", // set user name
        password: "",  // set password
      });
      console.log(configureResult);
      if (configureResult?.error) {
        console.log(configureResult.error);
        return;
      }
      const prepareResult = await service.current?.prepareWorkflow({
        workflowId: "", // set workflow id
      });
      if (prepareResult?.error) {
        console.log(prepareResult.error);
        return;
      }
      const metadata = { test: true };
      const startWorkflowResult = await service.current?.startWorkflow({
        metadata: metadata,
        locale: 'en'
      });
      if (startWorkflowResult?.error) {
        console.log(startWorkflowResult.error);
        return;
      }
      console.log("WORKFLOW FINISHED :", startWorkflowResult);
    }
    serviceRun();
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <idv-flow></idv-flow>
    </div>
  );
}

export default App;
