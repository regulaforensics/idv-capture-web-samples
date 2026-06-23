import { useRef, useState} from "react";
import { IdvIntegrationService, IdvMessageEvent } from "@regulaforensics/idv-capture-web";
import { FaceIdv } from "@regulaforensics/idv-face";
import { DocumentIdv } from "@regulaforensics/idv-document";
import styles from "./styles.module.css";

function App() {
  const service = useRef<IdvIntegrationService | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const listener = (event: IdvMessageEvent) => {
    console.log(event);
  }

  const startLogin = async() => {
    const loginConfig = {
      applicationId: "", // set application id
      baseUrl: "" , // set base url
      metadata: {
        additionalProp1: {},
      },
      locale: 'en'
    };

    service.current = new IdvIntegrationService();
    service.current.sessionRestoreMode = true;
    service.current.eventListener = listener;

    const initResult = await service.current?.initialize({
      modulesConfig: {
        docreader:
            {devLicense: 'Base64License'}
      },
      includedModules: [FaceIdv, DocumentIdv],
    });

    if (initResult?.error) {
      console.log(initResult.error);
      return;
    }

    setIsOpen(true);

    const startLoginResult = await service.current?.startLogin(loginConfig);
    console.log(startLoginResult);

    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => startLogin()}>Start Login</button>
      {isOpen && (
          <div className={styles.container}>
            <idv-flow></idv-flow>
          </div>
      )}
    </div>
  );
}

export default App;
