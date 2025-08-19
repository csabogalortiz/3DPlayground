import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Track all donut meshes for animation
const donuts = []

/**
 * Fonts + Text
 */
const fontLoader = new FontLoader()
fontLoader.load('/3DPlayground/fonts/BrandonGrotesqueBold_Regular.json', (font) => {
  // Main title (still matcap)
  const textGeometry = new TextGeometry('Play Inside Ideas', {
    font,
    size: 0.3,
    height: 0.1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.0,
    bevelOffset: 0,
    bevelSegments: 8
  })
  textGeometry.center()
  textGeometry.computeBoundingBox()

  const matcapLoader = new THREE.TextureLoader()
  const matcapTexture3 = matcapLoader.load('/textures/matcaps/37.png')
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)

  // Subline: COMING SOON (placed BELOW main line, plain color)
  const subTextGeometry = new TextGeometry('COMING SOON', {
    font,
    size: 0.1,
    height: 0.01,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.0,
    bevelOffset: 0,
    bevelSegments: 6
  })
  subTextGeometry.center()
  subTextGeometry.computeBoundingBox()

  const mainBox = textGeometry.boundingBox
  const subBox  = subTextGeometry.boundingBox
  const mainHeight = mainBox.max.y - mainBox.min.y
  const subHeight  = subBox.max.y  - subBox.min.y
  const gap = 0.12

  // Move BELOW
  subTextGeometry.translate(0, -(mainHeight * 0.5) - (subHeight * 0.5) - gap, 0)

  // Plain color only for subline
  const subTextMaterial = new THREE.MeshBasicMaterial({ color: 0x444656 })
  const subText = new THREE.Mesh(subTextGeometry, subTextMaterial)
  scene.add(subText)

  // Donuts (still matcap)
  const donutGeometry = new THREE.TorusGeometry(0.4, 0.2, 40, 60)
  const matcap11 = matcapLoader.load('/textures/matcaps/22.png')
  const matcapTexture = matcapLoader.load('/textures/matcaps/9.jpg')
  for (let i = 0; i < 200; i++) {
    const chosenMatcap = Math.random() < 0.5 ? matcap11 : matcapTexture
    const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: chosenMatcap })
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)

    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const s = Math.random()
    donut.scale.set(s, s, s)

    const SPEED = 4
    donut.userData.spinX = (0.15 + Math.random() * 0.10) * SPEED * (Math.random() < 0.5 ? -1 : 1)
    donut.userData.spinY = (0.10 + Math.random() * 0.12) * SPEED * (Math.random() < 0.5 ? -1 : 1)

    scene.add(donut)
    donuts.push(donut)
  }
})

/**
 * Sizes
 */
const sizes = { width: window.innerWidth, height: window.innerHeight }
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000, 0) // transparent bg

/**
 * Animate
 */
const clock = new THREE.Clock()
let prev = 0
function tick() {
  const now = clock.getElapsedTime()
  const dt = now - prev
  prev = now

  for (const d of donuts) {
    d.rotation.x += d.userData.spinX * dt
    d.rotation.y += d.userData.spinY * dt
  }

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()