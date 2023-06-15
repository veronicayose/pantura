var form = $('#register');
form.submit(function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
           type: "POST",
           url: form.attr('action'),
           data: form.serialize(), 
           success: function(data)
           {
            if (data.responseCode === 'User already has account'){
              alert(data.responseCode);
              window.location.href = "./sign-up.html";
            } else {
              window.location.href = "./index.html";
            }
           }
         }); 
    });