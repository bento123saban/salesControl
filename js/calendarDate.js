                                                                                                                                                                     

const AS    = JSON.parse(localStorage.getItem("AS"))
const FU    = JSON.parse(localStorage.getItem("FU"))
console.log(AS, FU)

window.addEventListener("load", function () {
   let ControlDate   = new Date()
   setCalendar(new Date())
   document.querySelector("#begin-calendar").innerHTML  = getWeekDays(0, ControlDate.getMonth())[2] + ' ' + ControlDate.getFullYear()
   document.querySelector("#begin-calendar").onclick = function () {
      ControlDate    = new Date()
      document.querySelector("#begin-calendar").innerHTML  = getWeekDays(0, ControlDate.getMonth())[2] + ' ' + ControlDate.getFullYear()
      return setCalendar(ControlDate)
   }
   document.querySelector("#next-calendar").onclick = () => {
      ControlDate    = new Date(ControlDate.setMonth(ControlDate.getMonth() + 1))
      document.querySelector("#begin-calendar").innerHTML  = getWeekDays(0, ControlDate.getMonth())[2] + ' ' + ControlDate.getFullYear()
      return setCalendar(ControlDate)
   }
   document.querySelector("#previous-calendar").onclick = () => {
      ControlDate    = new Date(ControlDate.setMonth(ControlDate.getMonth() - 1))
      document.querySelector("#begin-calendar").innerHTML  = getWeekDays(0, ControlDate.getMonth())[2] + ' ' + ControlDate.getFullYear()
      return setCalendar(ControlDate)
   }
   
   document.querySelector("#date-data-list-bg").onclick = function () {
      this.style.display = "none"
      document.querySelectorAll(".date-data-list").forEach( list => {
         return list.style.display = "none"
      })
   }
})

