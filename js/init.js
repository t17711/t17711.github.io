const username = 't17711';
const gh = new GitHub();
const markdown = gh.getMarkdown();
const me = gh.getUser(username);
const github = 'https://api.github.com';

var my_repos = {};

/**
 * start the program on load
 */

window.onload=()=>{
	// first hide linked part and display github
	$('#LinkedIn').hide();

	// call for download
	get_all_repos();

	// set click function
	$('.nav-link').click(function(event) {
		event.preventDefault();
		var target = event.target.getAttribute('target');
		$(".data_stuff").hide();
		$('#'+target).show();
	});
};