/*------------------------------------------------------------------------------------------------------*
    CAMERA FIT MESH TO SCREEN
    @param class default_scene.js
\*------------------------------------------------------------------------------------------------------*/

export default function cameraToFitScreen(scene, targetMesh, camera) {
  let engine = scene._engine;
  let cam = camera || scene._defCamera;
  let radius = targetMesh.getBoundingInfo().boundingSphere.radiusWorld;
  let aspectRatio = engine.getAspectRatio(cam);
  let halfMinFov = cam.fov / 2;
  if (aspectRatio < 1) {
    halfMinFov = Math.atan(aspectRatio * Math.tan(cam.fov / 2));
  }
  let viewRadius = Math.abs(radius / Math.sin(halfMinFov));

  //console.log(`Cam Radius after mesh load: ${cam.radius}`);

  cam.radius = viewRadius;
  cam.upperRadiusLimit = viewRadius * 2;

  /*   console.log(
    `radius ${radius}`,
    `aspectRatio ${aspectRatio}`,
    `halfMinFov ${halfMinFov}`,
    `viewRadius ${viewRadius}`,
    `Cam Radius: ${cam.radius}`
  );
 */
}