function getWeekDays(day = 0, m = 0) {
      var baseDate = new Date(Date.UTC(2017, 0, 1)); // just a Monday
      var weekDays = [];
      var months = [];
      var month = m
      for(i = 0; i < 7; i++) {
         weekDays.push(baseDate.toLocaleDateString('en-US', { weekday: 'long' }));
         baseDate.setDate(baseDate.getDate() + 1);
      }
      for(i = 0; i < 12; i++) {
         months.push(baseDate.toLocaleDateString('en-US', { month: 'long' }));
         baseDate.setMonth(baseDate.getMonth() + 1);
      }
      Days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
      return [weekDays[day], Days[day], months[month]]
}

 
 function setCalendar(date) {
   const calendar    = document.querySelector("#calendar-date")
   
   theDate     = new Date(date)
   firstDate   = new Date(theDate.getFullYear(), theDate.getMonth(), 1)
   lastDate    = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 0)
   firstDay    = firstDate.getDay()
   allDate     = parseFloat(firstDay) + parseFloat(lastDate.getDate())
   // console.log(firstDate.getDate(), lastDate.getDate(), firstDay)
   onMonth     = theDate.getMonth()
   onYear      = theDate.getFullYear()
   
   let month         = new Date(date).getMonth()
   let year          = new Date(date).getFullYear()
   let setSch        = "schedule" + month + '' + year
   let ScheduleNow   = JSON.parse(localStorage.getItem(setSch))
   
   let scx  = true
   
   if (!ScheduleNow) {
      // document.querySelector("#SETTING").classList.add("on")
      // document.querySelector("#settings").classList.remove("off")
      alert("Couldn't Found Your Schedule.")
      scx = false
   }
   // console.log(ScheduleNow)
   
   let Html =``;
   if (firstDay > 0) { for (let i = 1; i <= firstDay; i++) { Html += `<div class="date-box begin"></div>`}}
   
   for (let i = 1; i <= parseInt(lastDate.getDate()); i++) {
         
         let date    = i, fuHTML = '', asHTML = '', allData = ''
         asData      = getAS(new Date(theDate.getFullYear(), theDate.getMonth(), date, 10,0,0,0))
         fuData      = getFU(new Date(theDate.getFullYear(), theDate.getMonth(), date, 10,0,0,0))
         
         fuIn        = returnList(fuData.arrIn, "fu-in", "FU In", "fu")
         fuOut       = returnList(fuData.arrOut, "fu-out", "FU Out", "fu")
         
         // console.log(asData)
         onPrepare   = [...asData.onprepare,...asData.prepare]
         onShipping  = [...asData.shipping,...asData.onshipping]
         asPrepare   = returnList(onPrepare, "as-prepare", "AS Prepare", "as")
         asShipping  = returnList(onShipping, "as-shipping", "AS Shipping", "as")
         asReady     = returnList(asData.ready, "as-ready", "AS Ready", "as")
         asArrived   = returnList(asData.arrived, "as-arrived", "AS Arrived", "as")
         asDelivery  = returnList(asData.delivery, "as-delivery", "As Delivery", "as")
         asInstal    = returnList(asData.instal, "as-instal", "AS Instal", "as")
         asPast      = returnList(asData.past, "as-past", "AS Past", "as")
         allData     = asPast + fuOut + asDelivery + asInstal + asPrepare + asReady + asShipping + fuIn
         forOpen     = `onclick='openList(this)'`
         
         if (allData == '') forOpen = ''
         if (fuData.arrIn.length > 0) fuHTML += `<div class='date-data in'></div>`
         if (fuData.arrOut.length > 0) fuHTML += `<div class='date-data out'></div>`
         
         if (asData.prepare.length > 0) asHTML += `<div class='date-data prepare'></div>`
         if (asData.delivery.length > 0) asHTML += `<div class='date-data delivery'></div>`
         if (asData.ready.length > 0) asHTML += `<div class='date-data ready'></div>`
         if (asData.shipping.length > 0) asHTML += `<div class='date-data shipping'></div>`
         // if (asData.arrived.length > 0) asHTML += `<div class='date-data arrived'></div>`
         if (asData.instal.length > 0) asHTML += `<div class='date-data instal'></div>`
         if (asData.past.length > 0) asHTML += `<div class='date-data past'></div>`
         
         if (date < 10) date = '0' + date
         let today = '', load = ''
         if (new Date().getDate() == i && new Date().getMonth() == onMonth && new Date().getFullYear() == onYear) {
            today = "today"
         }
         
         let schx, schk, scc, schn;
         if (scx == true ) {
            schx = ScheduleNow[i - 1]
            schk = schx
            scc  = "schedule" + onMonth + '' + onYear
            if (!localStorage.getItem(scc)) schx = ''
            schn = schx
            if (schx == '') schn = "Data List"
         } else {
            schn = ' '
            schx = 'xx'
            schk = ''
         }
         
         if (today == 'today') {
            asData.shipping   = onShipping
            delete asData.onshipping
            asData.prepare    = onPrepare
            delete asData.onprepare
            schx = ''
            todayTask = {
               as : asData,
               fu : fuData
            }
            // console.log(allData)
            // console.log(typeof onPrepare, typeof onShipping)
            localStorage.setItem("TODAY", JSON.stringify(todayTask))
         }
         
         // if (ScheduleNow[i] == "OFF") today = 'off'
         Html += `
            <div class="date-box ${today} ${schx.toLowerCase()}" id='${today}' ${forOpen}>
               <div class="date-fu">
                  ${fuHTML}
               </div>
               <div class='date-main'>
                  <span class='count'>${date}</span>
                  <span class='sch'>&nbsp${schk}</span>
               </div>
               <div class="date-as">
                  ${asHTML}
               </div>
               <div class="date-data-list" data-date='${i}'>
                  <div class="list-head">${schn}</div>
                  <div class="list-data">
                     ${allData /*JSON.stringify(asData)*/}
                  </div>
               </div>
            </div>`
   }
   
   calendar.innerHTML = Html
   // console.log(Html)
   return //document.querySelector("#today").click()
}

// console.log(getFU(new Date(2022, 9, 1)))
function openList (param) {
   param.lastElementChild.style.display = 'block'
   document.querySelector("#date-data-list-bg").style.display = "block"
}



function getFU (param) {
   i   = new Date(param).getDate()
   onMonth  = new Date(param).getMonth()
   let arrIn = [], arrOut = []
   FU.forEach( data => {
      let dateIn  = new Date(data.FUID),
         dateOut  = new Date(data.estimate),
         inDate   = dateIn.getDate(),
         outDate  = dateOut.getDate(),
         inMonth  = dateIn.getMonth(),
         outMonth = dateOut.getMonth()
      if (inMonth == onMonth && outMonth == onMonth) {
         if (dateIn.getDate()    == i ) arrIn.push(data)
         if (dateOut.getDate()   == i ) arrOut.push(data)
      }
   })
   return {
      arrIn    : arrIn,
      arrOut   : arrOut
   }
}

