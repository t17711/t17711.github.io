/**
 * We have all repos stored in object, loop through them to get the one with correct id
 */
function get_repo_info_by_id(id){
	for(var i in my_repos){
		if(my_repos[i].id==id) return my_repos[i];
	}
	return null;
}

/**
 * creates readme modal
 * @param  {JQueryObject} e passed from onclick, represents click readme button
 */
function create_README_modal(e){
	
	// get repo info for current button
	var id = e.target.getAttribute('id');
	var repo_info = get_repo_info_by_id(id);

	// clear modal to fill again
	$('#MarkDownData').html('');
	$('#ModalHeader').html('');

	// create header for modal
	$('#ModalHeader').html(`
		<div class="card">
			<div class="panel-heading"> ${repo_info.name} </div>
			<div class="card-body">
				<h4> 
					${(repo_info.description)?repo_info.description:'No Description'} 
				</h4>
				<a href="${repo_info.html_url}"> 
					${repo_info.full_name}
				</a>
			</div> 
		<div>
		`);

	// dummy text
	$('#MarkDownData').html("<h1> No README </h1>");
	
	// open modal
	$('#readmemodal').modal();

	// request readme for the current and on done ite returns HTML so put it in header
	 $.ajax({
        url: github+'/repos/' + repo_info.owner.login +'/' + repo_info.name + '/readme',
        type: 'GET',
        headers:{
        	// put this in header so that readme is downloaded as rendered version
            Accept: 'application/vnd.github.v3.html+json'
        }
    })
    .done(function(data) {
        console.log("success downloading Readme");
        $('#MarkDownData').html(data);
    })
    .fail(function() {
        console.log("error downloading readme html");
    })
    .always(function() {
        console.log("complete");
    });

}



