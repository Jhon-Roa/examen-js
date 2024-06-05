import { LitElement, css, html } from "lit";
import { images } from "../../data/gallery-data";

export class ImageGallery extends LitElement {
    static properties = {
        counter: {type : Number}
    }

    constructor() {
        super()
        this.Number = 0
    }

    static styles = css`
    .gallery { display: flex; flex-wrap: wrap; justify-content: center;  width: 100vw; height: 100vh; overflow: auto;}
    .thumbnail { width: 250px; height: auto; margin: 5px; cursor: pointer}
    .modal { display: none; position: fixed; height: 100%; flex-direction: column;  width: 100%; top: 0; left: 0; justify-content: center; align-items: center}
    .modal-img { max-width: 90%; max-height: 90%; }
    .salir {position: absolute; top: 10px; left: 10px;}
    `

    render() {
        return html`
            <div class='gallery'>${this.printImages()}<p @click=${this.volver} class='salir'><-anterior</p></div>
            
            <div class="modal" id='modal' @click=${this.closeForm}>
                <img class='modal-img' id="modal-image" />
                <div>
                <button id="prev" @click=${this.previousImg}>Previous</button>
                <button id="next" @click=${this.nextImg}>Next</button>
                </div>
            </div>
        `
    }

    volver() {
        const elementToDelete= this.shadowRoot.querySelector('.gallery')
        const elementToInsert = document.querySelector('body')

        elementToDelete.remove()
        elementToInsert.insertAdjacentHTML('afterbegin', `
            <menu-element></menu-element>
        `)
    }

    closeForm(event) {
        if (event.target.id === 'modal') {
            event.target.style.display = 'none';
        }
    }

    printImages(){
        return html`${images.map((image, index) => html`
        <img src=${image} class='thumbnail' @click=${() => this.openModal(index)}>
    `)}`;
    }
    
    previousImg() {
        this.counter -= 1;
        this.updateImage(this.counter)
    }

    nextImg() {
        this.counter += 1;
        this.updateImage(this.counter)
    }

    openModal(index){
        this.counter= index
        this.shadowRoot.querySelector('.modal').style.display= 'flex';
        this.updateImage(this.counter)
    }

    updateImage(index){
        this.shadowRoot.querySelector('.modal-img').src = images[index]
    }
}



customElements.define ('gallery-element', ImageGallery)