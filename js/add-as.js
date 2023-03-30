                                                                                                                                                                                                                                                                                                                                                               

const recieptType       = document.querySelector("#UG8"),
      cashier           = document.querySelector("#cashier"),
      recieptDate       = document.querySelector("#reciept-date"),
      recieptDateInput  = document.querySelector("#reciept-date-input"),
      order             = document.querySelector("#order"),
      custName          = document.querySelector("#cust-name"),
      custMember        = document.querySelector("#cust-member"),
      phone             = document.querySelector("#phone-number"),
      address           = document.querySelector("#addres"),
      note              = document.querySelector("#note"),
      status            = document.querySelector("select#status"),
      instal            = document.querySelector("#instal"),
      instalCheck       = document.querySelector("#instal-check"),
      goodGrup          = document.querySelector(".goods-grup"), 
      request           = document.querySelector("#request"),
      cpu               = document.querySelector("input#pick-up"),
      containerDate     = document.querySelector("#container-date"),
      readyDateValue    = document.querySelector("#ready-date"),
      toContValue       = document.querySelector("#to-cont"),
      rangeValue        = document.querySelector("#range"),
      fp                = document.querySelector("#furni-pro"),
      faktur            = document.querySelector("#faktur"),
      asSubmit          = document.querySelector("#as-submit"),
      problemDesc       = document.querySelector("#problem-desc")

const DCX = JSON.parse(localStorage.getItem("DC"))
let HTML = ``
DCX.forEach(dc => {
   HTML += `
      <option data-cpu=${dc.cpu} data-range=${dc.range} data-site=${dc.id} data-day=${dc.day} value='${dc.site}'>${dc.site}</option>
   `
})
document.querySelector(".dc-site").innerHTML += HTML

window.addEventListener("load", function (e) {
   
   recieptDateInput.max = new Date().toISOString().split("T")[0]
   checkGoods()
   
   recieptDate.onclick = function (e) {
      e.preventDefault()
      recieptDateInput.click()
   }
   recieptDateInput.onchange = function () {
      let date = new Date(this.value).getDate(),
      month    = new Date(this.value).getMonth() + 1,
      year     = new Date(this.value).getFullYear()
      if (date < 10) date  = "0" + date
      if (month <10) month = "0" + month
      console.log(typeof date)
      if (isNaN(date)) return recieptDate.value = ''
      
      request.min                = new Date(this.value).toISOString().split("T")[0]
      containerDate.min          = new Date(this.value).toISOString().split("T")[0]
      return recieptDate.value   = "" + year + "" + month + "" + date
   }
   document.querySelector("i.add-grupAs").addEventListener("click", function (e) {
      addGoodGrup()
   })
   request.addEventListener("input", function () {
      if (this.value == "") {
         instalCheck.disabled = true
         instalCheck.checked  = false
         return instal.value = ""
      }
      instalCheck.disabled = false
      
      if(instalCheck.checked == false) return 
      now = new Date(this.value)
      now.setDate(now.getDate() + 1)
      instal.valueAsDate = new Date(now)
      checkDeliveryDate()
   })
   instalCheck.onchange = function() {
      if (this.checked == false) {
         instal.disabled = true
         instal.classList.remove("optional")
         return instal.value = ''
      }
      instal.disabled = false
      dDate = new Date(request.value)
      dDate2 = new Date(dDate.setDate(dDate.getDate() + 1))
      instal.min = new Date(dDate2).toISOString().split("T")[0]
      instal.classList.add("optional")
      instal.valueAsDate = new Date(dDate2)
   }
   status.addEventListener("change", function (e) {
      console.log("select")
      if (this.value == 'Problem') return document.querySelector("div#problems").classList.remove("dis-none")
      document.querySelector("#problems").classList.add("dis-none")
      // problemDesc.value = ''
   })
})
setRecieptDate()
checkGoods()
removeGrup()
inputKeyUp()

