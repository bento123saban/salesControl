                                                                                                                                                         

const fuGrup   = document.querySelector(".fu-add-grup")


window.addEventListener("load", function (e) {
   document.querySelector("i#add-grup-fu").onclick = function (e) {
      addGoodGrupFu()
   }
})
checkGoodsFu()
inputKeyUpFu()
removeGrupFu()
totalPriceFu()

function addGoodGrupFu() {
   const boolean = checkGoodsFu()
   if (boolean == 1) return
   toClone = fuGrup.cloneNode(true)
   toClone.querySelectorAll("input").forEach(input => {
      input.value = ""
   })
   document.querySelector("#goods-list-fu").appendChild(toClone)
   removeGrupFu()
   totalPriceFu()
   inputKeyUpFu()
}

function totalPriceFu () {
   const qtys      = document.getElementsByName("qtyx"),
         prices    = document.getElementsByName("pricex"),
         totals    = document.getElementsByName("totalx")
   
   countAll = 0
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
   document.querySelector("p#p-fu").innerHTML = "Rp. " + countAll.toLocaleString()
}
function checkGoodsFu() {
   let boolean = 2
   document.querySelectorAll(".fu-add-grup div input").forEach(input => {
      input.style.borderColor = "darkcyan"
      if (input.classList.contains("dis-none")) return
      if (input.value == "") {
         input.style.borderColor = "red"
         return boolean = 1
      }
   })
   console.log("b",boolean)
   return boolean;
}
function inputKeyUpFu () {
   document.querySelectorAll(".countx input.hitung").forEach(ip => {
      ip.addEventListener("keyup", function (e) {
         totalPriceFu()
      })
   })
}

function removeGrupFu () {
   document.querySelectorAll("i.fu-delete").forEach((del, i) => {
      del.addEventListener("click", function (e) {
         const grup = document.querySelectorAll(".fu-add-grup")
         if (grup.length <= 1) return 
         if(!confirm("Hapus ?")) return
         grup[i].remove()
         totalPriceFu()
         inputKeyUpFu()
         removeGrupFu()
      })
   })
   // console.log("Remove")
}
// (10) Booked item
function bookedItemsFu() {
   const articles = document.getElementsByName("articlex"),
      products    = document.getElementsByName("productx"),
      qtys        = document.getElementsByName("qtyx"),
      prices      = document.getElementsByName("pricex"),
      totals      = document.getElementsByName("totalx")

   let goods = []
   articles.forEach((x, i) => {
      const good = {
         article  : articles[i].value,
         product  : products[i].value,
         qty      : parseFloat(qtys[i].value),
         price    : parseFloat(prices[i].value),
         total    : parseFloat(qtys[i].value) * parseFloat(prices[i].value),
      }
      goods.push(good)
   })
   return goods;
}

function checkFU () {
   let param = true
   document.querySelectorAll("#fu-add-list input").forEach(input => {
      if (input.type == "checkbox" || input.disabled == true) return
      if (input.classList.contains("dis-none")) return
      if (input.classList.contains("optional")) return
      if (input.value != "") return input.style.borderColor = "lightgray"
      input.style.borderColor = "red"
      param = false
   })
   if (param) return saveFU()
   return alert("Input all necessary Data !")
}

function saveFU ()   {
   submit   = document.querySelector("#fu-submit")
   statux   = submit.dataset.status
   statuk   = document.querySelector("select#fu-status")
   let ID, FUX = {
      FUID     : '',
      custName : document.querySelector('#cust-names').value,
      phone    : document.querySelector('#phones').value,
      address  : document.querySelector('#addreses').value,
      note     : document.querySelector('#notes').value,
      estimate : document.querySelector('#trx-date').value,
      items    : bookedItemsFu(),
      status   : document.querySelector("select#fu-status").value
   }
   
   FUS = JSON.parse(localStorage.getItem("FU"))
   
   if (statux == "add" && confirm ('Add New Data ?') == true ) {
      FUX.FUID = new Date().getTime()
      FUS.push(FUX)
      localStorage.setItem("FU", JSON.stringify(FUS))
      return window.location.reload()
   } else if (statux == "edit" && confirm ('Save change ?') == true) {
      FUX.FUID = parseInt(submit.dataset.ID)
      i        = FUS.findIndex(({FUID}) => FUID == FUX.FUID)
      FUS[i]   = FUX
      localStorage.setItem("FU", JSON.stringify(FUS))
      if (/* statuk.dataset.status.toUpperCase() != "SUCCESS" &&*/ statuk.value.toUpperCase() == 'SUCCESS' && confirm("Data has been saved, Create After Sales ?")) {
         return FUSuccess(FUX.FUID)
      }
      return window.location.reload()
   }
   return console.log("b", statux)
}

function resetFU() {
   if (!confirm("Reset ??")) return false
   document.querySelectorAll("#add-fu input,  #add-fu select, #add-fu textarea").forEach(input => {
      if (input.classList.contains("patent")) return
      input.value = ''
      if (input.checked) input.checked = false
   })
   document.querySelector("#fu-submit").dataset.status = "add"
   document.querySelector("p#p-fu").innerHTML = "Rp. 0"
   document.querySelector("#fu-submit").dataset.ID = ''
   return true
}

