import { useEffect, useRef } from "react";
import {
  IdvIntegrationService,
  IdvMessageEvent,
} from "@regulaforensics/idv-capture-web";
import { DocumentIdv } from "@regulaforensics/idv-document";
import { IproovIdv } from "@regulaforensics/idv-iproov";

function App() {
  const service = useRef<IdvIntegrationService | null>(null);
  const searchParams = new URLSearchParams(window.location.search);
  /** get token from the URL */
  /** for example, we get the search parameter "workflow" */
  /** This is one of the ways to transfer the token to the application page. */
  /** You can also transfer the token to the app using props. */
  const workflowToken = searchParams.get("workflow");

  const listener = (event: IdvMessageEvent) => {
    console.log(event);
  };

  useEffect(() => {
    if (!workflowToken) {
      console.log("The workflow token was not found");
      return;
    }
    service.current = new IdvIntegrationService();
    service.current.sessionRestoreMode = true;
    service.current.eventListener = listener;
    const serviceRun = async () => {
      const initResult = await service.current?.initialize({
        modulesConfig: {
          docreader: {
            devLicense: "Base64License",
          },
        },
        includedModules: [IproovIdv, DocumentIdv],
      });
      if (initResult?.error) {
        console.log(initResult.error);
        return;
      }
      const configureResult = await service.current?.configure({
        url: workflowToken
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
        locale: "en",
      });
      if (startWorkflowResult?.error) {
        console.log(startWorkflowResult.error);
        return;
      }
      console.log("WORKFLOW FINISHED :", startWorkflowResult);
    };
    serviceRun();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <idv-flow></idv-flow>
    </div>
  );
}

export default App;
