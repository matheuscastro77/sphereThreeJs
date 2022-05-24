import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading

const textureLoader = new THREE.TextureLoader()
 
const normalTexture = textureLoader.load('texture/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const sphereGeometry = new THREE.SphereBufferGeometry( .5, 34, 34 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

const materialSphere = new THREE.MeshStandardMaterial()
materialSphere.metalness = 0.7
materialSphere.roughness = 0.2
materialSphere.normalMap = normalTexture;
materialSphere.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(sphereGeometry,materialSphere)
scene.add(sphere)

// Lights 

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Lights 1

const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.set(-1.86,1,-1.65)
pointLight1.intensity = 10

scene.add(pointLight1)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xff0000
}

light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light1Color.color)
    })

// const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper)


// Lights 2 

const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(2.13, -3,-1.98)
pointLight3.intensity = 6.8

scene.add(pointLight3)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })

// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLight3Helper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()