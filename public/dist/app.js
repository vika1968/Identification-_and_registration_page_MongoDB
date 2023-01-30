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
function handleRegister(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const password = event.target.elements.idPasswordRegister.value;
            const email = event.target.elements.idEmailRegister.value;
            //@ts-ignore
            const { data } = yield axios.post("/api/v1/users/register", { email, password });
            if (!data.success) {
                throw new Error('Something went wrong.');
            }
            else {
                window.location.href = "./home.html";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function handleLogin(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const password = event.target.elements.idPasswordLogin.value;
            const email = event.target.elements.idEmailLogin.value;
            //@ts-ignore
            const { data } = yield axios.post("/api/v1/users/login", { email, password });
            const { success, userDB } = data;
            if (success) {
                window.location.href = "./home.html";
            }
            else
                alert("Email and Password do not match.");
        }
        catch (error) {
            console.error(error);
        }
    });
}
function handleUpdateUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const email = document.querySelector(`.clsEmailUpdate`).value;
            const password = document.querySelector(`.clsPasswordUpdate`).value;
            if (email == ``) {
                alert(`Please, fill email field to update your password!`);
                return;
            }
            //@ts-ignore      
            const { data } = yield axios.post(`/api/v1/users/update/${email}`, { password });
            const { success, userDB } = data;
            if (success) {
                alert(`Password updated!`);
                window.location.href = "./login.html";
            }
            else {
                alert(`No user found!`);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
function handleRemoveUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const email = document.querySelector(`.clsEmailRemove`).value;
            //@ts-ignore
            const { data } = yield axios.delete(`/api/v1/users/${email}`);
            const { success, userDB } = data;
            if (success) {
                alert(`User removed!`);
                window.location.href = "./index.html";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
