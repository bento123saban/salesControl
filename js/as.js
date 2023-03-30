const asList   = document.querySelector("div#as-list-data")

let asHTML  = ''

AS.forEach(as => {
   if (as.status == "Done") return
   now      = new Date().getTime()
   rcpTime  = parseInt(as.rcpTime)
   reqTime  = parseInt(as.delivery.requestTime)
   insTime  = parseInt(as.instalation.time)
   goCont   = parseInt(as.delivery.toCont)
   rdTime   = parseInt(as.delivery.readyTime)
   contTime = parseInt(as.delivery.contTime)
   
   recieptNum  = as.noReciept
   console.log(recieptNum)
   
   if (now < rcpTime) return
   if (as.delivery.status == "Done") return
   
   let status;
   if (goCont > 7 || goCont < 1) {
      if (now >= rcpTime && now < rdTime)                      status = 'Prepare'
      else if (now < reqTime && now >= rdTime)                 status = 'Ready'
      else if (now < insTime && now >= reqTime)                status = 'Delivery'
      else if (now >= insTime && now <= insTime + 86400000)    status = 'Instal'
      else status = 'Past'
   } else {
      if (now > rcpTime && now < rdTime)                       status = 'Prepare'
      else if (now >= contTime && now < rdTime)                status = 'Shipping'
      else if (now < reqTime && now >= rdTime)                 status = 'Ready'
      else if (now < insTime && now >= reqTime)                status = 'Delivery'
      else if (now >= insTime && now <= insTime + 86400000)    status = 'Instal'
      else status = 'Past'
   }

   let shipping ='', ready ='', delivery ='', instal ='';
   if (as.instalation.status == true) instal = `<span class="as-dates instal">${returnDate(as.instalation.time)}</span>`
   if (as.delivery.toCont < 7 && as.delivery.toCont > 0) {
      shipping = `<span class="as-dates shipping">${returnDate(as.delivery.contTime)}</span>`
      ready    = `<span class="as-dates ready">${returnDate(as.delivery.readyTime)}</span>`
      delivery = `<span class="as-dates delivery">${returnDate(as.delivery.requestTime)}</span>`
   } else {
      ready    = `<span class="as-dates ready">${returnDate(as.delivery.readyTime)}</span>`
      delivery = `<span class="as-dates delivery">${returnDate(as.delivery.requestTime)}</span>`
   }
   asHTML   += `
      <div class="as-grup b-${status.toLowerCase()}">
         <div onclick="editAS('${as.noReciept}')" class="as-head ${status.toLowerCase()}">
            <span>${as.noReciept.toUpperCase()}</span><i class="fas fa-chevron-right"></i>
         </div>
         <h6 class="as-name">${as.custName}</h6>
         <div class="as-call b-${status.toLowerCase()}">
            <a>${as.phone}</a><a><i class="fab fa-whatsapp"></i></a>
         </div>
         <div class="as-date">
            ${shipping}
            ${ready}
            ${delivery}
            ${instal}
         </div>
         <p class="as-note">Note : <br>
            ${as.note}
         </p>
      </div>
   `
})

function returnDate (date, add = 0) {
   let datex    = new Date(date).getDate(),
      month    = new Date(date).getMonth() + 1,
      year     = new Date(date).getFullYear()
   if (datex < 10) datex = "0" + datex
   if (month <10) month = "0" + month
   
   return datex + "-" + month + "-" + year
}
asList.innerHTML = asHTML

