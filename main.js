import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' //importing the OrbitControls
// Create a scene
const scene = new THREE.Scene()

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
renderer.render(scene, camera)

//createing an object
const donutTexture = new THREE.TextureLoader().load('https://github.com/asherred123/leeweijie.github.io/blob/main/images/donut_texture.jpg?raw=true')
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({map: donutTexture})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

//createing a light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)
// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

//createing a background
const spaceTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/asherred123/leeweijie.github.io/main/images/donuts.webp')
scene.background = spaceTexture

//createing a avatar
const MeTexture = new THREE.TextureLoader().load('https://github.com/asherred123/leeweijie.github.io/blob/main/images/me.jpg?raw=true')
const Me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: MeTexture })
)
scene.add(Me)
Me.position.z = -5
Me.position.x = 3


//creating a donut ball 
const ballTexture = new THREE.TextureLoader().load('https://github.com/asherred123/leeweijie.github.io/blob/main/images/ball_texture.jpg?raw=true')
const donut_ball = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: ballTexture })
)
scene.add(donut_ball)
donut_ball.position.z = 30
donut_ball.position.x = -5

// Scroll Animation
function moveCamera(){
  //get the current position of the camera and how far it is from the top of the page
  const t = document.body.getBoundingClientRect().top
  donut_ball.rotation.x += 0.05
  donut_ball.rotation.y += 0.075
  donut_ball.rotation.z += 0.05

  Me.rotation.y += 0.01
  Me.rotation.z += 0.01

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002


}

document.body.onscroll = moveCamera
moveCamera()



function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  Me.rotation.x += 0.01
  renderer.render(scene, camera)
 // controls.update()
}

animate()