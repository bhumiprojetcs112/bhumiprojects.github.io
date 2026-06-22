(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

// Handle custom message input button (only attach if element exists)
    var waLink = document.getElementById("waLink");
    if (waLink) {
        waLink.addEventListener("click", function (e) {
            e.preventDefault();

            var messageInput = document.getElementById("message");
            var message = messageInput ? messageInput.value.trim() : "";

            if (message === "") {
                alert("Please enter your message.");
                return;
            }

            // Ganti dengan nomor admin tanpa tanda +
            var phone = "6282142824797";

            var whatsappUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

            window.open(whatsappUrl, "_blank");
        });
    }

    function renderTeamMembers(container, data) {
        if (!container.length) {
            return;
        }

        container.empty();

        data.forEach(function (member, index) {
            var delay = 0.1 + (index % 4) * 0.2;

            var item =
                '<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="' + delay + 's">' +
                    '<div class="team-item position-relative">' +
                        '<div class="position-relative">' +
                            '<img class="img-fluid" src="' + member.image + '" alt="' + member.name + '">' +
                        '</div>' +
                        '<div class="bg-light text-center p-4">' +
                            '<h3 class="mt-2">' + member.name + '</h3>' +
                            '<span class="text-primary">' + member.role + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            container.append(item);
        });
    }

    function loadTeamMembers(filePath, container, limit) {
        fetch(filePath)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
            .then(function (teamData) {
                var activeMembers = teamData
                    .filter(function (member) {
                        return String(member.status).toLowerCase() === 'active';
                    });

                if (limit) {
                    activeMembers = activeMembers.slice(0, limit);
                }

                renderTeamMembers(container, activeMembers);
            })
            .catch(function (error) {
                console.error('Gagal memuat data team dari ' + filePath + ':', error);
            });
    }

    var teamListContainer = $('#team-list');
    if (teamListContainer.length) {
        var sourceFile = teamListContainer.data('source') || 'jsonfile/employee.json';
        var limit = teamListContainer.data('limit');
        if (limit) {
            limit = parseInt(limit, 10);
        }

        loadTeamMembers(sourceFile, teamListContainer, limit);
    }

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);

