/*==================================================
EduStep Website
Version 2.0
Main Script
==================================================*/


/*==================================================
AOS Animation
==================================================*/

AOS.init({

    duration: 800,
    once: true,
    offset: 80,
    easing: "ease-in-out"

});


/*==================================================
Helpers
==================================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/*==================================================
Loading Screen
==================================================*/

window.addEventListener("load", () => {

    const loader = $("#loader");

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    setTimeout(() => {

        loader.remove();

    }, 500);

});


/*==================================================
Header Scroll Effect
==================================================*/

const header = $("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*==================================================
Scroll To Top Button
==================================================*/

const scrollBtn = $("#scrollTop");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*==================================================
Smooth Scroll
==================================================*/

$$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});


/*==================================================
Navbar Active Links
==================================================*/

const sections = $$("section[id]");
const navLinks = $$("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;
        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            currentSection = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/*==================================================
FAQ
==================================================*/

const faqItems = $$(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("active");

                other.querySelector(".faq-answer").style.maxHeight = null;

            }

        });

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/*==================================================
Dynamic Grade Select
==================================================*/

const stageSelect = $("#stageSelect");
const gradeSelect = $("#gradeSelect");

const grades = {

    "ابتدائي": [

        "الصف الأول الابتدائي",
        "الصف الثاني الابتدائي",
        "الصف الثالث الابتدائي",
        "الصف الرابع الابتدائي",
        "الصف الخامس الابتدائي",
        "الصف السادس الابتدائي"

    ],

    "إعدادي": [

        "الصف الأول الإعدادي",
        "الصف الثاني الإعدادي",
        "الصف الثالث الإعدادي"

    ]

};

if (stageSelect && gradeSelect) {

    stageSelect.addEventListener("change", () => {

        gradeSelect.innerHTML =
        `<option selected disabled>اختر الصف</option>`;

        grades[stageSelect.value].forEach(grade => {

            const option = document.createElement("option");

            option.textContent = grade;

            gradeSelect.appendChild(option);

        });

    });

}

/*==================================================
Scroll Progress
==================================================*/

const progress = document.createElement("div");

progress.id = "scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progressWidth =
        (scrollTop / pageHeight) * 100;

    progress.style.width = progressWidth + "%";

});


/*==================================================
Hero Image Mouse Effect
==================================================*/

const heroImage = $(".hero-image");

if (heroImage) {

    window.addEventListener("mousemove", (e) => {

        const x =
            (window.innerWidth / 2 - e.clientX) / 100;

        const y =
            (window.innerHeight / 2 - e.clientY) / 100;

        heroImage.style.translate =
            `${x}px ${y}px`;

    });

}


/*==================================================
Hero Image Tilt
==================================================*/

const heroImg = $(".hero-image img");

if (heroImg) {

    heroImg.addEventListener("mousemove", (e) => {

        const rect = heroImg.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - .5) * 8;

        const rotateX =
            ((y / rect.height) - .5) * -8;

        heroImg.style.transform =

        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)`;

    });

    heroImg.addEventListener("mouseleave", () => {

        heroImg.style.transform =

        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

}


/*==================================================
Intersection Reveal Animation
==================================================*/

const revealCards = document.querySelectorAll(

".quick-card,\
.why-card,\
.subject-card,\
.stage-card,\
.package-card,\
.follow-card,\
.contact-card,\
.offer-item,\
.step"

);

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show-card");

}

});

},

{

threshold:.15

}

);

revealCards.forEach(card=>{

card.classList.add("hidden-card");

observer.observe(card);

});


/*==================================================
Button Ripple Effect
==================================================*/

const buttons = document.querySelectorAll(

".primary-btn,\
.secondary-btn,\
.package-btn,\
.submit-btn"

);

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(

this.clientWidth,

this.clientHeight

);

circle.classList.add("ripple");

circle.style.width=diameter+"px";

circle.style.height=diameter+"px";

circle.style.left=

e.offsetX-diameter/2+"px";

circle.style.top=

e.offsetY-diameter/2+"px";

const oldRipple=this.querySelector(".ripple");

if(oldRipple){

oldRipple.remove();

}

this.appendChild(circle);

});

});


/*==================================================
Floating Cards Animation
==================================================*/

const floatingCards = document.querySelectorAll(".floating-card");

floatingCards.forEach((card,index)=>{

card.style.animationDelay=`${index*.8}s`;

});


/*==================================================
Current Year
==================================================*/

const year=$("#year");

if(year){

year.textContent=new Date().getFullYear();

}

/*==================================================
Mobile Menu
==================================================*/

const menuBtn = $(".menu-btn");
const nav = $("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuBtn.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuBtn.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}

/*==================================================
Typing Effect
==================================================*/

const typing=$(".typing-text");

if(typing){

const words=[

"ابدأ رحلة التفوق",

"أفضل منصة تعليمية",

"شرح مباشر وتفاعلي",

"EduStep"

];

let word=0;

let char=0;

let deleting=false;

function type(){

const current=words[word];

if(!deleting){

typing.textContent=

current.substring(0,char++);

if(char>current.length){

deleting=true;

setTimeout(type,1600);

return;

}

}else{

typing.textContent=

current.substring(0,char--);

if(char<0){

deleting=false;

word++;

if(word>=words.length){

word=0;

}

}

}

setTimeout(type,deleting?45:80);

}

type();

}


/*==================================================
Toast Notification
==================================================*/

const toast=$(".toast");

if(toast){

const messages=[

"🎁 احجز أول حصة مجانًا",

"📚 التسجيل مفتوح الآن",

"🚀 خصومات لفترة محدودة",

"👨‍🏫 مدرسون معتمدون"

];

let index=0;

setInterval(()=>{

toast.textContent=messages[index];

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3500);

index++;

if(index>=messages.length){

index=0;

}

},12000);

}



/*==================================================
Register Form
==================================================*/

const registerForm = $("#registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = this.querySelectorAll("input,select");

        let valid = true;

        inputs.forEach(input => {

            if (!input.value || input.selectedIndex === 0) {

                input.style.borderColor = "#ef4444";

                valid = false;

            } else {

                input.style.borderColor = "";

            }

        });

        if (!valid) {

            alert("يرجى استكمال جميع البيانات.");

            return;

        }

        alert("🎉 تم استلام طلبك بنجاح، وسيتم التواصل معك قريبًا.");

        this.reset();

        if ($("#gradeSelect")) {

            $("#gradeSelect").innerHTML =
                '<option selected disabled>اختر الصف</option>';

        }

    });

}


/*==================================================
Lazy Loading Images
==================================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(

(entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const image = entry.target;

        image.loading = "lazy";

        observer.unobserve(image);

    });

}

);

images.forEach(image => {

    imageObserver.observe(image);

});


/*==================================================
Smooth Hover Effect
==================================================*/

const cards = document.querySelectorAll(

".quick-card,\
.why-card,\
.subject-card,\
.stage-card,\
.package-card,\
.follow-card,\
.contact-card"

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.willChange = "transform";

    });

    card.addEventListener("mouseleave", () => {

        card.style.willChange = "auto";

    });

});


/*==================================================
Prevent Empty Links
==================================================*/

document.querySelectorAll("a").forEach(link => {

    if (link.getAttribute("href") === "#") {

        link.addEventListener("click", e => {

            e.preventDefault();

        });

    }

});


/*==================================================
Console
==================================================*/

console.log(

"%cEduStep Academy",

"color:#2563EB;font-size:18px;font-weight:bold;"

);

console.log(

"%cWebsite Loaded Successfully ✔",

"color:#16A34A;font-size:14px;"

);


/*==================================================
End Of File
==================================================*/