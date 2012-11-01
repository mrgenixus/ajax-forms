$(function(){
	$('form').each(function(i,v){
			var $this = $(this);
			$this.on('submit',function(e){
				e.preventDefault();
				e.stopPropagation();

				$.ajax({
					url:$this.attr('action'),
					data:$this.serialize(),
					dataType:'html',
					success:function(d){
						$this.trigger('submitted',d);
					}
				})
			})
		})
		.filter('[data-replace]').each(function(i,v){
			console.log('[data-replace]',i,this);
			var $this = $(this);
			var replacement_selector = $this.data('replace');
			$this.on('submitted',function(e,data){
				$(replacement_selector).html($("<div>").append(data).find(replacement_selector)).trigger('contentChanged');
			})
		}).end()
		.filter('[data-append-from][data-append-to]').each(function(i,v){
			console.log('[data-append-from][data-append-to]',i,this);
			var $this = $(this);
			var append_from = $this.data('append-from');
			var append_to = $this.data('append-to');
			$this.on('submitted',function(e,data){
				$(append_to).html($("<div>").append(data).find(append_from).html()).trigger('contentChanged');
			})
		}).end()
		.filter('[data-navigate-to]').each(function(i,v){
			console.log('[data-navigate-to]',i,this);
			var $this = $(this);
			var navigate_to = $this.data('navigate-to');
			$this.on('submitted',function(e,data){
				document.location.href = navigate_to;
			})
		}).end();
		
})