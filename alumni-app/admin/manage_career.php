<?php include 'db_connect.php' ?>
<?php
if(isset($_GET['id'])){
	$qry = $conn->query("SELECT * FROM careers where id=".$_GET['id'])->fetch_array();
	foreach($qry as $k =>$v){
		$$k = $v;
	}
}

?>
<div class="container-fluid">
	<form action="" id="manage-career">
				<input type="hidden" name="id" value="<?php echo isset($_GET['id']) ? $_GET['id']:'' ?>" class="form-control">
		<div class="row form-group">
			<div class="col-md-8">
				<label class="control-label">Company</label>
				<input type="text" name="company" class="form-control" value="<?php echo isset($company) ? $company:'' ?>">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-md-8">
				<label class="control-label">Job Title</label>
				<input type="text" name="title" class="form-control" value="<?php echo isset($job_title) ? $job_title:'' ?>">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-md-8">
				<label class="control-label">Location</label>
				<input type="text" name="location" class="form-control" value="<?php echo isset($location) ? $location:'' ?>">
			</div>
		</div>
		<div class="row form-group">
			<div class="col-md-12">
				<label class="control-label">Description</label>
				<textarea name="description" class="text-jqte"><?php echo isset($description) ? $description : '' ?></textarea>
			</div>
		</div>
	</form>
</div>

<script>
	$('.text-jqte').jqte();
	$('#manage-career').submit(function(e){
		e.preventDefault()
		start_load()
		$.ajax({
			url:'ajax.php?action=save_career',
			method:'POST',
			data:$(this).serialize(),
			success:function(resp){
				if(resp == 1){
					alert_toast("Data successfully saved.",'success')
					setTimeout(function(){
						location.reload()
					},1000)
				}
			}
		})
	})
</script>