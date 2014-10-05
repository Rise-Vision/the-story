function riseVisionStoryPlayer() {
	'use strict';

	var player = {};
	var mediaElements = document.querySelectorAll( 'li' );
	var mediaIndex = 0;

	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in'           },
		{ duration:  600, on: 'full',              off: 'thumbnail fade-in' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
		{ duration:  700, on: 'thumbnail',         off: 'full'              },
	];
	var sequencePauseIndex = 1;

	var playing = false;
	var pausedTimeout = 3000;


	// setup media
	for ( var i = 0; i < mediaElements.length; i++ ) {
		mediaElements[ i ].classList.add( 'fade' );
		mediaElements[ i ].classList.add( 'fade-in' );
		mediaElements[ i ].classList.add( 'thumbnail' );
	}


	// render the animation sequence
	var animationIndex = 0;
	var then = Date.now();
	function animateSequence() {
		var now = Date.now();

		// time to update?
		if ( now - then >= sequence[ animationIndex ].duration ) {
			// update classes
			sequence[ animationIndex ].on.split( ' ' ).forEach(function( newClass ) {
				mediaElements[ mediaIndex ].classList.add( newClass );
			});
			sequence[ animationIndex ].off.split( ' ' ).forEach(function( oldClass ) {
				mediaElements[ mediaIndex ].classList.remove(  oldClass );
			});

			// next in sequence
			then = now;
			animationIndex = ( animationIndex + 1 ) % sequence.length;

			// prepare next image
			if ( animationIndex === 0 ) {
				mediaIndex = Math.floor( Math.random() * mediaElements.length );
			}
		}

		// paused?
		if ( ! playing ) {
			// set pause duration
			then += pausedTimeout;
			playing = true;
		}

		// loop
		requestAnimationFrame( animateSequence );
	}


	// pause the slideshow
	function pause() {
		if ( playing ) {
			animationIndex = sequencePauseIndex;
			then = Date.now() - sequence[ sequencePauseIndex ].duration;
			playing = false;
		}
		return player;
	}

	// play
	function play() {
		then = Math.min( then, Date.now() );
		if ( ! playing ) {
			playing = true;
			requestAnimationFrame( animateSequence );
		}

		return player;
	}

	// pause toggle
	function playToggle() {
		if ( playing ) {
			pause();
		} else {
			play();
		}
	}


	// select media item on click
	// media.addEventListener( 'click', playToggle );


	// return API
	player = {
		pause: pause,
		play: play,
		playPause: playToggle
	};
	return player;
}
