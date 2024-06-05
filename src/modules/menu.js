import { LitElement, css, html } from "lit";

export class MenuElement extends LitElement {
    static styles= css`
        .main-div {
            height: 100VH;
            width: 100VW;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        
        .select-button {
            width: 30%;
            overflow: hidden;
            height: 10%;
            font-size: 2vw;
            background-color: blueviolet;
            border-radius: 10px;
        }
    `

    render() {
        return html`
        <div class="main-div">
            <button @click=${this.Imc} class="select-button Imc">IMC Component</button>
            <button @click=${this.galery} class="select-button galery">Galery Component</button>
            <button @click=${this.table} class="select-button" table>Dinamic Table Component</button>
            <button @click=${this.api} class="select-button">Api Component</button>
        </div>
        `
    }

    Imc() {
        const elementToDelete= this.shadowRoot.querySelector('.main-div')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <imc-element></imc-element>
        `)
    }

    galery() {
        const elementToDelete= this.shadowRoot.querySelector('.main-div')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <gallery-element></gallery-element>
        `)
    }

    table() {
        const elementToDelete= this.shadowRoot.querySelector('.main-div')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <dinamic-table></dinamic-table>
        `)
    }

    api() {
        const elementToDelete= this.shadowRoot.querySelector('.main-div')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
        <api-data-list></api-data-list>
        `)
    }


}

customElements.define ('menu-element', MenuElement)