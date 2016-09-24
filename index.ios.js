"use strict";
;
;
;
;
var coremotionManager;
var accelerometerIsListening = false;
var accelerometerUpdateInterval = 0.1;
var gyroscopeIsListening = false;
var gyroscopeUpdateInterval = 0.1;
var magnetometerIsListening = false;
var magnetometerUpdateInterval = 0.1;
var deviceMotionIsListening = false;
var deviceMotionUpdateInterval = 0.1;
function createCoreMotionManager() {
    if (!coremotionManager) {
        coremotionManager = CMMotionManager.alloc().init();
    }
}
function isAccelerometerAvailable() {
    createCoreMotionManager();
    return coremotionManager.accelerometerAvailable;
}
exports.isAccelerometerAvailable = isAccelerometerAvailable;
function isGyroscopeAvailable() {
    createCoreMotionManager();
    return coremotionManager.gyroscopeAvailable;
}
exports.isGyroscopeAvailable = isGyroscopeAvailable;
function isMagnetometerAvailable() {
    createCoreMotionManager();
    return coremotionManager.magnetometerAvailable;
}
exports.isMagnetometerAvailable = isMagnetometerAvailable;
function isDeviceMotionAvailable() {
    createCoreMotionManager();
    return coremotionManager.deviceMotionAvailable;
}
exports.isDeviceMotionAvailable = isDeviceMotionAvailable;
function isAccelerometerActive() {
    return accelerometerIsListening;
}
exports.isAccelerometerActive = isAccelerometerActive;
function isGyroscopeActive() {
    return gyroscopeIsListening;
}
exports.isGyroscopeActive = isGyroscopeActive;
function isMagnetometerActive() {
    return magnetometerIsListening;
}
exports.isMagnetometerActive = isMagnetometerActive;
function isDeviceMotionActive() {
    return deviceMotionIsListening;
}
exports.isDeviceMotionActive = isDeviceMotionActive;
function setAccelerometerUpdateInterval(interval) {
    if (interval) {
        accelerometerUpdateInterval = interval;
    }
    if (coremotionManager) {
        coremotionManager.accelerometerUpdateInterval = accelerometerUpdateInterval;
    }
}
exports.setAccelerometerUpdateInterval = setAccelerometerUpdateInterval;
function setGyroscopeUpdateInterval(interval) {
    if (interval) {
        gyroscopeUpdateInterval = interval;
    }
    if (coremotionManager) {
        coremotionManager.gyroscopeUpdateInterval = gyroscopeUpdateInterval;
    }
}
exports.setGyroscopeUpdateInterval = setGyroscopeUpdateInterval;
function setMagnetometerUpdateInterval(interval) {
    if (interval) {
        magnetometerUpdateInterval = interval;
    }
    if (coremotionManager) {
        coremotionManager.magnetometerUpdateInterval = magnetometerUpdateInterval;
    }
}
exports.setMagnetometerUpdateInterval = setMagnetometerUpdateInterval;
function setDeviceMotionUpdateInterval(interval) {
    if (interval) {
        deviceMotionUpdateInterval = interval;
    }
    if (coremotionManager) {
        coremotionManager.deviceMotionUpdateInterval = deviceMotionUpdateInterval;
    }
}
exports.setDeviceMotionUpdateInterval = setDeviceMotionUpdateInterval;
function startAccelerometerUpdates(callback) {
    if (accelerometerIsListening) {
        throw new Error("Already listening for accelerometer updates.");
    }
    createCoreMotionManager();
    coremotionManager.accelerometerUpdateInterval = accelerometerUpdateInterval;
    if (coremotionManager.accelerometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        coremotionManager.startAccelerometerUpdatesToQueueWithHandler(queue, function (data, error) {
            callback({
                x: data.acceleration.x,
                y: data.acceleration.y,
                z: data.acceleration.z
            });
        });
        accelerometerIsListening = true;
    }
    else {
        throw new Error("Accelerometer not available.");
    }
}
exports.startAccelerometerUpdates = startAccelerometerUpdates;
function startGyroscopeUpdates(callback) {
    createCoreMotionManager();
    coremotionManager.gyroscopeUpdateInterval = gyroscopeUpdateInterval;
    if (coremotionManager.gyroscopeAvailable) {
        var queue = NSOperationQueue.alloc().init();
        coremotionManager.startGyroscopeUpdatesToQueueWithHandler(queue, function (data, error) {
            callback({
                x: data.rotationRate.x,
                y: data.rotationRate.y,
                z: data.rotationRate.z
            });
        });
    }
}
exports.startGyroscopeUpdates = startGyroscopeUpdates;
function startMagnetometerUpdates(callback) {
    if (magnetometerIsListening) {
        throw new Error("Already listening for magnetometer updates.");
    }
    createCoreMotionManager();
    coremotionManager.magnetometerUpdateInterval = magnetometerUpdateInterval;
    if (coremotionManager.magnetometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        coremotionManager.startMagnetometerUpdatesToQueueWithHandler(queue, function (data, error) {
            callback({
                x: data.magneticField.x,
                y: data.magneticField.y,
                z: data.magneticField.z
            });
        });
    }
    else {
        throw new Error("Magnetometer not available.");
    }
}
exports.startMagnetometerUpdates = startMagnetometerUpdates;
function startDeviceMotionUpdates(callback) {
    if (deviceMotionIsListening) {
        throw new Error("Already listening for deviceMotion updates.");
    }
    createCoreMotionManager();
    coremotionManager.deviceMotionUpdateInterval = deviceMotionUpdateInterval;
    if (coremotionManager.deviceMotionAvailable) {
        var queue = NSOperationQueue.alloc().init();
        coremotionManager.startDeviceMotionUpdatesToQueueWithHandler(queue, function (data, error) {
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
    }
    else {
        throw new Error("DeviceMotion not available.");
    }
}
exports.startDeviceMotionUpdates = startDeviceMotionUpdates;
function stopAccelerometerUpdates() {
    if (accelerometerIsListening) {
        coremotionManager.stopAccelerometerUpdates();
        accelerometerIsListening = false;
    }
    else {
        throw new Error("Currently not listening for accelerometer events.");
    }
}
exports.stopAccelerometerUpdates = stopAccelerometerUpdates;
function stopGyroscopeUpdates() {
    if (gyroscopeIsListening) {
        coremotionManager.stopGyroscopeUpdates();
        gyroscopeIsListening = false;
    }
    else {
        throw new Error("Currently not listening for gyroscope events.");
    }
}
exports.stopGyroscopeUpdates = stopGyroscopeUpdates;
function stopMagnetometerUpdates() {
    if (magnetometerIsListening) {
        coremotionManager.stopMagnetometerUpdates();
        magnetometerIsListening = false;
    }
    else {
        throw new Error("Currently not listening for magnetometer events.");
    }
}
exports.stopMagnetometerUpdates = stopMagnetometerUpdates;
function stopDeviceMotionUpdates() {
    if (deviceMotionIsListening) {
        coremotionManager.stopDeviceMotionUpdates();
        deviceMotionIsListening = false;
    }
    else {
        throw new Error("Currently not listening for deviceMotion events.");
    }
}
exports.stopDeviceMotionUpdates = stopDeviceMotionUpdates;
