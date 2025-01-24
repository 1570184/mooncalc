var damage = [] // Это варовская таблица урона + 10-й уровень посчитанный

damage[1] = [ 0, 0.04, 0.02, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005 ] // первая высота
damage[2] = [ 0, 0.37, 0.19, 0.13, 0.1, 0.08, 0.07, 0.06, 0.05, 0.05, 0.04 ] // вторая высота
damage[3] = [ 0, 2, 0.66, 0.44, 0.33, 0.27, 0.22, 0.19, 0.17, 0.15, 0.12 ] // третья высота
damage[4] = [ 0, 2, 2, 2, 0.82, 0.65, 0.55, 0.47, 0.41, 0.37, 0.3 ] // четвёртая высота
damage[5] = [ 0, 2, 2, 2, 2, 2, 2, 0.94, 0.83, 0.74, 0.59 ] // пятая высота

const levelBg = [] // Это фоны для разных уровней

levelBg[1] = [ 'url("https://i.ibb.co/Bsf4YW7/image.png")' ]
levelBg[2] = [ 'url("https://i.ibb.co/smND5d4/image.png")' ]
levelBg[3] = [ 'url("https://i.ibb.co/r6cFKDz/image.png")' ]
levelBg[4] = [ 'url("https://i.ibb.co/Q9CVRq3/image.png")' ]
levelBg[5] = [ 'url("https://i.ibb.co/Z8WzxQ6/image.png")' ]

if (localStorage.getItem("storedAge")) { $("#age").val(localStorage.getItem("storedAge")); }
if (localStorage.getItem("storedSkill")) { $("#skill").val(localStorage.getItem("storedSkill")); }
if (localStorage.getItem("storedLevel")) { $("#level").val(localStorage.getItem("storedLevel"));}
if (localStorage.getItem("storedFeather")) { $("#feather").val(localStorage.getItem("storedFeather"));}

var currHp;
var currIter = 1;
$("#warning").hide();

anyChange();

function anyChange() {
  
  age = $( "#age option:selected" ).val();
  skill = $( "#skill" ).val();
  level = $( "#level" ).val();
  var hp = $( "#hp" ).val();
  var feather = $( "#feather" ).val();
  
  localStorage.setItem("storedAge", age); console.log (localStorage.getItem("storedAge"));
  localStorage.setItem("storedSkill", skill); console.log (localStorage.getItem("storedSkill"));
  localStorage.setItem("storedLevel", level); console.log (localStorage.getItem("storedLevel"));
  localStorage.setItem("storedFeather", feather); console.log (localStorage.getItem("storedFeather"));
  
  if (age > 1) {
    $("#feather").attr("max", 2);
      if (feather > 2) {$("#feather").val(2);}
  } else {
    $("#feather").attr("max", 10);
  }
  console.log($("#feather").attr("max"));
  
  if (feather > 0) {
    $("#feather").css("border", "solid, green")
  } else {
    $("#feather").css("border", "inherit")
         }

  var getCell = damage [level][skill];
  var result = hp-(Math.round(currIter*getCell*age*(100*(1-feather*0.02))));

  
  if ( result<1 ) {
    output = "&#x1F480;";
    $("#strip2").css("width", "0%")
    currHp = 0;
  } else {
    output = result + "%";
    $("#strip2").css("width", output)
    currHp = result;
  }
  
  $("#result").html (output);
  $("#strip2").css("width", output)
  captionInfo(level, skill, age, feather, result)
  
}  // общая для всех изменений функция

function captionInfo (height, skl, ofage, buff, spare) {
    if (ofage > 1) {
    var ageText = "котёнка";
  } else {
    var ageText = "взрослого кота";
  }
  
  if (buff == 0) {
    var buffText = "."
  } else {
    var buffText = " и " + buff + " перьями"
  }
  
  $("#caption").text("...останется после " + currIter + "-го падения с " + height + " высоты у " + ageText + " с " + skl + " ЛУ" + buffText);
  
  if (spare < 10 && spare > 0 && height > 2 ) {
    $("#warning").show()
  } else { $("#warning").hide() }
  
}

$( ".param" ).change(function(){ 
  currIter=1;
  anyChange() 
});

$("#reset").click(function(){ 
    currIter=0;
    $("#hp").val(100);
    currHp = 100;
    $("#result").text("100%");
    $("#strip2").css("width", "100%")
    $("#warning").hide()
    $("#caption").text("Снова здоровы! Откуда идём падать?");
}) // Сброс хп до 100%

$("#iteration").click(function(){ 
    currIter++;
    anyChange();
})