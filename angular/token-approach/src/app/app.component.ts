import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdvComponent } from "./components/idv.component";
import { IdvIntegrationService } from "@regulaforensics/idv-capture-web";
import { FaceIdv } from "@regulaforensics/idv-face";
import { DocumentIdv } from "@regulaforensics/idv-document";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [CommonModule, IdvComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  service: IdvIntegrationService | null = null;
  isPreparedWithId = false;
  isConnectedToPlatform = false;

  async startWorkflow() {
    if (!this.service) return;
    if (!this.isPreparedWithId) {
      const prepareResult = await this.service.prepareWorkflow({
        workflowId: "", // set workflow id
      });
      console.log({ prepareResult });
      if (prepareResult.error) {
        console.log(prepareResult.error);
        this.isOpen = false;
        this.isPreparedWithId = false;
        return;
      }
    }
    this.isPreparedWithId = true;
    this.isOpen = true;
    const metadata = { test: true };
    const startWorkflowResult = await this.service?.startWorkflow({
      metadata: metadata,
      locale: "en",
    });
    if (startWorkflowResult?.error) {
      console.log(startWorkflowResult.error);
      this.isOpen = false;
      this.isPreparedWithId = false;
    }
    console.log("WORKFLOW FINISHED :", startWorkflowResult);
    this.isOpen = false;
    this.isPreparedWithId = false;
  }

  async ngOnInit() {
    this.service = new IdvIntegrationService();

    const initResult = await this.service.initialize({
      modulesConfig: {
        docreader: {
          devLicense: "Base64License",
        },
      },
      includedModules: [FaceIdv, DocumentIdv],
    });
    if (initResult.error) {
      console.log(initResult.error);
      this.isOpen = false;
      this.isPreparedWithId = false;
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const workflowToken = searchParams.get("workflow");

    if (!workflowToken) {
      console.log("The workflow token was not found");
      return;
    }

    const configureResult = await this.service.configure({
      url: workflowToken,
    });
    console.log({ configureResult });
    if (configureResult?.error) {
      console.log(configureResult.error);
      this.isOpen = false;
      this.isPreparedWithId = false; 
      return;
    }
    this.isConnectedToPlatform = true;
    const prepareResult = await this.service.prepareWorkflow({
      workflowId: "", // set workflow id
    });
    console.log({ prepareResult });
    if (prepareResult.error) {
      console.log(prepareResult.error);
      this.isOpen = false;
      this.isPreparedWithId = false;
      return;
    }
    this.isPreparedWithId = true;
    console.log('Idv ready to start');
  }

  ngOnDestroy() {
    this.service?.deinitialize();
    this.isOpen = false;
    this.isPreparedWithId = false;
    this.isConnectedToPlatform = false;
  }
}
