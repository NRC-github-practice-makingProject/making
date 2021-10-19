const toggleBtn = document.querySelector('.Jeju');
const map = document.querySelector('.map_container');
const jeju = document.querySelector('.jeju');



toggleBtn.addEventListener('click', ()=> {
    jeju.classList.toggle('active')
    map.classList.toggle('unactive')
});
