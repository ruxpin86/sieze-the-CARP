//DONE Get current date to display underneath the header: link moment.js to display the dayOfWeek format for the date,
//DONE Insert a table with bootstrap to be able to take in tasks at each hour of time from 9AM-5PM
//DONE set time and save columns (outter columns) to a color style different than the middle where tasks will be inputed
//DONE Create your rows and columns with dedicated sections
//DONE Make those timeblocks able to store a task of user inputed text
//DONE Insert a save button on the end of the text block so that the user can save it to LOCAL STORAGE
//use moment.js to determine the color of the timeblocks as being past, present, or future
//DONE Make sure that when the page is refreshed that the saved events are persistent


// Globally declared variables I thought I might need to start
var timeBlock = $("#time-block")
var taskField = $("#task-field")
var saveButton = $("#save-button")
var taskText = $("#task-text")
var currentDay = $("#currentDay")
var displayMoment = moment()
var currentTime = moment().hours()//used to change colors on the text fields
console.log(currentTime)
// display current date dynamically using moment.js
function displayTime() {
    var showDate = displayMoment.format('dddd MMMM Do YYYY [at] hh:mm:ss a');
    currentDay.text(showDate);
}
//created times as 24hr time to simplify the process of working through the day... I'll figure out later on how to use AM & PM bleh
var times = [
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
]

//Template string allow for the ability to not have to spend extra time drolling in each row element
var row = (id) => `<tr>
<th id="time-block" class="bg-secondary" style="width: 8%; color: rgb(255, 255, 255); text-align: center;"
scope="row">${id}
</th>
<td id="task-field-${id}" style="width: 70%">
<textarea id="task-text-${id}" placeholder="Type tasks here"></textarea>
</td>
<td id="save-background" style="background:rgb(68, 108, 194)">
<button id="save-button-${id}"
style="width: 10%; text-align: center; background-color: rgb(68, 108, 194); border: solid 0px transparent;"><i
class="bi bi-save"></i>
</button>
</td>
</tr>`

// add console.log to save function
var save = (id, val) => { //this arrow is pretty dope instead of using the ol' function...youTube ftw
    console.log(`${id} : ${val}`)
    localStorage.setItem(`item-${id}`, val)
}


// pulled out read function to add console.log
//
var read = (id) => {
    let data = localStorage.getItem(`item-${id}`)
    console.log(`${id} : ${data || 'no-data'}`)
    return data || 'Enter task here...'
}

//get task rows to be consistent and change color based upon time as well as store user input
times.forEach((x) => {
    $(".table > tbody").append(row(x))
    $(`#task-text-${x}`).val(read(x))
    $(`#save-button-${x}`).click(() => save(x, $(`#task-text-${x}`).val()))
    if (currentTime == x) { //since the data types are different
        $(`#task-field-${x}`).css('background', 'blue')//future
    } else if (currentTime > x) {
        $(`#task-field-${x}`).css('background', 'gray')//past
    } else if (currentTime < x) {
        $(`#task-field-${x}`).css('background', 'lightblue')//present
    }
})

setInterval(displayTime, 1000);

