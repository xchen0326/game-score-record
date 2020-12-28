// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");


var arrHead = new Array();
arrHead = ['', '学生姓名', '学生其他备注', '群活动分', '阅读(B级)打卡本数', '阅读(C级)打卡本数', '拼读打卡单元数', '更新数据', '等级']; // table headers.

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
function addRow(filledName, filledGender, filledScore, filledBnum, filledCnum, filledUnit, uid) {
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
        else if (c == 3) {
            var selectEle1 = document.createElement('select');
            selectEle1.setAttribute('style', 'width:170px')
            selectEle1.setAttribute('id', 'stu_activity_score')
            td.appendChild(selectEle1);
            for (var i = 0; i < 71; i++) {
                var op = new Option();
                op.value = i;
                op.text = i+"";
                selectEle1.options.add(op);
                if (i === parseInt(filledScore)){
                    selectEle1.options[i].selected = true
                }
            }

        }
        else if (c < 4) {
            // the 2nd, 3rd and 4th column, will have textbox.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', '');

            if (c == 1) {
                ele.value = filledName
                ele.setAttribute('id', 'stu_name')
            }
            else if (c == 2) {
                ele.value = filledGender
                ele.setAttribute('id', 'stu_gender')
            }
            td.appendChild(ele);
        }
        else if (c == 4){
            var selectEle2 = document.createElement('select');
            selectEle2.setAttribute('style', 'width:170px')
            selectEle2.setAttribute('id', 'stu_bookb_num')
            td.appendChild(selectEle2);
            for (var i = 0; i < 50; i++) {
                var op = new Option();
                op.value = i;
                op.text = i+"";
                selectEle2.options.add(op);
                if (i === parseInt(filledBnum)){
                    selectEle2.options[i].selected = true
                }
            }
        }
        else if (c == 5){
            var selectEle3 = document.createElement('select');
            selectEle3.setAttribute('style', 'width:170px')
            selectEle3.setAttribute('id', 'stu_bookc_num')
            td.appendChild(selectEle3);
            for (var i = 0; i < 50; i++) {
                var op = new Option();
                op.value = i;
                op.text = i+"";
                selectEle3.options.add(op);
                if (i === parseInt(filledCnum)){
                    selectEle3.options[i].selected = true
                }
            }
        }
        else if (c == 6){
            var selectEle4 = document.createElement('select');
            selectEle4.setAttribute('style', 'width:170px')
            selectEle4.setAttribute('id', 'stu_unit_num')
            td.appendChild(selectEle4);
            for (var i = 0; i < 50; i++) {
                var op = new Option();
                op.value = i;
                op.text = i+"";
                selectEle4.options.add(op);
                if (i === parseInt(filledUnit)){
                    selectEle4.options[i].selected = true
                }
            }
        }
        else if (c > 6 && c < arrHead.length-1) {
            var button3 = document.createElement('input');
            button3.setAttribute('type', 'button');
            button3.setAttribute('value', 'Update');
            button3.setAttribute('style', 'width:100%');

            button3.onclick = function(){
                stu_name = button3.parentNode.parentNode.querySelector('#stu_name')
                stu_gender = button3.parentNode.parentNode.querySelector('#stu_gender')
                stu_activity_score = button3.parentNode.parentNode.querySelector('#stu_activity_score')
                stu_bookb_num = button3.parentNode.parentNode.querySelector('#stu_bookb_num')
                stu_bookc_num = button3.parentNode.parentNode.querySelector('#stu_bookc_num')
                stu_unit_num = button3.parentNode.parentNode.querySelector('#stu_unit_num')

                let label = button3.parentNode.parentNode.querySelector('#stu_label')

                fetch("/update", {
                    method: "POST",
                    body: JSON.stringify({
                        student_id : uid,
                        student_name : stu_name.value,
                        student_gender : stu_gender.value,
                        student_activity_score : stu_activity_score.value,
                        student_bookb_num : stu_bookb_num.value,
                        student_bookc_num : stu_bookc_num.value,
                        student_unit_num : stu_unit_num.value
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log("sent");
                    })
            }
            td.appendChild(button3);
        }
        else if (c == arrHead.length-1) {
            var level = document.createElement('label');
            level.setAttribute('id', 'stu_label')
            td.appendChild(level);
            let activity_score = level.parentNode.parentNode.querySelector('#stu_activity_score').value
            let unit_num = level.parentNode.parentNode.querySelector('#stu_unit_num').value
            let bookb_num = level.parentNode.parentNode.querySelector('#stu_bookb_num').value
            let bookc_num = level.parentNode.parentNode.querySelector('#stu_bookc_num').value
            if (unit_num >= 20 && bookb_num >= 20 && (bookc_num+bookb_num) >= 50 && activity_score >= 40) {
                level.innerText = '预备级'
            }
            else if (unit_num >= 3 && (bookb_num+bookc_num) >= 20 && activity_score >= 10) {
                level.innerText = '入门级'
            }
            else {
                level.innerText = '观望级'
            }
        }

    }
}

// window.onload = function (){
//     createTable()
//     fetch("/populate", {
//         method: "Get",
//     })
//         .then(response => response.json())
//         .then(response => {
//             for (obj in response) {
//                 let rowObj = response[obj]
//                 addRow(rowObj.student_name, rowObj.student_gender, rowObj.student_iniScore, rowObj._id)
//                 // console.log(response[obj].student_name)
//             }
//         })
// }

function studentRegister(oButton) {
    let formEle = oButton.parentNode.parentNode.querySelectorAll('.stuRegister')
    let uid=''
    fetch("/register", {
        method: "POST",
        body: JSON.stringify({
            student_name : formEle[0].value,
            student_gender : formEle[1].value,
            student_activity_score : formEle[2].value,
            student_bookb_num : formEle[3].value,
            student_bookc_num : formEle[4].value,
            student_unit_num : formEle[5].value,
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
        })
        .then(response => {
            addRow(formEle[0].value, formEle[1].value, formEle[2].value, formEle[3].value, formEle[4].value, formEle[5].value, uid)
        })
}


