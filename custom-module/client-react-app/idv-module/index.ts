import { type IdvModuleProps, registerModule } from "@regulaforensics/idv-interfaces";
let isReady = false;
export const MODULE_NAME = 'external-module';


export class ExternalModule extends HTMLElement {
    props: any = null;
    private _mounted = false;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static displayName = MODULE_NAME;

    setProps(props: IdvModuleProps<any, any>) {
		console.log(props);
        this.props = {
            idvEventListener: props.idvEventListener,
            moduleProps: props.moduleProps,
            isProcessing: props.isProcessing,
            perform: props.perform,
        };
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;
        const style =
            '<style> *,::after,::before{box-sizing:border-box}h1,h2,h3,h4,p,ul{padding:0;margin:0}li{list-style:none}:host{display:block;container-type:inline-size;container-name:host;width:100%;height:100%}.container{display: flex; justify-content: center; align-items: center; gap: 10px; flex-direction: column; background: #e8e8e8; height: 100%;}</style>';
        this.shadowRoot.innerHTML = style;
		const element = document.createElement('div');
        element.classList.add('container');
		const button = document.createElement('button');
		button.innerText = this.props.moduleProps?.testButton?.text ?? 'Close';
		button.addEventListener('click', () => {
			this.props?.perform({
				transactionId: '',
				has_nfc: false,
				cancel: true,
				permissionDenied: false,
			});
		})
		
		element.innerText = this.props.moduleProps?.testText ?? 'Test';
		element.appendChild(button);
        this.shadowRoot.appendChild(element);
    }

    disconnectedCallback() {
        setTimeout(() => {
            if (!this._mounted) return;
            this._mounted = false;
        });
    }

    static isReady() {
        return isReady;
    }

    static getSupportedTemplates = () => {
        return ["EXT"];
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static initialize(modulesConfig: Record<string, unknown>) {
        console.log('Initialize external module');
        isReady = true;
    }

    static deinitialize() {
        console.log('Initialize external module');
        isReady = false;
    }

    static getIdentifier = () => {
        return MODULE_NAME;
    };
}

registerModule(MODULE_NAME, ExternalModule);

export default ExternalModule;