//Creating shadow commponent for navbar so that with a tag only we can render navbar
const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `<div class="navbar-top"></div>
    <header class="navbar-container">
    <noscript>
        <div id="javascript-status" class="d-flex justify-content-center">
            Please enable javascript for best experience
        </div>
    </noscript>
    <div id="network-status" class="d-flex justify-content-center"></div>
    <div id="user-action-status-messages">
    </div>
    </div>
    <nav class="d-flex justify-content-space-between">
        <a href="/Quality-Reads/" class="company-logo-container d-flex web-links" title="Quality Reads">
            <span class="company-logo d-flex"><i class="fa-brands fa-hacker-news-square"></i></span>
            <span class="company-name">Quality Reads</span>
        </a>
        <div class="d-flex">
            <a href="/Quality-Reads#search-input-parent-container" class="web-links d-flex justify-content-center"
                title="Search for articles" data-nav-title="Search for articles"">
                <span class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 511.975 512.075">
                        <path data-name="Path 1" d="M416,208a207.488,207.488,0,0,1-40,122.7L502.6,457.4a32.032,32.032,0,0,1-45.3,45.3L330.7,376A206.808,206.808,0,0,1,208,416C93.1,416,0,322.9,0,208S93.1,0,208,0,416,93.1,416,208ZM208,352A144,144,0,1,0,64,208,144.037,144.037,0,0,0,208,352Z" fill="currentColor"/>
                    </svg>
                </span>
                <span class="link-text">Search</span>
            </a>
            <button class="updates-modal-btn web-links web-btns d-flex justify-content-center"
                title="Updates" data-nav-title="Updates">
                <span class="link-icon link-pro-icon d-flex">
                <svg id="Icon_File" data-name="Icon/File" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none"/>
                    <path data-name="Path 2795" d="M79.942,0H66.058A1.962,1.962,0,0,0,64,1.844V20.156A1.962,1.962,0,0,0,66.058,22H79.942A1.962,1.962,0,0,0,82,20.156V1.844A1.962,1.962,0,0,0,79.942,0Zm1.24,20.156a1.182,1.182,0,0,1-1.24,1.111H66.058a1.182,1.182,0,0,1-1.24-1.111V1.844A1.182,1.182,0,0,1,66.058.733H79.942a1.182,1.182,0,0,1,1.24,1.111Z" transform="translate(-61 1)" stroke="currentColor" stroke-width="1.2"/>
                    <path data-name="Path 2796" d="M146.1,232h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -220.404)" stroke="currentColor" stroke-width="1.2"/>
                    <path data-name="Path 2797" d="M146.1,328h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -312.02)" stroke="currentColor" stroke-width="1.2"/>
                    <path data-name="Path 2798" d="M146.1,136h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z" transform="translate(-129.253 -128.789)" stroke="currentColor" stroke-width="1.2"/>
                </svg>
                </span>
                <span class="link-text">Updates</span>
            </button>
            <a href="https://github.com/yup-ma/Quality-Reads" class="web-links d-flex justify-content-center" target="_blank" title="Github link to repo"  data-nav-title="Github link to repo">
                <span class="link-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 496 483.607">
                    <path id="Path_1" data-name="Path 1" d="M165.9,397.4c0,2-2.3,3.6-5.2,3.6-3.3.3-5.6-1.3-5.6-3.6,0-2,2.3-3.6,5.2-3.6C163.3,393.5,165.9,395.1,165.9,397.4Zm-31.1-4.5c-.7,2,1.3,4.3,4.3,4.9,2.6,1,5.6,0,6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2,2.3Zm44.2-1.7c-2.9.7-4.9,2.6-4.6,4.9.3,2,2.9,3.3,5.9,2.6,2.9-.7,4.9-2.6,4.6-4.6C184.6,392.2,181.9,390.9,179,391.2ZM244.8,8C106.1,8,0,113.3,0,252,0,362.9,69.8,457.8,169.5,491.2c12.8,2.3,17.3-5.6,17.3-12.1,0-6.2-.3-40.4-.3-61.4,0,0-70,15-84.7-29.8,0,0-11.4-29.1-27.8-36.6,0,0-22.9-15.7,1.6-15.4,0,0,24.9,2,38.6,25.8,21.9,38.6,58.6,27.5,72.9,20.9,2.3-16,8.8-27.1,16-33.7-55.9-6.2-112.3-14.3-112.3-110.5,0-27.5,7.6-41.3,23.6-58.9-2.6-6.5-11.1-33.3,2.6-67.9,20.9-6.5,69,27,69,27a236.241,236.241,0,0,1,125.6,0s48.1-33.6,69-27c13.7,34.7,5.2,61.4,2.6,67.9,16,17.7,25.8,31.5,25.8,58.9,0,96.5-58.9,104.2-114.8,110.5,9.2,7.9,17,22.9,17,46.4,0,33.7-.3,75.4-.3,83.6,0,6.5,4.6,14.4,17.3,12.1C428.2,457.8,496,362.9,496,252,496,113.3,383.5,8,244.8,8ZM97.2,352.9c-1.3,1-1,3.3.7,5.2,1.6,1.6,3.9,2.3,5.2,1,1.3-1,1-3.3-.7-5.2C100.8,352.3,98.5,351.6,97.2,352.9Zm-10.8-8.1c-.7,1.3.3,2.9,2.3,3.9,1.6,1,3.6.7,4.3-.7.7-1.3-.3-2.9-2.3-3.9C88.7,343.5,87.1,343.8,86.4,344.8Zm32.4,35.6c-1.6,1.3-1,4.3,1.3,6.2,2.3,2.3,5.2,2.6,6.5,1,1.3-1.3.7-4.3-1.3-6.2C123.1,379.1,120.1,378.8,118.8,380.4Zm-11.4-14.7c-1.6,1-1.6,3.6,0,5.9s4.3,3.3,5.6,2.3c1.6-1.3,1.6-3.9,0-6.2-1.4-2.3-4-3.3-5.6-2Z" transform="translate(0 -8)" fill="currentColor"/>
                </svg>
                </span>
                <span class="link-text">Github</span>
            </a>
            <label class="dark-light-mode-switch" title="Toggle dark theme" data-nav-title="Toggle dark theme">
                <input type="checkbox" class="dark-light-mode-input">
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