// let slideIndex = 1;
// let delay = 10000;
// let slides = document.querySelectorAll('.box');
// let box = document.querySelectorAll('.trail div');

// hiển thị ra slider

function currentSlide(n) {
    showSlides(slideIndex = n);
    restart();
    animate();
}
// random ra silder

//cái này dùng thư viện để viết phải có file nhúng thư viện thì mới chạy nhé
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.inOut" } });
tl.from(".bg", { x: "-100%", opacity: 0 })
.from(".details p", { opacity: 0 ,x:'30px'}, "-=0.3")
.from(".details h1", { opacity: 0, y: "30px" }, "-=0.3")
.from(".details button", { opacity: 0, y: "-40px" }, "-=0.8")
// function to restart animation
const animate = () => tl.restart();
// touchSlider dành cho mobile khi mà chạm vào di chuyển để tối ưu trải nghiêm người dùng 
function touchSlider(){
    let start, move, change;
    // Do this on initial touch on screen
    Array.prototype.map.call(slides,(slide)=>{
        // lấy ra vị trí đã chạm tay vào trên màn hình
        slide.addEventListener('touchstart',(e)=>{
        start = e.touches[0].clientX;
        });
        // Do this on touchDrag on screen
        slide.addEventListener("touchmove", e => {
        // prevent default function
        e.preventDefault();
        // lấy vị trí chạm vào khi dừng 
        move = e.touches[0].clientX;
        // tính vị trí lúc đầu và vị trí cuối cùng 
        change = start - move;
        });
        slide.addEventListener("touchend",(e)=>{
            //nếu mà thay đổi trên 1/4 màn hình thì sẽ cho đổi 
            change > window.innerWidth / 4 ? plusSlides(1) : null;
            change < window.innerWidth / 4 ? plusSlides(-1) : null;
            [start, move, change] = [0, 0, 0];
        }); 
    })
}
animate();
touchSlider();
