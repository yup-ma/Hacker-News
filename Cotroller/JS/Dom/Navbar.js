const navbarTemplate = document.createElement('template');
    navbarTemplate.innerHTML = `<header class="navbar-container">
    <noscript>
        <div id="javascript-status" class="d-flex d-flex-just-cent">
            Please enable javascript for best experience
        </div>
    </noscript>
    <div id="network-status" class="d-flex d-flex-just-cent"></div>
    <div id="user-action-status-messages">
    </div>
    </div>
    <nav class="d-flex d-flex-just-space-btw">
        <a href="../Template/Index.html" class="company-logo-container d-flex web-links" title="Hacker News">
            <span class="company-logo d-flex"><i class="fa-brands fa-hacker-news-square"></i></span>
            <span class="company-name">Hacker News</span>
        </a>
        <div class="d-flex">
            <a href="../Template/Index.html#search-input-parent-container" class="web-links d-flex"
                title="Search for articles">
                <span class="link-icon link-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                <span class="link-text">Search</span>
            </a>
            <a href="https://github.com/yup-ma/Hybr1d-Project" class="web-links d-flex" target="_blank"
                rel="noopener noreferrer" title="Github link to repo">
                <span class="link-icon"><i class="fa-brands fa-github"></i></span>
                <span class="link-text">Github</span>
            </a>
            <label class="dark-light-mode-switch web-links" title="Toggle dark mode">
                <input type="checkbox">
                <span class="dark-light-mode-slider"></span>
            </label>
        </div>
    </nav>
</header>`;

class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(navbarTemplate.content);
        // const shadowRoot = this.attachShadow({ mode: 'closed' });
        // shadowRoot.appendChild(navbarTemplate.content);
    }
}

customElements.define('navbar-component', Navbar);

