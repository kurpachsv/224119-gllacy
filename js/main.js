(function () {
  var link = document.querySelector(".callback-link");

  var popup = document.querySelector(".modal-callback");
  var close = popup.querySelector(".modal-close");

  var form = popup.querySelector("form");
  var username = popup.querySelector("[name=username]");
  var email = popup.querySelector("[name=email]");
  var message = popup.querySelector("[name=message]");

  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("data");
    storage = JSON.parse(storage);
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");

    if (storage) {
      if (storage.username) {
        username.value = storage.username;
        if (storage.email) {
          email.value = storage.email;
          message.focus();
        } else {
          email.focus();
        }
      } else {
        username.focus();
      }
    }
  });

  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
  });

  form.addEventListener("submit", function (evt) {
    if (!username.value || !email.value || !message.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        storage = JSON.stringify( {
          username: username.value,
          email: email.value,
        });
        localStorage.setItem("data", storage);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
      }
    }
  });
}());
