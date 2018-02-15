/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
		return window.setTimeout(callback, 1000 / 60);
	});
}

// Init Stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';


/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */
(function ($, window) {
	/**
	 * Makes a nice constellation on canvas
	 * @constructor Constellation
	 */
	function Constellation (canvas, options) {
		var $canvas = $(canvas),
			context = canvas.getContext('2d'),
			defaults = {
				star: {
					color: '#000',
					width: 1,
					randomWidth: true
				},
				line: {
					color: '#000',
					width: 0.4
				},
				position: {
					x: 0, // This value will be overwritten at startup
					y: 0 // This value will be overwritten at startup
				},
				width: window.innerWidth,
				height: window.innerHeight,
				velocity: 0.1,
				length: 100,
				distance: 120,
				radius: 150,
				stars: []
			},
			config = $.extend(true, {}, defaults, options);

		function Star () {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;

			this.vx = (config.velocity - (Math.random() * 0.5));
			this.vy = (config.velocity - (Math.random() * 0.5));

			this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
		}

		Star.prototype = {
			create: function(){
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				context.fill();
			},

			animate: function(){
				var i;
				for (i = 0; i < config.length; i++) {

					var star = config.stars[i];

					if (star.y < 0 || star.y > canvas.height) {
						star.vx = star.vx;
						star.vy = - star.vy;
					} else if (star.x < 0 || star.x > canvas.width) {
						star.vx = - star.vx;
						star.vy = star.vy;
					}

					star.x += star.vx;
					star.y += star.vy;
				}
			},

			line: function(){
				var length = config.length,
					iStar,
					jStar,
					i,
					j;

				for (i = 0; i < length; i++) {
					for (j = 0; j < length; j++) {
						iStar = config.stars[i];
						jStar = config.stars[j];

						if (
							(iStar.x - jStar.x) < config.distance &&
							(iStar.y - jStar.y) < config.distance &&
							(iStar.x - jStar.x) > - config.distance &&
							(iStar.y - jStar.y) > - config.distance
						) {
							if (
								(iStar.x - config.position.x) < config.radius &&
								(iStar.y - config.position.y) < config.radius &&
								(iStar.x - config.position.x) > - config.radius &&
								(iStar.y - config.position.y) > - config.radius
							) {
								context.beginPath();
								context.moveTo(iStar.x, iStar.y);
								context.lineTo(jStar.x, jStar.y);
								context.stroke();
								context.closePath();
							}
						}
					}
				}
			}
		};

		this.createStars = function () {
			var length = config.length,
				star,
				i;

			context.clearRect(0, 0, canvas.width, canvas.height);

			for (i = 0; i < length; i++) {
				config.stars.push(new Star());
				star = config.stars[i];

				star.create();
			}

			star.line();
			star.animate();
		};

		this.setCanvas = function () {
			canvas.width = config.width;
			canvas.height = config.height;
		};

		this.setContext = function () {
			context.fillStyle = config.star.color;
			context.strokeStyle = config.line.color;
			context.lineWidth = config.line.width;
		};

		this.setInitialPosition = function () {
			if (!options || !options.hasOwnProperty('position')) {
				config.position = {
					x: canvas.width * 0.5,
					y: canvas.height * 0.5
				};
			}
		};

		this.loop = function (callback) {
			callback();

			window.requestAnimationFrame(function () {
				stats.begin(); // Only for Stats
				this.loop(callback);
				stats.end(); // Only for Stats
			}.bind(this));
		};

		this.bind = function () {
			$canvas.on('mousemove', function(e){
				config.position.x = e.pageX - $canvas.offset().left;
				config.position.y = e.pageY - $canvas.offset().top;
			});
		};

		this.init = function () {
			this.setCanvas();
			this.setContext();
			this.setInitialPosition();
			this.loop(this.createStars);
			this.bind();
		};
	}

	$.fn.constellation = function (options) {
		return this.each(function () {
			var c = new Constellation(this, options);
			c.init();
		});
	};
})($, window);