function returnList (array, type, head, param) {
   if (array.length == 0) return ""
   let HTML = `
      <div class="data-grup">
         <div class="grup-type ${type}">${head}</div>` 
      array.forEach(data => {
         let name, phone, href, tp, IDS;
         if (param == "fu") {
            name  = data.custName; 
            phone = data.phone;
            // href  = "fuDetail.html?x=x&kode=" + data.FUID
            IDS   = data.FUID;
            tp    = 'fup';
         } else if (param == "as") {
            name  = data.custName;
            phone = data.phone;
            // href  = "asDetail.html?x=x&kode" + data.noReciept
            IDS   = data.noReciept;
            tp    = "afs";
         } else {
            return console.log("Error : type undefined;")
         }
         HTML += `
            <div class="type-data ${type}">
               <i class="fab fa-whatsapp" onclick="toWhatsApp(${data.phone});" data-num="${data.phone}"></i>
               <a>${name} - ${phone}</a>
               <i class='fas fa-chevron-right' onclick="editx('${tp}', '${IDS}');"></i>
            </div>`
      })
   return HTML += `</div>`
}

function getAS (param) {
   
   paramTime   = new Date(param).getTime()
   paramDate   = new Date(param).getDate()
   paramMonth  = new Date(param).getMonth()
   paramYear   = new Date(param).getFullYear()
   let datax = {
      prepare     : [],
      shipping    : [],
      ready       : [],
      arrived     : [],
      delivery    : [],
      instal      : [],
      past        : [],
      onshipping  : [],
      onprepare   : []
   }
   
   AS.forEach((data) => {
      if (data.status == "Done") return
      rcpTime  = parseInt(data.rcpTime)
      if (paramTime < rcpTime) return
      
      reqTime     = parseInt(data.delivery.requestTime)
      insTime     = parseInt(data.instalation.time)
      now         = new Date(new Date().setHours(0,0,0,0))
      nowTime     = now.getTime()
      nowDate     = now.getDate()
      nowMonth    = now.getMonth()
      nowYear     = now.getFullYear()
      
      paramDate   = new Date (param).getDate()
      
      goCont      = parseInt(data.delivery.toCont)
      rdTime      = parseInt(data.delivery.readyTime)
      contTime    = parseInt(data.delivery.contTime)
      
      if (paramTime >= insTime && paramTime <= insTime + 86400000)                  { datax.instal.push(data)}
      if (data.delivery.status == "Complete") return

      if (goCont > 7 || goCont < 1) {
         if (paramTime >= rcpTime && paramTime <= rcpTime + 86400000)               { datax.prepare.push(data)}
         else if (paramTime < reqTime && paramTime >= rdTime)                       { datax.ready.push(data) }
         else if (data.status == 'Delivery Done') {}
         else if (paramTime >= reqTime + 86400000 && nowTime + 86400000 >= paramTime) { datax.past.push(data)}
         else {Error("False ParamTime")}
         if (paramTime < reqTime + 86400000 && paramTime >= reqTime)                { datax.delivery.push(data)}
      } else {
         if (paramTime < rcpTime + 84600000)                                        { datax.prepare.push(data)}
         else if (paramTime < contTime)                                             { datax.onprepare.push(data)}
         else if (paramTime >= contTime && paramTime < contTime + 84600000)         { datax.shipping.push(data)}
         else if (paramTime >= contTime && paramTime < rdTime)                      { datax.onshipping.push(data)}
         else if (paramTime < reqTime && paramTime >= rdTime)                       { datax.ready.push(data)}
         else if (data.status == 'Delivery Done') {}
         else if (paramTime >= reqTime + 86400000 && nowTime + 86400000 >= paramTime) { datax.past.push(data)}
         else {Error("False ParamTime")}
         if (paramTime <= reqTime + 86400000 && paramTime >= reqTime)               { datax.delivery.push(data)}
      }
   })
   return datax
}

function toWhatsApp(number) {
   return
}

function editx (tx,id) {
   if (tx == "afs") return editAS(id);
   if (tx == "fup") return editFU(id);
}
