                                                                                                                                                                                                                                                                                                                                                                                                                                    
const nowx   = new Date(),
   monthx    = nowx.getMonth(),
   yearx     = nowx.getFullYear(),
   schedulex = "Schedule" + monthx + yearx,
   lDatex    = new Date(nowx.getFullYear(), nowx.getMonth() + 1, 0),
   lastDatex = lDatex.getDate()

let HTMX    = ``
document.querySelector(".sch-month").innerHTML = monthx + 1 + " - " + yearx
for (i = 1; i <= lastDatex; i++) {
   let x = i;
   if (x < 10) x = "0" + x
   HTMX += `
      <div class="sch-groups mb-2">
         <div class="sch-date">${x}</div>
         <select id="sl${i}" class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option data-color="darkcyan" selected value=''>Select schedule</option>
            <option data-color="red" value="OFF">OFF</option>
            <option data-color="red" value="RO">RO</option>
            <option data-color="red" value="AL">Cuti</option>
            <option data-color="gold" value="M0029">Pagi M0029 - (7.20 - 18.00)</option>
            <option data-color="goldenrod" value="M0058">Pagi M0058 - (8.20 - 19.00)</option>
            <option data-color="orangered" value="H44">Pagi H44 - (8.20 - 20.00)</option>
            <option data-color="blue" value="A0003">Siang A0003 - (11.20 - 22.00)</option>
         </select>
      </div>
   `;
   // console.log("sl" + i)
}

document.querySelector("#schedule-set").innerHTML = HTMX

document.querySelectorAll("#schedule-set select").forEach(sl => {
   sl.onchange = function () {
      let option  = sl.options[sl.selectedIndex],
         color    = option.dataset.color
      sl.parentElement.firstElementChild.style.background = color
   }
})

if (localStorage.getItem("schedule")) {
   readSch()
}

function updateSchedule () {
   let param = true
   document.querySelectorAll("#schedule-set select").forEach(sl => {
      if (sl.value == '') return param = false
   })
   if (param == false) return confirm("Choose every option !")
   if (!confirm("Update Schedule ?")) return
   
   let month   = new Date().getMonth()
   let year    = new Date().getFullYear()
   let setSch  = "schedule" + month + '' + year
   
   let SchArray = []
   for (i = 1; i <= lastDatex; i++) {
      const id    = "#sl" + i
      const value  = document.querySelector(`${id}`).value
      // console.log(value)
      SchArray.push(value)
   } 
   localStorage.setItem(setSch, JSON.stringify(SchArray))
   return window.location.reload()
}

function readSch () {
   
   let month         = new Date().getMonth()
   let year          = new Date().getFullYear()
   let setSch        = "schedule" + month + '' + year
   let ScheduleNow   = JSON.parse(localStorage.getItem(setSch))
   
   if (ScheduleNow.length < 1) return
   
   // console.log(ScheduleNow)
   let HTML = 
   ScheduleNow.forEach((data, i) => {
      i++
      let x = "#sl"+ i
      const sl = document.querySelector(x)
      sl.querySelectorAll("option").forEach(opt => {
         opt.selected = false
         if (opt.value == data) {
            opt.selected = true
            let color = opt.dataset.color
            sl.parentElement.firstElementChild.style.background = color
         }
      })
   })
}
