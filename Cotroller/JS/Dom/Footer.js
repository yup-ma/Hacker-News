//Creating shadow commponent for footer so that with a tag only we can render footer
const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `<footer class="d-flex justify-content-center d-flex-dir-col">
    <h5>
        Created by <b>Aman</b>
    </h5>
    <div>with ❤️ from India</div>
    <a href="https://news.ycombinator.com/" class="mail-link" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 448">
            <path d="M400,32H48A48.012,48.012,0,0,0,0,80V432a48.012,48.012,0,0,0,48,48H400a48.012,48.012,0,0,0,48-48V80A48.012,48.012,0,0,0,400,32ZM21.2,229.2H21c.1-.1.2-.3.3-.4a.6.6,0,0,1-.1.4Zm218,53.9V384H207.8V281.3L128,128h37.3c52.5,98.3,49.2,101.2,59.3,125.6,12.3-27,5.8-24.4,60.6-125.6H320Z" transform="translate(0 -32)" fill="currentColor"/>
        </svg>
        Hacker News
    </a>
    <a href="mailto:aman080420@gmail.com?subject=Feedback%20for%20Hacer%20News%20Search%Engine" class="mail-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 384">
            <path d="M48,64a48,48,0,0,0-28.8,86.4L236.8,313.6a32.1,32.1,0,0,0,38.4,0L492.8,150.4A48,48,0,0,0,464,64H48ZM0,176V384a64.059,64.059,0,0,0,64,64H448a64.059,64.059,0,0,0,64-64V176L294.4,339.2a63.9,63.9,0,0,1-76.8,0Z" transform="translate(0 -64)" fill="currentColor"/>
        </svg>
        aman080420@gmail.com
    </a>
    <a href="tel:7419058464" class="mobile-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512.023 512.023">
            <path d="M164.9,24.6A39.876,39.876,0,0,0,117.5,1.4l-88,24A40.117,40.117,0,0,0,0,64C0,311.4,200.6,512,448,512a40.117,40.117,0,0,0,38.6-29.5l24-88a39.876,39.876,0,0,0-23.2-47.4l-96-40a39.873,39.873,0,0,0-46.3,11.6L304.7,368A337.972,337.972,0,0,1,144,207.3L193.3,167a39.91,39.91,0,0,0,11.6-46.3l-40-96Z" transform="translate(0 0.023)" fill="currentColor"/>
        </svg>
        +91 74190-58464
    </a>
    <div>

    </div>
</footer>`;

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(footerTemplate.content);
    }
}

customElements.define('footer-component', Footer);
