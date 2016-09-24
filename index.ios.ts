declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface AccelerometerData {};
interface GyroscopeData {};
interface MagnetometerData {};

var coremotionManager;
var accelerometerIsListening = false;
var accelerometerUpdateInterval = 0.1;
var gyroscopeIsListening = false;
var gyroscopeUpdateInterval = 0.1;
var magnetometerIsListening = false;
var magnetometerUpdateInterval = 0.1;

function createCoreMotionManager() {
  if (!coremotionManager) {
    coremotionManager = CMMotionManager.alloc().init();
  }
}

export function isAccelerometerAvailable(){
  createCoreMotionManager();
  return coremotionManager.accelerometerAvailable;
}

export function isGyroscopeAvailable(){
  createCoreMotionManager();
  return coremotionManager.gyroscopeAvailable;
}

export function isMagnetometerAvailable(){
  createCoreMotionManager();
  return coremotionManager.magnetometerAvailable;
}

export function isAccelerometerActive(){
  return accelerometerIsListening;
}

export function isGyroscopeActive(){
  return gyroscopeIsListening;
}

export function isMagnetometerActive(){
  return magnetometerIsListening;
}