function checkGoods() {
   let boolean = true
   document.querySelectorAll(".as-add-grup input, .as-add-grup select").forEach(input => {
      input.style.borderColor = "darkcyan"
      if (input.classList.contains("dis-none")) return
      if (input.value == "") {
         input.style.borderColor = "red"
         return boolean = false
      }
   })
   return boolean;
}
function addGoodGrup() {
   const boolean = checkGoods()
   if (boolean == false) return
   toClone = goodGrup.cloneNode(true)
   toClone.querySelectorAll("input, select").forEach(input => {
      input.value = ""
   })
   document.querySelector("#goods-list-as").appendChild(toClone)
   totalPrice()
   inputKeyUp()
   removeGrup()
}
function removeGrup () {
   document.querySelectorAll("i.as-delete").forEach((del, i) => {
      del.onclick =  function (e) {
         const grup = document.querySelectorAll("div.as-add-grup")
         if (grup.length <= 1) return 
         if(!confirm("Hapus ?")) return
         grup[i].remove()
         totalPrice()
         inputKeyUp()
         removeGrup()
         console.log("Remove")
      }
   })
   // console.log("Remove")
}
function totalPrice () {
   const qtys      = document.getElementsByName("qty"),
         prices    = document.getElementsByName("price"),
         totals    = document.getElementsByName("total")
   let countAll = 0
   totals.forEach((total, i) => {
      value = parseInt(qtys[i].value) * parseInt(prices[i].value)
      if (value > 1) {
         totals[i].value = "Rp. " + value.toLocaleString()
         total.dataset.total = value
         countAll += value
      } else {
         totals[i].value = 0
         total.dataset.total = 0
         countAll += 0
      }
   })
   console.log("Total Price")
   document.querySelector("#totalas").innerHTML = "Rp. " + countAll.toLocaleString()
}
// (6) price&Qty Key Up
function inputKeyUp () {
   document.querySelectorAll(".count input").forEach(ip => {
      ip.onkeyup = function (e) {
         totalPrice()
      }
   })
}
function setRecieptDate(param = new Date()) {
   let now  = new Date(param),
      year  = now.getFullYear(),
      month = now.getMonth() + 1,
      date  = now.getDate()

   if (month < 10) {
      month = "0" + month
   }
   if (date < 10) {
      date = "0" + date
   }
   recieptDateValue     = year + "" + month + "" + date
   recieptDate.value    = parseInt(recieptDateValue)
   recieptDateInput.valueAsDate  = new Date(now.getFullYear(), now.getUTCMonth(), now.getDate())
   // console.log(now.getDate(), recieptDateInput.value)
   
   RcDate = new Date(recieptDateInput.value)
   if (RcDate.getDate() != now.getDate()) {
      RcDate.setDate(now.getDate())
      recieptDateInput.valueAsDate = new Date(RcDate)
      
      // console.log(RcDate.toISOString())
      // console.log(now.getDate(), recieptDateInput.value)
   }
   request.min = new Date(recieptDateInput.value).toISOString().split("T")[0]
}

function checkDeliveryDate (element) {
   if (recieptDate.value == '') {
      if(confirm("Choose reciept date !")) return recieptDate.click()
   }
   if (request.value == '') {
      request.focus()
      element.value = ''
      return alert("Choose the date first")
   }
   deliveryControl(element)
}


