var income, loanamount, loanpurpose = 0;
var address, city, zip, state, socialseq = ""
var socialseq, e, x = "";
var dob = 0;

window.onbeforeunload = function () {
    localStorage.clear();
};


function onPageLoad() {

    var data = ""
    // Extract the id value in JavaScript
    var searchParams = new URLSearchParams(window.location.search);
    var token = searchParams.get("id");
    //console.log('passedVariable:',token);
    if (token !== null) {
        var url2 = 'https://4fw89cxt3j.execute-api.us-east-1.amazonaws.com/getLeadsById/'


        fetch(url2 + token)
            .then((response) => {
                console.log(response.status)
                if (response.status === 404) {
                    console.log('something went wrong!')
                } else if (response.status === 200) {
                    response.json().then((data) => {
                        console.log('jk:', data[0])
                        document.getElementById("rev-code").value = data[0].contactid;
                        document.getElementById("fname").value = data[0].first_name;
                        localStorage.setItem("middle_name", data[0].middle_name);
                        //document.getElementById("mname").value = data[0].middle_name;
                        document.getElementById("lname").value = data[0].last_name;
                        document.getElementById("email").value = data[0].user_email;
                        document.getElementById("phone").value = data[0].user_phone;
                        // Step Two
                        document.getElementById("income").value = data[0].user_income;
                        document.getElementById("form-field-loan").value = data[0].user_loan_amount;
                        document.getElementById("form-field-loan_purpose").value = data[0].user_loan_purpose;

                        //Step Three
                        document.getElementById("address").value = data[0].user_address_one;
                        document.getElementById("city").value = data[0].stdaddr_citynme;
                        document.getElementById("zip").value = data[0].stdaddr_zipcde;
                        document.getElementById("state").value = data[0].stdaddr_statecde;

                        //Step Four
                        document.getElementById("s-number").value = data[0].user_s_number;

                        let timestamp = data[0].user_dob;
                        let currentDate = new Date(timestamp);

                        let month = currentDate.getMonth() + 1; // getMonth() returns a 0-based index, so we add 1
                        let day = currentDate.getDate();
                        let year = currentDate.getFullYear();
                        let newmonth = month < 10 ? '0' + month : month;
                        let newday = day < 10 ? '0' + day : day;

                        let formattedDate = `${year}-${newmonth}-${newday}`;
                        console.log(formattedDate); // Output: "1-10-2023"


                        console.log("check date", formattedDate)
                        document.getElementById("dob").value = formattedDate;

                    });
                }
            })
    }


    if (localStorage.getItem("data") !== null) {
        data = JSON.parse(localStorage.getItem("data"));
        //console.log("data",  data)
    }
    if (localStorage.getItem("data") !== null) {

        data = JSON.parse(localStorage.getItem("data"));
        //console.log("data",  data)
        //step One
        document.getElementById("rev-code").value = data[0].contactid;
        document.getElementById("fname").value = data[0].first_name;
        localStorage.setItem("middle_name", data[0].middle_name);
        //document.getElementById("mname").value = data[0].middle_name;
        document.getElementById("lname").value = data[0].last_name;
        document.getElementById("email").value = data[0].user_email;
        document.getElementById("phone").value = data[0].user_phone;

        // Step Two
        document.getElementById("income").value = data[0].user_income;
        document.getElementById("form-field-loan").value = data[0].user_loan_amount;
        document.getElementById("form-field-loan_purpose").value = data[0].user_loan_purpose;

        //Step Three
        document.getElementById("address").value = data[0].user_address_one;
        document.getElementById("city").value = data[0].stdaddr_citynme;
        document.getElementById("zip").value = data[0].stdaddr_zipcde;
        document.getElementById("state").value = data[0].stdaddr_statecde;

        //Step Four
        document.getElementById("s-number").value = data[0].user_s_number;
        let timestamp = data[0].user_dob;
        let currentDate = new Date(timestamp);

        let month = currentDate.getMonth() + 1; // getMonth() returns a 0-based index, so we add 1
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
        let newmonth = month < 10 ? '0' + month : month;
        let newday = day < 10 ? '0' + day : day;

        let formattedDate = `${year}-${newmonth}-${newday}`;
        console.log(formattedDate); // Output: "1-10-2023"


        console.log("check date", formattedDate)
        document.getElementById("dob").value = formattedDate;
    }
    else if (localStorage.getItem("userDataNew") !== null) {
        //alert('userDataNew')

        const userDataNew = JSON.parse(localStorage.getItem("userDataNew"));
        console.log('userDataNew', userDataNew.data)

        if (userDataNew !== "") {
            // localStorage.removeItem("data")
            // localStorage.removeItem("user")
            document.getElementById("rev-code").value = userDataNew.contact_id;
            document.getElementById("fname").value = userDataNew.data.first_name;
            localStorage.setItem("middle_name", userDataNew.data.middle_name);
            //document.getElementById("mname").value = userDataNew.data.middle_name;
            document.getElementById("lname").value = userDataNew.data.last_name;
            document.getElementById("email").value = userDataNew.data.user_email;
            document.getElementById("phone").value = userDataNew.data.user_phone;
        }
    }
}

