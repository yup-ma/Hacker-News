//Creating shadow commponent for footer so that with a tag only we can render footer
const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `<footer class="d-flex d-flex-just-cent d-flex-dir-col">
    <h5>
        Created by <b>Aman</b>
    </h5>
    <div>with ❤️ from India</div>
    <a href="https://news.ycombinator.com/" class="mail-link" target="_blank"><i class="fa-brands fa-hacker-news-square"></i> Hacker News</a>
    <a href="mailto:aman080420@gmail.com?subject=Feedback%20for%20Hacer%20News%20Search%Engine" class="mail-link"><i
            class="fa-solid fa-envelope"></i> aman080420@gmail.com</a>
    <a href="tel:7419058464" class="mobile-link"><i class="fa-solid fa-phone"></i>+91 74190-58464</a>
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