// 
function deliveryControl (element) {
   let param = 0, cpu = 0, code;
   document.querySelectorAll("select.dc-site").forEach(select => {
      if (select.value == '') return
      option = select.options[select.selectedIndex]
      if (parseInt(option.dataset.range) <= param) return
      param = parseInt(option.dataset.range)
      code  = parseInt(option.dataset.site)
      if (parseInt(option.dataset.cpu) > 900) return
      if (parseInt(option.dataset.cpu) > cpu) return cpu = parseInt(option.dataset.cpu)
   })
   const DCx   = JSON.parse(localStorage.getItem("DC"))
   let site    = ''
   DCx.forEach(DC => {
      if (DC.id == code) return site = DC
   })
   
   // return console.table(site)
   
   let rcpDate, rcpDay, toContx, siteRange, siteDay;
   rcpDate     = new Date(recieptDateInput.value)
   rcpDay      = new Date(rcpDate).getDay()
   toContx     = parseInt(site.toCont)
   siteRange   = parseInt(site.range)
   siteDay     = parseInt(site.day)
   
   TCD         = new Date(recieptDateInput.value)
   toContDate  = new Date(TCD.setDate(TCD.getDate() + toContx))
   toContDay   = toContDate.getDay()
   
   let Differents
   if (parseInt(toContDay) > siteDay) {
      Differents = (7 - parseInt(rcpDay)) + parseInt(siteDay)
   } else {
      Differents = (siteDay - parseInt(toContDay)) + toContx
   }
   
   if (document.querySelector("input#pick-up").checked) {
      siteRange = parseInt(site.cpu)
   }
   containerDate.classList.remove("optional")
   if (toContx    > 7) {
      Differents  = 0
      toContx     = 0
      containerDate.classList.add("optional")
      console.log(toContx)
   }
   
   CTD            = new Date(rcpDate)
   contDateValue  = new Date(CTD.setDate(CTD.getDate() + Differents))
   // console.log("CTD", contDateValue.toISOString())
   
   RD             = new Date(contDateValue)
   readyDate      = new Date(RD.setDate(RD.getDate() + parseInt(siteRange)))
   //console.table({site_range: siteRange, ready_date: readyDate.toISOString()})
   
   requestDate = new Date(request.value)
   rd          = new Date(readyDate.setHours(0,9,0,0)).getTime()
   rq          = new Date(requestDate.setHours(0,9,0,0)).getTime()
   
   if (rd > rq) {
      confirm("Request Date more then arrival/ready Date !!")
      requestDate.value    = ''
      containerDate.value  = ''
      readyDateValue.value = ''
      toContValue.value    = ''
      rangeValue.value     = ''
      return element.value = ''
   }
   
   if (toContx > 0) {
      containerDate.valueAsDate  = contDateValue
   } else {
      containerDate.value        = ''
   }
   readyDateValue.valueAsDate = readyDate
   rdx = new Date(readyDateValue.value)
   if (rdx.getDate() != readyDate.getDate()){
      rdx.setDate(readyDate.getDate())
      readyDateValue.valueAsDate = rdx
   }
   toContValue.value          = Differents
   toContValue.dataset.toCont = parseInt(site.toCont)
   rangeValue.value           = parseInt(siteRange)
   console.log('toCont : ', site.toCont)
   return // console.log("@Bendhard16")
}


// (X) collect AS
async function collectAS () {
   
   let noReciept  = recieptType.value + "." + cashier.value + "." + recieptDate.value + "." + order.value,
      typex       = 'add'
   if (asSubmit.dataset.status == 'edit') {
      noReciept   = asSubmit.dataset.ID
      typex       = 'edit'
   }
   let mth   = new Date(recieptDateInput.value).getMonth() + 1
   if (mth < 10) mth = '0' + mth
   const ASData = {
      noReciept      : noReciept,
      recieptDate    : new Date(recieptDateInput.value), // return Date object of reciept Date
      rcpTime        : new Date(recieptDateInput.value).getTime(),
      rcpDate        : new Date(recieptDateInput.value).getDate(),
      rcpMonth       : mth,
      rcpYear        : new Date(recieptDateInput.value).getFullYear(),
      rcpCashier     : cashier.value,
      rcpOrder       : order.value,
      problem        : false, // control for Problem. If true its sign theres a problem
      warning        : false, // note for running problem
      standing       : true, // use for control if the Data yet deleted or not
      status         : status.value,
      member         : custMember.checked,
      custName       : custName.value,
      address        : address.value,
      note           : note.value,
      phone          : phone.value,
      cpu            : cpu.checked,
      history        : '',
      furniPro       : fp.checked,
      faktur         : faktur.checked,
      problemsDesc   : problemDesc.value,
      instalation    : {
            status         : instalCheck.checked,
            instalDate     : instal.value,
            time           : new Date(new Date(instal.value).setHours(0,0,0,0)).getTime()
      },
      bookedItem     : bookedItems(),
      //delivery
      delivery       : {
            cpu            : cpu.checked,
            status         : false,
            requestDate    : request.value,
            containerDate  : containerDate.value,
            readyDate      : readyDateValue.value,
            containerNum   : document.querySelector("#container-num").value,
            toCont         : parseInt(toContValue.dataset.toCont),
            tillCont       : parseInt(toContValue.value),
            range          : document.querySelector("#range").value,
            
            contTime       : new Date(new Date(containerDate.value).setHours(0,0,0,0)).getTime(),
            readyTime      : new Date(new Date(readyDateValue.value).setHours(0,0,0,0)).getTime(),
            requestTime    : new Date(new Date(request.value).setHours(0,0,0,0)).getTime()
      }
   }
   // return console.log('toCont : ',toContValue.dataset.toCont)
   return saveAS(ASData, typex, ASData.noReciept)
}

