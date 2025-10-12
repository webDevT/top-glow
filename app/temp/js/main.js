document.addEventListener('DOMContentLoaded', function() {
	// Mobile menu toggle
	const menuBtn = document.querySelector('.menu-btn');
	const headerNav = document.querySelector('.header__nav');
	
	if (menuBtn && headerNav) {
		menuBtn.addEventListener('click', function() {
			this.classList.toggle('active');
			headerNav.classList.toggle('active');
		});
	}

	// Close mobile menu when clicking on links
	const headerLinks = document.querySelectorAll('.header__nav ul li a');
	headerLinks.forEach(link => {
		link.addEventListener('click', function() {
			if (menuBtn) menuBtn.classList.remove('active');
			if (headerNav) headerNav.classList.remove('active');
		});
	});

	// Close mobile menu when clicking on header apply button
	const headerApplyBtnMobile = document.querySelector('.header-apply-btn');
	if (headerApplyBtnMobile) {
		headerApplyBtnMobile.addEventListener('click', function() {
			if (menuBtn) menuBtn.classList.remove('active');
			if (headerNav) headerNav.classList.remove('active');
		});
	}

	// Close mobile menu when clicking outside
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.header')) {
			if (menuBtn) menuBtn.classList.remove('active');
			if (headerNav) headerNav.classList.remove('active');
		}
	});

	// Smooth scrolling for anchor links
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const target = document.querySelector(targetId);
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Header scroll effect
	const header = document.querySelector('.header');
	window.addEventListener('scroll', function() {
		if (window.scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Language dropdown toggle
	const languageToggles = document.querySelectorAll('.language-toggle');
	const languageDropdowns = document.querySelectorAll('.language-dropdown');
	
	languageToggles.forEach((languageToggle, index) => {
		const languageDropdown = languageDropdowns[index];
		if (languageToggle && languageDropdown) {
			languageToggle.addEventListener('click', function(e) {
				e.stopPropagation();
				console.log('Dropdown clicked, index:', index);
				console.log('Dropdown element:', languageDropdown);
				languageDropdown.classList.toggle('active');
				console.log('Active class added:', languageDropdown.classList.contains('active'));
			});
		}
	});

	// Close dropdown when clicking outside
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.language-dropdown')) {
			languageDropdowns.forEach(dropdown => {
				dropdown.classList.remove('active');
			});
		}
	});

	// Language selection
	const languageOptions = document.querySelectorAll('.language-option');
	languageOptions.forEach(option => {
		option.addEventListener('click', function(e) {
			e.preventDefault();
			
			// Get selected language
			const selectedLang = this.getAttribute('data-lang');
			const selectedText = this.querySelector('.language-text').textContent;
			
			// Define short names for button display
			const shortNames = {
				'uk': 'УК',
				'en': 'EN', 
				'ru': 'RU'
			};
			
			// Update all toggle buttons with short name
			const toggleTexts = document.querySelectorAll('.language-toggle .language-text');
			toggleTexts.forEach(toggleText => {
				toggleText.textContent = shortNames[selectedLang];
			});
			
			// Update all toggle buttons data attribute
			languageToggles.forEach(toggle => {
				toggle.setAttribute('data-lang', selectedLang);
			});
			
			// Update active state for all options
			languageOptions.forEach(opt => opt.classList.remove('active'));
			this.classList.add('active');
			
			// Store language preference in localStorage
			localStorage.setItem('selectedLanguage', selectedLang);
			
			// Update HTML lang attribute
			document.documentElement.setAttribute('lang', selectedLang);
			
			// Close all dropdowns
			languageDropdowns.forEach(dropdown => {
				dropdown.classList.remove('active');
			});
			
			// Here you can add logic to change content based on language
			console.log('Language changed to:', selectedLang);
		});
	});

	// Load saved language preference on page load
	const savedLang = localStorage.getItem('selectedLanguage');
	if (savedLang) {
		const savedOptions = document.querySelectorAll('.language-option[data-lang="' + savedLang + '"]');
		if (savedOptions.length > 0) {
			// Define short names for button display
			const shortNames = {
				'uk': 'УК',
				'en': 'EN', 
				'ru': 'RU'
			};
			
			// Update all toggle buttons
			const toggleTexts = document.querySelectorAll('.language-toggle .language-text');
			toggleTexts.forEach(toggleText => {
				toggleText.textContent = shortNames[savedLang];
			});
			
			languageToggles.forEach(toggle => {
				toggle.setAttribute('data-lang', savedLang);
			});
			
			// Update active state for all options
			languageOptions.forEach(opt => opt.classList.remove('active'));
			savedOptions.forEach(option => option.classList.add('active'));
			document.documentElement.setAttribute('lang', savedLang);
		}
	}

	// Set active navigation link based on current page
	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	console.log('Current page detected:', currentPage);
	const navLinks = document.querySelectorAll('.header__nav ul li a');
	
	navLinks.forEach(link => {
		const linkHref = link.getAttribute('href');
		if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
			link.classList.add('active');
		}
	});

	// Function to handle apply button behavior
	function handleApplyButtonClick(e, currentPage) {
		console.log('Apply button clicked, current page:', currentPage);
		
		// Check if we're on the home page (index.html)
		if (currentPage === 'index.html' || currentPage === '' || currentPage === 'index') {
			// On home page - redirect to form.html
			console.log('On home page - redirecting to form.html');
			e.preventDefault();
			window.location.href = 'form.html';
		} else {
			// On other pages - prevent default and scroll to contact section
			console.log('On other page - scrolling to contact section');
			e.preventDefault();
			
			// Find contact section
			const contactSection = document.querySelector('.contact-section');
			if (contactSection) {
				console.log('Contact section found, scrolling to it');
				contactSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			} else {
				// If contact section not found, redirect to form.html
				console.log('Contact section not found, redirecting to form.html');
				window.location.href = 'form.html';
			}
		}
	}

	// Header apply button behavior based on current page
	const headerApplyBtn = document.querySelector('.header-apply-btn');
	if (headerApplyBtn) {
		headerApplyBtn.addEventListener('click', function(e) {
			handleApplyButtonClick(e, currentPage);
		});
	}

	// Handle all "Оставить заявку" and "Начать зарабатывать" buttons on pages
	const allButtons = document.querySelectorAll('a.button, a[href=""]');
	allButtons.forEach(button => {
		const buttonText = button.textContent.trim();
		if (buttonText === 'Оставить заявку' || buttonText === 'Начать зарабатывать') {
			button.addEventListener('click', function(e) {
				handleApplyButtonClick(e, currentPage);
			});
		}
	});

	// Modal window functionality
	const modalWindow = document.querySelector('.modal-window');
	const modalCloseBtn = document.querySelector('.modal-window__content-close');
	
	// Show modal function
	function showModal() {
		console.log('showModal called');
		if (modalWindow) {
			console.log('Modal window found, showing...');
			modalWindow.classList.add('active');
			document.body.style.overflow = 'hidden'; // Prevent background scrolling
		} else {
			console.log('Modal window not found');
		}
	}
	
	// Hide modal function
	function hideModal() {
		console.log('hideModal called');
		if (modalWindow) {
			modalWindow.classList.remove('active');
			document.body.style.overflow = ''; // Restore scrolling
		}
	}
	
	// Handle form submission
	const forms = document.querySelectorAll('.form');
	forms.forEach(form => {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			showModal();
		});
	});
	
	// Handle "Отправить" button clicks
	const submitButtons = document.querySelectorAll('a.button');
	submitButtons.forEach(button => {
		if (button.textContent.trim() === 'Отправить') {
			console.log('Found submit button:', button);
			button.addEventListener('click', function(e) {
				console.log('Submit button clicked');
				e.preventDefault();
				showModal();
			});
		}
	});
	
	// Close modal when clicking close button
	if (modalCloseBtn) {
		modalCloseBtn.addEventListener('click', function() {
			hideModal();
		});
	}
	
	// Close modal when clicking outside
	if (modalWindow) {
		modalWindow.addEventListener('click', function(e) {
			if (e.target === modalWindow) {
				hideModal();
			}
		});
	}
	
	// Close modal with Escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && modalWindow && modalWindow.classList.contains('active')) {
			hideModal();
		}
	});

	// Form page specific functionality
	if (document.querySelector('.header--form')) {
		// Disable mobile menu functionality for form pages
		console.log('Form page detected - mobile menu disabled');
	}

	// Hero Slider (Slick) functionality
	$(document).ready(function() {
		$('.hero-slider').slick({
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			//autoplay: true,
			pauseOnHover: true,
			prevArrow: false,
			fade: true,
			nextArrow: $('.next-button'),
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: true
					}
				}
			]
		});
	});
	
	// Initialize possibilities slider
	function initPossibilitiesSlider() {
		const slider = $('.possibilities__slider');
		
		// Check if slider is already initialized
		if (slider.hasClass('slick-initialized')) {
			slider.slick('destroy');
		}
		
		if (window.innerWidth <= 992) {
			// Initialize Slick slider on mobile
			slider.slick({
				dots: false,
				arrows: false,
				infinite: true,
				speed: 300,
				slidesToShow: 1.15, // Show 1 slide + 15% of next
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 1.1,
							centerMode: false,
							centerPadding: '0px'
						}
					}
				]
			});
		}
	}
	
	// Initialize on page load
	initPossibilitiesSlider();
	
	// Check on window resize
	window.addEventListener('resize', function() {
		// Delay for stability
		setTimeout(initPossibilitiesSlider, 100);
	});

	// Global variable for YouTube player
	let youtubePlayer = null;
	
	// Video button click handler
	$('.video-button').on('click', function() {
		const videoWrapper = $('.video-wrapper');
		
		// Create iframe dynamically
		const iframe = $('<div>', {
			id: 'youtube-player'
		});
		
		// Add iframe to wrapper
		videoWrapper.prepend(iframe);
		
		// Hide cover and button
		$('.video-cover').fadeOut(300);
		$('.video-button').fadeOut(300);
		
		// Initialize YouTube player
		youtubePlayer = new YT.Player('youtube-player', {
			height: '100%',
			width: '100%',
			videoId: 'CVHj7Wxhvdo',
			playerVars: {
				autoplay: 1,
				start: 4,
				controls: 1,
				rel: 0,
				showinfo: 0
			},
			events: {
				onStateChange: onPlayerStateChange
			}
		});
	});
	
	// YouTube player state change handler
	function onPlayerStateChange(event) {
		// When video is paused (state 2), show cover and button
		if (event.data == YT.PlayerState.PAUSED) {
			$('.video-cover').fadeIn(300);
			$('.video-button').fadeIn(300);
			
			// Remove the player
			if (youtubePlayer) {
				youtubePlayer.destroy();
				youtubePlayer = null;
				$('#youtube-player').remove();
			}
		}
	}
	
	// Click outside video handler
	$(document).on('click', function(event) {
		// Check if video is playing and click is outside video wrapper
		if (youtubePlayer && !$(event.target).closest('.video-wrapper').length) {
			// Show cover and button
			$('.video-cover').fadeIn(300);
			$('.video-button').fadeIn(300);
			
			// Remove the player
			youtubePlayer.destroy();
			youtubePlayer = null;
			$('#youtube-player').remove();
		}
	});
});