document.addEventListener("DOMContentLoaded", function () {
    //mobile header menu
    const mobMenu = document.querySelector(".mobmenu");
    const siteHeader = document.querySelector(".site-header");
    if (mobMenu && siteHeader) {
        mobMenu.addEventListener("click", function (event) {
            siteHeader.classList.toggle("is-active");
            event.stopPropagation();
        });
        document.addEventListener("click", function (event) {
            if (!siteHeader.contains(event.target) && !mobMenu.contains(event.target)) {
                siteHeader.classList.remove("is-active");
            }
        });
    }

    // open section on mobile
    document.querySelectorAll(".collapse-mob .open-btn").forEach(button => {
        button.addEventListener("click", function () {
            const parentSection = this.closest(".collapse-mob");
            if (parentSection) {
                parentSection.classList.toggle("is-active");
            }
        });
    });

    // getting header height
    function getHeaderHeight() {
        const header = document.querySelector("header");
        return header ? header.offsetHeight : 0;
    }

    // smooth scroll
    function smoothScroll(targetSelector) {
        const targetSection = document.querySelector(targetSelector);
        if (!targetSection) return;
        
        const headerHeight = getHeaderHeight();
        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: sectionTop - headerHeight, behavior: "smooth" });
    }

    // configuring scroll buttons
    document.querySelectorAll("[data-scroll]").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const target = this.getAttribute("data-scroll");
            smoothScroll(target);
        });
    });

    // price checkbox
    const checkbox = document.getElementById("switch");
    const priceElement = document.querySelector(".plan-main");
    const descElement = document.querySelector(".plan-price-wrap .desc");
    const btn = document.querySelector(".card-ribbon .btn.btn-primary");

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            priceElement.textContent = "ONLY $10.75";
            descElement.style.display = "block";
            btn.href = "https://www.point.me/signup/standard"; // Annual
        } else {
            priceElement.textContent = "$12";
            descElement.style.display = "none";
            btn.href = "https://www.point.me/signup/monthly"; // Monthly
        }
    });

    //tab section
    const tabs = document.querySelectorAll(".tabs-label");
    const tabContents = document.querySelectorAll(".tab-content-item");

    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");

            tabs.forEach(t => {
                t.classList.remove("tab-active");
                t.setAttribute("aria-selected", "false");
                t.setAttribute("aria-expanded", "false");
            });

            tabContents.forEach(content => {
                content.classList.remove("is-active");
            });

            this.classList.add("tab-active");
            this.setAttribute("aria-selected", "true");
            this.setAttribute("aria-expanded", "true");

            const activeContent = document.querySelector(`.tab-content-item[data-index="${index}"]`);
            if (activeContent) {
                activeContent.classList.add("is-active");
            }
        });
    });

});