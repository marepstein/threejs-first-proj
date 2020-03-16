/* The fundamentals of a Three.js setup include: camera, scene and renderer */

/********* THE SCENE *********/

const scene = new THREE.Scene()

/** PerspectiveCamera takes FOUR ARGUMENTS:
 * Field of View (how wide the camera perspective will be)
 * Aspect Ratio (like a TV screen - height / width)
 * Near clipping pane (elements closer than this figure wont be rendered on the screen e.g. anything behind the camera)
 * Far clipping plane - anything futher than this wont render
 **/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

/* The object here is basically to give the cube smoother edges */

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/********* THE CUBE *********/

/* To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube. */

var geometry = new THREE.BoxGeometry(1, 1, 1)

// three.js has many different materials we can use, which all take an object of properties 
var material = new THREE.MeshStandardMaterial( { color: '#FFDB99' } )  

// A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
var cube = new THREE.Mesh( geometry, material )

scene.add( cube )

// this moves the camera out a little to prevent the default co-ordinates (0,0,0), which would cause both the camera and the cube to be inside each other. 
camera.position.z = 5


/********* RENDERING THE SCENE *********/

/* Below creates a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second) */

// requestAnimationFrame has many advantages - best: pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.

function animate() {
  requestAnimationFrame( animate )
  // cube.rotation runs every frame (usually 60 times per second as mentioned)
  cube.rotation.x += 0.04
  cube.rotation.y += 0.04
  renderer.render( scene, camera )
}
animate()

/** ANYTHING YOU WANT TO MOVE OR CHANGE WHILE THE APP IS RUNNING, MUST GO THROUGH THE ANIMATE FUNCTION **/


/******** ADDING THE LIGHT *******/

// Create a light source, tell it the color (white in our case), and how intense is should be. AmbientLight only changes how colours appear - it doesnt cast shadows as has no direction
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5)
scene.add( ambientLight )

// PointLight - is like out LIGHTBULB. Light will spread in all directions equally from the point of origin.
var pointLight = new THREE.PointLight( 0xffffff, 1 )

// Positioned: upper right, and behind our cube.
pointLight.position.set( 25, 50, 25 )
scene.add( pointLight )

