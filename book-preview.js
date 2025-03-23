export class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); //Create a shadow DOM
  }

  connectedCallback() {
    this.render(); //Render the component when it is connected to the DOM
    this.attachEventListener(); //Ensure event listener is attached
  }
  //Specify the attributes to observe for changes
  static get observedAttributes() {
    return ['title', 'author', 'image', 'book-id'];
  }
  //React to changes in observed attributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  //Attaching an event listener for click
  attachEventListener() {
    this.shadowRoot.addEventListener('click', () => {
      const bookId = this.getAttribute('book-id'); //Getting the book id
      this.dispatchEvent(
        new CustomEvent('book-selected', {
          detail: { bookId },
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  render() {
    const title = this.getAttribute('title') || 'Unknown Title';
    const author = this.getAttribute('author') || 'Unknown Author';
    const image = this.getAttribute('image') || '';
    const bookId = this.getAttribute('book-id') || '';

    this.shadowRoot.innerHTML = `
    <style>
.preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
  min-height: 140px; //Set minimum height for when a book has a single line title, to ensure the container/preview size is constant
  height: 140px;
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8);
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}
  </style>
        <button class = "preview" data-preview="${bookId}">
        <img class = "preview__image" src="${image}" alt="Book Cover"/>
        <div class = "preview__info">
        <h3 class = "preview__title">${title}</h3>
        <div class = "preview__author">${author}</div>
        </div>  
        </button>
        `;
  }
}

//Define the custom element, enabling <book-preview> usage in the HTML
customElements.define('book-preview', BookPreview);
