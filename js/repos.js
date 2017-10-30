function get_all_repos(){
	/**
	 * Create an ajax request to github for repos
	 */
	$.ajax({
		url: github+'/users/'+username+'/repos',
		method: "GET",
		data: {
			type:'all', // so that all repo ser owns and is member of is downloaded
			sort:'updated',
			direction:'desc'
		},
		dataType: "json" // to parse JSON response automatically
	})
	.done(function(msg) {
		my_repos = msg;
		create_UI();
	})
	.fail(function(err) {
		$('#Repositories').text(err.toString());
	});
}

function create_UI() {
	for (var i in my_repos) {
		var r = my_repos[i];
		var card_html =
		`
			<div class="card">
				<div class="card-block">
					<h4 class="card-title">
							${r.name}
						</h4>
					<div class="repodescription">
						<span class="card-text">
							${r.description?r.description:""}
						</span>
					</div>
					<div class="bottom_buttons">
						<a class="btn btn-primary" href="${r.html_url}">t
							${r.full_name}
						</a>
						<a class="readMeButton btn btn-secondary" id="${r.id}" repo="${r.name}">
							Show README
						</a>
					</div>
				</div>
			</div>
		`;

		// attach html
		$('#Repositories').append($(card_html));
	}

	$('.readMeButton').click(create_README_modal);
}
