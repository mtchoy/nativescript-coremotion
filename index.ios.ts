declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface AccelerometerData {};
interface GyroscopeData {};
interface MagnetometerData {};
var coremotionManager;
function createCoreMotionManager() {
  if (!coremotionManager) {
    coremotionManager = CMMotionManager.alloc().init();
  }
}
