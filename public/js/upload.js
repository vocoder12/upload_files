
var name, email;
$('.upload-btn').on('click', function (){
    //En el click del button bootstrap ejecutamos click en el input oculto
    name = $("#txtName").val();
    email = $("#txtEmail").val();
    if(valid(name, email)){
        $('#upload-input').click();
        resetBar();
    }
    
});

$('#upload-input').on('change', function(){
    var file = $(this)[0].files[0];
    console.log(file)
    if (file.size > 0){
        var formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('name', name);
        launch_uploadFile(formData);
    }
});

function launch_uploadFile(formData) {
    showProgress();
    $.ajax({
        url: '/register',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data);
            animateGliphycon();
            cleanFields();
        },
        xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {
            $("#mainIcon").removeClass("glyphicon-user").addClass("glyphicon-repeat animation");
            if (evt.lengthComputable) {
                // calculate the percentage of upload completed
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);
                // update the Bootstrap progress bar with the new percentage           
                $('.progress-bar').width(percentComplete + '%');
                $('#progressLabel').text(percentComplete + '%');  
            }
        }, false);
        return xhr;
        }
    });
}

function animateGliphycon() {
    setTimeout(function() {
       $("#mainIcon").removeClass("glyphicon-repeat animation").addClass("glyphicon-ok-circle upload-success");     
    }, 500); 

    setTimeout(function() {
        resetBar();
    }, 3000);    
}

function resetBar() {
    $('#progressLabel').text('0%');
    $('.progress-bar').width('0%');
    $("#mainIcon").removeClass("glyphicon-ok-circle upload-success").addClass("glyphicon-user");
    hideProgress();
}

function valid(name, email) {
    var valid = true;
    if(name === null || name === ""){
        valid = false;
    } else if (email === null || email === ""){
        valid = false;
    }
    return valid;
}

function showProgress() {
    $(".boxProgress").fadeIn();
}

function hideProgress() {
    $(".boxProgress").fadeOut();
}

function cleanFields() {
    $(".form-control").val("");
}