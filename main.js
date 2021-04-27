$(document).ready(function(){
  $("#btn1").click(pretvoriBin);
  $("#btn2").click(pretvoriDek);
  $("#btn3").click(broadcast);
  $("#btn4").click(brojRacunara);
  $("#btn5").click(daLiJeRac);
  $("#btn6").click(dali2adr);
  $("#btn7").click(napraviTabelu);
  $("#btn8").click(popuniTabelu);
});

function pretvoriBin() {
  let bin = $("#bin").val();
  while(bin.length < 32){
    bin = "0" + bin;
  }
  $("#postupak1").html("");
  $("#postupak1").append("<p>Postupak:</p>");
  let delovi = [bin.substring(0, 8),bin.substring(8, 16),bin.substring(16, 24),bin.substring(24, 32)];
  let p1 = document.createElement('p');
  delovi.forEach((item, i) => {
    if(i!=3) p1.textContent += item + " | ";
    else p1.textContent += item;
  });
  $("#postupak1").append(p1);
  delovi.forEach((item, i) => {
    let pom = document.createElement('p');
    pom.textContent = item + " -> " + parseInt(item, 2);
    $("#postupak1").append(pom);
  });
  let p2 = document.createElement('p');
  delovi.forEach((item, i) => {
    if(i!=3) p2.textContent += parseInt(item, 2) + ".";
    else p2.textContent += parseInt(item, 2);
  });
  $("#postupak1").append(p2);
}

function pretvoriDek() {
  $("#postupak2").html("");
  $("#postupak2").append("<p>Postupak:</p>");
  let dek = $("#dek").val();
  let delovi = dek.split(".");
  let rez = "";
  delovi.forEach((item, i) => {
    let pom = document.createElement('p');
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez += ipom;
    pom.textContent = item + " -> " + ipom;
    $("#postupak2").append(pom);
  });
  $("#postupak2").append(`<p>${rez}</p>`);
}

function broadcast() {
  $("#postupak3").html("");
  $("#postupak3").append("<p>Postupak:</p>");
  let dek = $("#ipmask").val();
  let delovi = dek.split(".");
  let mask = delovi[3].split("/")[1];
  delovi[3] = delovi[3].split("/")[0];
  let rez = "";
  delovi.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez += ipom;
  });
  $("#postupak3").append(`<p>Ip u binarnom: ${rez}</p>`);
  let prveMask = rez.substring(0, Number(mask));
  $("#postupak3").append(`<p>Prve ${mask} cifre: ${prveMask}</p>`);
  let mrezna = prveMask + String(0).repeat(32 - Number(mask));
  $("#postupak3").append(`<p>Mrezna adresa u binarnom: ${mrezna}</p>`);
  let emisiona = prveMask + String(1).repeat(32 - Number(mask));
  $("#postupak3").append(`<p>Emisiona adresa u binarnom: ${emisiona}</p>`);
  let deloviMrezna = [mrezna.substring(0, 8),mrezna.substring(8, 16),mrezna.substring(16, 24),mrezna.substring(24, 32)];
  let deloviEmisiona = [emisiona.substring(0, 8),emisiona.substring(8, 16),emisiona.substring(16, 24),emisiona.substring(24, 32)];
  let mreznaDek = "", emisionaDek = "";
  deloviMrezna.forEach((item, i) => {
    if(i!=3) {
      mreznaDek += parseInt(item, 2) + ".";
    }
    else {
      mreznaDek += parseInt(item, 2);
    }
  });
  deloviEmisiona.forEach((item, i) => {
    if(i!=3) {
      emisionaDek += parseInt(item, 2) + ".";
    }
    else {
      emisionaDek += parseInt(item, 2);
    }
  });
  $("#postupak3").append(`<p>Mrezna adresa: ${mreznaDek}</p>`);
  $("#postupak3").append(`<p>Emisiona adresa: ${emisionaDek}</p>`);
}

