$(document).ready(function() {
    $('#login').click(function() {
        var inputemail = document.getElementById("emailLogin").value
        if (inputemail == '') {
            document.getElementById("errorlogin").innerHTML = 'Email is required'
            return
        }
        const email = {email: inputemail}
        const url = 'http://localhost:3000/login'
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(email),
            dataType: 'json',
            success: function(data){
                setNewSession(true)
                document.getElementById("errorlogin").innerHTML = ''
            },
            error: function(err){
                document.getElementById("errorlogin").innerHTML = err.responseJSON.message
            }
        });
    })

    $("#logout").click(function() {
        setNewSession(false, '')
    })

    function setNewSession(active, token = 'eyJhbGciOiJIUzI1NiJ9.ZmFpemFsQGdtYWlsLmNvbQ.AFMC5cxZaXeWaTEWYyFGK11tNb6DOsaxC4f3k9J49E4') {
        const url = 'http://localhost:3000/session'
        $.ajax({
            url: url,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({active, token}),
            dataType: 'json',
            success: function(data){
                location.reload()
            },
            error: function(err){

            }
        });
    }

    $('#signup').click(function() {
        var inputname = document.getElementById("nameSignup").value
        var inputemail = document.getElementById("emailSignup").value
        document.getElementById("errorNameSignup").innerHTML = ''
        document.getElementById("errorEmailSignup").innerHTML = ''
        if (inputname == '') {
            document.getElementById("errorNameSignup").innerHTML = 'Name is required'
            return
        }
        if (inputemail == '') {
            document.getElementById("errorEmailSignup").innerHTML = 'Email is required'
            return
        }
        const data = {email: inputemail, name: inputname}
        const url = 'http://localhost:3000/user'
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(data){
                document.getElementById("errorNameSignup").innerHTML = ''
                document.getElementById("errorEmailSignup").innerHTML = ''

                $("#signin-wrapper").removeClass("fade-center-to-left", "fade-left-to-center")
                $("#signup-wrapper").removeClass("fade-right-to-center", "fade-center-to-right")
            },
            error: function(err){
                document.getElementById("errorNameSignup").innerHTML = err.responseJSON.message
                document.getElementById("errorEmailSignup").innerHTML = err.responseJSON.message
            }
        });
    })

    $('#gosignup').click(function() {
        $("#signin-wrapper").addClass("fade-center-to-left")
        $("#signup-wrapper").addClass("fade-right-to-center")

        $("#signin-wrapper").removeClass("fade-left-to-center")
        $("#signup-wrapper").removeClass("fade-center-to-right")
    })

    $('#gosignin').click(function() {
        $("#signin-wrapper").addClass("fade-left-to-center")
        $("#signup-wrapper").addClass("fade-center-to-right")

        $("#signin-wrapper").removeClass("fade-center-to-left")
        $("#signup-wrapper").removeClass("fade-right-to-center")
    })

    $('#list').click(function() {
        const url = 'http://localhost:3000/users'
        const token = 'eyJhbGciOiJIUzI1NiJ9.ZmFpemFsQGdtYWlsLmNvbQ.AFMC5cxZaXeWaTEWYyFGK11tNb6DOsaxC4f3k9J49E4'
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function(data) {
                console.log(data)
            },
            error: function(err) {
                // console.log(err)
            }
        })
    })
})