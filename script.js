//Tab title for the webpage
document.title="Expense Tracker";

/////////////////////////////////////////////////////////
////////////////////////MODEL/////////////////////////////
//////////////////////////////////////////////////////////
//CONTAINS ALL THE CODE THAT SAVES AND MANAGES DATA//
const saveLists=(keyOfArray)=>{
    if (keyOfArray=="expenseList")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseList))
    }
    else if (keyOfArray=="totalExpenses")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(totalExpenses))
    }
    else if (keyOfArray=="expenseStatPlaces")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseStatPlaces))
    }
    else if (keyOfArray=="expenseDollar")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseDollar))
    }
    else if (keyOfArray=="expenseEuro")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseEuro))
    }
    else if (keyOfArray=="expensePound")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expensePound))
    }
    else if (keyOfArray=="expenseYen")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseYen))
    }
    else if (keyOfArray=="expenseRupee")
    {
      localStorage.setItem(keyOfArray,JSON.stringify(expenseRupee))
    }

    }

  const retrieveLists=(keyOfArray)=>{
    const savedList=JSON.parse(localStorage.getItem(keyOfArray))
    if (Array.isArray(savedList))
    {
      theList=savedList;
    }
    else
    {
      theList=[]
    }
    return theList
  }

  let expenseList=retrieveLists("expenseList");
  let totalExpenses=retrieveLists("totalExpenses");
  let expenseStatPlaces=retrieveLists("expenseStatPlaces");
  let expenseDollar=retrieveLists("expenseDollar");
  let expenseEuro=retrieveLists("expenseEuro");
  let expensePound=retrieveLists("expensePound");
  let expenseYen=retrieveLists("expenseYen");
  let expenseRupee=retrieveLists("expenseRupee");
//////////////////////////////////////////////////////////////////////////////////
  const addExpense=(name,date,amount,symbol)=>{
    //Setting a unique id based on date time for the expense
    const id = "" + new Date().getTime();

    expenseList.push({
      name: name,
      date: date,
      amount: amount,
      symbol: symbol,
      id: id
  });
  expenseList.sort(compareByName);
  saveLists("expenseList");
  }

//////////////////////////////////////////////////////////////////////////////////
const statsTotalAmount=(amount,symbol)=>{
  if (totalExpenses.length==0)
    {totalExpenses.push(
      {
        amount:amount,
        symbol:symbol
      });
    }
    else 
    {
      let duplicate=false;
      totalExpenses.forEach(
        function (object){
          if (object.symbol==symbol){
            duplicate=true;
            object.amount+=amount;
          }
        }
      );

      if (duplicate==false){
        totalExpenses.push(
          {
            amount:amount,
            symbol:symbol
          });
      }
    }
    saveLists("totalExpenses");
}
//////////////////////////////////////////////////////////////////////////////////
 const statsByPlace=(name,amount,symbol)=>{
    mergeDuplicatePlaces(expenseStatPlaces,name,amount,symbol)

    expenseStatPlaces.sort(compareByName);
    saveLists("expenseStatPlaces");
  }
