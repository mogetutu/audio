// typed array views
var f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];

// the different types

// Floating point arrays
var f64 = new Float64Array(8);
var f32 = new Float32Array(16);

// signed integer arrays
var int32 = new Int32Array(16);
var int64 = new Int16Array(32);
var int8  = new Int8Array(64);

// unsigned integer arrays
var uint32 = new Uint32Array(16);
var uint64 = new Uint16Array(32);
var uint8  = new Uint8Array(64);

var pixels = new Uint8ClampedArray(64); // <-- clamps values between 0 and 255.

// other way to create typed array views:
// create an array buffer first
var ab = new ArrayBuffer(256); // 256 bytes

// then create views that point to it
var faFull         = new Uint8Array(ab);
var faFirstHalf    = new Uint8Array(ab, 0, 128);
var faThirdQuarter = new Uint8Array(ab, 128, 64);
var faRest         = new Uint8Array(ab, 192);

// you can create multiple views to the same ArrayBuffer
var fa = new Float32Array(ab);
var ba = new Uint8Array(fa.buffer, 0, Float32Array.BYTES_PER_ELEMENT);

// DataViews are the easiest way to use ArrayBuffers that contain data with 
// heterogenous types.

var dv            = new DataView(buffer);

var vector_length = dv.getUint(8);
var width         = dv.getUint16(1); // 0 + uint8 = 1 bytes offset
var height        = dv.getUint16(3); // 0 + uint8 + uint16 = 3 bytes offset

var vectors = new Float32Array(width*height*vector_length);

for(var  i = 0, off = 5; i < vectors.length; i++, off+=4) {
  vectors[i] = dv.getFloat32(off);
}