var url = "https://4fw89cxt3j.execute-api.us-east-1.amazonaws.com/users/"

function getReservationCode() {
    var revCode = document.getElementById("rev-code").value;
    if (revCode !== "") {
        fetch(url + revCode,
            {
                headers: {

                    'Accept': '*/*',
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Origin': '*'

                },
            }

        )
            .then((response) => {
                console.log("We are getting", response.status)
                if (response.status === 404) {
                    var errorElement = document.getElementById("card-errors3");
                    errorElement.textContent = "Invalid Code";
                    errorElement.style.display = "block";
                    document.getElementById("rev-code").focus()
                } else if (response.status === 200) {
                    response.json().then((data) => {
                        document.getElementById("rev-code").value = data[0].contactid;
                        document.getElementById("fname").value = data[0].first_name;
                        localStorage.setItem("middle_name", data[0].middle_name);
                        //document.getElementById("mname").value = data[0].middle_name;
                        document.getElementById("lname").value = data[0].last_name;
                        document.getElementById("email").value = data[0].user_email;
                        document.getElementById("phone").value = data[0].user_phone;
                    });
                }
            })
    }
}

function onFinished() {

    var socialNumber = document.getElementById("s-number").value;
    if (!socialNumber) {
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = "Please Provide Social Security Number";
        errorElement.style.display = "block";
        document.getElementById("s-number").focus();
        return;
    } else {
        var errorElement = document.getElementById("card-errors");
        errorElement.style.display = "none";
    }

    var score = document.getElementById("score").checked;
    if (!score) {
        var errorElement = document.getElementById("card-errors4");
        errorElement.textContent = "Please select consent.";
        errorElement.style.display = "block";
        document.getElementById("score").focus();
        return
    }


    // alert("finished")
    var contactId = document.getElementById("rev-code").value;

    //Step One
    var fname = document.getElementById("fname").value;
    // var fname = localStorage.getItem("fistName");
    var lname = document.getElementById("lname").value;
    var middleName = localStorage.getItem("middle_name") || "";
    console.log('middleName:', middleName)
    var fullName = fname + " " + middleName + " " + lname;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    //Step Two
    var income = document.getElementById("income").value;
    var e = document.getElementById("form-field-loan");
    var loanamount = e.value;
    var x = document.getElementById("form-field-loan_purpose");
    var loanpurpose = x.value;

    //Step Three
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var state = document.getElementById("state").value;


    //Step four
    var socialseq = document.getElementById("s-number").value;
    var dob = document.getElementById("dob").value || new Date();


    var id = generateRandomString(5);
    var postid = "";
    var fmmethod = "";
    var uurl = "https://#";
    var temprecord = "Null";
    var url = ""
    localStorage.removeItem("data")
    localStorage.removeItem("userDataNew")

    console.log("test id", contactId)
    if (contactId !== "") {
        postid = contactId;
        fmmethod = "PUT";
        url = "https://4fw89cxt3j.execute-api.us-east-1.amazonaws.com/users/" + contactId;




    } else {
        postid = id;
        fmmethod = "POST";
        url = "https://4fw89cxt3j.execute-api.us-east-1.amazonaws.com/users/";


        if (confirm("Data Saved!")) {
            window.location.href = "index.html";
        }
    }

    var user = {
        "contactid": postid,
        "first_name": fname,
        "middle_name": middleName,
        "last_name": lname,
        "combined_name_field": fullName,
        "sec_primary_address": address,
        "primary_address": address + city + zip + state,
        "company": temprecord,
        "urbanization": temprecord,
        "city_state_zip": zip,
        "ase": temprecord,
        "oel": temprecord,
        "presorttrayid": temprecord,
        "presortdate": temprecord,
        "imbno": temprecord,
        "encodedimbno": address,
        "stdaddr_citynme": city,
        "stdaddr_statecde": state,
        "stdaddr_zipcde": zip,
        "qr_code": id,
        "qr_code_url": uurl,
        "user_email": email,
        "user_phone": phone,
        "user_income": income,
        "user_loan_amount": loanamount,
        "user_loan_purpose": loanpurpose,
        "user_address_one": address,
        "user_s_number": socialseq,
        "user_dob": dob,
    }

    if (url) {
        fetch(url, {

            // Adding method type
            method: fmmethod,
            //mode: 'no-cors',

            // Adding body or contents to send
            body: JSON.stringify(user),

            //credentials: 'include',
            //'Access-Control-Allow-Credentials': true,
            // Adding headers to the request
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Headers': "*",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': fmmethod
            },

        })

            // Converting to JSON
            //.then(response => response.json())

            // Displaying results to console
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    window.location.href = "index.html";
                }
                console.log(res);
            }

            )

    }

}

function generateRandomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
