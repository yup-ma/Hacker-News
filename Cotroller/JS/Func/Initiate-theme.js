if ((!localStorage.getItem("theme") && window.matchMedia('(prefers-color-scheme: dark)').matches) || (localStorage.getItem("theme") == "system" && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.getItem("theme") == "dark") {
    document.documentElement.dataset.theme = "dark";
}