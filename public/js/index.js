async function card(ids) {
  let id = ids;
  let car = await axios({
    method: 'post',
    url: '/card',
    data:{id:id}
  })
  
  let card = car.data;

  if (car.errors) {
    console.log(car.errors)
  } else {
    if (card.length > 0) {
      let modal_card = document.querySelector('#modal_card');
      let modal_out = document.querySelector('#modal_out');
      let modal_edit = document.querySelector('#input_edit');

      let row = "<div class='row'>"

      card.forEach(value => {
        row += `
        <div class="col">${value.po}</div>
        <div class="col">${value.rate}</div>
        <div class="col">${value.card}</div>
        <div class="col">${value.color}</div>
        <div class="col">${value.total}</div>
      <input type="hidden" name="id" value="${value._id}" > `
      })
      
      
      
      row += "</div>"
      modal_card.innerHTML = row;
      modal_out.innerHTML = row;
      modal_edit.innerHTML = row;
    }
  }
}

//rate modal / update card rate color
let rowId = document.querySelector("#rowId");
rowId.addEventListener("submit", async function (e) {
  e.preventDefault();

  let data = {};
  Array.from(this).map((value) => {
    data[value["name"]] = value["value"];
  });

  let aaa = await axios({
    method: "post",
    url: "/row_id",
    data: data,
  });
  if (!aaa == "") {
    location.reload();
  }
});

//out modal / update out

let outId = document.querySelector("#outId");
outId.addEventListener("submit", async function (e) {
  e.preventDefault();

  let data = {};
  Array.from(this).map((value) => {
    data[value["name"]] = value["value"];
  });

  let aaa = await axios({
    method: "post",
    url: "/out_id",
    data: data,
  });
  if (!aaa == "") {
    location.reload();
  }
});


let rowI = document.querySelector("#rowI");
rowI.addEventListener("submit", async function (e) {
  e.preventDefault();

  let data = {};
  Array.from(this).map((value) => {
    data[value["name"]] = value["value"];
  });

  let aaa = await axios({
    method: "post",
    url: "/row_I",
    data: data,
  });

  if (!aaa == "") {
    location.reload();
  }
});

async function po(ids) {
  let id = ids;
  try {
    let data = await axios({
      method: "post",
      url: "/po",
      data: { id: id },
    });
    let poFind = data.data;

    if (data.error) {
      console.log(data.error);
    } else {
      if (poFind.length > 0) {
        let tbody = document.querySelector("#tbo");
        let po_header = document.querySelector("#po_header");

        let header = "<div class='row'>";
        let po;
        let rate;
        let card;
        let color;
        let total;

        poFind.forEach((value) => {
          po = value.inputId.po;
          rate = value.inputId.rate;
          card = value.inputId.card;
          color = value.inputId.color;
          total = value.inputId.total;
        });
        header += `
        <div class="col">${po}</div>
        <div class="col">${rate}</div>
        <div class="col">${card}</div>
        <div class="col">${color}</div>
        <div class="col">${total}</div>

`;
        header += "</div>";
        po_header.innerHTML = header;

        let tr = "<div>";
        poFind.forEach((value) => {
          tr += `<tr>
         
          <td class="text-warning">${value.date} </td>
          <td> ${value.output} </td>
         
        
          
          <td class="bg-danger" onclick="if( confirm('delete')== true){del('${value._id}')}" > delete </td>
          
         
          </tr>
          `;
        });
        tr += "</div>";
        tbody.innerHTML = tr;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function update(updateId) {
  let data = updateId;
  document.querySelector("#update_id").value = data;
}

async function del(deleteId) {
  let dele = await axios({
    method: "post",
    url: "/del",
    data: { id: deleteId },
  })
    .then((data) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

let search = document.querySelector("#search");
let search_placeholder = document.querySelector(".search_placeholder");
let timer;

search.addEventListener("keyup", function searchUp() {
  clearTimeout(timer);
  if (search.value) {
    search_placeholder.style.display = "none";
    timer = setTimeout(searchT, 500);
  }
});
search.addEventListener("keydown", function searchUp() {
  clearTimeout(timer);
  if (search.value) {
    search_placeholder.style.display = "none";
    timer = setTimeout(searchT, 200);
  }
});

async function searchT() {
  let searchPo = await axios({
    method: "post",
    url: "/search",
    data: { search: search.value },
  });
  let result = searchPo.data;

  if (result.errors) {
    let error = document.querySelector("#error");
    error.textContent = result.errors;
  } else {
    if (result.length > 0) {
      let ul = "<ul class='list-group'>";
      result.forEach((value) => {
        ul += `
        <li  class='list-group-item list-group-item-action'>
        <div class = "text-light bg-dark">PO : ${value.po} - rate : ${value.rate} - card : ${value.card} -color : ${value.color} - total : ${value.total}</div>
       <div class="d-flex justify-content-center"><button class="btn btn-info px-md-5" onclick="po('${value._id}')"  data-bs-toggle="modal" data-bs-target="#po">PO</button> 
        <button class="btn btn-warning px-md-5" onclick="card('${value._id}')"  data-bs-toggle="modal" data-bs-target="#out">out</button>
        <button class="btn btn-danger px-md-5" onclick="if( confirm('delete this PO ID')== true){de('${value._id}')}">delete</button></div>
        
        
        </li>
        
        `;
      });

      ul += "</ul > ";
      search_placeholder.innerHTML = ul;
      search_placeholder.style.display = "block";
    }
  }
}

async function de(delet) {
  let id = delet;
  let rowDelete = await axios({
    method: "post",
    url: "/row_delete",
    data: { id: id },
  });
  let data = rowDelete.data;
  if (rowDelete.error) {
    alert(rowDelete.error);
  } else {
    if (data.length > 0) {
      alert(`${data} is Delete `);
    }
  }
}


let balance = document.querySelectorAll('#balance')




balance.forEach(value => {

  if (value.textContent.includes('-')) {
   value.style.backgroundColor ='red'
  } else {
    value.style.backgroundColor='green'
    value.style.color='white'
  }
 
 

})


 







