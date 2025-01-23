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

function anyChange() {
  
  console.log("anyChange");
  
  var age = $( "#age option:selected" ).val();
  var skill = $( "#skill" ).val();
  var level = $( "#level" ).val();
  var hp = $( "#hp" ).val();
  var feather = $( "#feather" ).val();
  
  var getCell = damage [level][skill];
  var result = hp-Math.round(getCell*age*(100*(1-feather*0.02)));
  
  console.log(result);
  
  if ( result<1 ) {
    output = "&#x1F480;";
    $("#strip2").css("width", "0%")
  } else {
    output = result + "%";
    $("#strip2").css("width", output)
  }
  
  $("#result").html (output);
  $("#strip2").css("width", output)
  
  if (age > 1) {
    var ageText = "котёнка";
  } else {
    var ageText = "взрослого кота";
  }
  
  $("#caption").text("...останется после падения с " + level + " высоты у " + ageText + " с " + skill + " ЛУ");
} // общая для всех изменений функция

$( ".param" ).change(function(){ anyChange() });
$("#reset").click(function(){ 
    $("#strip2").css("width", "100%")
    $("#result").text("100%");
    $("#hp").val(100);
    $("#caption").text("Снова здоровы! Идём падать?");
})