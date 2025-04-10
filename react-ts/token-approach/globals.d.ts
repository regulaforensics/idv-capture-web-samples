import { IdvWebComponent } from '@regulaforensics/idv-capture-web';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'idv-flow': React.DetailedHTMLProps<HTMLAttributes<IdvWebComponent>, IdvWebComponent>;
    }
  }
}
