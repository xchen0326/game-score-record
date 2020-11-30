// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");


var arrHead = new Array();
arrHead = ['', 'Student Name', 'Gender', 'Score', 'Score Add/Deduct']; // table headers.

// first create a TABLE structure by adding few headers.
function createTable() {
    var scoreTable = document.createElement('table');
    scoreTable.setAttribute('id', 'scoreTable');  // table id.

    var tr = scoreTable.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // the header object.
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }
    var div = document.getElementById('record-section');
    div.appendChild(scoreTable);
}


// function to delete a row.
function removeRow(oButton) {
    var scoreTable = document.getElementById('scoreTable');
    scoreTable.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
    fetch("/delete", {
        method: "POST",
        body: JSON.stringify({
            uid : oButton.id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log("sent");
        });
}

// function to add new row.
function addRow(filledName, filledGender, filledScore, uid) {
    var scoreTable = document.getElementById('scoreTable');

    var rowCnt = scoreTable.rows.length;    // get the number of rows.
    var tr = scoreTable.insertRow(rowCnt); // table row.
    tr = scoreTable.insertRow(rowCnt);

    for (var c = 0; c < arrHead.length; c++) {
        var td = document.createElement('td');// TABLE DEFINITION.
        td.setAttribute('width', '200px')
        td = tr.insertCell(c);

        if (c == 0) {   // if its the first column of the table.
            // add a button control.
            var button = document.createElement('input');

            // set the attributes.
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Remove');
            button.setAttribute('id', uid)

            // add button's "onclick" event.
            button.setAttribute('onclick', 'removeRow(this)');



            td.appendChild(button);
        }
        else if (c < 4) {
            // the 2nd, 3rd and 4th column, will have textbox.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', '');

            if (c == 1) {
                ele.value = filledName
            }
            else if (c == 2) {
                ele.value = filledGender
            }
            else if (c == 3) {
                ele.value = filledScore
            }
            td.appendChild(ele);
        }
        else {
            var button1 = document.createElement('input');

            // set the attributes.
            button1.setAttribute('type', 'button');
            button1.setAttribute('value', 'Add');
            button1.setAttribute('class', 'score_mg');
            button1.setAttribute('onclick', '');
            td.appendChild(button1);


            var button2 = document.createElement('input');

            // set the attributes.
            button2.setAttribute('type', 'button');
            button2.setAttribute('value', 'Deduct');
            button2.setAttribute('class', 'score_mg');
            button2.setAttribute('onclick', '');
            td.appendChild(button2);
        }
    }
}

window.onload = function (){
    createTable()
    fetch("/populate", {
        method: "Get",
    })
        .then(response => response.json())
        .then(response => {
            for (obj in response) {
                let rowObj = response[obj]
                addRow(rowObj.student_name, rowObj.student_gender, rowObj.student_iniScore, rowObj._id)
                // console.log(response[obj].student_name)
            }
        })
}

function studentRegister(oButton) {
    let formEle = oButton.parentNode.parentNode.querySelectorAll('.stuRegister')
    let uid=''
    fetch("/register", {
        method: "POST",
        body: JSON.stringify({
            student_name : formEle[0].value,
            student_gender : formEle[1].value,
            student_iniScore : formEle[2].value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log("sent");
            uid = response
            console.log(response)
        });

    addRow(formEle[0].value, formEle[1].value, formEle[2].value, uid)


}

