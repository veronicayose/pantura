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
            window.location.href = "./index.html";
           }
         }); 
    });