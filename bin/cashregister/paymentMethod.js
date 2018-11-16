"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
    }
    PaymentMethod.prototype.payAmount = function (amount) {
        console.log("paying " + amount + "...");
    };
    return PaymentMethod;
}());
exports.PaymentMethod = PaymentMethod;
