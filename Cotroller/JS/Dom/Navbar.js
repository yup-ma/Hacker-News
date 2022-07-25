//Creating shadow commponent for navbar so that with a tag only we can render navbar
const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `<div class="navbar-top"></div>
    <header class="navbar-container">
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
        <a href="/Hacker-News/" class="company-logo-container d-flex web-links" title="Hacker News">
            <span class="company-logo d-flex"><i class="fa-brands fa-hacker-news-square"></i></span>
            <span class="company-name">Hacker News</span>
        </a>
        <div class="d-flex">
            <a href="/Hacker-News#search-input-parent-container" class="web-links d-flex d-flex-just-cent"
                title="Search for articles" data-nav-title="Search for articles"">
                <span class="link-icon link-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                <span class="link-text">Search</span>
            </a>
            <button class="updates-modal-btn web-links web-btns d-flex d-flex-just-cent"
                title="Updates" data-nav-title="Updates">
                <span class="link-icon link-pro-icon d-flex">
                <svg id="Icon_File" data-name="Icon/File" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <rect id="Container" width="24" height="24" fill="none"/>
                    <path id="Path_2795" data-name="Path 2795" d="M79.942,0H66.058A1.962,1.962,0,0,0,64,1.844V20.156A1.962,1.962,0,0,0,66.058,22H79.942A1.962,1.962,0,0,0,82,20.156V1.844A1.962,1.962,0,0,0,79.942,0Zm1.24,20.156a1.182,1.182,0,0,1-1.24,1.111H66.058a1.182,1.182,0,0,1-1.24-1.111V1.844A1.182,1.182,0,0,1,66.058.733H79.942a1.182,1.182,0,0,1,1.24,1.111Z" transform="translate(-61 1)" stroke="currentColor" stroke-width="1.2"/>
                    <path id="Path_2796" data-name="Path 2796" d="M146.1,232h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -220.404)" stroke="currentColor" stroke-width="1.2"/>
                    <path id="Path_2797" data-name="Path 2797" d="M146.1,328h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -312.02)" stroke="currentColor" stroke-width="1.2"/>
                    <path id="Path_2798" data-name="Path 2798" d="M146.1,136h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -128.789)" stroke="currentColor" stroke-width="1.2"/>
                </svg>
                </span>
                <span class="link-text">Updates</span>
            </button>
            <a href="https://github.com/yup-ma/Hacker-News" class="web-links d-flex d-flex-just-cent" target="_blank" title="Github link to repo"  data-nav-title="Github link to repo">
                <span class="link-icon"><i class="fa-brands fa-github"></i></span>
                <span class="link-text">Github</span>
            </a>
            <label class="dark-light-mode-switch" title="Comming soon" data-nav-title="Comming soon">
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