$(document).ready(function () {
    getComments();

    $("#postComment").click(function () {
        postComment();
        //getComments();

    });

    $("#getComments").click(function () {
        getComments();
    })

    $("#deleteComments").click(function () {
        delComments();
        //getComments();
    })
});


function getComments() {
    console.log("getting comments");
    $.getJSON('comment', function (data) {
        console.log(data);
        var everything = "<ul>";
        for (var comment in data) {
            com = data[comment];
            everything += "<li> <strong>Name:</strong> " + com.Name + " -- <strong>Comment:</strong> " + com.Comment + "</li>";
        }
        everything += "</ul>";
        $("#comments").html(everything);
    })
    $("#json").html('<div class="alert alert-warning alert-dismissable fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You have got all comments! </div>');
    //alert user fadeout
    window.setTimeout(function () {
        $(".alert-warning").alert('close');
    }, 2300);
}

function postComment() {
    var url = "comment";
    var myobj = {
        Name: $("#name").val(),
        Comment: $("#comment").val()
    };

    jobj = JSON.stringify(myobj);

    $.ajax({
        url: url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus) {
            $("#done").html(textStatus);
        }
    })
    $('#commentForm').trigger("reset");

    $("#json").html('<div class="alert alert-success alert-dismissable fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + jobj + '</div>');
    closeAlert();
}

function delComments() {
    var url = "comment";
    $.ajax({
        url: url,
        type: "DELETE",
        success: function (data) {
            console.log("delete was successful");
        }
    })
    $("#json").html('<div class="alert alert-danger alert-dismissable fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You have deleted everything! </div>');
    //alert user fadeout
    window.setTimeout(function () {
        $(".alert-danger").alert('close');
    }, 5000);
}

function closeAlert() {
    //alert user fadeout
    window.setTimeout(function () {
        $(".alert-success").alert('close');
    }, 3000);
}
