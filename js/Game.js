class Game {
  constructor() {
   this.resettitle=createElement("h2");
   this.resetbutton=createButton("");
   this.titulodoplacar=createElement("h2");
this.posicao1=createElement("h2");
this.posicao2=createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resettitle.html("reiniciar jogo");
    this.resettitle.class("resetText");
    this.resettitle.position(width / 2 + 200, 40);
    this.resetbutton.class("resetButton")
    this.resetbutton.position(width / 2 + 230, 100);
    this.titulodoplacar.html("placar");
    this.titulodoplacar.class("resetText");
    this.titulodoplacar.position(width / 3 - 60,40);
    this.posicao1.class("leadersText");
    this.posicao2.class("leadersText");
    this.posicao1.position(width / 3-50,80);
this.posicao2.position(width /3-50,130);
  
  }

  play() {

this.reset();

    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      this.mostrarplacar();
      var index=0;
      for(var playerjogador in allPlayers){

var x =allPlayers[playerjogador].positionX;
var y= height-allPlayers[playerjogador].positionY;
cars[index-1].position.x=x
cars[index-1].position.y=y


      }
this.movimento();
      drawSprites();

    }
  
  }

 
movimento () {
if (keyIsDown(UP_ARROW)){

player.positionY=player.positionY+5;
player.update()
}
if (keyIsDown(DOWN_ARROW)){

  player.positionY=player.positionY-5
  player.update()
  }
  if (keyIsDown(LEFT_ARROW)){

    player.positionX=player.positionX-5
    player.update()
    }
    if (keyIsDown(RIGHT_ARROW)){

      player.positionX=player.positionX+5
      player.update()
      }
}

reset(){
this.resetbutton.mousePressed(()=>{

database.ref("/").set({
  gameState:0,
  playerCount:0,
  players:{}
})
window.location.reload();




})


}

mostrarplacar(){
var jogador1;
var jogador2;
var jogadores=Object.values(allPlayers);
if(jogadores[0].rank===0&&jogadores[1].rank===0 ||jogadores[0].rank===1){
jogador1=jogadores[0].rank+"&emsp;"+ jogadores[0].name+"&emsp;"+jogadores[0].score;
jogador2=jogadores[1].rank+"&emsp;"+ jogadores[1].name+"&emsp;"+jogadores[1].score;

}
if(jogadores[1].rank===1){
  jogador2=jogadores[0].rank+"&emsp;"+ jogadores[0].name+"&emsp;"+jogadores[0].score;
jogador1=jogadores[1].rank+"&emsp;"+ jogadores[1].name+"&emsp;"+jogadores[1].score;


}

this.posicao1.html(jogador1);
this.posicao2.html(jogador2);


 

}
}

