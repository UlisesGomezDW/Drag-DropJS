var firebaseConfig = {
  apiKey: "AIzaSyCNJIOSuXToNzdJN3snsOI0ps-JMu3p9Yo",
  authDomain: "farmacia-4d567.firebaseapp.com",
  databaseURL: "https://farmacia-4d567.firebaseio.com",
  projectId: "farmacia-4d567",
  storageBucket: "farmacia-4d567.appspot.com",
  messagingSenderId: "657306347202",
  appId: "1:657306347202:web:65afe180c5fec7dc323d5b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const list = document.getElementById("lista");

Sortable.create(list, {
  animation: 150,
  chosenClass: "seleccionado",
  // ghostClass: "fantasma"
  dragClass: "drag",

  onEnd: () => {
    console.log("Se inserto un elemento");
  },
  group: "lista-personas",
  store: {
    // Guardamos el orden de la lista
    set: sortable => {
      const orden = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, orden.join("|"));
    },

    // Obtenemos el orden de la lista
    get: sortable => {
      const orden = localStorage.getItem(sortable.options.group.name);
      return orden ? orden.split("|") : [];
    }
  }
});

const setData = document.getElementById("setdata");
db.collection("data").onSnapshot(async querySnapshot => {
  await querySnapshot.forEach(async serviceDoc => {
    setData.innerHTML = "";
    const serviceData = await serviceDoc.data();
    setData.innerHTML += `<div class="persona">
    <div class="foto">
      <img src="images/1.png" alt="" />
    </div>
    <div class="nombre">
      <div>
        <p class="label">Nombre</p>
        <p class="dato">${serviceData.name}</p>
      </div>
    </div>
    <div class="edad">
      <p class="label">Edad</p>
      <p class="dato">25</p>
    </div>
    <div class="correo">
      <div class="label">Correo</div>
      <p class="dato">${serviceData.name}</p>
    </div>
  </div>`;
  });
});
