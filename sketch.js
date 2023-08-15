var spaceBG
var space
var world, earth
var spaceship
var ufoG1
var ufoG2
var ufo, ufoG1, ufoG2
var explode

var laser, laserbeam
var points = 0
var gameState ="play"

function preload() {
  spaceBG = loadImage("assets/spaceBackground.jpg")
  world = loadAnimation("assets/earth.png")
  spaceship = loadImage("assets/spaceship.png")
  ufo1 = loadImage("assets/ufo1.png")
  ufo2 = loadImage("assets/ufo2.png")
  heart = loadImage("assets/heart.png")
  explode = loadAnimation("assets/explode.png")
  laser = loadImage("assets/laser.png")

}

function setup() {
  createCanvas(1900, 900);

  space = createSprite(width / 2, height / 2)
  space.addImage("background", spaceBG)
  space.velocityX = -4

  earth = createSprite(200, height / 2)
  earth.addAnimation("planet", world)
  earth.addAnimation("explosion", explode)
  earth.rotation = 90
  earth.scale = 0.5
  earth.debug = true
  earth.setCollider("rectangle", -100, 150, earth.width*3, height / 2)

  spaceCraft = createSprite(width / 5, height / 2, 100, 100)
  spaceCraft.addImage("ship", spaceship)
  spaceCraft.rotation = 90
  spaceCraft.scale = 0.75

  ufoG1 = createGroup()
  ufoG2 = createGroup()
  laserG = createGroup()




}


function draw() {
  background(51);
  if(gameState=="play"){

  
  if (space.x < 640) {
    space.x = width / 2
  }

  console.log(earth.width)




  spaceCraft.y = mouseY
  multipleUfo()

  for (var i = 0; i < ufoG1.length; i++) {
    if (earth.isTouching(ufoG1[i])) {
      ufoG1[i].destroy()
      earth.changeAnimation("explosion", explode)
      gameOver();
      //earth.scale= 3
    }
  }

  for (var i = 0; i < ufoG2.length; i++) {
    if (earth.isTouching(ufoG2[i])) {
      ufoG2[i].destroy()
      earth.changeAnimation("explosion", explode)
      earth.scale=10
     gameState="end"
   
      

    }
  }
  for (var i = 0; i < laserG.length; i++) {
    for (var j = 0; j < ufoG1.length; j++) {
      if (laserG[i].isTouching(ufoG1[j])) {
        ufoG1[j].destroy()
        points += 10
      }
    }
  }
  for (var i = 0; i < laserG.length; i++) {
    for (var j = 0; j < ufoG2.length; j++) {
      if (laserG[i].isTouching(ufoG2[j])) {
        ufoG2[j].destroy()
        points += 20
      }
    }
  }
}
if(gameState=="end"){
gameOver()
laserG.destroyEach()
ufoG1.destroyEach()
ufoG2.destroyEach()

spaceship.destroy()
}


  drawSprites()
  textSize(35)
  fill("red")
  text("Score: " + points, width - 200, 100)
if(gameState=="end"){
  text("Score: " + points, width - 200, 100)
}
 
}



function multipleUfo() {
  if (frameCount % 50 == 0) {
    ufo = createSprite(width - 150, height - 200, 50, 50)
    x = Math.round(random(1, 2))
    ufo.debug = true



    if (x == 1) {
      ufo.addImage("disc", ufo1)
      ufo.scale = 0.3
      ufo.velocityX = -5
      ufo.setCollider("rectangle", 0, 0, ufo.width - 80, ufo.height - 280)
      ufoG1.add(ufo)
    } else if (x == 2) {
      ufo.addImage("disc2", ufo2)
      ufo.scale = 0.2
      ufo.velocityX = -7
      ufo.setCollider("rectangle", 0, 0, ufo.width - 100, ufo.height - 200)
      ufoG2.add(ufo)
    }



    ufo.y = random(100, height - 100)


  }
}




function laserShoot() {
  laserbeam = createSprite(spaceCraft.x, spaceCraft.y)
  laserG.add(laserbeam)
  laserbeam.addImage(laser)
  laserbeam.visible = true
  laserbeam.velocityX = 5
  laserbeam.scale = 0.2
}

function gameOver() {
  Swal.fire({
    title: 'Game Over',
    text:  `your score was ${points} .    Save the world next time.`,
    imageUrl: 'https://img.freepik.com/free-photo/alien-arthropod-with-genetic-mutation-macro-generated-by-ai_188544-24660.jpg?t=st=1691669545~exp=1691673145~hmac=575aa1c31210fce7716d96f1dd3254a9d2ccafa593df7290b1e75beb89f275a5&w=1060',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
}

function keyReleased() {
  if (keyCode == 32) {
    laserShoot()
  }
}