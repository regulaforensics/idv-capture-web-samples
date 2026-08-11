import { useEffect, useRef } from "react";
import { IdvIntegrationService, IdvMessageEvent } from "@regulaforensics/idv-capture-web";
import { FaceIdv } from "@regulaforensics/idv-face";
import { DocumentIdv } from "@regulaforensics/idv-document";

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
            devLicense: 'AAEAAA2Uo8qkJF0Juj8kmPlEXWRfgJJ3W2nqFSVPDVsEp53bXM7k594lE1AUUEm4HP9VquqNJSZWVFHoVO+p9bbRwJWLyYtABqs8ICXire74/3gkIy2QkoaJgZo+4FThZJRu3Rki6u7RGzRWditj4cI/XEXRrwv4TVDoJndFSRX/XE9lTC155SQcAt43CaIRI6mHzBA6ErmM6beF/zqmc0W1Aj0CENAn0vhDn2axAYpBHDYl6IViMkj9TIQbpyFPFHGU3RyZnz0UzIVfWhu3+kOkN01Ei28NtVEgVuc3bUr1Y3zvb0n7y1+i3hyvOD+PcM5qsPJrRIwlvrzp0ggcak3FgykkAQAAAAAAEGU1Doc9Y+ZdzpYD2N/N/suS+PJfrCoDA+++mJ8pva4hFTpyS87jpgRvO5LhoZRwyr7gPHq5zPTGiJtYpRpuR7uVHZmECdnQvC8IotpqYOHv8vvY9DEXypNLuydzOVpaoB0ftf6UEZif2SFlQyT0gNhDyoxA+dIZX6ROzVAfumtEuGV3l4nAet6ZMDAEc2EDO6mpiFj7XsA1CDxZI52OiGE8Rg7pCCXqmu+epOBjkDZ8U/aGQpd7joM00nMUsBI/yX+BZOg6GUaMBub5C3fEcJd4ZYXBNDgl9NmAcHkq4uGs8mbCDZIdWjQngw0dMAMXb7HQ7EZTWoMxi+XG5Sbt+ivkuxRCFsx7OziqoMwCBjg1YpLyv1zZhX/+X63NHqbezA==',
          }
        },
        includedModules: [FaceIdv, DocumentIdv],
      });
      if (initResult?.error) {
        console.log(initResult.error);
        return;
      }
  
      const configureResult = await service.current?.configure({
        baseUrl: "https://nightly.idv-platform.app", // set host
        userName: "nightly-storybook", // set user name
        password: "1#Aa_test",  // set password
      });
      console.log(configureResult);
      if (configureResult?.error) {
        console.log(configureResult.error);
        return;
      }
      const prepareResult = await service.current?.prepareWorkflow({
        workflowId: "edda0192-b890-11ef-a348-17da751a2345", // set workflow id
      });
      if (prepareResult?.error) {
        console.log(prepareResult.error);
        return;
      }
      const metadata = { test: true };
      const startWorkflowResult = await service.current?.startWorkflow({
        metadata: metadata,
        locale: 'en',
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