//////////////////////////////////////////////////////////////////////////////////
const statsByAmounts=(name,amount,symbol)=>{
  
  if (symbol=="$")
  {mergeDuplicatePlaces(expenseDollar,name,amount,symbol)}
  else if (symbol=="€")
  {mergeDuplicatePlaces(expenseEuro,name,amount,symbol)}
  else if (symbol=="£")
  {mergeDuplicatePlaces(expensePound,name,amount,symbol)}
  else if (symbol=="¥")
  {mergeDuplicatePlaces(expenseYen,name,amount,symbol)}
  else if (symbol=="₹")
  {mergeDuplicatePlaces(expenseRupee,name,amount,symbol)}

  expenseDollar.sort(compareByAmount);
  expenseEuro.sort(compareByAmount);
  expensePound.sort(compareByAmount);
  expenseYen.sort(compareByAmount);
  expenseRupee.sort(compareByAmount);
  saveLists("expenseDollar");
  saveLists("expenseEuro");
  saveLists("expensePound");
  saveLists("expenseYen");
  saveLists("expenseRupee");
}
//////////////////////////////////////////////////////////////////////////////////
const mergeDuplicatePlaces=(array,name,amount,symbol)=>{
  if (array.length==0)
  {array.push(
    {
      name:name,
      amount:amount,
      symbol:symbol
    });
  }
  else 
  {
    let duplicate=false;
    array.forEach(
      function (object){
        if (object.name==name & object.symbol==symbol){
          duplicate=true;
          object.amount+=amount;
        }
      }
    );

    if (duplicate==false){
      array.push(
        {
          name:name,
          amount:amount,
          symbol:symbol
        });
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////
const compareByName=(a,b)=>{
  const expenseNameA=a.name.toUpperCase();
  const expenseNameB=b.name.toUpperCase();

  let comparison=0;

  if (expenseNameA>expenseNameB)
  {
    comparison=1;
  }
  else if (expenseNameA<expenseNameB)
  {
    comparison=-1;
  }
  return comparison;
}
//////////////////////////////////////////////////////////////////////////////////
const compareByAmount=(a,b)=>{
  return (-1*(a.amount - b.amount));
}
//////////////////////////////////////////////////////////////////////////////////
const increment=(increaseBy)=>{
  let currencySymbol=document.getElementById("symbols");
  let amountBox=document.getElementById("amountBox");
  if (currencySymbol.value=="")
  {
    alert("Please enter a currency symbol");
  }
  else
  {
    if (amountBox.value=="")
    {
      amountBox.value=`${increaseBy} ${currencySymbol.value}`
    }
    else
    {
      let currentValue=amountBox.value.split(" ")[0];
      amountBox.value=+currentValue+increaseBy+" "+currencySymbol.value;
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////
const deleteBySymbol=(array,SymbolDeleted,AmountDeleted)=>{
  array.forEach(
    function (object){
      if (object.symbol==SymbolDeleted)
      {
        object.amount-=AmountDeleted;
      }
    });


    array=array.filter(
    function (object){
      if (object.amount==0)
      {
        return false;
      }
      else
      {
        return true;
      }

    });
    return array;
}
//////////////////////////////////////////////////////////////////////////////////
const deleteByPlaceAndSymbol=(array,PlaceDeleted,SymbolDeleted,AmountDeleted)=>{
  array.forEach(
    function (object){
      if (object.name==PlaceDeleted && object.symbol==SymbolDeleted)
      {
        object.amount-=AmountDeleted;
      }
    });


    array=array.filter(
    function (object){
      if (object.amount==0)
      {
        return false;
      }
      else
      {
        return true;
      }

    });
    return array;
}
//////////////////////////////////////////////////////////////////////////////////
const removeItemsFromExpenseLists=(idToDelete)=>{
  
      expenseList.forEach(
        function (expense){

          if (idToDelete==expense.id)
          {
          PlaceDeleted=expense.name;
          AmountDeleted=expense.amount;
          SymbolDeleted=expense.symbol;
          }
        });

      expenseList=expenseList.filter(
        function (expense){
          if (idToDelete==expense.id)
          {
            return false;
          }
          else
          {
            return true;
          }

        });
        saveLists("expenseList");
//////////////////////////////////////////////////////////////////////////////////
totalExpenses=deleteBySymbol(totalExpenses,SymbolDeleted,AmountDeleted);
saveLists("totalExpenses");
//////////////////////////////////////////////////////////////////////////////////
expenseStatPlaces=deleteByPlaceAndSymbol(expenseStatPlaces,PlaceDeleted,SymbolDeleted,AmountDeleted);
saveLists("expenseStatPlaces");
//////////////////////////////////////////////////////////////////////////////////
expenseDollar=deleteByPlaceAndSymbol(expenseDollar,PlaceDeleted,SymbolDeleted,AmountDeleted);
expenseEuro=deleteByPlaceAndSymbol(expenseEuro,PlaceDeleted,SymbolDeleted,AmountDeleted);
expensePound=deleteByPlaceAndSymbol(expensePound,PlaceDeleted,SymbolDeleted,AmountDeleted);
expenseYen=deleteByPlaceAndSymbol(expenseYen,PlaceDeleted,SymbolDeleted,AmountDeleted);
expenseRupee=deleteByPlaceAndSymbol(expenseRupee,PlaceDeleted,SymbolDeleted,AmountDeleted);
saveLists("expenseDollar");
saveLists("expenseEuro");
saveLists("expensePound");
saveLists("expenseYen");
saveLists("expenseRupee");
}

/////////////////////////////////////////////////////////
////////////////////////CONTROLLER///////////////////////
/////////////////////////////////////////////////////////
//CONNECTS MODEL AND VIEW TOGETHER:
//1)RESPONDS TO EVENTS FROM THE VIEW (LIKE BUTTONS CLICKS)
//2)TEELS THE MODEL TO UPDATE ITS DATA (AND THE VIEW TO RE-RENDER)

const addExpenseButton=()=>{
  //Getting the value of name box
  let nameBox=document.getElementById("nameBox");
  let name=nameBox.value;

  //Getting the value of date box
  let dateBox=document.getElementById("dateBox");
  let date=dateBox.value;

  //A bit of code to remove the by default T of date-time-local input element
  date=date.replace("T", " ");

  //Getting the value of symbol box
  let symbolBox=document.getElementById("symbols");
  let symbol=symbolBox.value;

  //Getting the value of amount box
  let amountBox=document.getElementById("amountBox");
  let amount=amountBox.value.split(symbol)[0];
  amount=Number(amount);

  if (isNaN(amount))
  {
    alert("Please enter the amount of your expense")
  }
  else if (name=="")
    {
      alert("Please enter a name for your expense")
    }
    else
    {
      addExpense(name,date,amount,symbol);
      statsTotalAmount(amount,symbol);
      statsByPlace(name,amount,symbol);
      statsByAmounts(name,amount,symbol);
    
      amountBox.value='';
      symbolBox.value='';
      nameBox.value='';
      dateBox.value='';
      render();
    }
}

const deleteExpenseButton=(event)=>{
    const deleteButton = event.target; //!!!!!
    const idToDelete = deleteButton.id;


  removeItemsFromExpenseLists(idToDelete);
  render();
  }

///////////////////////////////////////////////////
////////////////////////VIEW///////////////////////
///////////////////////////////////////////////////
//CONTAINS ALL THE CODE THAT MANAGES VISUAL//
const render=()=>{
  if (expenseList.length==0)
  {
    document.getElementById("expense-list").innerHTML = '';
    let noExpenses=document.createElement("div");
    noExpenses.innerText="No expenses added yet!";
    noExpenses.classList.add("no-expenses");
    document.getElementById("expense-list").appendChild(noExpenses);
  } 
  else 
  {
  //reseting the expense list
  document.getElementById("expense-list").innerHTML = '';

  //re-endering the expense list
  expenseList.forEach(
    function (expense){

      //Create div for name
      let nameDiv=document.createElement("div");
      nameDiv.innerText=expense.name;
      nameDiv.classList.add("expense-item");
      
      //Create div for date
      let dateDiv=document.createElement("div");
      dateDiv.innerText=expense.date;
      dateDiv.classList.add("expense-item");

      //Create div for amount
      let amountDiv=document.createElement("div");
      amountDiv.innerText=expense.amount +" "+expense.symbol;
      amountDiv.classList.add("expense-item");

      //Create div for button
      let deleteButton=document.createElement("button");
      deleteButton.innerText="X";
      deleteButton.classList.add("expense-button");
      deleteButton.onclick=deleteExpenseButton;
      deleteButton.id=expense.id;

      //Create div container for name,date and button
      let expenseItemContainer=document.createElement("div");
      expenseItemContainer.classList.add("expense-item-container");

      //Create div container for button
      let expenseButtoncontainer=document.createElement("div");
      expenseButtoncontainer.classList.add("expense-button-container");

      //Get expense-list (HTML element)
      let expenselist=document.getElementById("expense-list");

      //Nesting expense-item-container into expense-list
      expenselist.appendChild(expenseItemContainer);

      //Nesting nameDiv, dateDiv, amountDiv and deleteButton container into expense-item-container
      expenseItemContainer.appendChild(nameDiv);
      expenseItemContainer.appendChild(dateDiv);
      expenseItemContainer.appendChild(amountDiv);
      expenseItemContainer.appendChild(expenseButtoncontainer);

      //Nesting deleteButton into its container
      expenseButtoncontainer.appendChild(deleteButton);

  });
    
  }

  
  if (totalExpenses.length==0)
  {
    document.getElementById("stat-totalAmount-table").innerHTML = '';
    let noExpenses=document.createElement("div");
    noExpenses.innerText="No expenses added yet!";
    noExpenses.classList.add("no-expenses");
    document.getElementById("stat-totalAmount-table").appendChild(noExpenses);
  }
  else
  {
    document.getElementById("stat-totalAmount-table").innerHTML = '';
    renderStatsTotal("stat-totalAmount-table",totalExpenses);
    
  }

if (expenseStatPlaces.length==0)
{
    document.getElementById("stat-place-table").innerHTML = '';
    let noExpenses=document.createElement("div");
    noExpenses.innerText="Please enter an expense!";
    noExpenses.classList.add("no-expenses");
    document.getElementById("stat-place-table").appendChild(noExpenses);
} 
else 
{
document.getElementById("stat-place-table").innerHTML = '';
renderStatsBy("stat-place-table",expenseStatPlaces);
}

if (expenseDollar.length==0 && 
  expenseEuro.length==0 &&
  expensePound.length==0 &&
  expenseYen.length==0 &&
  expenseRupee.length==0)
{
    document.getElementById("stat-amount-table").innerHTML = '';
    let noExpenses=document.createElement("div");
    noExpenses.innerText="Please enter an expense!";
    noExpenses.classList.add("no-expenses");
    document.getElementById("stat-amount-table").appendChild(noExpenses);
}
else
{
  document.getElementById("stat-amount-table").innerHTML = '';
  renderStatsBy("stat-amount-table",expenseEuro);
  renderStatsBy("stat-amount-table",expenseDollar);
  renderStatsBy("stat-amount-table",expensePound);
  renderStatsBy("stat-amount-table",expenseYen);
  renderStatsBy("stat-amount-table",expenseRupee);
}


}

const renderStatsTotal=(table,array)=>{
  array.forEach(
    function (item) {
    let statPlaceEntryContainer=document.createElement("div");
    statPlaceEntryContainer.classList.add("stat-entry-container");

    let statCurrencyTotal=document.createElement("div");
    statCurrencyTotal.innerText=item.amount + " " + item.symbol;
    statCurrencyTotal.classList.add("stat-total");

    statPlaceEntryContainer.appendChild(statCurrencyTotal);

    document.getElementById(table).appendChild(statPlaceEntryContainer);

  });
}

const renderStatsBy=(table,array)=>{
  array.forEach(
    function (item) {
      let statPlaceEntryContainer=document.createElement("div");
      statPlaceEntryContainer.classList.add("stat-entry-container");
      
      let statPlace=document.createElement("div");
      statPlace.innerText=item.name;
      statPlace.classList.add("stat-place");
      
      let statAmount=document.createElement("div");
      statAmount.innerText=item.amount+" "+item.symbol;
      statAmount.classList.add("stat-amount");

      statPlaceEntryContainer.appendChild(statPlace);
      statPlaceEntryContainer.appendChild(statAmount);
      
      document.getElementById(table).appendChild(statPlaceEntryContainer);
    }
  );
}
render();




