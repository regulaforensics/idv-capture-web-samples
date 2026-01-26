import { useEffect, useRef } from "react";
import {
  IdvIntegrationService,
  IdvMessageEvent,
} from "@regulaforensics/idv-capture-web";
import { FaceIdv } from "@regulaforensics/idv-face";
import { DocumentIdv } from "@regulaforensics/idv-document";

function App() {
  const service = useRef<IdvIntegrationService | null>(null);

  const listener = (event: IdvMessageEvent) => {
    console.log(event);
  };

  useEffect(() => {
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
        includedModules: [FaceIdv, DocumentIdv],
      });
      if (initResult?.error) {
        console.log(initResult.error);
        return;
      }

      const baseUrl = ""; // set host
      const apiKey = ""; // set api key (should be generated with "deeplink:write", "workflow:read" permissions)
      const workflowId = ""; // set workflow id
      const ttl = 3600; // set time to live
      const locale = "en";

      // Get Handoff URL (URL with token and sessionId) by workflowId and apiKey.
      // Normally this has to be done on the backend in order to keep the apiKey secret.
      let handoffUrl = "";
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/deeplink?workflowId=${workflowId}`,
          {
            headers: {
              authorization: `ApiKey ${apiKey}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({ ttl, locale, metadata: {} }),
            method: "POST",
          }
        );
        const responseJson = await response.json();
        handoffUrl = responseJson.url;
      } catch (error) {
        console.log(`Error: ${error}`);
      }
      // ==============================================================================

      console.log("Handoff URL:", handoffUrl);

      const configureResult = await service.current?.configure({
        url: handoffUrl,
      });
      console.log(configureResult);
      if (configureResult?.error) {
        console.log(configureResult.error);
        return;
      }
      const prepareResult = await service.current?.prepareWorkflow({
        workflowId,
      });
      if (prepareResult?.error) {
        console.log(prepareResult.error);
        return;
      }
      const metadata = { test: true };
      const startWorkflowResult = await service.current?.startWorkflow({
        metadata: metadata,
        locale,
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
