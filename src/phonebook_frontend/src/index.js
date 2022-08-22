import { Null } from "@dfinity/candid/lib/cjs/idl";
import { phonebook_backend } from "../../declarations/phonebook_backend";

//action when someone add a conatct to the directory
document.getElementById("add_contact_form").addEventListener("submit", async (e) => {
  e.preventDefault();
  //clearing the msg field
  document.getElementById("error").innerText = " ";

  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  const phone_number = document.getElementById("phone_number").value.toString();

  const desc = document.getElementById("desc").value.toString();

  let Entry = {
    desc: desc,
    phone: phone_number
  }

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const response = await phonebook_backend.insert(name, Entry);

  button.removeAttribute("disabled");

  document.getElementById("response").innerText = response;

  document.getElementById("add_contact_form").reset();

  return false;
});

//action for search conatct form 
const search_form = document.getElementById("search_contact_form")
search_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("search_name").value.toString();
  const data = await phonebook_backend.lookup(name);
  console.log(data);
  if (Object.keys(data).length === 0) {
    document.getElementById("error").innerText = "No such Contact : " + name;
    document.getElementById("search_name_data").value = "";
    document.getElementById("search_phone_number").value = "";
    document.getElementById("search_desc").value = "";
  } else {
    document.getElementById("error").innerText = " ";
    document.getElementById("search_name_data").value = name;
    document.getElementById("search_phone_number").value = data[0].phone;
    document.getElementById("search_desc").value = data[0].desc;
  }

  const search_name_data = document.getElementById("search_name_data").value;
  if (search_name_data.length != 0) {
    document.getElementById("Update").disabled = false;
    document.getElementById("delete").disabled = false;
  }

});

const show_all_contact = document.getElementById("show_all_contact");

show_all_contact.addEventListener("click", async (e) => {
  e.preventDefault();
  //clearing the field 
  document.getElementById("contact_conatainer").innerHTML = "";

  const entries = await phonebook_backend.entries();
  document.getElementById("show_contacts").style.display = "block";
  for (let i in entries) {
    const name = entries[i][0];
    const desc = entries[i][1].desc;
    const phone = entries[i][1].phone;

    let html = "<tr><td>" + name + "</td><td>" + desc + "</td><td>" + phone + "</td></tr>";
    document.getElementById("contact_conatainer").innerHTML += html;
  }
});


document.getElementById("Update").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("search_name_data").value.toString();
  const phone = document.getElementById("search_phone_number").value.toString();
  const desc = document.getElementById("search_desc").value.toString();

  let entry = {
    desc: desc,
    phone: phone
  }

  const update_responce = await phonebook_backend.updateContact(name, entry);
  window.alert("Contact updated");
  location.reload();

});

document.getElementById("delete").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("search_name_data").value.toString();

  const delete_response = await phonebook_backend.deleteContact(name);
  window.alert("Contact is deleted!!");
  location.reload();
});
