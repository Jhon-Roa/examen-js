import { LitElement, css, html } from "lit";

export class ImcElement extends LitElement {
    static properties = {
        ImcInfo: {type : Object}
    }

    constructor() {
        super()
        this.ImcInfo = {
            peso: 0,
            altura: 0
        }
    }

    render() {
        return html`
        <div class='form-padre'>
            <p @click=${this.volver}><-anterior</p>
            <div class="form-container">
                <form @submit=${this.formHandler} class="formulario">
                    <label for="peso">peso: </label>
                    <input id="peso" name="peso" type="number" placeholder="ingrese su peso" min='0' required>
                    <label for="altura">altura: </label>
                    <input id="altura" name="altura" type="number" step="0.01" min='0' placeholder="ingrese su altura" required>
                    <button class="form-button">enviar</button>
                </form>
                <div id="resultado"></div>
            </div>
        </div>
        `
    }

    volver() {
        const elementToDelete= this.shadowRoot.querySelector('.form-padre')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <menu-element></menu-element>
        `)
    }

    formHandler(event) {
        event.preventDefault();
    
        const peso = event.target.elements.peso.value;
        const altura = event.target.elements.altura.value;
        console.log(peso)
        this.ImcInfo["peso"] = peso
        this.ImcInfo["altura"] = altura
        
        this.enviarInfo()
    }

    enviarInfo() {
        const ingresarEn = this.shadowRoot.querySelector('#resultado')
        const totalImc = this.ImcInfo.peso / this.ImcInfo.altura ** 2
        const elementToDelete = this.shadowRoot.querySelector('.divpeso')

        if (elementToDelete) {
            elementToDelete.remove()
        }

        if (totalImc < 18.5 ) {
            ingresarEn.insertAdjacentHTML('afterbegin', `
            <div class='divpeso'>
            <p>su imc es ${totalImc}</p>
            <p>Delgado</p>
            <img src="/public/assets/imc/delgad0.jpg" style="width: 100px;">
            </div>
            `)
        } else if (totalImc >= 18.5 && totalImc < 25) {
            ingresarEn.insertAdjacentHTML('afterbegin', `
            <div class='divpeso'>
            <p>su imc es ${totalImc}</p>
            <p>Normal</p>
            <img src="/public/assets/imc/normal.jpg" style="width: 100px;">
            </div>
            `)
        } else if (totalImc >= 25 && totalImc < 30) {
            ingresarEn.insertAdjacentHTML('afterbegin', `
            <div class='divpeso'>
            <p>su imc es ${totalImc}</p>
            <p>sobrepeso</p>
            <img src="/public/assets/imc/sobrepeso.jpeg" style="width: 100px;">
            </div>
            `)
        } else if (totalImc >= 30) {
            ingresarEn.insertAdjacentHTML('afterbegin', `
            <div class='divpeso'>
            <p>su imc es ${totalImc}</p>
            <p>obeso</p>
            <img src="/public/assets/imc/obesidad.png" style="width: 100px;">
            </div>
            `)
        }
    }
}

customElements.define ('imc-element', ImcElement)