function brojRacunara() {
  $("#postupak4").html("");
  $("#postupak4").append("<p>Postupak:</p>");
  let maskDek = $("#brojRac").val();
  let delovi = maskDek.split(".");
  let rez = "";
  delovi.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez += ipom;
  });
  $("#postupak4").append(`<p>Maska u binarnom: ${rez}</p>`);
  let n = rez.match(/0/g).length;
  $("#postupak4").append(`<p> n = ${n} ubacimo u formulu 2<sup>n</sup> - 2</p>`);
  let brojRac = Math.pow(2, n)-2;
  $("#postupak4").append(`<p> Broj racunara u mrezi je ${brojRac}`);
}

function daLiJeRac(){
  $("#postupak5").html("");
  $("#postupak5").append("<p>Postupak:</p>");
  let dek = $("#moguce1").val();
  let delovi = dek.split(".");
  let mask = delovi[3].split("/")[1];
  delovi[3] = delovi[3].split("/")[0];
  let rez = "";
  delovi.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez += ipom;
  });
  $("#postupak5").append(`<p>Ip u binarnom: ${rez}</p>`);
  $("#postupak5").append(`<p>Posto je maska ${mask} gledamo poslednje ${32 - Number(mask)} cifre</p>`);
  let poslednje = rez.substring(Number(mask), 32);
  if (!(poslednje.indexOf('0') > -1 && poslednje.indexOf('1') > -1)) {
    $("#postupak5").append(`<p>Posto su poslednje ${32 - Number(mask)} cifre ${poslednje}, ovo ne moze biti adresa racunara</p>`);
  }
  else{
    $("#postupak5").append(`<p>Posto su poslednje ${32 - Number(mask)} cifre ${poslednje}, ovo moze biti adresa racunara</p>`);
  }
}

function dali2adr(){
  $("#postupak6").html("");
  $("#postupak6").append("<p>Postupak:</p>");
  let adresa1 = $("#adr1").val();
  let adresa2 = $("#adr2").val();
  let mask = $("#mask").val();

  let delovi1 = adresa1.split(".");
  let rez1 = "";
  let delovi2 = adresa2.split(".");
  let rez2 = "";
  let delovi3 = mask.split(".");
  let rez3 = "";
  delovi1.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez1 += ipom;
  });
  delovi2.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez2 += ipom;
  });
  delovi3.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez3 += ipom;
  });
  $("#postupak6").append(`<p>Adresa 1 u binarnom: ${rez1}</p>`);
  $("#postupak6").append(`<p>Adresa 2 u binarnom: ${rez2}</p>`);
  $("#postupak6").append(`<p>Maska u binarnom: ${rez3}</p>`);
  let m1 = rez3.match(/1/g).length;
  $("#postupak6").append(`<p>Posmatramo prvih ${m1} cifara prve i druge adrese da li su jednake, zbog maske.</p>`);
  let adr1 = rez1.substring(0, m1);
  let adr2 = rez2.substring(0, m1);
  if (adr1 == adr2) {
    $("#postupak6").append(`<p>Ove dve adrese su u istoj mrezi</p>`);
  }
  else{
    $("#postupak6").append(`<p>Ove dve adrese nisu u istoj mrezi</p>`);
  }
}

function napraviTabelu() {
  //$("#tabela")
  let brpm = Number($("#brpm").val());
  $("#tabela").html("<tr><th>Broj racunara</th><th>Adresa podmreze</th><th>Maska podmreze</th><th>Broadcast podmreze</th></tr>");
  for(let i=0;i<brpm;i++){
    let red = document.createElement("tr");
    let col1 = document.createElement("td");
    col1.innerHTML = '<input type="text" class="numrac" placeholder="Primer: 74">';
    red.appendChild(col1);
    let col2 = document.createElement("td");
    col2.classList = "ippod";
    red.appendChild(col2);
    let col3 = document.createElement("td");
    col3.classList = "maskapod";
    red.appendChild(col3);
    let col4 = document.createElement("td");
    col4.classList = "bcpod";
    red.appendChild(col4);
    $("#tabela").append(red);
  }
  $("#btn8").attr("disabled", false);
  $("#txt").css("display","block");
}

