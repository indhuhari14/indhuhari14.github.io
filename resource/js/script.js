
const header = document.querySelector("header");
const sectionOne = document.querySelector(".banner");

const sectionOneOptions = {
  rootMargin: "-500px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
},
sectionOneOptions);
sectionOneObserver.observe(sectionOne);

const hamburger = document.querySelector(".hamburger-icon");
const navlinks = document.querySelector(".nav-list-wrapper");
hamburger.addEventListener('click',() =>{
  navlinks.classList.toggle('show');
  hamburger.classList.toggle('close');
});

function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}