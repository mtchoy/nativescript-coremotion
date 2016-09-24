declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface MagnetometerData {};
interface AccelerometerData {x: number; y: number; z: number};
interface GyroscopeData {x: number; y: number; z: number};

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

export function setAccelerometerUpdateInterval(interval: number){
  if (interval) {
    accelerometerUpdateInterval = interval;
  }
  if (coremotionManager) {
    coremotionManager.accelerometerUpdateInterval = accelerometerUpdateInterval;
  }
}

export function setGyroscopeUpdateInterval(interval){
  if (interval) {
    gyroscopeUpdateInterval = interval;
  }
  if (coremotionManager) {
    coremotionManager.gyroscopeUpdateInterval = gyroscopeUpdateInterval;
  }
}
export function startAccelerometerUpdates(callback: (AccelerometerData) => void) {
  if (accelerometerIsListening) {
    throw new Error("Already listening for accelerometer updates.")
  }
  createCoreMotionManager();
  coremotionManager.accelerometerUpdateInterval = accelerometerUpdateInterval;
  if (coremotionManager.accelerometerAvailable) {
    var queue = NSOperationQueue.alloc().init();
    coremotionManager.startAccelerometerUpdatesToQueueWithHandler(queue, (data, error) => {
      // console.log('accelerometer: ', JSON.stringify(data));
      callback({
        x: data.acceleration.x,
        y: data.acceleration.y,
        z: data.acceleration.z
      });
    });
    accelerometerIsListening = true;
  } else {
    throw new Error("Accelerometer not available.")
  }
}

export function startGyroscopeUpdates(callback: (GyroscopeData) => void) {
  createCoreMotionManager();
  coremotionManager.gyroscopeUpdateInterval = gyroscopeUpdateInterval;
  if (coremotionManager.gyroscopeAvailable) {
    var queue = NSOperationQueue.alloc().init();
    coremotionManager.startGyroscopeUpdatesToQueueWithHandler(queue, (data, error) => {
      callback({
        x: data.rotationRate.x,
        y: data.rotationRate.y,
        z: data.rotationRate.z
      });
    });
  }
}
export function stopAccelerometerUpdates() {
  if (accelerometerIsListening) {
    coremotionManager.stopAccelerometerUpdates();
    accelerometerIsListening = false;
  } else {
    throw new Error("Currently not listening for accelerometer events.")
  }

}

export function stopGyroscopeUpdates() {
  if (gyroscopeIsListening) {
    coremotionManager.stopGyroscopeUpdates();
    gyroscopeIsListening = false;
  } else {
    throw new Error("Currently not listening for gyroscope events.")
  }
}
