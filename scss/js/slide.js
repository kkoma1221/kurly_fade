(function($){
    const obj = {
        init(){ 
            this.header();
            this.section1();
            this.section2();
            this.section3();
        },
        header(){},
        section1(){

        // 1. 변수 설정하기
        let cnt=0;
        let setId=0;
        let mouseDown = null;
        let mouseUp = null;
        let dragStart = null;
        let dragEnd = null;
        let mDown = false;
        let winW = $(window).innerWidth(); 
        let sizeX = winW/4;  
        const slideContainer = $('#section1 .slide-container');
        const slideWrap = $('#section1 .slide-wrap');
        const slideView = $('#section1 .slide-view');
        const slide = $('#section1 .slide-view .slide');
        const slideImg = $('#section1 .slide-view .slide img');
        const pageBtn = $('#section1 .page-btn');
        const nextBtn = $('#section1 .next-btn');
        const prevBtn = $('#section1 .prev-btn');
        let n = slide.length-1;
        
        mainSlide();

        // 2. 메인 슬라이드 함수
        function mainSlide(){
            slide.css({zIndex:1, opacity:1});
            slide.eq(cnt).css({zIndex:2});
            slide.eq(cnt===0?n:cnt-1).css({zIndex:3}).stop().animate({opacity:0}, 1000);
            pageBtnEvent();
        }
        function mainPrevSlide(){
            slide.css({zIndex:1, opacity:1});
            slide.eq(cnt===n?0:cnt+1).css({zIndex:2});
            slide.eq(cnt).css({zIndex:3}).stop.animate({opacity:0},0).animate({opacity:1}, 1000);
            pageBtnEvent();
        }
        // 3. 다음, 이전 카운트함수
        function nextCount(){
            cnt++;
            if(cnt>n) cnt=0;
            mainSlide();
        }
        function prevCount(){
            cnt--;
            if(cnt<0) cnt=n;
            mainPrevSlide();
        }
        // 4. 페이지 버튼 이벤트 함수
        function pageBtnEvent(){
            pageBtn.removeClass('on');
            pageBtn.eq( cnt>n ? 0 : cnt).addClass('on');
        }
        // 5. 페이지 버튼클릭
        pageBtn.each(function(idx){
            $(this).on({
            click(e){
            e.preventDefault();
            cnt=idx;
            mainSlide();
            clearInterval(setId);
            autoTimer();
            }
            });
        });
        // 6. 다음,이전 버튼 클릭이벤트
        nextBtn.on({
            click(e){
                e.preventDefault();
                clearInterval(setId);
                cnt++;
                mainSlide();
                autoTimer();
            }
        });
        prevBtn.on({
            click(e){
                e.preventDefault();
                clearInterval();
                cnt--;
                mainSlide();
                autoTimer();
            }
        })
        
        // 6. 자동타이머함수
        function autoTimer(){
                setId = setInterval(nextCount, 6000);
        }
        autoTimer();
        // 7. 터치스와이프 & 드래그앤드롭
        slideContainer.on({
                mousedown(e){
                    winW = $(window).innerWidth();
                    mouseDown = e.clientX;
                    dragStart = e.clientX - (slideWrap.offset().left+winW);
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                mouseup(e){
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp>sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp<-sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            prevCount();
                        }
                    }
                    if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                        slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                },
                mousemove(e){
                    if(!mDown) return;
                    dragEnd = e.clientX;
                    slideWrap.css({left:dragEnd-dragStart});
                }
        });
        // 8. 터치스와이프 디버깅하기
        $(document).on({
                mouseup(e){
                    if(!mDown) return;
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp>sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp<-sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            prevCount();
                        }
                    }
                    if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                        slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                }
        });
        // 9. 태블릿, 모바일 핑거링
        slideContainer.on({
                touchstart(e){
                    winW=$(window).innerWidth();
                    sizeX = 50;
                    mouseDown = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX-(slideWrap.offset().left+winW);
                    mDown = true;
                },
                touchend(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;
                    if(mouseDown-mouseUp>sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp<-sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is('animated')){
                            prevCount();
                        }
                    }
                    if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                        slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                    }
                    mDown = false;
                }
        });      
        },
        section2(){
            
            // 1.변수 설정하기
            let cnt = 0;
            let mouseDown = null;
            let mouseUp = null;
            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winW = $(window).innerWidth(); 
            let sizeX = 10;  
            const slideContainer = $('#section2 .slide-container');
            const slideWrap = $('#section2 .slide-wrap');
            const slideView = $('#section2 .slide-view');
            const slide = $('#section2 .slide-view .slide');
            const slideImg = $('#section2 .slide-view .slide img');
            const nextBtn = $('#section2 .next-btn');
            const prevBtn = $('#section2 .prev-btn');
            let n =slide.length-1

            mainSlideFn();

            // 2. 메인슬라이드 함수
            function mainSlideFn(){
                nextPrevArrowBtn();
                slideWrap.stop().animate({left:`${-100*cnt}%`}, 600, 'easeInOutExpo');
            }

            // 3.이전,다음 카운트 함수
            function nextCount(){
                console.log(cnt);
                cnt++;
                if(cnt>n){cnt=n;}
                mainSlideFn();
            };
            // 이전 카운트 함수
            function prevCount(){
                cnt--;
                if(cnt<0){cnt=0;}
                mainSlideFn();
            };
            // 3. 이전,다음 버튼 클릭이벤트
            nextBtn.on({
                click(e){
                    e.preventDefault();
                    nextCount();
                }
            });
            prevBtn.on({
                click(e){
                    e.preventDefault();
                    prevCount();
                }
            });

            // 4. 이전,다음버튼 제어 함수
            function nextPrevArrowBtn(){
                if(cnt > n) { 
                    nextBtn.fadeOut(300);
                }
                else{ 
                    nextBtn.fadeIn(300); 
                }
                if(cnt < 1) { 
                    prevBtn.fadeOut(300); 
                }
                else{
                    prevBtn.fadeIn(300); 
                }
            }

            // 5. 터치스와이프&드래그앤드롭 -데스크톱
            slideContainer.on({
                mousedown(e){
                    winW = $(window).innerWidth();
                    mouseDown = e.clientX;
                    dragStart = e.clientX - (slideWrap.offset().left+winW);
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                mouseup(e){
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp>sizeX){
                        if(!slideWrap.is('animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp<-sizeX){
                        if(!slideWrap.is('animated')){
                            prevCount();
                        }
                    }
                    if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                        slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                },
                mousemove(e){
                    if(!mDown) return;
                    dragEnd = e.clientX;
                    slideWrap.css({left:dragEnd-dragStart});
                }
        });
                // 6. 터치스와이프 디버깅하기
                $(document).on({
                    mouseup(e){
                        if(!mDown) return;
                        mouseUp = e.clientX;
                        if(mouseDown-mouseUp>sizeX){
                            if(!slideWrap.is('animated')){
                                nextCount();
                            }
                        }
                        if(mouseDown-mouseUp<-sizeX){
                            if(!slideWrap.is('animated')){
                                prevCount();
                            }
                        }
                        if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                            slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                        }
                        mDown = false;
                        slideView.css({cursor:'grab'});
                    }
            });
            // 7. 태블릿, 모바일 핑거링
            slideContainer.on({
                    touchstart(e){
                        winW=$(window).innerWidth();
                        sizeX = 10;
                        mouseDown = e.originalEvent.changedTouches[0].clientX;
                        dragStart = e.originalEvent.changedTouches[0].clientX-(slideWrap.offset().left+winW);
                        mDown = true;
                    },
                    touchend(e){
                        mouseUp = e.originalEvent.changedTouches[0].clientX;
                        if(mouseDown-mouseUp>sizeX){
                            if(!slideWrap.is('animated')){
                                nextCount();
                            }
                        }
                        if(mouseDown-mouseUp<-sizeX){
                            if(!slideWrap.is('animated')){
                                prevCount();
                            }
                        }
                        if(mouseDown-mouseUp>=-sizeX && mouseDown-mouseUp<=sizeX){
                            slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
                        }
                        mDown = false;
                    }
            });
        },
        section3(){}
    }
    obj.init();

})(jQuery);
