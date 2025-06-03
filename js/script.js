$(document).ready(function() {
    // Carousel functionality
    const carouselItems = $('.carousel-items');
    const foodCards = $('.carousel-items .food-card');
    const totalItems = foodCards.length;
    let currentIndex = 0;
    const visibleItems = 3;
    
    // Next button click
    $('.next-arrow').click(function() {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            slideCarousel();
        }
    });
    
    // Previous button click
    $('.prev-arrow').click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            slideCarousel();
        }
    });
    
    // Function to slide the carousel
    function slideCarousel() {
        const cardWidth = foodCards.first().outerWidth(true);
        const offset = -currentIndex * cardWidth;
        carouselItems.css('transform', `translateX(${offset}px)`);
        
        // Update active states
        updateActiveStates();
    }
    
    // Update active states for cards and arrows
    function updateActiveStates() {
        // Update cards
        foodCards.removeClass('active');
        
        // Make the middle card of the visible set active
        const middleIndex = currentIndex + 1;
        if(middleIndex < totalItems) {
            foodCards.eq(middleIndex).addClass('active');
        }
        
        // Update arrows
        $('.prev-arrow').toggleClass('active', currentIndex > 0);
        $('.next-arrow').toggleClass('active', currentIndex < totalItems - visibleItems);
    }
    
    // Initialize carousel
    updateActiveStates();
    
    // Responsive adjustments
    $(window).resize(function() {
        slideCarousel();
    });
    
    // Hover effects for carousel cards
    foodCards.hover(
        function() {
            foodCards.removeClass('active');
            $(this).addClass('active');
        },
        function() {
            updateActiveStates();
        }
    );
    
    // Hover effects for carousel arrows
    $('.carousel-arrow').hover(
        function() {
            $(this).addClass('active');
        },
        function() {
            if (($(this).hasClass('prev-arrow') && currentIndex === 0) || 
                ($(this).hasClass('next-arrow') && currentIndex >= totalItems - visibleItems)) {
                $(this).removeClass('active');
            }
        }
    );
    
    // Video functionality
    const videoPlayBtn = $('.video-play-btn');
    const video = $('.service-video')[0];
    const playIcon = $('.play-icon');
    const pauseIcon = $('.pause-icon');
    
    // Make sure video is loaded
    $(video).on('loadedmetadata', function() {
        // Video is ready to play
        videoPlayBtn.removeClass('hidden');
    });
    
    // Play/pause video on button click
    videoPlayBtn.click(function() {
        if (video.paused) {
            video.play();
            playIcon.addClass('hidden');
            pauseIcon.removeClass('hidden');
            // Hide the button after a short delay
            setTimeout(() => {
                videoPlayBtn.addClass('hidden');
            }, 500);
        } else {
            video.pause();
            pauseIcon.addClass('hidden');
            playIcon.removeClass('hidden');
            videoPlayBtn.removeClass('hidden');
        }
    });
    
    // Play/pause video on clicking the video itself
    $('.service-video').click(function() {
        if (video.paused) {
            video.play();
            playIcon.addClass('hidden');
            pauseIcon.removeClass('hidden');
            // Hide the button after a short delay
            setTimeout(() => {
                videoPlayBtn.addClass('hidden');
            }, 500);
        } else {
            video.pause();
            pauseIcon.addClass('hidden');
            playIcon.removeClass('hidden');
            // Show the button when paused
            videoPlayBtn.removeClass('hidden');
        }
    });
    
    // Show controls when hovering over the video area
    $('.service-card').hover(
        function() {
            if (!video.paused) {
                videoPlayBtn.removeClass('hidden');
            }
        },
        function() {
            if (!video.paused) {
                videoPlayBtn.addClass('hidden');
            }
        }
    );
    
    // When video ends, show the play button again
    $(video).on('ended', function() {
        pauseIcon.addClass('hidden');
        playIcon.removeClass('hidden');
        videoPlayBtn.removeClass('hidden');
    });
    
    // Quantity control
    $('.quantity-btn.plus').click(function() {
        const quantityEl = $(this).siblings('.quantity');
        let quantity = parseInt(quantityEl.text());
        quantityEl.text(quantity + 1);
    });
    
    $('.quantity-btn.minus').click(function() {
        const quantityEl = $(this).siblings('.quantity');
        let quantity = parseInt(quantityEl.text());
        if (quantity > 1) {
            quantityEl.text(quantity - 1);
        }
    });
    
    // Modal functionality
    const modal = $('#requestDishModal');
    
    $('.request-dish-btn').click(function() {
        modal.addClass('show');
        $('body').css('overflow', 'hidden'); // Prevent scrolling when modal is open
    });
    
    $('.close-modal, .cancel-btn').click(function() {
        modal.removeClass('show');
        $('body').css('overflow', 'auto'); // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    $(window).click(function(event) {
        if ($(event.target).is(modal)) {
            modal.removeClass('show');
            $('body').css('overflow', 'auto');
        }
    });
    
    // Submit button in modal
    $('.submit-btn').click(function(e) {
        if ($(this).closest('form').attr('id') === 'requestDishForm') {
            e.preventDefault();
            modal.removeClass('show');
            $('body').css('overflow', 'auto');
            $('#requestDishForm')[0].reset(); // Reset the form
        }
    });
    
    // Prevent form submission (for demo purposes)
    $('.contact-form, #requestDishForm').submit(function(e) {
        e.preventDefault();
        alert('Form submitted successfully!');
        
        // If it's the request form, close the modal
        if ($(this).attr('id') === 'requestDishForm') {
            modal.removeClass('show');
            $('body').css('overflow', 'auto');
            $(this)[0].reset(); // Reset the form
        }
    });
    
    // Add to cart functionality
    $('.add-to-cart').click(function() {
        // Animation for adding to cart
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
        
        // You would typically add actual cart functionality here
        alert('Item added to cart!');
    });
    
    // Hover effects for food cards
    $('.food-card').hover(
        function() {
            $(this).find('.add-to-cart').css('background-color', 'var(--secondary-color)');
            $(this).find('.add-to-cart img').css('filter', 'brightness(10)');
        },
        function() {
            $(this).find('.add-to-cart').css('background-color', 'var(--background-lighter)');
            $(this).find('.add-to-cart img').css('filter', 'none');
        }
    );
    
    // Handle missing images with better fallbacks
    $('img').on('error', function() {
        const imgSrc = $(this).attr('src');
        const altText = $(this).attr('alt') || 'Image';
        
        // Check if it's an SVG icon
        if (imgSrc.includes('.svg')) {
            // For SVG icons, use a simple placeholder
            $(this).attr('src', 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3e%3cpath fill="%23333" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/%3e%3c/svg%3e');
        } 
        // For food images
        else if (imgSrc.includes('pizza') || imgSrc.includes('carousel')) {
            $(this).attr('src', 'https://via.placeholder.com/300x200/f0f0f0/333333?text=' + altText);
        }
        // For main illustrations
        else {
            $(this).attr('src', 'https://via.placeholder.com/500x400/f0f0f0/333333?text=' + altText);
        }
    });
}); 