function popuniTabelu() {
  let osnovna = $("#baseip").val();
  let delovi = osnovna.split(".");
  let mask = delovi[3].split("/")[1];
  delovi[3] = delovi[3].split("/")[0];
  let rez = "";
  delovi.forEach((item, i) => {
    let ipom = Number(item).toString(2);
    while (ipom.length < 8) {
      ipom = "0" + ipom;
    }
    rez += ipom;
  });
  let ipbr = parseInt(rez, 2);
  let brpod = document.getElementsByClassName('numrac').length;
  for(let i=0; i <brpod;i++) {
    let vred = Number($(`.numrac:eq(${i})`).val());
    let br0 = Math.floor(Math.log2(vred+1))+1;
    let podip = ipbr;
    let podbc = ipbr + Math.pow(2,br0) - 1;
    ipbr += Math.pow(2,br0);
    document.getElementsByClassName('ippod')[i].textContent = (toDekIp(podip.toString(2)));
    document.getElementsByClassName('maskapod')[i].textContent = (toDekIp(getBinMask(br0)));
    document.getElementsByClassName('bcpod')[i].textContent = (toDekIp(podbc.toString(2)));
    //console.log(toDekIp(podip.toString(2)));
    //console.log(toDekIp(podbc.toString(2)));
    //console.log(toDekIp(getBinMask(br0)));
  }
}

function getBinMask(br0) {
  let mask = "";
  for(let i=0;i<32-br0;i++) mask += "1";
  for(let i=0;i<br0;i++) mask += "0";
  return mask;
}

function toDekIp(bin) {
  let delovi = [bin.substring(0, 8),bin.substring(8, 16),bin.substring(16, 24),bin.substring(24, 32)];
  while(bin.length < 32){
    bin = "0" + bin;
  }
  let dek = "";
  delovi.forEach((item, i) => {
    if(i!=3) dek += parseInt(item, 2) + ".";
    else dek += parseInt(item, 2);
  });
  return dek;
}

// s2 = 2^((int)log2(n+1) + 1);

// 73 => log2(74) = 6.189 = 6 + 1 = 7
// 2^7 = 128

// 30 => log2(31) = 4.954 = 4 + 1 = 5
// 2^5 = 32

// 31 => log2(32) = 5 = 5 + 1 = 6
// 2^6 = 64

//218.134.163.120
//218.134.165.16
//255.255.248.0
//218.134.160.1 - 218.134.167.254
//Maska u binarnom: 11011010100001101010001101111000

// 73 - 206.227.220.0   - 255.255.255.128 - 206.227.220.127
// 22 - 206.227.220.128 - 255.255.255.224 - 206.227.220.159
// 13 - 206.227.220.160 - 255.255.255.240 - 206.227.220.175
// 10 - 206.227.220.176 - 255.255.255.240 - 206.227.220.191
// 6  - 206.227.220.192 - 255.255.255.248 - 206.227.220.199

// 206.227.220.0/24
// br rac = 254
// 73 - 126 - 128 - /25 - 255.255.255.128
// 22 - 30 - 32 - /27 - 255.255.255.224
// 13 - 14 - 16 - /28 - 255.255.255.240
// 10 - 14 - 16 - /28 - 255.255.255.240
// 6 - 6 - 8 - /29 - 255.255.255.248

//218.134.165.0/24

// 56 - 218.134.165.0   - 255.255.255.192 - 218.134.165.63
// 48 - 218.134.165.64  - 255.255.255.192 - 218.134.165.127
// 31 - 218.134.165.128 - 255.255.255.192 - 218.134.165.191

// 56 - 62 - 64 - /26 - 255.255.255.192
// 48 - 62 - 64 - /26 - 255.255.255.192
// 31 - 62 - 64 - /26 - 255.255.255.192

// Ode baterija na fon, aj, pozdrav
//aa ok, aj onda sutra ce da radimo, nista onda pozdrav

//192.168.1.0/24

// 80
// 35
// 15
// 10

//https://lakimancic.github.io/mreze/