function editAS (ID) {
   ASX   = JSON.parse(localStorage.getItem("AS"))
   data  = ASX.find(({noReciept}) => noReciept == ID)
   if (!data) return alert("Data Not Found !")


   recieptType.value             = "UG8"
   cashier.value                 = data.rcpCashier
   recieptDate.value             = data.rcpYear + '' + data.rcpMonth + '' + data.rcpDate
   recieptDateInput.valueAsDate  = new Date(rcpTime)
   order.value                   = data.rcpOrder
   
   custName.value                = data.custName
   custMember.checked            = data.member
   phone.value                   = data.phone
   address.value                 = data.address
   note.value                    = data.note
   
   request.valueAsDate           = new Date(data.delivery.requestDate)
   cpu.checked                   = data.cpu
   
   if (data.instalation.status == true) instal.disabled = false
   instal.valueAsDate            = new Date(data.instalation.instalDate)
   instalCheck.checked           = data.instalation.status
   
   containerDate.valueAsDate     = new Date(data.delivery.containerDate)
   readyDateValue.valueAsDate    = new Date(data.delivery.readyDate)
   toContValue.value             = data.delivery.tillCont
   toContValue.dataset.toCont    = data.delivery.toCont
   rangeValue.value              = data.delivery.range
   fp.checked                    = data.furniPro
   faktur.checked                = data.faktur
   problemDesc.value             = data.problemsDesc
   
   document.querySelectorAll("select#status option").forEach(opt => {
      if (opt.value.toUpperCase() == data.status.toUpperCase()) return opt.selected = true
      return opt.selected = false
   })
   
   let total = 0, htmlx = ''
   data.bookedItem.forEach(item => {
      total += parseInt(item.total)
      let HTML = `<option data-cpu='' data-range='' data-site='' data-day='' value=''>Choose Site</option>`
      JSON.parse(localStorage.getItem("DC")).forEach(dc => {
         let selected =''
         if (dc.site.toUpperCase() == item.site.toUpperCase()) selected = "selected "
         HTML += `
            <option data-cpu=${dc.cpu} data-range=${dc.range} ${selected} data-site=${dc.id} data-day=${dc.day} value='${dc.site}'>${dc.site}</option>
         `
      })
      htmlx += `
         <div class="goods-grup as-add-grup">
            <div class="grup-in">
               <input name="article" class="form-control form-control-sm" style="width: 22%; text-align: center;" type="text" value="${item.article}" placeholder="Article">
               <input name="product" class="form-control form-control-sm" style="width: 77%;" type="text" placeholder="Product Name" value="${item.price}">
            </div>
            <div class="grup-in count">
               <input name="qty" class="form-control form-control-sm hitung" style="width: 13%;" type="number" placeholder="Qty" value='${item.qty}'>
               <input name="price" class="form-control form-control-sm hitung" style="width: 30%;" type="number" placeholder="Price/Item" value="${item.price}">
               <input readonly name="total" data-total="" class="form-control form-control-sm" style="width: 44%;" type="text" placeholder="Price Total" value='Rp. ${item.total.toLocaleString()}'>
               <i style="width: 10%;" class="fas fa-trash as-delete"></i>
            </div>
            <div class="group-more">
               <select name="dc-site" onchange="checkDeliveryDate(this);" required class="form-select form-select-sm dc-site" aria-label="Default select example">
                  ${HTML}
               </select>
            </div>
            </div>
         </div>
      `
   })
   
   document.querySelector("div#goods-list-as").innerHTML = htmlx
   document.querySelector("p#totalas").innerHTML = "Rp. " + total.toLocaleString()
   document.querySelectorAll(".navi").forEach(nav => {nav.classList.remove("on")})
   document.querySelectorAll(".pages-box").forEach(box => {
      if (box.dataset.pages == 'add-as') return box.classList.remove("off")
      box.classList.add("off")
   })
   
   document.querySelector("button#as-submit").dataset.status = "edit"
   checkGoods()
   inputKeyUp()
   removeGrup()
   totalPrice()
   document.querySelector("i.add-grupAs").onclick = function (e) {
      addGoodGrup()
   }
   document.querySelector("button#as-submit").dataset.ID = data.noReciept
}


function FUSuccess (ID) {
   let FUX        = JSON.parse(localStorage.getItem("FU"))
   let fuxData    = FUX.find(({FUID}) => FUID == ID)
   // return console.log(ID, fuxData)
   if (!fuxData) return alert("Data not Found !")
   
   custName.value                = data.custName
   custMember.checked            = data.member
   phone.value                   = data.phone
   address.value                 = data.address
   note.value                    = data.note
   
   let total = 0, htmlx = ''
   data.items.forEach(item => {
      total += parseInt(item.total)
      let HTML = `<option data-cpu='' data-range='' data-site='' data-day='' value=''>Choose Site</option>`
      JSON.parse(localStorage.getItem("DC")).forEach(dc => {
         HTML += `
            <option data-cpu=${dc.cpu} data-range=${dc.range} data-site=${dc.id} data-day=${dc.day} value='${dc.site}'>${dc.site}</option>
         `
      })
      htmlx += `
         <div class="goods-grup as-add-grup">
            <div class="grup-in">
               <input name="article" class="form-control form-control-sm" style="width: 22%; text-align: center;" type="text" value="${item.article}" placeholder="Article">
               <input name="product" class="form-control form-control-sm" style="width: 77%;" type="text" placeholder="Product Name" value="${item.price}">
            </div>
            <div class="grup-in count">
               <input name="qty" class="form-control form-control-sm hitung" style="width: 13%;" type="number" placeholder="Qty" value='${item.qty}'>
               <input name="price" class="form-control form-control-sm hitung" style="width: 30%;" type="number" placeholder="Price/Item" value="${item.price}">
               <input readonly name="total" data-total="" class="form-control form-control-sm" style="width: 44%;" type="text" placeholder="Price Total" value='Rp. ${item.total.toLocaleString()}'>
               <i style="width: 10%;" class="fas fa-trash as-delete"></i>
            </div>
            <div class="group-more">
               <select name="dc-site" onchange="checkDeliveryDate(this);" required class="form-select form-select-sm dc-site" aria-label="Default select example">
                  ${HTML}
               </select>
            </div>
            </div>
         </div>
      `
   })
   
   document.querySelector("div#goods-list-as").innerHTML = htmlx
   document.querySelector("p#totalas").innerHTML = "Rp. " + total.toLocaleString()
   document.querySelectorAll(".navi").forEach(nav => {nav.classList.remove("on")})
   document.querySelectorAll(".pages-box").forEach(box => {
      if (box.dataset.pages == 'add-as') return box.classList.remove("off")
      box.classList.add("off")
   })
   
   document.querySelector("button#as-submit").dataset.status = "add"
   checkGoods()
   inputKeyUp()
   removeGrup()
   totalPrice()
   document.querySelector("i.add-grupAs").onclick = function (e) {
      addGoodGrup()
   }
}
