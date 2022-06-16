var events
var mom = moment().hours()
var tempArray = []
var savedData



 // creates an empty array to hold data before moving to localStorage
 var storageArray = function() {
    for(i = 9 ; i < 18 ; i++) {
        let dataObj = {
            tracker: i,
            text: ""
        }
    tempArray.push(dataObj)
    }  
}
storageArray()


// loop to form each row of the calendar
for (i = 9; i < 18; i++) {

var loadData = function() {
    savedData = JSON.parse(localStorage.getItem("event"));
        }
    loadData()
    
   
    

// converts i into an array index
timeIndex = i - 9

// converts 24 hour time to AM/PM for use as text in the calendar
if(i > 12) {
    ampm = i - 12 + "PM"      
} else if(i < 12) {
    ampm = i + "AM"
} else {
    ampm = i + "PM"
}

//sets background color based on time of day
var dayTimer = function(id,El) {
    if (id < mom) {                       
        El.addClass("past")
     } else if (id > mom) {
        El.addClass("future")
     } else {
        El.addClass("present")
     }
}

// create elements to form each row
var calendarRowEl = $("<section>").addClass("row")
var hourCol = $("<div>").addClass("col-1 hour d-flex align-items-center justify-content-center").text(ampm)
var eventCol = $("<div>").addClass("col-10 textarea d-flex align-items-center").attr("tracker",i)
var eventText = $("<p>").attr("tracker",i).text(savedData[timeIndex].text)
var saveCol = $("<div>").addClass("col-1 saveBtn d-flex align-items-center justify-content-center").html("<img src='./assets/images/save-icon-18-256.png' alt='save icon' height='20px' width='20px'>").attr("tracker", i)

// sets the background color of text area 
dayTimer(i,eventCol)

// add p to event div
$(eventCol).append(eventText)

// append columns to row div
$(calendarRowEl).append(hourCol, eventCol, saveCol)

// append row to container 
$(".container").append(calendarRowEl)
}



//add event listener on container delegated to the text area
$(".container").on("click", "div.textarea", function(event){
    var formId = $(this).attr("tracker")
    var text = $(this).text()
           
    var textInput = $("<textarea>").addClass("col-10").val(text).attr("tracker", formId)
    $(this).replaceWith(textInput);
    

    // auto focus new element
    textInput.trigger("focus");

});

// editable field was un-focused
$(".container").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
    var formId = $(this).attr("tracker")  
   
    


// recreate p element
var eventP = $("<p>")
.text(text)
.attr("tracker",formId);

// recreate div
var eventDiv = $("<div>").addClass("col-10 textarea d-flex align-items-center").attr("tracker", formId)

// assign background color based on time of day
dayTimer(formId,eventDiv)

// append p to div
$(eventDiv).append(eventP)

// replace div
$(this).replaceWith(eventDiv);
});

// save button 
 $(".container").on("click", "div.saveBtn", function(event){    
    var saveId = $(this).attr("tracker")
    var pEl = "p[tracker=" + saveId + "]"
    saveText = $(pEl).text()
   

// loop through tempArray and replace text value of row where button is clicked
    for (i = 0; i < tempArray.length; i++) {       
       var elementId = JSON.stringify(tempArray[i].tracker)
       if(saveId === elementId) {
        tempArray[i].text = saveText     
        }

 // set new tempArray to localStorage
    localStorage.setItem("event", JSON.stringify(tempArray));
    }
})
    
    
   
    


  
                     
    
    

       


    



