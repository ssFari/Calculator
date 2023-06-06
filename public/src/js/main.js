/**
 * Navigasi
 */

function dateTimeELement() {
  const timeElements = document.getElementsByClassName('timeElement');
  const dateELements = document.getElementsByClassName('dateElement')
  const currentDate = new Date();
  // clock
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let amOrPm = "";
  // date

  function getMonthName(monthIndex) {
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    return monthNames[monthIndex];
  }


  let days = currentDate.getDay();
  let monthIndex = currentDate.getMonth();
  let months = getMonthName(monthIndex)
  let date = currentDate.getDate();
  let years = currentDate.getFullYear();
  let weekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Mengubah ke format waktu 12 jam

  if (hours >= 12) {
      amOrPm = "PM"
      hours = hours === 12 ? 12 : hours -12;
  }else{
      amOrPm = "AM";
      hours = hours === 0 ? 12 : hours;

  }
  // Menambahkan angka 0 di depan angka tunggal
  if (hours < 10) {
    hours = "0" + hours;
  }
    
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  // memberikan format agar dapat di setInterval dan dengan update setiap detiknya
  // clock
  const formattedTime = `<span> ${hours}:${minutes} <span>${amOrPm}</span> </span>`;
  // melakukan perulangan agar element dapat di pakai berulang
  for (let i = 0; i < timeElements.length; i++) {
    let timeElement = timeElements[i];
    timeElement.innerHTML = formattedTime; // menggunakan innerHTML agar menambahkan element baru
  }
  
  //date
  const formatDate = `<span>${weekdays[days]},${date}/${months}/${years} </span>`
  for (let i = 0; i < dateELements.length; i++) {
    let dateELement = dateELements[i];
    dateELement.innerHTML = formatDate;// menggunakan innerHTML agar menambahkan element baru
  }

}

// mdaysengulang function agar update sesuai waktu nyata tanpa di refresh
setInterval(dateTimeELement, 1000);

/**
 * Mencari Result Calculator
 */

// Fungsi untuk menghapus nilai dalam elemen input
function clearResult() {
  document.getElementById("resultCalculator").value = "";
}

// Fungsi untuk menjaga fokus pada elemen input
function keepInputFocus() {
  const inputElement = document.getElementById("resultCalculator");
  if (!document.hasFocus() || document.activeElement !== inputElement) {
    inputElement.focus();
  }
}

// Menambahkan event listener untuk menjaga fokus pada elemen input
document.addEventListener("click", keepInputFocus);
document.addEventListener("touchstart", keepInputFocus);


// Fungsi untuk menambahkan nilai ke dalam elemen input
function appendToResult(value) {
  const inputElement = document.getElementById("resultCalculator");
  const currentValue = inputElement.value;  

  // Memeriksa jika nilai pertama adalah operator matematika
  if (currentValue.length === 0 && (value === "*" || value === "/")) {
    return; // Tidak melakukan apa-apa jika nilai pertama adalah operator matematika
  }
  // Mengubah operator "x" menjadi ikon "×" dan operator "/" menjadi ikon "÷" saat diinput
  if (value === "*") {
    value = String.fromCharCode(215); // Karakter Unicode untuk ikon "×" (U+00D7)
  } else if (value === "/") {
    value = String.fromCharCode(247); // Karakter Unicode untuk ikon "÷" (U+00F7)
  }

  inputElement.value += value;
}

// Fungsi untuk menghitung hasil ekspresi matematika dalam elemen input
function calculateResult() {
  let result = document.getElementById("resultCalculator").value;

  // Menangani operator perkalian dan pembagian yang masuk dalam kondisi error
  result = result.replace(/×/g, "*").replace(/÷/g, "/");

  try {
    const calculatedResult = eval(result);

    if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
      // Menghapus nilai jika hasilnya NaN atau tak hingga
      clearResult();
    } else {
      // Menampilkan hasil evaluasi di elemen input
      document.getElementById("resultCalculator").value = calculatedResult;
    }
  } catch (error) {
    // Menampilkan pesan "Error" jika terjadi kesalahan dan menghapus nilai
   document.getElementById("resultCalculator").value = "Error";
  }
}

// ...

// Menambahkan event listener untuk menerima input dari keyboard
document.getElementById("resultCalculator").addEventListener("keydown", function(event) {
  const key = event.key;

  // Mengabaikan tombol selain angka, operator, tanda sama dengan, dan Backspace
  if (!(/[0-9+\-*/.=]|Backspace/).test(key)) {
    event.preventDefault();
    return;
  }

  // Mengabaikan tanda sama dengan (=) jika terdeteksi sebelumnya
  const currentValue = this.value;
  if (key === "=" && currentValue.includes("=")) {
    event.preventDefault();
    return;
  }

  // Menghapus karakter satu per satu jika tombol Backspace ditekan
  if (key === "Backspace") {
    event.preventDefault();
    const updatedValue = currentValue.slice(0, -1); // Menghapus karakter terakhir
    this.value = updatedValue;
    return;
  }

  // Menambahkan nilai dari keyboard ke dalam elemen input
  appendToResult(key);

  // Menghitung hasil jika tanda sama dengan (=) ditekan
  if (key === "=" || key === "Enter") {
    event.preventDefault();
    calculateResult();
  }
});

function addActiveClass() {
  const ssAppElement = document.getElementById("ssApp");
  const ssCalculatorElement = document.querySelector(".ss-calculator");
  const ssBack = document.querySelector(".ss-back");

  ssAppElement.addEventListener("click", function() {
    ssCalculatorElement.classList.add("ss-active");
  });

  if (ssBack) {
    ssBack.addEventListener("click", function () {  
      ssCalculatorElement.classList.remove("ss-active");
    });
  }
}

addActiveClass();


addActiveClass();