function saveAS (data, type = '',code) {
   const AS       = JSON.parse(localStorage.getItem("AS"))
   // problemsControl(type, code)
   if (type == "edit") {
      i        = AS.findIndex(({noReciept}) => noReciept.toUpperCase() == data.noReciept.toUpperCase())
      if (i < 0) return alert('Index not Found')
      AS[i]    = data
   } else if (type == 'add'){
      AS.push(data)
   }
   if(!confirm("SAVE DATA ?")) return
   localStorage.setItem("AS", JSON.stringify(AS))
   return window.location.reload()
}

function checkAS() {
   // return collectAS()
   let param = true
   document.querySelectorAll("#as-form input, #as-form select, #as-form textarea").forEach(input => {
      if (input.type == "checkbox" || input.disabled == true) return
      if (input.classList.contains("dis-none")) return
      if (input.classList.contains("optional")) return
      if (input.value != "") return input.style.borderColor = "lightgray"
      input.style.borderColor = "red"
      // console.log(input)
      param = false
   })
   if (param == true) return collectAS()
   return alert("Input all necessary Data !")
}

document.querySelector("button#as-submit").onclick = function (e) {
   checkAS()
}


// (10) Booked item
function bookedItems() {
   const articles = document.getElementsByName("article"),
      products    = document.getElementsByName("product"),
      qtys        = document.getElementsByName("qty"),
      prices      = document.getElementsByName("price"),
      totals      = document.getElementsByName("total"),
      site        = document.getElementsByName("dc-site")

   let goods = []
   articles.forEach((x, i) => {
      const good = {
         article  : articles[i].value,
         product  : products[i].value,
         qty      : parseFloat(qtys[i].value),
         price    : parseFloat(prices[i].value),
         total    : parseFloat(qtys[i].value) * parseFloat(prices[i].value),
         site     : site[i].value
      }
      goods.push(good)
   })
   return goods;
}

function resetAS() {
   if (!confirm("Reset ??")) return false
   document.querySelectorAll("#as-form input,  #as-form select, #as-form textarea").forEach(input => {
      if (input.classList.contains("patent")) return
      if (input.checked) input.checked = false
      input.value = ''
   })
   document.querySelector("#totalas").innerHTML = "Rp. 0"
   return true
}

function problemsControl (status, idx, solve) {
   Problem  = JSON.parse(localStorage.getItem("PROBLEM"))
   if (status == 'add') {
      i        = Problem.findIndex(({id}) => id == data.noReciept)
      problems = {
         status   : true,
         type     : "AS",
         id       : idx,
         desc     : data.problemsDesc
      }
      Problem.push(problems)
   } else if (status == 'edit') {
      i        = Problem.findIndex(({id}) => id == data.noReciept)
      Problem[i] = {
         status   : solve,
         type     : "AS",
         id       : idx,
         desc     : data.problemsDesc
      }
   }
   localStorage.setItem("PROBLEM", JSON.stringify(Problem))
}