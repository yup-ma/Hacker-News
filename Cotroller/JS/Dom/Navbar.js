//Creating shadow commponent for navbar so that with a tag only we can render navbar
const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `    <div class="navbar-top"></div>
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
            <span class="company-logo d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 182.75 193.836">
                    <g id="Group_3" data-name="Group 3" transform="translate(-894.643 -742.906)">
                        <path id="Path_4" data-name="Path 4"
                            d="M111.762,7.375,107.383,5.7,103,7.375l-79,30.5L16.69,40.69l-.457,7.843c-1.142,18.885,1.828,47.783,14.2,76.072,12.45,28.48,34.686,56.769,72.151,72.874l4.8,2.056,4.8-2.056c37.465-16.105,59.7-44.395,72.151-72.874,12.374-28.251,15.344-57.187,14.2-76.072l-.457-7.843-7.31-2.817-79-30.459Z"
                            transform="translate(878.635 737.206)" fill="currentColor" />
                        <path id="Path_3" data-name="Path 3"
                            d="M82.114,58.342,65.45,33.7A4.039,4.039,0,0,0,62.262,32H21.1a3.793,3.793,0,0,0-3.044,1.692L1.535,58.335a3.842,3.842,0,0,0,.386,4.789L38.95,102.573a3.848,3.848,0,0,0,5.6,0L81.725,63.125A3.827,3.827,0,0,0,82.114,58.342ZM62.022,42.349,72.212,57.637H49.764ZM41.753,55.538,29.191,39.691H54.3ZM21.484,42.349,33.6,57.637H11.156Zm20.269,51.98-27.332-29h54.67Z"
                            transform="translate(944.194 771.933)" fill="var(--white-color)" />
                    </g>
                </svg>
            </span>
            <span class="company-name">Quality Reads</span>
        </a>
        <div class="d-flex">
            <a href="/Quality-Reads#search-input-parent-container"
                class="web-links d-flex justify-content-center desktop-only" title="Search for articles">
                <span class=" link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 511.975 512.075">
                        <path data-name="Path 1"
                            d="M416,208a207.488,207.488,0,0,1-40,122.7L502.6,457.4a32.032,32.032,0,0,1-45.3,45.3L330.7,376A206.808,206.808,0,0,1,208,416C93.1,416,0,322.9,0,208S93.1,0,208,0,416,93.1,416,208ZM208,352A144,144,0,1,0,64,208,144.037,144.037,0,0,0,208,352Z"
                            fill="currentColor" />
                    </svg>
                </span>
                <span class="link-text">Search</span>
            </a>
            <a href="https://github.com/yup-ma/Quality-Reads"
                class="web-links d-flex justify-content-center desktop-only" target="_blank"
                title="Github link to repo">
                <span class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 496 483.607">
                        <path data-name="Path 1"
                            d="M165.9,397.4c0,2-2.3,3.6-5.2,3.6-3.3.3-5.6-1.3-5.6-3.6,0-2,2.3-3.6,5.2-3.6C163.3,393.5,165.9,395.1,165.9,397.4Zm-31.1-4.5c-.7,2,1.3,4.3,4.3,4.9,2.6,1,5.6,0,6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2,2.3Zm44.2-1.7c-2.9.7-4.9,2.6-4.6,4.9.3,2,2.9,3.3,5.9,2.6,2.9-.7,4.9-2.6,4.6-4.6C184.6,392.2,181.9,390.9,179,391.2ZM244.8,8C106.1,8,0,113.3,0,252,0,362.9,69.8,457.8,169.5,491.2c12.8,2.3,17.3-5.6,17.3-12.1,0-6.2-.3-40.4-.3-61.4,0,0-70,15-84.7-29.8,0,0-11.4-29.1-27.8-36.6,0,0-22.9-15.7,1.6-15.4,0,0,24.9,2,38.6,25.8,21.9,38.6,58.6,27.5,72.9,20.9,2.3-16,8.8-27.1,16-33.7-55.9-6.2-112.3-14.3-112.3-110.5,0-27.5,7.6-41.3,23.6-58.9-2.6-6.5-11.1-33.3,2.6-67.9,20.9-6.5,69,27,69,27a236.241,236.241,0,0,1,125.6,0s48.1-33.6,69-27c13.7,34.7,5.2,61.4,2.6,67.9,16,17.7,25.8,31.5,25.8,58.9,0,96.5-58.9,104.2-114.8,110.5,9.2,7.9,17,22.9,17,46.4,0,33.7-.3,75.4-.3,83.6,0,6.5,4.6,14.4,17.3,12.1C428.2,457.8,496,362.9,496,252,496,113.3,383.5,8,244.8,8ZM97.2,352.9c-1.3,1-1,3.3.7,5.2,1.6,1.6,3.9,2.3,5.2,1,1.3-1,1-3.3-.7-5.2C100.8,352.3,98.5,351.6,97.2,352.9Zm-10.8-8.1c-.7,1.3.3,2.9,2.3,3.9,1.6,1,3.6.7,4.3-.7.7-1.3-.3-2.9-2.3-3.9C88.7,343.5,87.1,343.8,86.4,344.8Zm32.4,35.6c-1.6,1.3-1,4.3,1.3,6.2,2.3,2.3,5.2,2.6,6.5,1,1.3-1.3.7-4.3-1.3-6.2C123.1,379.1,120.1,378.8,118.8,380.4Zm-11.4-14.7c-1.6,1-1.6,3.6,0,5.9s4.3,3.3,5.6,2.3c1.6-1.3,1.6-3.9,0-6.2-1.4-2.3-4-3.3-5.6-2Z"
                            transform="translate(0 -8)" fill="currentColor" />
                    </svg>
                </span>
                <span class="link-text">Github</span>
            </a>
            <button class="menu-modal-btn web-links web-btns d-flex justify-content-center mobile-only">
                <span class="link-icon d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 74.207 63.606">
                        <path data-name="Path 1"
                            d="M0,69.3A5.3,5.3,0,0,1,5.3,64H68.906a5.3,5.3,0,0,1,0,10.6H5.3A5.3,5.3,0,0,1,0,69.3ZM0,95.8a5.3,5.3,0,0,1,5.3-5.3H68.906a5.3,5.3,0,1,1,0,10.6H5.3A5.3,5.3,0,0,1,0,95.8Zm74.207,26.5a5.3,5.3,0,0,1-5.3,5.3H5.3a5.3,5.3,0,0,1,0-10.6H68.906A5.3,5.3,0,0,1,74.207,122.305Z"
                            transform="translate(0 -64)" fill="currentColor" />
                    </svg>
                </span>
                <span class="link-text">Menu</span>
            </button>
            <div class="dropdown-menu-container">
                <button class="close-modal-btn web-links web-btns d-flex justify-content-center mobile-only">
                    <span class="link-icon d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 54.241 54.241">
                            <path id="Path_1" data-name="Path 1"
                                d="M52.561,105.188a5.427,5.427,0,0,0-7.675-7.675l-17.84,17.857L9.188,97.53a5.427,5.427,0,0,0-7.675,7.675l17.857,17.84L1.53,140.9a5.427,5.427,0,0,0,7.675,7.675l17.84-17.857L44.9,148.561a5.427,5.427,0,1,0,7.675-7.675l-17.857-17.84Z"
                                transform="translate(0.075 -95.925)" fill="currentColor" />
                        </svg>
                    </span>
                    <span class="link-text hidden-ele">Close</span>
                </button>
                <div class="user-dropdown-menu-container">
                    <button class="user-modal-btn web-links web-btns d-flex justify-content-center">
                        <span class="link-icon d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512">
                                <path data-name="Path 1"
                                    d="M399,384.2A127.972,127.972,0,0,0,288,320H224a127.972,127.972,0,0,0-111,64.2,192.159,192.159,0,0,0,286,0ZM512,256c0,141.4-114.6,256-256,256S0,397.4,0,256,114.6,0,256,0,512,114.6,512,256ZM256,272a72,72,0,1,0-72-72A71.955,71.955,0,0,0,256,272Z"
                                    fill="currentColor" />
                            </svg>
                        </span>
                        <span class="link-text">Aman</span>
                        <span class="link-arrow mobile-only">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                                viewBox="0 0 62.865 35.918">
                                <path id="Path_2" data-name="Path 2"
                                    d="M60.187,194.528a4.5,4.5,0,0,0,6.355,0l26.933-26.933a4.493,4.493,0,1,0-6.355-6.355L63.357,185,39.595,161.254a4.493,4.493,0,0,0-6.355,6.354l26.933,26.933Z"
                                    transform="translate(-31.925 -159.925)" fill="currentColor" />
                            </svg>
                        </span>
                    </button>
                    <div class="user-dropdown-content-container">
                        <a href="#" class="web-links d-flex justify-content-center">
                            <span class="link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 448 512">
                                    <path id="Path_1" data-name="Path 1"
                                        d="M224,256A128,128,0,1,0,96,128,127.99,127.99,0,0,0,224,256Zm-45.7,48A178.265,178.265,0,0,0,0,482.3,29.7,29.7,0,0,0,29.7,512H418.3A29.7,29.7,0,0,0,448,482.3,178.265,178.265,0,0,0,269.7,304Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="link-text">Profile</span>
                        </a>
                        <div class="theme-dropdown-menu-container">
                            <button class="theme-modal-btn web-links web-btns d-flex justify-content-center">
                                <span class="link-icon d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 217.702 217.702">
                                        <path id="Path_1" data-name="Path 1"
                                            d="M190.489,108.851a81.659,81.659,0,0,0-81.638-81.638V190.489A81.659,81.659,0,0,0,190.489,108.851Zm27.213,0A108.851,108.851,0,1,1,108.851,0,108.843,108.843,0,0,1,217.7,108.851Z"
                                            fill="currentColor" />
                                    </svg>
                                </span>
                                <span class="link-text">Theme</span>
                                <span class="link-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                                        viewBox="0 0 62.865 35.918">
                                        <path id="Path_2" data-name="Path 2"
                                            d="M60.187,194.528a4.5,4.5,0,0,0,6.355,0l26.933-26.933a4.493,4.493,0,1,0-6.355-6.355L63.357,185,39.595,161.254a4.493,4.493,0,0,0-6.355,6.354l26.933,26.933Z"
                                            transform="translate(-31.925 -159.925)" fill="currentColor" />
                                    </svg>
                                </span>
                            </button>
                            <div class="theme-dropdown-content-container">
                                <button
                                    class="theme-btn web-links web-btns d-flex justify-content-center active-theme"
                                    data-theme-type="system">
                                    <span class="link-icon d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 217.702 217.702">
                                            <path id="Path_1" data-name="Path 1"
                                                d="M190.489,108.851a81.659,81.659,0,0,0-81.638-81.638V190.489A81.659,81.659,0,0,0,190.489,108.851Zm27.213,0A108.851,108.851,0,1,1,108.851,0,108.843,108.843,0,0,1,217.7,108.851Z"
                                                fill="currentColor" />
                                        </svg>
                                    </span>
                                    <span class="link-text">OS Default</span>
                                </button>
                                <button class="theme-btn web-links web-btns d-flex justify-content-center"
                                    data-theme-type="light">
                                    <span class="link-icon d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 196.019 196.019">
                                            <path id="Path_1" data-name="Path 1"
                                                d="M138.357.437a6.191,6.191,0,0,1,3.675,4.555l7.618,41.3,41.3,7.579a6.191,6.191,0,0,1,4.555,3.675,6.081,6.081,0,0,1-.612,5.818l-23.848,34.6L194.9,132.539a6.081,6.081,0,0,1,.612,5.818,6.191,6.191,0,0,1-4.555,3.675l-41.3,7.618-7.618,41.3a6.191,6.191,0,0,1-3.675,4.555,6.081,6.081,0,0,1-5.818-.612L97.972,171.048,63.406,194.9a6.081,6.081,0,0,1-5.818.612,6.191,6.191,0,0,1-3.675-4.555L46.3,149.65l-41.3-7.618a6.191,6.191,0,0,1-4.555-3.675,6.081,6.081,0,0,1,.612-5.818L24.9,97.972,1.049,63.406a6.081,6.081,0,0,1-.612-5.818,6.191,6.191,0,0,1,4.555-3.675L46.3,46.3l7.618-41.3A6.191,6.191,0,0,1,57.588.437a6.081,6.081,0,0,1,5.818.612L97.972,24.9,132.539,1.049a6.081,6.081,0,0,1,5.818-.612Zm-3.637,97.536A36.748,36.748,0,1,1,97.972,61.224,36.758,36.758,0,0,1,134.721,97.972Zm12.249,0a49,49,0,1,0-49,49A48.994,48.994,0,0,0,146.97,97.972Z"
                                                transform="translate(0.037 0.037)" fill="currentColor" />
                                        </svg>

                                    </span>
                                    <span class="link-text">Light</span>
                                </button>
                                <button class="theme-btn web-links web-btns d-flex justify-content-center"
                                    data-theme-type="dark">
                                    <span class="link-icon d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 172.555 201.238">
                                            <path id="Path_1" data-name="Path 1"
                                                d="M100.395,32a100.619,100.619,0,1,0,69.984,172.76,7.18,7.18,0,0,0-6.244-12.218A79.069,79.069,0,0,1,111.894,45.79,7.175,7.175,0,0,0,108.929,32.4c-2.83-.225-5.66-.359-8.535-.359Z"
                                                transform="translate(0 -32)" fill="currentColor" />
                                        </svg>
                                    </span>
                                    <span class="link-text">Dark</span>
                                </button>
                            </div>
                        </div>
                        <button class="updates-modal-btn web-links web-btns d-flex justify-content-center">
                            <span class="link-icon d-flex">
                                <svg id="Icon_File" data-name="Icon/File" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <rect width="24" height="24" fill="none" />
                                    <path data-name="Path 2795"
                                        d="M79.942,0H66.058A1.962,1.962,0,0,0,64,1.844V20.156A1.962,1.962,0,0,0,66.058,22H79.942A1.962,1.962,0,0,0,82,20.156V1.844A1.962,1.962,0,0,0,79.942,0Zm1.24,20.156a1.182,1.182,0,0,1-1.24,1.111H66.058a1.182,1.182,0,0,1-1.24-1.111V1.844A1.182,1.182,0,0,1,66.058.733H79.942a1.182,1.182,0,0,1,1.24,1.111Z"
                                        transform="translate(-61 1)" stroke="currentColor" stroke-width="1.2" />
                                    <path data-name="Path 2796"
                                        d="M146.1,232h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z"
                                        transform="translate(-129.253 -220.404)" stroke="currentColor"
                                        stroke-width="1.2" />
                                    <path data-name="Path 2797"
                                        d="M146.1,328h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z"
                                        transform="translate(-129.253 -312.02)" stroke="currentColor"
                                        stroke-width="1.2" />
                                    <path data-name="Path 2798"
                                        d="M146.1,136h-9.7a.4.4,0,0,0,0,.808h9.7a.4.4,0,0,0,0-.808Z"
                                        transform="translate(-129.253 -128.789)" stroke="currentColor"
                                        stroke-width="1.2" />
                                </svg>
                            </span>
                            <span class="link-text">Updates</span>
                        </button>
                        <a href="#" class="web-links d-flex justify-content-center">
                            <span class="link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 142.22 150.862">
                                    <path id="Path_1" data-name="Path 1"
                                        d="M156.488,49.1a6.676,6.676,0,0,1-1.886,7.25L141.841,67.96a56.171,56.171,0,0,1,0,14.971L154.6,94.543a6.676,6.676,0,0,1,1.886,7.25,73.052,73.052,0,0,1-4.656,10.109l-1.385,2.387a74.992,74.992,0,0,1-6.513,9.195,6.675,6.675,0,0,1-7.22,2L120.3,120.271a56.71,56.71,0,0,1-12.967,7.486l-3.684,16.828a6.66,6.66,0,0,1-5.364,5.246,76.561,76.561,0,0,1-25.05,0,6.66,6.66,0,0,1-5.364-5.246l-3.684-16.828a56.71,56.71,0,0,1-12.967-7.486l-16.386,5.246a6.727,6.727,0,0,1-7.22-2,74.993,74.993,0,0,1-6.513-9.195l-1.385-2.387a73.051,73.051,0,0,1-4.656-10.109,6.676,6.676,0,0,1,1.886-7.25L29.7,82.961a57.819,57.819,0,0,1-.5-7.515,57.024,57.024,0,0,1,.5-7.486L16.943,56.349a6.676,6.676,0,0,1-1.886-7.25A73.051,73.051,0,0,1,19.713,38.99L21.1,36.6a74.993,74.993,0,0,1,6.513-9.195,6.675,6.675,0,0,1,7.22-2L51.247,30.62a56.71,56.71,0,0,1,12.967-7.486L67.9,6.307a6.66,6.66,0,0,1,5.364-5.246A73.059,73.059,0,0,1,85.787,0,76.152,76.152,0,0,1,98.312,1.031a6.66,6.66,0,0,1,5.364,5.246l3.684,16.828a56.71,56.71,0,0,1,12.967,7.486l16.415-5.216a6.727,6.727,0,0,1,7.22,2,74.991,74.991,0,0,1,6.513,9.195l1.385,2.387a73.05,73.05,0,0,1,4.656,10.109Zm-70.7,49.924A23.577,23.577,0,1,0,62.21,75.446,23.57,23.57,0,0,0,85.787,99.023Z"
                                        transform="translate(-14.662)" fill="currentColor" />
                                </svg>
                            </span>
                            <span class="link-text">Settings</span>
                        </a>
                        <div class="bottom-link-container desktop-only">
                            <a href="#" class="web-links d-flex justify-content-center">Sign In</a>
                            <a href="#" class="web-links d-flex justify-content-center">Sign Up</a>
                        </div>
                    </div>
                </div>
                <a href="https://github.com/yup-ma/Quality-Reads"
                    class="web-links d-flex justify-content-center mobile-only" target="_blank"
                    title="Github link to repo">
                    <span class="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 496 483.607">
                            <path data-name="Path 1"
                                d="M165.9,397.4c0,2-2.3,3.6-5.2,3.6-3.3.3-5.6-1.3-5.6-3.6,0-2,2.3-3.6,5.2-3.6C163.3,393.5,165.9,395.1,165.9,397.4Zm-31.1-4.5c-.7,2,1.3,4.3,4.3,4.9,2.6,1,5.6,0,6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2,2.3Zm44.2-1.7c-2.9.7-4.9,2.6-4.6,4.9.3,2,2.9,3.3,5.9,2.6,2.9-.7,4.9-2.6,4.6-4.6C184.6,392.2,181.9,390.9,179,391.2ZM244.8,8C106.1,8,0,113.3,0,252,0,362.9,69.8,457.8,169.5,491.2c12.8,2.3,17.3-5.6,17.3-12.1,0-6.2-.3-40.4-.3-61.4,0,0-70,15-84.7-29.8,0,0-11.4-29.1-27.8-36.6,0,0-22.9-15.7,1.6-15.4,0,0,24.9,2,38.6,25.8,21.9,38.6,58.6,27.5,72.9,20.9,2.3-16,8.8-27.1,16-33.7-55.9-6.2-112.3-14.3-112.3-110.5,0-27.5,7.6-41.3,23.6-58.9-2.6-6.5-11.1-33.3,2.6-67.9,20.9-6.5,69,27,69,27a236.241,236.241,0,0,1,125.6,0s48.1-33.6,69-27c13.7,34.7,5.2,61.4,2.6,67.9,16,17.7,25.8,31.5,25.8,58.9,0,96.5-58.9,104.2-114.8,110.5,9.2,7.9,17,22.9,17,46.4,0,33.7-.3,75.4-.3,83.6,0,6.5,4.6,14.4,17.3,12.1C428.2,457.8,496,362.9,496,252,496,113.3,383.5,8,244.8,8ZM97.2,352.9c-1.3,1-1,3.3.7,5.2,1.6,1.6,3.9,2.3,5.2,1,1.3-1,1-3.3-.7-5.2C100.8,352.3,98.5,351.6,97.2,352.9Zm-10.8-8.1c-.7,1.3.3,2.9,2.3,3.9,1.6,1,3.6.7,4.3-.7.7-1.3-.3-2.9-2.3-3.9C88.7,343.5,87.1,343.8,86.4,344.8Zm32.4,35.6c-1.6,1.3-1,4.3,1.3,6.2,2.3,2.3,5.2,2.6,6.5,1,1.3-1.3.7-4.3-1.3-6.2C123.1,379.1,120.1,378.8,118.8,380.4Zm-11.4-14.7c-1.6,1-1.6,3.6,0,5.9s4.3,3.3,5.6,2.3c1.6-1.3,1.6-3.9,0-6.2-1.4-2.3-4-3.3-5.6-2Z"
                                transform="translate(0 -8)" fill="currentColor" />
                        </svg>
                    </span>
                    <span class="link-text">Github</span>
                </a>
                <a href="/Quality-Reads#search-input-parent-container"
                    class="web-links d-flex justify-content-center mobile-only" title="Search for articles">
                    <span class=" link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            viewBox="0 0 511.975 512.075">
                            <path data-name="Path 1"
                                d="M416,208a207.488,207.488,0,0,1-40,122.7L502.6,457.4a32.032,32.032,0,0,1-45.3,45.3L330.7,376A206.808,206.808,0,0,1,208,416C93.1,416,0,322.9,0,208S93.1,0,208,0,416,93.1,416,208ZM208,352A144,144,0,1,0,64,208,144.037,144.037,0,0,0,208,352Z"
                                fill="currentColor" />
                        </svg>
                    </span>
                    <span class="link-text">Search</span>
                </a>
                <div class="bottom-link-container mobile-only">
                    <a href="#" class="web-links d-flex justify-content-center">Sign In</a>
                    <a href="#" class="web-links d-flex justify-content-center">Sign Up</a>
                </div>
            </div>
            <div class="dropdown-menu-container-layer mobile-only"></div>
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