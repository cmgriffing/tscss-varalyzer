import path from "path";
import fs from "fs";
import { objectToVars } from "../src/core";

// hardcoded import for now. consider making it into a cli argument
import { COLORS } from "../fixtures/javascript";

const colors = objectToVars(COLORS, "scss", "color");

fs.writeFileSync(path.resolve(__dirname, "../out/colors.scss"), colors);