// Init plugin
$('canvas').constellation({
	star: {
		width: 3
	},
	line: {
		color: '#000'
	},
	radius: 250
});
var home = `
<div class="formalities">
	<div class="picture">
		<img id="issa-me"src="files/Nicept2.jpg"/>
	</div>
	<div class="contain">
		<br /><br /><br /><br />
		<span id="greetings">Hello! My name is <b>David Wolff</b></span><br /><br />
		<span id="title">Fullstack Developer & Engineer</span><br />
		<span id="major">Computer Science & Computer Engineering @ Northwestern University</span>
	</div>
</div>
<div class="info-section">
	<div class="info col-sm-12">
		<p id="header"><b>About Me</b></p>
		<div>
			<p id="text">I am currently pursuing a Bachelor's of Science at Northwestern Univeristy in both Computer Engineering and Computer Science. </p>
			<p id="text">I enjoy playing video games such as Overwatch and Skyrim, but the I venture to the outdoors as well.</p>
			<p id="text">Currently on the frisbee team and I love playing college intramural sports!</p>
		</div>
	</div>
	<div class="info col-sm-12">
		<p id="header"><b>What I do</b></p>
		<div>
			<p id="text">I do freelance work such as creating websites or help catalyze new startup ideas</p>
			<p id="text">During the school year, I work within the Roger's Lab within NU in visualizing real time data.</p>
			<p id="text">I also serve as a peer mentor in the NU community, helping peers learn what they can't outside of class.</p>
		</div>
	</div>
	<div class="info col-sm-12">
		<p id="header"><b>Social Me-dia!</b></p><br />
		<div class="social">
			<a href="files/Resume.pdf" target="_blank">
				<span style="font-size: 50px;" class="fa fa-wpforms"/>
			</a>
			<a href="https://github.com/djwolff" target="_blank">
				<span style="font-size: 50px;" class="fa fa-github-alt"/>
			</a>
			<a href="https://www.linkedin.com/in/david-wolff-23512a76/" target="_blank">
				<span style="font-size: 50px;"class="fa fa-linkedin"/>
			</a>
			<a href="https://www.instagram.com/djwolff/?hl=en" target="_blank">
				<span class="fa fa-instagram"/>
			</a>
		</div>
	</div>
</div>
`
;
var left = `
	<div class="picture">
		<img id="DOG" src="files/dogoncomputer.jpg"/>
	</div>
	<div class="title">
		<span id="greetings"><b>Skills</b></span><br />
	</div>
	<div class="info-section">
		<div style="text-align: left;">
			<p id="header"><b>Programming Languages</b></p>
			<div>
				<p id="language-text"><b>Javascript</b>: Advanced. I learned Javascript during my own time during college and spent summer of 2017 coding in it.</p>
				<p id="language-text"><b>Matlab</b>: Advanced. Well, every engineer has to know Matlab well.</p>
				<p id="language-text"><b>C++</b>: Intermediate. Spent two quarters at Northwestern learning C++.</p>
			</div><br />
		<div style="text-align: left;">
			<p id="header"><b>Libraries and Tools</b></p>
			<div>
				<p id="language-text"><b>React</b>: Advanced. In addition to Javascript, I learned React, React-redux, and React-native. Soon, I will upload an app I've been working on! :D</p>
				<p id="language-text"><b>Node / Express / MongoDB</b>: Advanced. Can easily create backend portions for applications using a variety of packages.</p>
			</div><br />
			<p id="header"><b>Miscellanea</b></p>
			<div>
				<p id="language-text"><b>Frisbee</b>: I really like playing Ultimate, as I am on the Ultimate team, but throwing the disc around is always great fellowship.</p>
				<p id="language-text"><b>Tennis</b>: Since I was born, I had a racquet in my hand. For my whole life I have played tennis, and I have yet to get sick of it.</p>
			</div>
		</div>
	</div>`;
