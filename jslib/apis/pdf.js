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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdf2pic_1 = require("pdf2pic");
const pdf_lib_1 = require("pdf-lib");
const apirouter = (0, express_1.Router)();
apirouter.post('/pdf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buffer = yield getsupabasefile();
        if (buffer) {
            const pages = yield splitPdf(buffer);
            for (let i = 0; i < pages; i++) {
                yield pdf2img(buffer, i + 1);
            }
        }
        res.send("Success");
    }
    catch (error) {
        res.send(error.message);
    }
}));
function pdf2img(buffer, pagenumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const convert = (0, pdf2pic_1.fromBuffer)(buffer);
            convert(pagenumber, { responseType: "base64" })
                .then((base64) => {
                console.log(`Page ${pagenumber} is now converted as image`);
                return;
            });
        }
        catch (error) {
            console.error(`Error converting page ${pagenumber}:`, error);
            throw new Error(`Error converting page ${pagenumber}: ${error.message}`);
        }
    });
}
function getsupabasefile() {
    return __awaiter(this, void 0, void 0, function* () {
        const fileurl = "https://borfnczrxdwlfilewkfj.supabase.co/storage/v1/object/sign/test/Interviews/testpdf.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L0ludGVydmlld3MvdGVzdHBkZi5wZGYiLCJpYXQiOjE3Mjk4ODkxMDUsImV4cCI6MTczMDQ5MzkwNX0.AcdpiSm9XAuKw6xdasxa5h8rzY_uwT0B1BzbqrM7Tig&t=2024-10-25T20%3A45%3A05.488Z";
        try {
            const response = yield fetch(fileurl, {
                method: 'GET',
                headers: {}
            });
            if (!response.ok) {
                console.error('Failed to fetch the file:', response.statusText);
                return null;
            }
            const arraybuffer = yield response.arrayBuffer();
            const buffer1 = Buffer.from(arraybuffer);
            console.log('File fetched successfully');
            return buffer1;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function splitPdf(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const originalPdf = yield pdf_lib_1.PDFDocument.load(buffer);
            const numPages = originalPdf.getPageCount();
            return numPages;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.default = apirouter;
