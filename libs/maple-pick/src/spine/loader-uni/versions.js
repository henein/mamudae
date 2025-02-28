/**
 * @public
 */
export var SPINE_VERSION;
(function (SPINE_VERSION) {
    SPINE_VERSION[SPINE_VERSION["UNKNOWN"] = 0] = "UNKNOWN";
    SPINE_VERSION[SPINE_VERSION["VER37"] = 37] = "VER37";
    SPINE_VERSION[SPINE_VERSION["VER38"] = 38] = "VER38";
    SPINE_VERSION[SPINE_VERSION["VER40"] = 40] = "VER40";
    SPINE_VERSION[SPINE_VERSION["VER41"] = 41] = "VER41";
})(SPINE_VERSION || (SPINE_VERSION = {}));
/**
 * @public
 */
export function detectSpineVersion(version) {
    const ver3 = version?.substring(0, 3);
    const verNum = Math.floor(Number(ver3) * 10 + 1e-3);
    if (ver3 === '3.7') {
        return SPINE_VERSION.VER37;
    }
    if (ver3 === '3.8') {
        return SPINE_VERSION.VER38;
    }
    if (ver3 === '4.0') {
        return SPINE_VERSION.VER40;
    }
    if (ver3 === '4.1') {
        return SPINE_VERSION.VER41;
    }
    // try parse old versions with 3.7
    if (verNum < SPINE_VERSION.VER37) {
        return SPINE_VERSION.VER37;
    }
    return SPINE_VERSION.VER41;
}
