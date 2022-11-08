//Creating shadow commponent for updates section so that with a tag only we can render updates section
const updatesTemplate = document.createElement('template');
updatesTemplate.innerHTML = `<div class="updates-fixed-section">
    <div class="updates-parent-main-section d-flex-dir-col">
        <h3>
            Updates
            <button class="modal-close-btn d-flex justify-content-center">
                <span class="close-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 320.15 320.15">
                        <path d="M310.6,150.6a32.032,32.032,0,1,0-45.3-45.3L160,210.7,54.6,105.4A32.032,32.032,0,1,0,9.3,150.7L114.7,256,9.4,361.4a32.032,32.032,0,0,0,45.3,45.3L160,301.3,265.4,406.6a32.032,32.032,0,0,0,45.3-45.3L205.3,256Z" transform="translate(0.075 -95.925)" fill="currentColor"/>
                    </svg>
                </span>
                <span class="close-icon-text hidden-ele">Close</span>
            </button>
        </h3>
        <div class="updates-main-section">
            <p class="update-main-section-desc">A section where you can learn about new updates, beta releases, and potential future releases.</p>
            <div class="updates-section updates-recent-releases-section">
                <h5>Recent updates</h5>
                <div class="updates-section-details">
                    <span class="update-release-time">Aug 4, 2022</span>
                    <ul>
                        <li>Now you can share the articles to friends and families with a direct option provided on it, to make things faster for you.</li>
                    </ul>
                    <span class="update-release-time">Jul 22, 2022</span>
                    <ul>
                        <li>Seach bar so that you can search for articles related to your query</li>
                        <li>Filters to narrow down search results</li>
                        <li>Discussion on articles and polls</li>
                        <li>Link to stories where you can read those, were added for easy reach to knowledge</li>
                    </ul>
                </div>
            </div>
            <div class="updates-section updates-beta-releases-section">
                <h5>Beta releases</h5>
                <div class="updates-section-details">
                    <span class="update-release-time">Aug 2, 2022</span>
                    <ul>
                        <li>Dual themes - Dark and Light both</li>
                    </ul>
                    <span class="update-release-time">Jul 22, 2022</span>
                    <ul>
                        <li>Multicolor search results</li>
                    </ul>
                </div>
            </div>
            <div class="updates-section updates-upcomming-releases-section">
                <h5>Comming soon updates</h5>
                <div class="updates-section-details">
                    <span class="update-release-time">Soon</span>
                    <ul>
                        <li>Cute logo for website (Any suggestions most welcomed)</li>
                        <li>Pro features
                            <ul>
                                <li>Search results - upto 20 pages</li>
                                <li>Dual color modes for results - multicolor(currently) and single colored</li>
                                <li>Dual view mode for search results - Grid view(currently) and more congested
                                    stack view</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="updates-section updates-future-releases-section">
                <h5>Future updates</h5>
                <div class="updates-section-details">
                    <span class="update-release-time">Distant future</span>
                    <ul>
                        <li>Profile - you can sign up and create your own profile to save bookmark and see search
                            history</li>
                        <li>Save as bookmark - upto 20 articles</li>
                        <li>Profanity filter for comments - to hide explicit content</li>
                        <li>Pro subscriptions and more pro fetures
                            <ul>
                                <li>More bookmarks - you can have upto 80 bookmarks</li>
                                <li>Search results - upto 20 pages</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="updates-section catched-up-with-section">
                <h5>All catched with updates</h5>
                <img src="View/Images/catched-up-all.svg" alt="All catched up with updated">
                <p>We would love to hear from you<br>Any suggestion, feedback, feature requests are most
                    welcomed<br><br>You can send it through <br><a
                        href="mailto:aman080420@gmail.com?subject=Feedback%20for%20Hacer%20News%20Search%Engine">aman080420@gmail.com</a>
                    or <a href="https://github.com/yup-ma/Quality-Reads/issues" target="_blank">Github
                        issues</a>
                </p>
            </div>
        </div>
    </div>
</div>`;

class Updates extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(updatesTemplate.content);
    }
}

customElements.define('updates-component', Updates);