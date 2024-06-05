import { LitElement, css, html } from "lit";

export class DinamicTable extends LitElement {
    static properties = {
        tableContent: { type: Object }
    }

    constructor() {
        super()
        this.tableContent = {
            name: '',
            age: '',
        }
    }

    static styles = css`
        .padre {position: relative;}
        table { width: 80vw; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; width= 33%; }
        .input-row { display: flex; margin-bottom: 10px; }
        .input-row input { margin-right: 10px; }
        .salir {position: absolute; top: -50px; left: 10px;}
    `

    render() {
        return html`
        <div class='padre'>
            <p @click=${this.volver} class='salir'><-anterior</p>
            <div class="input-row">
            <form  @submit=${this.handlerForm}>
                <input type="text" id="name-input" placeholder="Nombre" name="nameinput" required>
                <input type="number" id="age-input" placeholder="Edad" name="ageinput" required>
                <button id="add-row">Agregar</button>
            </form>
            </div>
            <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>acciones</th>
                </tr>
            </thead>
            <tbody id="body-insert">
                
            </tbody>
            </table>
        </div>  
        `
    }

    volver() {
        const elementToDelete= this.shadowRoot.querySelector('.padre')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <menu-element></menu-element>
        `)
    }

    handlerForm(event) {
        event.preventDefault();
    
        const name = event.target.elements.nameinput.value;
        const age = event.target.elements.ageinput.value;
        this.tableContent["name"] = name
        this.tableContent["age"] = age
        this.addInfo()
    }

    addInfo() {
        const tableBody = this.shadowRoot.getElementById("body-insert");
        const row = tableBody.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        cell1.textContent = this.tableContent["name"];
        cell2.textContent = this.tableContent["age"];
        const button = document.createElement("button");
        button.id = "delete-row";
        button.textContent = "Eliminar";
        button.addEventListener("click", () => this.deleteElement(button));
        cell3.appendChild(button);
    }

    deleteElement(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

customElements.define('dinamic-table', DinamicTable)