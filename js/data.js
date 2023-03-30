if(!localStorage.getItem("FU"))        localStorage.setItem("FU", JSON.stringify([]))
if(!localStorage.getItem("AS"))        localStorage.setItem("AS", JSON.stringify([]))
if(!localStorage.getItem("PROBLEM"))   localStorage.setItem("PROBLEM", JSON.stringify([]))
if(!localStorage.getItem("TODAY"))     localStorage.setItem("TODAY", JSON.stringify([]))

if(!localStorage.getItem("schedule"))  {
   localStorage.setItem("schedule", JSON.stringify([]))
   window.addEventListener("load", function () {
      scheduleCheck()
   })
}

function scheduleCheck () {
   return
}


const FP = [
   {
      ID          : "10175082",
      year        : 1,
      begin       : 300000,
      end         : 1000000,
      Member      : 89000,
      nonMember   : 119000
   },
   {
      ID          : "X148803",
      year        : 1,
      begin       : 1000000,
      end         : 9999999,
      Member      : 149000,
      nonMember   : 109000
   },
   {
      ID          : "X148804",
      year        : 1,
      begin       : 10000000,
      end         : 49999999,
      Member      : 159000,
      nonMember   : 179000
   },
   {
      ID          : "10113112",
      year        : 1,
      begin       : 50000000,
      end         : 99999999,
      Member      : 269000,
      nonMember   : 299000
   },
   {
      ID          : "10113113",
      year        : 1,
      begin       : 100000000,
      end         : 150000000,
      Member      : 369000,
      nonMember   : 399000
   },
   {
      ID          : "10311650",
      year        : 2,
      begin       : 1000001,
      end         : 10000000,
      Member      : 159000,
      nonMember   : 199000
   },
   {
      ID          : "10311651",
      year        : 2,
      begin       : 10000001,
      end         : 50000000,
      Member      : 199000,
      nonMember   : 249000
   },
   {
      ID          : "10113114",
      year        : 2,
      begin       : 50000001,
      end         : 100000000,
      Member      : 359000,
      nonMember   : 399000
   },
   {
      ID          : "10113115",
      year        : 2,
      begin       : 100000001,
      end         : 150000000,
      Member      : 499000,
      nonMember   : 459000
   }]
   
localStorage.setItem("FP", JSON.stringify(FP))

const DC = [
   {
      id       : 1,
      type     : "dc",
      site     : "DC Cikupa",
      range    : 45,
      day      : 0,
      toCont   : 2,
      cpu      : 999,
      code     : "23",
      RT       : true
   },
   {
      id       : 2,
      type     : "dc",
      site     : "DC Jababeka",
      range    : 45,
      day      : 0,
      toCont   : 2,
      cpu      : 999,
      code     : "72",
      RT       : true
   },
   {
      id       : 3,
      type     : "dc",
      site     : "DC Sidoarjo",
      range    : 21,
      day      : 3,
      toCont   : 2,
      cpu      : 999,
      code     : "H6",
      RT       : true
   },
   {
      id       : 4,
      type     : "dc",
      site     : "DC WH Maluku",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 2,
      code     : "DN",
      RT       : false
   },
   {
      id       : 5,
      type     : "store",
      site     : "Store (Orpack)",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 0,
      code     : "G8",
      RT       : true
   },
   {
      id       : 6,
      type     : "store",
      site     : "Store (Display)",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 0,
      code     : "G8",
      RT       : true
   }
]
localStorage.setItem("DC", JSON.stringify(DC))


const payment = [
   {
      method   : "Cash",
      grup     : 1,
      use      : true
   },
   {
      method   : "Debet",
      grup     : 1,
      use      : true
   },
   {
      method   : "Credit Card",
      grup     : 1,
      use      : true
   },
   {
      method   : "Virtual Account",
      grup     : 1,
      use      : true
   },
   {
      method   : "Dana Kini",
      grup     : 2,
      use      : true
   },
   {
      method   : "Home Credit",
      grup     : 3,
      use      : true
   },
   {
      method   : "Kredit Plus",
      grup     : 4,
      use      : false
   }
]

localStorage.setItem("PAYMENT", JSON.stringify(payment))


STATUS = [
   {
      status : "Prepared"
   },
   {
      status : "Shipped"
   },
   {
      status : "Arrived"
   },
   {
      status : "Delivery"
   },
   {
      status : "Installation"
   },
   {
      status : "Done"
   },
   {
      status : "Problem"
   }
]

localStorage.setItem("STATUS", JSON.stringify(STATUS))

window.addEventListener('click', async () => {
   return
   const opts = {multiple: true};
  const supportedProperties = await navigator.contacts.getProperties();
  if (supportedProperties.includes('name')) {
    console.log('name')
   const contacts = await navigator.contacts.select(['name']);
   if (!contacts.length) return console("Ups! Not Found")
   const name  = contacts[0].name;
   console.log(name)
  }
  if (supportedProperties.includes('email')) {
    console.log('email')
  }
  if (supportedProperties.includes('tel')) {
    console.log('tel')
  }
  if (supportedProperties.includes('address')) {
    console.log('address')
  }
  if (supportedProperties.includes('icon')) {
    console.log('icon')
  }

})

//checkProperties()
async function getContacts() {
   
   const contacts = await navigator.contacts.select(['name', 'tel'], opts);
   if (!contacts.length) return console("Ups! Not Found")
   const name  = contacts[0].name[0];
   const tel   = contacts[0].tel[0];
   console.log(name, tel)
}


//getContacts()

let scheduleTime = ["OFF", "RO", "AL", "M0029", "M0058", "H44", "A0003"]
localStorage.setItem("scheduleTime", JSON.stringify(scheduleTime))
