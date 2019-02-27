window.addEventListener('DOMContentLoaded', function () {
    let container = document.querySelector('.container'),
        arrow = document.querySelector('.slide__arrow'),
        controls = document.querySelectorAll('.pagination__control');

    controls.forEach((item, index, array) => {
        item.addEventListener('click', () => { 
            swipeToSlide(index);
            controlColor(index);
        });
    });
    
    function swipeToSlide(index) {
        let value = index * 768;
        container.style.transform = `translateY(-${value}px)`;
    }

    function controlColor(currentSlide) {
        controls.forEach((item) => {
            item.style.backgroundColor = '#fff';
            item.classList.remove('active');
        });
        controls[currentSlide].style.backgroundColor = '#f78b1f';
        controls[currentSlide].classList.add('active');

    };

    controlColor(0);

    arrow.addEventListener('click', () => {
        container.style.transform = 'translateY(-768px)';
        controlColor(1);
    })

    // swipe
    let touchStart = 0,
        touchEnd = 0;

    document.addEventListener('touchstart', function(event) {
        touchStart = event.screenY;
    });

    document.addEventListener('touchend', function(event) {
        touchEnd = event.screenY;
        swipe();
    });

    function swipe() {
        let currentIndex = 0;
        controls.forEach((item, index, array) => {            
            if (item.classList.contains('active')) {
                currentIndex = index;
            }
        });    
        if (currentIndex < 0 || currentIndex > 2) {
            return;
        }    
        if (touchEnd < touchStart) {
            // swipe up
            swipeToSlide(currentIndex + 1);
            controlColor(currentIndex + 1);
        } else if (touchEnd > touchStart) {
            // swipe down
            swipeToSlide(currentIndex - 1);
            controlColor(currentIndex - 1);
        }
        touchStart = 0;
        touchEnd = 0;
    }

    //бегунок
    let toggle = document.querySelector('.slide__toggle_line'),
        horizontalSlides = document.querySelectorAll('.slide__horizontal'),
        horizontalSlidesTitles = document.querySelectorAll('.slide__horizontal_title');

        function range(value) {                                            
            toggle.style.background = `linear-gradient(90deg, #fff 0%, #fff ${value}%, #8294a7 ${value}%, #8294a7 100%)`;            
            let targetVal = 0;
            if  (value > 25 && value <= 75) {                         
                targetVal = 50;                   
            } else if (value > 75 && value <= 100) {
                targetVal = 100;                              
            }  
            changeHorizontalSlide(targetVal);            
        }

        function setValue() {
            let val = toggle.value;
                targetVal = 0;
            if  (val > 25 && val <= 75) {                         
                targetVal = 50;                   
            } else if (val > 75 && val <= 100) {
                targetVal = 100;                
            }   
            changeValue(val, targetVal);         
        }

        function changeValue(currentValue, targetValue) {
                let id = setInterval(animate, 10);                
                function animate() {
                    if (currentValue == targetValue) {
                        clearInterval(id);                        
                    } else {
                        if (currentValue > targetValue) {
                            currentValue -= 1;  
                        } else {
                            currentValue = +currentValue + 1;
                        }
                        toggle.value = currentValue;
                        range(currentValue);
                    }
                }        
        }

        function changeHorizontalSlide(value) {            
            
            horizontalSlides.forEach((item) => {
                item.style.width = '0%';
            }); 
            horizontalSlidesTitles.forEach((item) => {
                item.style.display = 'none';
            }); 

            let slideIndex = 0;
            if (value == 50) {                
                slideIndex = 1;
                
            } else if (value == 100) {                
                slideIndex = 2;             
            };
            horizontalSlides[slideIndex].style.width = '100%';
            horizontalSlidesTitles[slideIndex].style.display = 'block';
        }

        toggle.addEventListener('input', function() {
            range(toggle.value);
        });
        toggle.addEventListener('change', setValue);
})