(function($) {
    $.fn.ajSlider = function(options) {
        var settings = $.extend({
            interval: 4000,
            slideshow: "enable",
            bullets: true,
            activeBullet: "grey",
            inactiveBullet: "orange",
            textPosition: "30%",
            textSize: "60px"
        }, options);

        return this.each(function() {
            var $slider = $(this);
            var $images = $slider.find('img');
            var $texts = $slider.find('a.slider-text');
            var $bullets = $slider.find('#ajSliderBullets li');
            var currentIndex = 0;
            var interval;

            function showImage(index) {
                $images.css('opacity', '0').eq(index).css('opacity', '1');
                $texts.removeClass('active').eq(index).addClass('active');
                $bullets.css('background-color', settings.inactiveBullet).eq(index).css('background-color', settings.activeBullet);
            }

            function startSlideshow() {
                if (settings.slideshow == "enable") {
                    interval = setInterval(function() {
                        currentIndex = (currentIndex + 1) % $images.length;
                        showImage(currentIndex);
                    }, settings.interval);
                }
            }

            function resetSlideshow() {
                clearInterval(interval);
                startSlideshow();
            }

            $bullets.on('click', function() {
                currentIndex = $(this).index();
                showImage(currentIndex);
                resetSlideshow();
            });

            showImage(currentIndex);
            startSlideshow();
        });
    };
}(jQuery));