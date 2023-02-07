
window.onbeforeunload = function () {

    document.getElementById("name-2").value = "";
    document.getElementById("email-2").value = "";
    document.getElementById("field-2").value = "";
    document.getElementById("checkbox-2").value = "";

};

// function onPageLoad() {
//     document.getElementById("card-sucess").style.display = "block";
// }


function onSubmitNew(event) {
    event.preventDefault()
    var name = document.getElementById("name-2").value;
    var email = document.getElementById("email-2").value;
    var number = document.getElementById("field-2").value;

    var score = false;

    score = document.getElementById("checkbox-2").checked;

    if (!score) {
        var errorElement = document.getElementById("w-form-agree-new");
        errorElement.textContent = "Please agree to the Terms of Service";
        errorElement.style.display = "block";
        document.getElementById("checkbox-2").focus();
        return
    }

    if (email == "") {
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = "email is required*";
        errorElement.style.display = "block";
        return
    } else {

        var fname = document.getElementById("name-2").value;
        var { fistName, middleName, lastName, fullName } = getNames(fname);
        var email = document.getElementById("email-2").value;
        var phone = document.getElementById("field-2").value;

        var user = {
            "first_name": fistName,
            "middle_name": middleName,
            "last_name": lastName,
            "combined_name_field": fullName,
            "user_email": email,
            "user_phone": phone
        }



        var url = 'https://4fw89cxt3j.execute-api.us-east-1.amazonaws.com/createLeads'


        if (url) {
            fetch(url, {
                // Adding method type
                method: 'POST',
                // Adding body or contents to send
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Origin': '*'
                },
            })

                .then(res => {
                    if (res.status === 201) {
                        return res.json();
                    }

                })
                .then(data => {
                    localStorage.setItem("userDataNew", JSON.stringify(data));
                    //console.log("This saved in>>", data)
                    setTimeout(() => {
                        const box = document.getElementById('w-form-done-new');

                        // 👇️ removes element from DOM
                        box.style.display = 'block';
                        var errorElement = document.getElementById("w-form-agree-new");

                        errorElement.style.display = "none";
                        // const dissapermesg = document.getElementById("form-submit-getstatred");
                        // dissapermesg.style.display = 'none';
                        const myTimeout = setTimeout(msgDisplayNew, 4000);
                    }, 5000); // 👈️ time in milliseconds
                    //window.location.href = "index.html";
                })
        }
    }

}

function msgDisplayNew() {
    const disbox = document.getElementById('w-form-done-new');
    disbox.style.display = 'none';

    document.getElementById("name-2").value = "";
    document.getElementById("email-2").value = "";
    document.getElementById("field-2").value = "";
    document.getElementById("checkbox-2").value = "";
}




function getNames(fullName) {
    var fistName = "";
    var middleName = "";
    var lastName = "";
    var names = fullName.split(' ');
    console.log(names);
    if (names.length === 1) {
        fistName = names[0];
        middleName = "";
        lastName = "";
    }
    if (names.length === 2) {
        fistName = names[0];
        middleName = "";
        lastName = names[1];
    }
    if (names.length > 2) {
        fistName = names[0];
        middleName = names[1];
        lastName = names[names.length - 1];
    }
    return { fistName, middleName, lastName, fullName };
}

