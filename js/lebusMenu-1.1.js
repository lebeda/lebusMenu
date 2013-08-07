/**
 * LebusMenu
 * @author Lebus
 * @email Lebus88@gmail.com
 * @developed 2012
 * @version 1.1
 **/

jQuery.fn.lebusMenu = function() {
	var args = arguments[0] || {}, /* It's object of arguments */
	displayMenuDefault = 'horizontal',
	displayMenu = ( typeof args.displayMenu != 'undefined' ? args.displayMenu : displayMenuDefault ),
	source = ( typeof args.source != 'undefined' ? args.source : '/lebus/www/' ),
	effect = ( typeof args.effect != 'undefined' ? args.effect : 'default' ),
	speedEffect = ( typeof args.effect != 'undefined' && typeof args.speedEffect != 'undefined' ? args.speedEffect : 100 ),
	firstLevel = $(this).children('li'),
	multiLevel = firstLevel.find('li');
	
	if (firstLevel == 'undefined') {
		return false;
	}

	function getAnimEffect(controlObject, effect, state, speed) {
		switch (effect) {
			case 'fade':
				if (state == 'on') {
					return controlObject.fadeIn(speed);
				} else {
					return controlObject.fadeOut(speed);
				}
				break;
			case 'slide':
				if (state == 'on') {
					return controlObject.slideDown(speed);
				} else {
					return controlObject.slideUp(speed);
				}
				break;
			default:
				if (state == 'on') {
					return controlObject.css('display', 'inline-block');
				} else {
					return controlObject.css('display', 'none');
				}
				break;
		}

	}

	firstLevel.addClass('first');
	firstLevel.css('width', firstLevel.children('a').css('width'));
	if (displayMenu == 'vertical') {
		firstLevel.css({
			clear: 'both'
		});
	}

	/* first level showing */
	firstLevel.hover(
		function(){
			if (displayMenu == 'vertical') {
				$(this).children('ul').css('marginLeft', $(this).css('width'));
				$(this).children('ul').css('marginTop', '-' + $(this).css('height'));
			}
			getAnimEffect($(this).children('ul'), effect, 'on', speedEffect);
		},
		function(){
			firstLevel.each(function () {
				getAnimEffect($(this).children('ul'), effect, 'off', speedEffect);
			});
		}
	);

	/* next multilevel showing */
	multiLevel.hover(
		function(){
			if ($(this).children('ul').length > 0) {
				getAnimEffect($(this).children('ul'), effect, 'on', speedEffect);
			}
		},
		function() {
			if ($(this).children('ul').length > 0) {
				getAnimEffect($(this).children('ul'), effect, 'off', speedEffect);
			}
		}
	);
};