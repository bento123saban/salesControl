                                                                                                                                                                                                                                                   


window.addEventListener("load", function (e) {
   todays()
})
function todays () {
   const todayData   = JSON.parse(localStorage.getItem("TODAY"))
   if (todayData.length == 0) return console.log("there's no delivery control to show")
   const asData      = todayData.as
   const fuData      = todayData.fu
   let xml  = ''
   for (let datax in asData) {
      asData[datax].forEach(data => {
         let status = datax
         if (status == 'on progress') status = 'on_progres'
         // console.log(datax)
         xml += `
            <div class="todays-grup ${status}">
               <div class="td-grup-top">
                  <p>${data.noReciept} / ${data.phone} <br> ${data.address}</p>
               </div>
               <div class="td-grup-bottom">
                  <span>${data.custName}</span>
                  <i class="fab fa-whatsapp" onclick ='toWA(${data.phone})' ></i>
                  <i class="fas fa-phone" onclick="tel:${data.phone}"></i>
                  <i class="fas fa-chevron-right" onclick ="editAS('${data.noReciept}')"></i>
               </div>
            </div>
         `
      })
   }
   for (let data in fuData) {
      fuData[data].forEach(data => {
         let status = data.status.toLowerCase()
         if (status == 'on progress') status = 'on_progres'
         xml += `
            <div class="todays-grup ${status}">
               <div class="td-grup-top">
                  <p>${data.FUID} / ${data.phone} <br> ${data.address}</p>
               </div>
               <div class="td-grup-bottom">
                  <span>${data.custName}</span>
                  <i class="fab fa-whatsapp" onclick ='toWA(${data.phone})' ></i>
                  <i class="fas fa-phone" onclick="tel:${data.phone}"></i>
                  <i class="fas fa-chevron-right" onclick ="editFU('${data.FUID}')"></i>
               </div>
            </div>
         `
      })
   }
   document.querySelector("#todays").innerHTML = xml
}

function problem () {
   
}

function afterAll () {
   
}