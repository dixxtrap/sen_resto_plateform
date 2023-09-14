"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.PlateHistory = exports.OrderPlate = exports.Tag = exports.TagPlate = exports.PlateFile = exports.FileDocument = exports.Order = exports.Payment = exports.PaymentTypeHistory = exports.PaymentType = exports.Contact = exports.CompanyContact = exports.Customer = exports.RestaurantContact = exports.Plate = exports.PermissionRole = exports.PermissionUser = exports.User = exports.Permission = exports.Restaurant = exports.Role = exports.Company = void 0;
const company_1 = require("./company");
Object.defineProperty(exports, "Company", { enumerable: true, get: function () { return company_1.Company; } });
const role_1 = require("./role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return role_1.Role; } });
const restaurant_1 = require("./restaurant");
Object.defineProperty(exports, "Restaurant", { enumerable: true, get: function () { return restaurant_1.Restaurant; } });
const permission_1 = require("./permission");
Object.defineProperty(exports, "Permission", { enumerable: true, get: function () { return permission_1.Permission; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const permission_user_1 = require("./permission_user");
Object.defineProperty(exports, "PermissionUser", { enumerable: true, get: function () { return permission_user_1.PermissionUser; } });
const permission_role_1 = require("./permission_role");
Object.defineProperty(exports, "PermissionRole", { enumerable: true, get: function () { return permission_role_1.PermissionRole; } });
const plate_1 = require("./plate");
Object.defineProperty(exports, "Plate", { enumerable: true, get: function () { return plate_1.Plate; } });
const restaurant_contact_1 = require("./restaurant_contact");
Object.defineProperty(exports, "RestaurantContact", { enumerable: true, get: function () { return restaurant_contact_1.RestaurantContact; } });
const company_contact_1 = require("./company_contact");
Object.defineProperty(exports, "CompanyContact", { enumerable: true, get: function () { return company_contact_1.CompanyContact; } });
const contact_1 = require("./contact");
Object.defineProperty(exports, "Contact", { enumerable: true, get: function () { return contact_1.Contact; } });
const payment_type_1 = require("./payment_type");
Object.defineProperty(exports, "PaymentType", { enumerable: true, get: function () { return payment_type_1.PaymentType; } });
const payment_1 = require("./payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return payment_1.Payment; } });
const order_1 = require("./order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const document_1 = require("./document");
Object.defineProperty(exports, "FileDocument", { enumerable: true, get: function () { return document_1.FileDocument; } });
const plate_file_1 = require("./plate_file");
Object.defineProperty(exports, "PlateFile", { enumerable: true, get: function () { return plate_file_1.PlateFile; } });
const tag_1 = require("./tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return tag_1.Tag; } });
const tag_plat_1 = require("./tag_plat");
Object.defineProperty(exports, "TagPlate", { enumerable: true, get: function () { return tag_plat_1.TagPlate; } });
const customer_1 = require("./customer");
Object.defineProperty(exports, "Customer", { enumerable: true, get: function () { return customer_1.Customer; } });
const order_plate_1 = require("./order_plate");
Object.defineProperty(exports, "OrderPlate", { enumerable: true, get: function () { return order_plate_1.OrderPlate; } });
const plate_amount_1 = require("./plate_amount");
Object.defineProperty(exports, "PlateHistory", { enumerable: true, get: function () { return plate_amount_1.PlateHistory; } });
const payment_type_history_1 = require("./payment_type_history");
Object.defineProperty(exports, "PaymentTypeHistory", { enumerable: true, get: function () { return payment_type_history_1.PaymentTypeHistory; } });
exports.entities = [
    company_1.Company,
    role_1.Role,
    restaurant_1.Restaurant,
    permission_1.Permission,
    user_1.User,
    permission_user_1.PermissionUser,
    permission_role_1.PermissionRole,
    plate_1.Plate,
    restaurant_contact_1.RestaurantContact,
    company_contact_1.CompanyContact,
    customer_1.Customer,
    payment_type_1.PaymentType,
    payment_type_history_1.PaymentTypeHistory,
    payment_1.Payment,
    order_1.Order,
    document_1.FileDocument,
    plate_file_1.PlateFile,
    tag_plat_1.TagPlate,
    tag_1.Tag,
    order_plate_1.OrderPlate,
    plate_amount_1.PlateHistory,
];
//# sourceMappingURL=index.js.map