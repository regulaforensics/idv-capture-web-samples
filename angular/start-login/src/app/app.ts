import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdvComponent } from './components/idv.component';
import { IdvIntegrationService, IdvMessageEvent } from '@regulaforensics/idv-capture-web';
import { FaceIdv } from '@regulaforensics/idv-face';
import { DocumentIdv } from '@regulaforensics/idv-document';

@Component({
  selector: 'app-root',
  imports: [CommonModule, IdvComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  isOpen = signal(false);
  service: IdvIntegrationService | null = null;

  listener = (event: IdvMessageEvent) => {
    console.log(event);
  };

  async startLogin() {
    const loginConfig = {
      applicationId: "", // set application id
      baseUrl: "" , // set base url
      metadata: {
        additionalProp1: {},
      },
      locale: 'en',
    };

    this.service = new IdvIntegrationService();
    this.service.sessionRestoreMode = true;
    this.service.eventListener = this.listener;

    const initResult = await this.service.initialize({
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

    this.isOpen.set(true);

    const startLoginResult = await this.service.startLogin(loginConfig);
    console.log(startLoginResult);

    this.isOpen.set(false);
  }

  ngOnDestroy() {
    this.service?.deinitialize();
  }
}
