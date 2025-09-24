import { IdvWebComponent } from '@regulaforensics/idv-capture-web';

declare global {
  interface HTMLElementTagNameMap {
    'idv-flow': IdvWebComponent;
  }
}
