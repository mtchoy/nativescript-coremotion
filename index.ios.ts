declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface AccelerometerData {};
interface GyroscopeData {};
interface MagnetometerData {};
var coremotionManager;
var accelerometerIsListening = false;
var accelerometerUpdateInterval = 0.1;
function createCoreMotionManager() {
  if (!coremotionManager) {
    coremotionManager = CMMotionManager.alloc().init();
  }
}
export function isAccelerometerAvailable(){
  createCoreMotionManager();
  return coremotionManager.accelerometerAvailable;
}
export function isAccelerometerActive(){
  return accelerometerIsListening;
}
