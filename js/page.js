                                                                                                                                                                                                                                                                                                                                                                                

document.querySelectorAll(".navi").forEach(link => {
   link.addEventListener("click", function () {
      
   let month         = new Date().getMonth()
   let year          = new Date().getFullYear()
   let setSch        = "schedule" + month + '' + year
   let ScheduleNow   = JSON.parse(localStorage.getItem(setSch))
   
   if (!ScheduleNow) {
      document.querySelector("#SETTING").classList.add("on")
      document.querySelector("#settings").classList.remove("off")
      return alert("Input Your Schedule.")
   }
   
   document.querySelectorAll(".navi").forEach(nav => {nav.classList.remove("on")})      
      this.classList.add("on")
      document.querySelectorAll(".pages-box").forEach(box => {
         box.classList.add("off")
         if (box.dataset.pages.toUpperCase() == this.dataset.pages.toUpperCase()) return box.classList.remove("off")
      })
   })
})

document.querySelector("#ADD").onclick = function (e) {
   
   let month         = new Date().getMonth()
   let year          = new Date().getFullYear()
   let setSch        = "schedule" + month + '' + year
   let ScheduleNow   = JSON.parse(localStorage.getItem(setSch))
   if (!ScheduleNow) {
      document.querySelector("#SETTING").classList.add("on")
      document.querySelector("#settings").classList.remove("off")
      return alert("Input Your Schedule.")
   }
   
   document.querySelector("#adds").classList.toggle('active')
   this.classList.toggle("active")
}

document.querySelectorAll(".adds-btn").forEach(btn => {
   btn.onclick = function (e) {
      this.parentElement.classList.remove("active")
      document.querySelector("#ADD").classList.add("active")
   }
})

window.addEventListener("click", function (e) {
   // console.log(e.target)
   if (!e.target.matches(".add-plus")) {
      document.querySelectorAll(".adds-btn").forEach(btn => {
         btn.parentElement.classList.remove("active")
      })
      document.querySelector("#ADD").classList.add("active")
   }
})

function toCont () {
   
}

setInterval(() => {
   let now  = new Date(),
   day      = now.toLocaleDateString('en-US', { weekday: 'long' }),
   month    = now.toLocaleDateString('en-US', { month: 'long' }),
   date     = now.getDate(),
   hour     = now.getHours(),
   minute   = now.getMinutes(),
   second   = now.getSeconds()
   // milisecs = now.getMilliseconds()
   
   if (date < 10)    date     = '0' + date
   if (hour < 10)    hour     = '0' + hour
   if (minute < 10)  minute   = '0' + minute
   if (second < 10)  second   = '0' + second
   
   return document.querySelector("#timer").innerHTML = `
      <span>${day}, ${month} ${date}, ${now.getFullYear()}</span>
      <span>${hour} : ${minute} : ${second}</span>
   `
}, 1000)

function toWA (numbers) {
   let number = '' + numbers
   console.log(typeof number, number, number[0])
   let waNum   = ''
   if (number.length < 10) return alert("Less then 10 digit")
   
   if(number[0] != 0 && number[0] != 6 && number[0] != '+' && number[0] != 8) return alert ("Invalid number !")
   
   if(number[0] == 0 && number[1] == 8) {
      waNum    = number.slice(0, number.length - 1)
   } else if (number[0] == 6 && number[1] == 2) {
      waNum    = number.slice(1, number.length - 1)
   } else if (number[0] == '+' && number[1] == 6 && number[3] == 2) {
      waNum    = number.slice(2, number.length - 1)
   } else {
      waNum = numbers
   }
   wax   = '62' + waNum
   // return console.log(wax, waNum)
   return window.location.href = "https://wa.me/" + wax
}

