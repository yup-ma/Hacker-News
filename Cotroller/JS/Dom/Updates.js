//Creating shadow commponent for updates section so that with a tag only we can render updates section
const updatesTemplate = document.createElement('template');
updatesTemplate.innerHTML = `<div class="updates-fixed-section">
    <div class="updates-parent-main-section d-flex-dir-col">
        <h3>
            Updates
            <button class="modal-close-btn">
                <span class="close-icon"><i class="fa-solid fa-xmark"></i></span>
                <span class="close-icon-text hidden-ele">Close</span>
            </button>
        </h3>
        <div class="updates-main-section">
            <p>A section where you can learn about new updates, beta releases, and potential future releases.</p>
            <div class="updates-section updates-recent-releases-section">
                <h5>Recent</h5>
                <div class="updates-section-details">
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
                        <li>Cute name and logo for website (Any suggestions most welcomed)</li>
                        <li>Pro features
                            <ul>
                                <li>Dual themes - Dark and Light both</li>
                                <li>Search results - upto 20 pages</li>
                                <li>Dual color modes for results - multicolor(currently) and single colored</li>
                                <li>Dual view mode for search results - Grid view(currently) and more conjusted
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
                    or <a href="https://github.com/yup-ma/Hacker-News/issues" target="_blank">Github
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