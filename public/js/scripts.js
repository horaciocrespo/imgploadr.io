$(function(){
	$('#post-comment').hide();

	$('#btn-comment').on('click', function(event) {
		event.preventDefault();
		$('#post-comment').show();
	});

	$('#btn-like').on('click', function(event) {
		event.preventDefault();
		var imgId = $(this).data('id');
	
		$.post('/images/' + imgId + '/like').done(function(data) {
			$('.likes-count').text(data.likes);
		});
	});
});

$(function() {
  $('#btn-delete').on('click', function(event) {
    event.preventDefault();
    var $this = $(this);

    var remove = confirm('Are you sure you want to remove this image?');
    if(remove) {
      var imgId = $(this).data('id');
      $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
      })
      .done(function(result) {
        if(result) {
          $this.removeClass('btn btn-danger').addClass('btn btn-success');
          $this.find('i')
            .removeClass('fa fa-times')
            .addClass('fa fa-check');

          $this.append('<span> Deleted!</span>');
        }
      });
    }
  });
});