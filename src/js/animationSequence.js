var riseVisionStoryPlayer = (function() {
	'use strict';

	var images = [
		// http://ultimate.benboyle.id.au/art/2013/scifi30/
		'http://farm4.staticflickr.com/3829/9416063008_279161b050_b.jpg',
		'http://farm8.staticflickr.com/7310/9419710875_8ba16c9ca9_b.jpg',
		'http://farm8.staticflickr.com/7423/9429359808_6a91f7debf_b.jpg',
		'http://farm4.staticflickr.com/3729/9433808423_5ab7295dac_b.jpg',
		'http://farm3.staticflickr.com/2816/9440949715_ea32d72e89_b.jpg',
		'http://farm8.staticflickr.com/7287/9452342068_389777fa3e_b.jpg',
		'http://farm6.staticflickr.com/5469/9456566225_9a5b17ed53_b.jpg',
		'http://farm3.staticflickr.com/2883/9463346447_3bd18d2639_b.jpg',
		'http://farm6.staticflickr.com/5538/9472899268_67c2fe6f6b_b.jpg',
		'http://farm8.staticflickr.com/7361/9478597364_6c0b7fe06b_b.jpg',
		'http://farm6.staticflickr.com/5511/9486139298_e26290768b_b.jpg',
		'http://farm8.staticflickr.com/7419/9491798537_db4354b689_b.jpg',
		'http://farm4.staticflickr.com/3779/9499288505_e9cc0a0296_b.jpg',
		'http://farm6.staticflickr.com/5546/9509401376_c60738f2c4_b.jpg',
		'http://farm8.staticflickr.com/7323/9513796927_c66102eef9_b.jpg',
		'http://farm4.staticflickr.com/3667/9524121264_4077cfa3b5_b.jpg',
		'http://farm8.staticflickr.com/7428/9530892542_af323faf75_b.jpg',
		'http://farm8.staticflickr.com/7427/9535482005_4a837b6ba0_b.jpg',
		'http://farm3.staticflickr.com/2814/9538269642_8e040d9e72_b.jpg',
		'http://farm6.staticflickr.com/5441/9543932529_0929d6220b_b.jpg',
		'http://farm8.staticflickr.com/7300/9552527633_f99e021e24_b.jpg',
		'http://farm8.staticflickr.com/7400/9562539624_20ed2036a8_b.jpg',
		'http://farm6.staticflickr.com/5464/9566781619_5b3b4cf833_b.jpg',
		'http://farm8.staticflickr.com/7361/9574575069_208ac2494d_b.jpg',
		'http://farm8.staticflickr.com/7452/9580100761_9c32210034_b.jpg',
		'http://farm4.staticflickr.com/3800/9587945177_7a8854970f_b.jpg',
		'http://farm6.staticflickr.com/5527/9596298867_ab622e0a67_b.jpg',
		'http://farm4.staticflickr.com/3746/9607775294_351fae57df_b.jpg',
		'http://farm8.staticflickr.com/7349/9615775362_07c12614ec_b.jpg',
		'http://farm8.staticflickr.com/7373/9622775710_35d7dbfd3c_b.jpg',
		'http://farm6.staticflickr.com/5445/9626644145_4ac049cc49_b.jpg',
	];
	var nextImage = new Image();

	var media = document.getElementById( 'media' );
	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in'           },
		{ duration:  600, on: 'full',              off: 'thumbnail fade-in' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
		{ duration:  700, on: 'thumbnail',         off: 'full'              },
	];
	// TODO flag steps that can be paused, find the next 'pausable' point
	var sequencePauseIndex = 1;


	var playing = false;

	var i = 0;
	var then = Date.now();
	function animateSequence() {
		var now = Date.now();

		// time to update?
		if ( now - then >= sequence[ i ].duration ) {
			// update classes
			sequence[ i ].on.split( ' ' ).forEach(function( newClass ) {
				media.classList.add( newClass );
			});
			sequence[ i ].off.split( ' ' ).forEach(function( oldClass ) {
				media.classList.remove(  oldClass );
			});


			// prepare next image
			if ( i === 0 ) {
				nextImage.src = images[ Math.floor( Math.random() * images.length ) ];
			}

			// next in sequence
			then = now;
			i = ( i + 1 ) % sequence.length;

			// new media?
			if ( i === 0 ) {
				media.getElementsByTagName( 'img' )[ 0 ].src = nextImage.src;
			}
		}

		// loop
		if ( playing ) {
			requestAnimationFrame( animateSequence );
		}
	}


	// pause the slideshow
	function pause() {
		if ( playing ) {
			i = sequencePauseIndex;
			then = Date.now() - sequence[ sequencePauseIndex ].duration;
			playing = false;
		}
	}

	// play
	function play() {
		if ( ! playing ) {
			playing = true;
			requestAnimationFrame( animateSequence );
		}
	}


	// start it up!
	playing = false;
	play();


	// return API
	return {
		pause: pause,
		play: play
	};

}());
