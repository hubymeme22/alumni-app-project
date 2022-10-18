<?php include('db_connect.php');?>

<div class="container-fluid">
	
	<div class="col-lg-12">
		<div class="row">
			<!-- FORM Panel -->
			<div class="col-md-4">
			<form action="" id="manage-gallery">
				<div class="card">
					<div class="card-header">
						    Upload
				  	</div>
					<div class="card-body">
							<input type="hidden" name="id">
							<div class="form-group">
								<label for="" class="control-label">Image</label>
								<input type="file" class="form-control" name="img" onchange="displayImg(this,$(this))">
							</div>
							<div class="form-group">
								<img src="<?php echo is_file('assets/uploads/gallery/img_') ?>" alt="" id="cimg">
							</div>
							<div class="form-group">
								<label class="control-label">Short Description</label>
								<textarea class="form-control" name='about'></textarea>
							</div>
							
					</div>
							
					<div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button class="btn btn-sm btn-primary col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-sm btn-default col-sm-3" type="button" onclick="$('#manage-gallery').get(0).reset()"> Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			</div>
			<!-- FORM Panel -->

			<!-- Table Panel -->
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<b>gallery List</b>
					</div>
					<div class="card-body">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th class="text-center">#</th>
									<th class="text-center">IMG</th>
									<th class="text-center">Gallery</th>
									<th class="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 1;
								$img = array();
                          		$fpath = 'assets/uploads/gallery';
								$files= is_dir($fpath) ? scandir($fpath) : array();
								foreach($files as $val){
									if(!in_array($val, array('.','..'))){
										$n = explode('_',$val);
										$img[$n[0]] = $val;
									}
								}
								$gallery = $conn->query("SELECT * FROM gallery order by id asc");
								while($row=$gallery->fetch_assoc()):
								?>
								<tr>
									<td class="text-center"><?php echo $i++ ?></td>
									<td class="">
										<img src="<?php echo isset($img[$row['id']]) && is_file($fpath.'/'.$img[$row['id']]) ? $fpath.'/'.$img[$row['id']] :'' ?>" class="gimg" alt="">
									</td>
									<td class="">
										<?php echo $row['about'] ?>
									</td>
									<td class="text-center">
										<button class="btn btn-sm btn-primary edit_gallery" type="button" data-id="<?php echo $row['id'] ?>" data-about="<?php echo $row['about'] ?>" data-src="<?php echo isset($img[$row['id']]) && is_file($fpath.'/'.$img[$row['id']]) ? $fpath.'/'.$img[$row['id']] :'' ?>" >Edit</button>
										<button class="btn btn-sm btn-danger delete_gallery" type="button" data-id="<?php echo $row['id'] ?>">Delete</button>
									</td>
								</tr>
								<?php endwhile; ?>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- Table Panel -->
		</div>
	</div>	

</div>
<style>
	
	td{
		vertical-align: middle !important;
	}
	img#cimg{
		max-height: 23vh;
		max-width: calc(100%);
	}
	.gimg{
		max-height: 15vh;
		max-width: 10vw;
	}

</style>
<script>
	function displayImg(input,_this) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
        	$('#cimg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
	$('#manage-gallery').submit(function(e){
		e.preventDefault()
		start_load()
		$.ajax({
			url:'ajax.php?action=save_gallery',
			data: new FormData($(this)[0]),
		    cache: false,
		    contentType: false,
		    processData: false,
		    method: 'POST',
		    type: 'POST',
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully added",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
				else if(resp==2){
					alert_toast("Data successfully updated",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	})
	$('.edit_gallery').click(function(){
		start_load()
		var cat = $('#manage-gallery')
		cat.get(0).reset()
		cat.find("[name='id']").val($(this).attr('data-id'))
		cat.find("[name='about']").val($(this).attr('data-about'))
		cat.find("img").attr('src',$(this).attr('data-src'))
		end_load()
	})
	$('.delete_gallery').click(function(){
		_conf("Are you sure to delete this data?","delete_gallery",[$(this).attr('data-id')])
	})
	function delete_gallery($id){
		start_load()
		$.ajax({
			url:'ajax.php?action=delete_gallery',
			method:'POST',
			data:{id:$id},
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully deleted",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	}
	$('table').dataTable()
</script>