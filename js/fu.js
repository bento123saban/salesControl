                                                                                                                                                                                                                                                                                 

let FUHtml  = ''
FUList      = document.querySelector("#fu-list-data");

const FUN   = JSON.parse(localStorage.getItem("FU"))
FUN.forEach(data => {
   if (data.status == "On Progres") data.status = "progres"
   dateIn   = new Date(data.FUID).getDate() + "-" + (new Date(data.FUID).getMonth() + 1) + "-" + new Date(data.FUID).getFullYear()
   dateOut  = new Date(data.estimate).getDate() + "-" + (new Date(data.estimate).getMonth() + 1) + "-" + new Date(data.estimate).getFullYear()
   FUHtml += `
      <div class="fu-grup b-${data.status.toLowerCase()}" data-search="${data.custName} ${data.phone} ${dateIn} ${dateOut}" data-type="${data.status.toLowerCase()}">
         <div class="fu-head ${data.status.toLowerCase()}">${data.custName} <a><i class="fas fa-chevron-right" onclick='editFU(${parseInt(data.FUID)})'></i></a></div>
         <div class="fu-call b-${data.status.toLowerCase()}">
            <a class="">${data.phone}</a>
            <a><i class="fab fa-whatsapp"></i></a>
         </div>
         <p class="fu-note">
            In &nbsp &nbsp:  ${dateIn}<br>              
            Out : ${dateOut} <br>              
            ${data.note}
         </p>
      </div>
   `
})
FUList.innerHTML = FUHtml


function editFU (ID) {
   // console.log(ID)
   FUL   = JSON.parse(localStorage.getItem("FU"))
   data  = FUL.find(({FUID}) => FUID == ID)
   if(!data) return alert ("Data not Found !")
   const fuStatus    = document.querySelector("select#fu-status")
   const statusOpt   = document.querySelectorAll("select#fu-status option")
   if (data.status == "On Progres") data.status = "progres"
   
   fuStatus.dataset.status = data.status
   statusOpt.forEach((opt) => {
      if (opt.value.toUpperCase() == data.status.toUpperCase()) return opt.selected = true
   })
   
   document.querySelector("#cust-names").value    = data.custName
   document.querySelector("#phones").value        = data.phone
   document.querySelector("#addreses").value      = data.address
   document.querySelector("#notes").value         = data.note
   
   document.querySelector("#trx-date").valueAsDate= new Date(data.estimate)
   let total = 0, html = ''
   data.items.forEach(item => {
      total += parseInt(item.total)
      html += `
         <div class="goods-grup fu-add-grup">
            <div class="grup-in">
               <input name="articlex" class="form-control form-control-sm" style="width: 22%; text-align: center;" type="text" value="${item.article}" placeholder="Article">
               <input name="productx" class="form-control form-control-sm" style="width: 77%;" type="text" placeholder="Product Name" value="${item.price}">
            </div>
            <div class="grup-in countx">
               <input name="qtyx" class="form-control form-control-sm hitung" style="width: 13%;" type="number" placeholder="Qty" value='${item.qty}'>
               <input name="pricex" class="form-control form-control-sm hitung" style="width: 30%;" type="number" placeholder="Price/Item" value="${item.price}">
               <input readonly name="totalx" data-total="" class="form-control form-control-sm" style="width: 44%;" type="text" placeholder="Price Total" value='${item.total}'>
               <i style="width: 10%;" class="fas fa-trash fu-delete"></i>
            </div>
         </div>
      `
   })
   
   document.querySelector("p#p-fu").innerHTML = "Rp. " + total.toLocaleString()
   document.querySelector("#goods-list-fu").innerHTML = html
   document.querySelectorAll(".navi").forEach(nav => {nav.classList.remove("on")})
   document.querySelectorAll(".pages-box").forEach(box => {
      if (box.dataset.pages == 'add-fu') return box.classList.remove("off")
      box.classList.add("off")
   })
   document.querySelector("#fu-submit").dataset.status = "edit"
   checkGoodsFu()
   inputKeyUpFu()
   removeGrupFu()
   totalPriceFu()
   return document.querySelector("#fu-submit").dataset.ID = data.FUID
}

window.addEventListener("load", function (e) {
   document.querySelector("#fu-search").onkeyup = function () {
      value    = this.value.toUpperCase()
      document.querySelectorAll(".fu-grup").forEach(fu => {
         data  = fu.dataset.search.toUpperCase()
         if (data.indexOf(value) > -1) return fu.classList.remove("dis-none")
         fu.classList.add("dis-none")
      })
   }
   document.querySelectorAll(".list-type").forEach(type => {
      type.onclick = function () {
         let status   = this.dataset.status
         document.querySelectorAll(".fu-grup").forEach(fu => {
            if(fu.dataset.type == status) return fu.classList.remove("dis-none")
            fu.classList.add("dis-none")
         })
      }
   })
})
