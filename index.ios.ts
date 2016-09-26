declare var CMMotionManager: any;
declare var CMAltimeter: any;
declare var CMPedometer: any;
declare var NSOperationQueue: any;

interface AccelerometerData {x: number; y: number; z: number};
interface GyroscopeData {x: number; y: number; z: number};
interface MagnetometerData {x: number; y: number; z: number};
interface DeviceMotionData {};
interface AltimeterData {};

var coremotionManager;
var altimeter;
var pedometer;
var accelerometerIsListening = false;
var accelerometerUpdateInterval = 0.1;
var gyroscopeIsListening = false;
var gyroscopeUpdateInterval = 0.1;
var magnetometerIsListening = false;
var magnetometerUpdateInterval = 0.1;
var deviceMotionIsListening = false;
var deviceMotionUpdateInterval = 0.1;
var altimeterIsListening = false;


function createCoreMotionManager() {
  if (!coremotionManager) {
    coremotionManager = CMMotionManager.alloc().init();
  }
}

function createAltimeter() {
  if (!altimeter) {
    altimeter = CMAltimeter.alloc().init();
  }
}

function createPedometer() {
  if (!pedometer) {
    pedometer = CMPedometer.alloc().init();
  }
  console.log(pedometer);
}

export function isAccelerometerAvailable(){
  createCoreMotionManager();
  return coremotionManager.accelerometerAvailable;
}

export function isGyroscopeAvailable(){
  createCoreMotionManager();
  return coremotionManager.gyroAvailable;
}

export function isMagnetometerAvailable(){
  createCoreMotionManager();
  return coremotionManager.magnetometerAvailable;
}

export function isDeviceMotionAvailable(){
  createCoreMotionManager();
  return coremotionManager.deviceMotionAvailable;
}

export function isRelativeAltitudeAvailable(){
  return CMAltimeter.isRelativeAltitudeAvailable();
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

export function isDeviceMotionActive(){
  return deviceMotionIsListening;
}

export function isRelativeAltitudeActive(){
  return altimeterIsListening;
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

export function setMagnetometerUpdateInterval(interval){
  if (interval) {
    magnetometerUpdateInterval = interval;
  }
  if (coremotionManager) {
    coremotionManager.magnetometerUpdateInterval = magnetometerUpdateInterval;
  }
}

export function setDeviceMotionUpdateInterval(interval){
  if (interval) {
    deviceMotionUpdateInterval = interval;
  }
  if (coremotionManager) {
    coremotionManager.deviceMotionUpdateInterval = deviceMotionUpdateInterval;
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
    gyroscopeIsListening = true;
  } else {
    throw new Error("Gyroscope not available.")
  }
}

export function startMagnetometerUpdates(callback: (MagnetometerData) => void) {
  if (magnetometerIsListening) {
    throw new Error("Already listening for magnetometer updates.")
  }
  createCoreMotionManager();
  coremotionManager.magnetometerUpdateInterval = magnetometerUpdateInterval;
  if (coremotionManager.magnetometerAvailable) {
    var queue = NSOperationQueue.alloc().init();
    coremotionManager.startMagnetometerUpdatesToQueueWithHandler(queue, (data, error) => {
      callback({
        x: data.magneticField.x,
        y: data.magneticField.y,
        z: data.magneticField.z
      });
    });
    magnetometerIsListening = true;
  } else {
    throw new Error("Magnetometer not available.")
  }
}

export function startDeviceMotionUpdates(callback: (DeviceMotionData) => void) {
  if (deviceMotionIsListening) {
    throw new Error("Already listening for deviceMotion updates.")
  }
  createCoreMotionManager();
  coremotionManager.deviceMotionUpdateInterval = deviceMotionUpdateInterval;
  if (coremotionManager.deviceMotionAvailable) {
    var queue = NSOperationQueue.alloc().init();
    coremotionManager.startDeviceMotionUpdatesToQueueWithHandler(queue, (data, error) => {
      callback({
        attitude: {
          pitch: data.attitude.pitch,
          roll: data.attitude.roll,
          yaw: data.attitude.yaw
        },
        gravity: {
          x: data.gravity.x,
          y: data.gravity.y,
          z: data.gravity.z
        },
        userAcceleration: {
          x: data.userAcceleration.x,
          y: data.userAcceleration.y,
          z: data.userAcceleration.z
        },
        magneticField: {
          accuracy: data.magneticField.accuracy,
          field: {
            x: data.magneticField.field.x,
            y: data.magneticField.field.y,
            z: data.magneticField.field.z
          }
        },
        rotationRate: {
          x: data.rotationRate.x,
          y: data.rotationRate.y,
          z: data.rotationRate.z
        }
      });
    });
    deviceMotionIsListening = true;
  } else {
    throw new Error("DeviceMotion not available.")
  }
}

export function startRelativeAltitudeUpdates(callback: (AltimeterData) => void) {
  if (altimeterIsListening) {
    throw new Error("Already listening for altimeter updates.")
  }
  createAltimeter();
  if (altimeter.isRelativeAltitudeAvailable) {
    var queue = NSOperationQueue.alloc().init();
    altimeter.startRelativeAltitudeUpdatesToQueueWithHandler(queue, (data, error) => {
      callback({
        pressure: data.pressure, 
        relativeAltitude: data.relativeAltitude
      });
    });
    altimeterIsListening = true;
  } else {
    throw new Error("Altimeter not available.")
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

export function stopMagnetometerUpdates() {
  if (magnetometerIsListening) {
    coremotionManager.stopMagnetometerUpdates();
    magnetometerIsListening = false;
  } else {
    throw new Error("Currently not listening for magnetometer events.");
  }
}

export function stopDeviceMotionUpdates() {
  if (deviceMotionIsListening) {
    coremotionManager.stopDeviceMotionUpdates();
    deviceMotionIsListening = false;
  } else {
    throw new Error("Currently not listening for deviceMotion events.");
  }
}

export function stopRelativeAltitudeUpdatesUpdates() {
  if (altimeterIsListening) {
    altimeter.stopDeviceMotionUpdates();
    altimeterIsListening = false;
  } else {
    throw new Error("Currently not listening for altimeter events.");
  }
}

// Pedometer Functionality
export function isCadenceAvailable() {
  return CMPedometer.isCadenceAvailable();
}

export function isDistanceAvailable() {
  return CMPedometer.isDistanceAvailable();
}

export function isFloorCountingAvailable() {
  return CMPedometer.isFloorCountingAvailable();
}

