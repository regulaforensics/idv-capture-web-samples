import { IdvIntegrationService } from '@regulaforensics/idv-capture-web';
import { FaceIdv } from '@regulaforensics/idv-face';
import { DocumentIdv } from '@regulaforensics/idv-document';

const startLoginBtn = document.getElementById('start-login-btn');
const idvContainer = document.getElementById('idv-container');

let service = null;

function idvEventListener(data) {
  console.log(data);
}

async function startLogin() {
  const loginConfig = {
    applicationId: "", // set application id
    baseUrl: "" , // set base url
    metadata: {
      additionalProp1: {},
    },
    locale: 'en',
  };

  service = new IdvIntegrationService();
  service.sessionRestoreMode = true;
  service.eventListener = idvEventListener;

  const initResult = await service.initialize({
    modulesConfig: {
      docreader: {
        devLicense: 'Base64License',
      },
    },
    includedModules: [FaceIdv, DocumentIdv],
  });

  if (initResult?.error) {
    console.log(initResult.error);
    return;
  }

  idvContainer.style.display = 'flex';

  const startLoginResult = await service.startLogin(loginConfig);
  console.log(startLoginResult);

  idvContainer.style.display = 'none';
}

startLoginBtn.addEventListener('click', startLogin);

