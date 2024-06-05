import { LitElement, html, css } from 'lit';

class ApiDataList extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .list-item {
      cursor: pointer;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .list-item:hover {
      background-color: #f0f0f0;
    }

    .details {
      margin-top: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px;
    }

    .details h3 {
      margin-top: 0;
    }

    .details p {
      margin-bottom: 10px;
    }

    button {
      margin-top: 20px;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    .salir {
      position: absolute; 
      top: 10px; 
      left: 10px;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this.selectedItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      this.data = data;
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
    <div class='padre'>
      <p @click=${this.volver} class='salir'><-anterior</p>
      <button @click=${this.fetchData}>Actualizar Datos</button>
      <div id="list-container">
        ${this.data.map(item => html`
          <div class="list-item" @click=${() => this.showDetails(item)}>
            ${item.name}
          </div>
        `)}
      </div>
      ${this.selectedItem ? html`
        <div class="details">
          <h3>${this.selectedItem.name}</h3>
          <p>Email: ${this.selectedItem.email}</p>
          <p>Phone: ${this.selectedItem.phone}</p>
          <p>Website: ${this.selectedItem.website}</p>
          <p>Company: ${this.selectedItem.company.name}</p>
          <p>Address: ${this.selectedItem.address.street}, ${this.selectedItem.address.suite}, ${this.selectedItem.address.city}, ${this.selectedItem.address.zipcode}</p>
        </div>
    </div>
      ` : ''}
    `;
  }

  volver() {
    const elementToDelete= this.shadowRoot.querySelector('.padre')
    const elementToInsert = document.querySelector('body')

    elementToDelete.remove()
    elementToInsert.insertAdjacentHTML('afterbegin', `
        <menu-element></menu-element>
    `)
}

  showDetails(item) {
    this.selectedItem = item;
  }
}

customElements.define('api-data-list', ApiDataList);