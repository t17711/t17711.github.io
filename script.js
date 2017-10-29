/*
   Data can be retrieved from the API either using callbacks (as in versions < 1.0)
   or using a new promise-based API. The promise-based API returns the raw Axios
   request promise.
 */
// import GitHub from 'github-api';

const username = 't17711';
const gh = new GitHub();
const markdown = gh.getMarkdown();
const me = gh.getUser(username);

var my_repos = {};

function get_repo_info_by_id(id){
	for(var i in my_repos){
		if(my_repos[i].id==id) return my_repos[i];
	}
	return null;
}

function create_UI() {
	for (var i in my_repos) {
		var r = my_repos[i];

		// create panel
		$('#Repositories')
		var card = $('<div>', {
				class: "card"
			})
			.appendTo($('#Repositories')),
			card_block = $('<div>', {
				class: 'card-block'
			})
			.appendTo(card),
			header = $('<h4>', {
				class: 'card-title'
			})
			.appendTo(card_block)
			.text(r.name),
			desc = $('<span>', {
				class: "card-text"
			})
			.appendTo(card_block)
			.text(r.description),
			button = $('<a>', {
				class: "btn btn-primary",
				href: r.html_url
			})
			.appendTo(card_block)
			.text(r.full_name),
			expander = $('<button>', {
				class: 'btn btn-secondary',
				id: r.id,
				repo: r.name
			})
			.appendTo(card_block)
			.text('Show README');

		expander.click(function(e) {
			$('#MarkDownData').html('');
			$('#ModalHeader').html('');
			$('#readmemodal').modal();

			var el = $(this);
			var id = el.attr('id');
			var repo_info = get_repo_info_by_id(id);

			var usr = gh.getRepo(username, repo_info.name);

			usr.getReadme('master', true,
				function(err, data) {
				$('#ModalHeader').html(`
					<h1> ${repo_info.name} </h1>
					<h4> ${(repo_info.description)?repo_info.description:'No Description'} </h4>
					<a href="${repo_info.html_url}"> ${repo_info.full_name}</a> 
					`);

					var d = $.trim(data);
					console.log(data);

					if (err) {
							$('#MarkDownData').html("<h1> N/A </h1>");
							return;
					}

					$.ajax({
							url: 'https://api.github.com/markdown',
							method: "POST",
							data: JSON.stringify({
								'text': d
							}),
						})
						.done(function(msg) {
							console.log(msg);
							$('#MarkDownData').html(msg);
						})
						.fail(function(x) {
							console.log('Request failed');
							$('#MarkDownData').html("<h1> Markdown Render Failed </h1>");
						});
				});
		});
	}
}


me.listRepos((err, repos) => {
	if (err) {
		$('#Repositories').text(err.toString());
	} else {
		my_repos = repos;
		create_UI();
	}
});