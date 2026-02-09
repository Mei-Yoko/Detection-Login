"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityEventType = void 0;
//security log
var SecurityEventType;
(function (SecurityEventType) {
    SecurityEventType["LOGIN_SUCCESS"] = " LOGIN_SUCCESS";
    SecurityEventType["LOGIN_FAILED"] = "LOGIN_FAILED";
    SecurityEventType["ACCOUNT_LOCKED"] = " ACCOUNT_LOCKED";
    SecurityEventType["ACCOUNT_UNLOCKED"] = "ACCOUNT_UNLOCKED";
    SecurityEventType["IP_BLOCKED"] = " IP_BLOCKED";
    SecurityEventType["IP_UNBLOCKED"] = "IP_UNBLOCKED";
    SecurityEventType["BRUTE_FORCE_DETECT"] = "BRUTE_FORCE_DETECT";
    SecurityEventType["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    SecurityEventType["SUSPICIOUS_ACTIVITY"] = "SUSPICIOUS_ACTIVITY";
})(SecurityEventType || (exports.SecurityEventType = SecurityEventType = {}));
