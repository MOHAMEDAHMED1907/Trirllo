const contentContainer = document.querySelector(".content");
const user = document.querySelector(".user-nav__user");
const userMessages = document.querySelector(".user-nav__messages");

const overlay = document.querySelector(".overlay");
const modal1 = document.querySelector(".user-menu");
const modal2 = document.querySelector(".messages-box");

//let fullTextMessage ;
const showModal = function (modal) {
  closeModal();
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const closeModal = function () {
  modal1.classList.add("hidden");
  modal2.classList.add("hidden");
  overlay.classList.add("hidden");
};

const hideMessage = function (modal) {
  modal.classList.add("hidden");
};
const fullMessageListener = function () {
  const modalCloseButton = document.querySelector(".close-modal");
  const modalFullMessage = document.querySelector(".fullMessage");

  modalCloseButton.addEventListener(
    "click",
    hideMessage.bind(this, modalFullMessage)
  );
};

overlay.addEventListener("click", function () {
  closeModal();
});
user.addEventListener("click", showModal.bind(this, modal1));
userMessages.addEventListener("click", showModal.bind(this, modal2));

const createFullMessage = async function (mesg) {
  const modalFullMessage = document.querySelector(".fullMessage");
  if (modalFullMessage) hideMessage(modalFullMessage);
  const htmlCont = ` <div class="modal fullMessage">
        <button class="close-modal">&times;</button>
        <div class=fullMessage__sender>
        <h1 class="fullMessage__sender__name">${mesg.senderName}</h1>
        <img  src="${mesg.senderPhoto}" alt="sender photo"class="fullMessage__sender__photo"
              />
        </div>
        <p class="fullMessage__text">
        ${mesg.text}
        </p>
        <span class="fullMessage__date">${mesg.date}</span>
      <div class ="fullMessage__buttons">
      <button class="fullMessage__react" title="react">react</button>
      <button class="fullMessage__reply" title="reply">reply</button>
      </div>
      </div>
`;
  await contentContainer.insertAdjacentHTML("afterbegin", htmlCont);
  fullMessageListener();
};
modal2.addEventListener("click", function (e) {
  const message = e.target.closest(".messages-box__mesg");
  if (!message) return;
  const mesg = {
    text: message.children[0].textContent,
    senderPhoto: message.children[1].children[0].getAttribute("src"),
    senderName: message.children[1].children[1].textContent,
    date: message.children[1].children[2].textContent,
  };
  createFullMessage(mesg);
});
