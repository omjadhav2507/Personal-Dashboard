
const LiveClock = document.getElementById('clock');
const currentTime = document.getElementById('currentTime');
const Greet = document.getElementById('greet');
const Datet = document.getElementById('date');
const Promobtn = document.getElementById('promodo');
const Breakbtn = document.getElementById('break');
const newpromotimer = document.createTextNode("25:00");
const newbreaktimer = document.createTextNode("15:00");

// Day-Date
let clockInterval ;
let intervalId;

function showTime() {
    var date = new Date();
    var  hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
  
    currentTime.innerHTML = hours + ":" + minutes + ":" + seconds; 
} 


function startLiveClock(){
    showTime();
    clockInterval = setInterval(showTime ,1000);
} 

LiveClock.addEventListener("click",startLiveClock);

function stopLiveClock() {
    clearInterval(clockInterval);
}

function getDay() {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours < 10) {
        Greet.innerHTML = "Good Morning";
    } else if (hours < 20) {
        Greet.innerHTML = "Good Day";
    } else {
        Greet.innerHTML = "Good Evening";
    }
}

getDay();

function getCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    Datet.innerHTML = formattedDate;
}
getCurrentDate()


// Promodoro

let minutes = 25;
let seconds = 0;


    function updateTimerDisplay() {
      const timerElement = newpromotimer;
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const btimer = newbreaktimer;
      btimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startPomodoro() {

        
   
        stopLiveClock();

      console.log("Pomodoro started: 25 minutes of focused work.");
      updateTimerDisplay(minutes ,seconds);

      intervalId = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          console.log("Break time: 5 minutes.");
          setTimeout(function () {
            console.log("Break is over. Starting the next Pomodoro.");
            minutes = 25;
            seconds = 0;
            startPomodoro();
          }, 5 * 60 * 1000); 
        } else {
          if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
          updateTimerDisplay(minutes , seconds);
        }
      }, 1000);
    }

    Promobtn.addEventListener("click",function(){
   
        currentTime.innerHTML = "";
        currentTime.appendChild(newpromotimer);
        
        startPomodoro();
     })

   

    //  To-do function 
   
    const inputbox = document.getElementById('input');
    const listcont = document.getElementById('listcont');
    const addbtn = document.getElementById('to-do-btn');
    const pic = document.getElementById('pic');

    addbtn.addEventListener("click", function(){
        const todoText = inputbox.value;

        if (todoText === '') {
            alert("You must write something")
        }else{
            let li = document.createElement("li");
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
            li.appendChild(checkbox);

            const textspan = document.createElement('span');
            textspan.textContent = todoText
            li.appendChild(textspan);
            
            listcont.appendChild(li);
           

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "dbtn";
            deleteBtn.innerHTML = "x";
            li.appendChild(deleteBtn)

            deleteBtn.addEventListener('click',function(){
              listcont.removeChild(li)
            })
            
            pic.style.display = 'none';
            inputbox.value = ""; 
        }
    });

    // task modal and Task section
    

    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openTask');
    const closeBtn = modal.querySelector('.close');
    

    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      taskpic.style.display = 'none';
      
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      bookmarkcard.innerHTML ="";
      
      
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        
      }
    });

     
    const TaskTitle = document.getElementById('title');
    const Taskcontent = document.getElementById('content');
    const AddTaskBtn = document.querySelector('#addTask');
    const Taskdisplay = document.getElementById('Taskdisplay')
    const taskpic = document.getElementById('taskpic');
    
    
    
    AddTaskBtn.addEventListener('click' , function(e){
      e.preventDefault();
      const Title = TaskTitle.value;
      const content = Taskcontent.value;
      if(Title === '' || content === ''){
        alert('you must write somthing')
      }{
        const newTask = document.createElement('div');
        newTask.classList.add('Taskcard');
        newTask.innerHTML =  `
        
        <span class="task-close">&times;</span>
     <h4>${Title}</h4>
     <p>${content}</p>
    
        `;
        Taskdisplay.appendChild(newTask);


        newTask.querySelector('.task-close').addEventListener('click', () => {
          newTask.remove();
        });
        
        TaskTitle.value ='';
        Taskcontent.value = '';
        modal.style.display = 'none';
        
      }
    });



const inputlink = document.getElementById('link');
const linkdisplay = document.getElementById('linkdisplay');
const linkpic = document.getElementById('linkpic');
const API_KEY = "a635965690cf24d2acfa1fa722525eb1";

function createBookmarkCard(data) {
  const bookmarkcard = document.createElement('div');
  bookmarkcard.classList.add('linkcard');
  bookmarkcard.innerHTML = `
    <img src="${data.image}"/>
    <div class="content">
    <span class="link-close">&times;</span>
      <a href="${data.url}"><h3>${data.title}</h3></a>
      <p>${data.description}</p>
    </div>
  `;

  linkdisplay.appendChild(bookmarkcard);

  bookmarkcard.querySelector('.link-close').addEventListener('click', () => {
    bookmarkcard.remove();
  });
}

async function fetchLink() {
  const linkValue = inputlink.value;

  if (linkValue) {
    try {
      const response = await fetch(`https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(linkValue)}`);
      const data = await response.json();

      createBookmarkCard(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching link:", error);
    }
    linkpic.style.display = 'none';
    inputlink.value = "";
  }
}










