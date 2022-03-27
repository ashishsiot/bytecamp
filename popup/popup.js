const custom = document.querySelector('#custom');
const check = document.querySelector('#check');
const form = document.querySelector('.pass-type');
const passGen = document.querySelector('#passGen');
const generate = document.querySelector("#generate");
const hidden = document.querySelector(".hidden");
const copy = document.querySelector("#copyit");
const save_password = document.querySelector("#save");
const showError = document.querySelector("#show_error");
let allpassword = [];

window.onload = function(){
  theme_value = localStorage.getItem("theme");
  if(theme_value == "null" || theme_value == "dark")
  {
    document.querySelector('#manage-cssstyle').href = "dark_mode.css";
  }
  else if(theme_value == "light")
  {
    document.querySelector('#manage-cssstyle').href = "style.css";
  }
}


check.addEventListener('click', () => {
  custom.classList.toggle('d-none');
  if (custom.classList.contains('d-none')) {
    form.reset();
  }

});







// ------------------------------------------------------

// To get the active tab and get its URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "get_url" }, response => {
    // console.log(response.url, response.user);
    $("#url").val(response.url);
    $("#user").val(response.user);
  })
})

// To save a password
$("#save").click(($e) => {
  $e.preventDefault();
  save_password.innerHTML = "SAVED";
  let pwd_details = {
    url: $("#url").val(),
    user: $("#user").val(),

    pass: $("#passGen").val()
  };
  chrome.runtime.sendMessage(
    {
      action: "save_pwd_details",
      data: pwd_details
    },
    response => console.log(response));
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id,
      {
        action: "set_user_data",
        user: $("#user").val().trim(),
        password: $("#passGen").val().trim()
      });
  })
});

// Manage passwords
$("#manage").click(() => {
  //chrome.tabs.create({ url: "../managePass/index.html" });
  chrome.tabs.create({ url: "../managePass/login.html" });
});
