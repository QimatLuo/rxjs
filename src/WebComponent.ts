/* eslint-disable functional/functional-parameters, functional/no-classes, functional/no-expression-statements, functional/no-return-void */
import { ReplaySubject, map } from "rxjs";

export function WebComponent({
  attachShadow,
  name,
  props = [],
  template = "",
}: {
  attachShadow?: ShadowRootInit;
  name: string;
  props?: string[];
  template: string;
}) {
  const attributeChanged = new ReplaySubject<{
    name: string;
    oldValue: string | null;
    newValue: string | null;
  }>();
  const shadowRoot = new ReplaySubject<ShadowRoot>();

  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();

        const tmpl = document.createElement("template");
        tmpl.innerHTML = template;

        const root = this.attachShadow(attachShadow || { mode: "open" });
        root.append(tmpl.content.cloneNode(true));

        shadowRoot.next(root);
      }

      connectedCallback() {
        console.log(name, "connectedCallback");
      }

      adoptedCallback() {
        console.log(name, "adoptedCallback");
      }

      disconnectedCallback() {
        console.log(name, "disconnectedCallback");
        attributeChanged.complete();
        shadowRoot.complete();
      }

      static get observedAttributes() {
        return props;
      }
      attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null
      ) {
        attributeChanged.next({ name, oldValue, newValue });
      }
    }
  );

  return {
    attributeChanged,
    host: shadowRoot.pipe(map((x) => x.host as HTMLElement)),
    shadowRoot,
  };
}