var right = `
<div class="picture">
	<img id="DOG" src="files/DogStore.png"/>
</div>
<div class="title">
	<span id="greetings"><b>Questions?</b></span><br />
</div>
<div class="info-section">
	<div style="text-align: left;">
		<p id="header"><b>How old are you?</b></p>
		<div>
			<p id="language-text">As of August 2017, I am 19 years old. I'll be (hopefully) graduating with a BS in 2020.</p>
		</div><br />
		<p id="header"><b>What do you like most about Computer Science?</b></p>
		<div>
			<p id="language-text">You can make anything you want, and it's not just limited to memes.</p>
		</div><br />
		<p id="header"><b>Who inspires you?</b></p>
		<div>
			<p id="language-text">Honestly, my dog. Even though he isn't the smartest, he still tries. Took him a while to learn sit, but he pulled through!</p>
		</div><br />
		<p id="header"><b>How can I contact you?</b></p>
		<div>
			<p id="language-text">Go up! Hit the up arrow on the keyboard or on the screen!</p>
		</div>
	</div>
</div>`;
var up = `
<div class="picture">
	<img id="DOG" src="files/DogMail.png"/>
</div>
<div class="title">
	<span id="greetings"><b>Contact Me!</b></span><br />
	<span id="major">Feel free to contact me with any questions or oppurtunities you might have!</span><br />
</div><br />
<form class="contact" action="https://formspree.io/davidwolff2020@u.northwestern.edu" method="POST">
	<input type="name" name="name" placeholder="Your Name">
  <input type="email" name="_replyto" placeholder="Your Email Address">
	<textarea type="text" name="message" placeholder="Leave your message here"></textarea>
  <input id="send" type="submit" value="Send">
</form><br /><br />
`;
$( document ).ready(function() {
    console.log( "ready!" );

		$(document).keydown(function(e){
    if (e.keyCode === 37)
      $('.toggle-left').click();
		if (e.keyCode === 39)
	    $('.toggle-right').click();
		if(e.keyCode === 38)
			$('.toggle-up').click();
		if(e.keyCode === 40)
			$('.toggle-down').click();
		});

		var page = 'home';
		$('.toggle-left').click(function() {
			if(page === 'home') {
				page = 'left';
			} else if(page === 'right') {
				page = 'home'
			}

			if(page === 'home') {
				$('.textbox').html(home);
				$('.nav').css({"visibility": "hidden"})
				$('.left').css({"visibility": "visible"})
				$('.right').css({"visibility": "visible"})
				$('.top').css({"visibility": "visible"})
			}
			if(page === 'left') {
				$('.textbox').html(left);
				$('.nav').css({"visibility": "hidden"})
				$('.right').css({"visibility": "visible"})
			}

		})

		$('.toggle-right').click(function() {
			if(page === 'home') {
				page = 'right';
			} else if(page === 'left') {
				page = 'home';
			}

			if(page === 'home') {
				$('.textbox').html(home);
				$('.nav').css({"visibility": "hidden"})
				$('.left').css({"visibility": "visible"})
				$('.right').css({"visibility": "visible"})
				$('.top').css({"visibility": "visible"})
			}
			if(page === 'right') {
				$('.textbox').html(right);
				$('.nav').css({"visibility": "hidden"})
				$('.left').css({"visibility": "visible"})
			}
		})

		$('.toggle-up').click(function() {
			if(page === 'home') {
				page = 'up';
			} else if(page === 'down') {
				page = 'home';
			}

			if(page === 'home') {
				$('.textbox').html(home);
				$('.nav').css({"visibility": "hidden"})
				$('.left').css({"visibility": "visible"})
				$('.right').css({"visibility": "visible"})
				$('.top').css({"visibility": "visible"})
			}
			if(page === 'up') {
				$('.textbox').html(up);
				$('.nav').css({"visibility": "hidden"})
				$('.bottom').css({"visibility": "visible"})
			}
		})

		$('.toggle-down').click(function() {
			if(page === 'home') {
				page = 'down';
			} else if(page === 'up') {
				page = 'home';
			}

			if(page === 'home') {
				$('.textbox').html(home)
				$('.nav').css({"visibility": "hidden"})
				$('.left').css({"visibility": "visible"})
				$('.right').css({"visibility": "visible"})
				$('.top').css({"visibility": "visible"})
			}
			// if(page === 'down') {
			// 	$('.textbox').html(down)
			// }
		})
});
