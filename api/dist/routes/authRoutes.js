"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../utils/jwt");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google callback route
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login?error=google_auth_failed",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.redirect("http://localhost:5173/");
            return;
        }
        const fullUser = yield UserModel_1.default.findById(user._id).lean();
        if (!fullUser) {
            res.redirect("http://localhost:5173/");
            return;
        }
        const token = (0, jwt_1.generateToken)(fullUser._id.toString());
        const { password } = fullUser, safeUser = __rest(fullUser, ["password"]);
        // Encode user data for URL
        const encodedUser = encodeURIComponent(JSON.stringify(safeUser));
        // Redirect with token and user data in URL
        res.redirect(`https://localhost:5173/auth/google/callback?token=${token}&user=${encodedUser}`);
    }
    catch (error) {
        console.error("Error during Google authentication:", error);
        res.redirect("https://localhost:5173/login?error=auth_error");
    }
}));
router;
exports.default = router;
