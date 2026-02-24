let money = 1000;

const cars = [
  { name: "Toyota Supra", speed: 8, price: 0 },
  { name: "Nissan GTR", speed: 9, price: 3000 },
  { name: "Ferrari F8", speed: 10, price: 7000 },
  { name: "Lamborghini Huracán", speed: 11, price: 10000 }
];

let ownedCars = [cars[0]];
let currentCar = cars[0];

const missions = [
  { name: "Vencer 1 corrida", reward: 500, done: false },
  { name: "Ganhar 3000$", reward: 1000, done: false }
];

updateUI();

function updateUI() {
  document.getElementById("money").innerText = money;
  document.getElementById("currentCar").innerText = currentCar.name;
}

function startRace() {
  const screen = document.getElementById("screen");
  const enemySpeed = Math.floor(Math.random() * 5) + 6;

  screen.innerHTML = `<h2>🏁 Corrida iniciada!</h2>`;

  setTimeout(() => {
    if (currentCar.speed >= enemySpeed) {
      screen.innerHTML += `<p>Você venceu! 💥</p>`;
      money += 500;
      missions[0].done = true;
    } else {
      screen.innerHTML += `<p>Você perdeu 😢</p>`;
    }
    checkMissions();
    updateUI();
  }, 1000);
}

function openGarage() {
  const screen = document.getElementById("screen");
  screen.innerHTML = `<h2>🔧 Garagem</h2>`;

  cars.forEach(car => {
    const owned = ownedCars.includes(car);

    screen.innerHTML += `
      <p>
        ${car.name} | Velocidade: ${car.speed}
        ${
          owned
            ? `<button onclick="selectCar('${car.name}')">Usar</button>`
            : `<button onclick="buyCar('${car.name}')">Comprar (${car.price}$)</button>`
        }
      </p>
    `;
  });
}

function buyCar(name) {
  const car = cars.find(c => c.name === name);
  if (money >= car.price) {
    money -= car.price;
    ownedCars.push(car);
    updateUI();
    openGarage();
  } else {
    alert("Dinheiro insuficiente!");
  }
}

function selectCar(name) {
  currentCar = cars.find(c => c.name === name);
  updateUI();
}

function openMissions() {
  const screen = document.getElementById("screen");
  screen.innerHTML = `<h2>📜 Missões</h2>`;

  missions.forEach(m => {
    screen.innerHTML += `
      <p>
        ${m.done ? "✅" : "❌"} ${m.name} (Recompensa: ${m.reward}$)
      </p>
    `;
  });
}

function checkMissions() {
  if (money >= 3000) missions[1].done = true;

  missions.forEach(m => {
    if (m.done && !m.rewarded) {
      money += m.reward;
      m.rewarded = true;
    }
  });
}
