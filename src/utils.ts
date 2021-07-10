import { readFileSync, existsSync, writeFileSync } from "fs"

const configPath = "./config.json"

type BotConfig = { [key: string]: string } & {
  apiKey: string
}

export const getConfig = (): BotConfig => {
  if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify({
      apiKey: "INSERT_APIKEY_HERE"
    }, null, 2), { encoding: "utf-8" })
  }
  return JSON.parse(readFileSync(configPath, { encoding: "utf-8" })) as BotConfig
}

export const spongeifyText = (text: string): string => text.split("").map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join("")

export const mockTypes: { [key: string]: { id: string, name: string, apply: (str: string) => string } } = {
  asl: {
    id: "asl",
    name: "Alternating: starting lower",
    apply: (str = "") => {
      let result = "";
      let lower = true;
      for (let c of str) {
        result += lower ? c.toLowerCase() : c.toUpperCase();
        if (c.match(/[a-z]/i)) lower = !lower;
      }
      return result;
    },
  },
  asu: {
    id: "asu",
    name: "Alternating: starting upper",
    apply: (str = "") => {
      let result = "";
      let lower = false;
      for (let c of str) {
        result += lower ? c.toLowerCase() : c.toUpperCase();
        if (c.match(/[a-z]/i)) lower = !lower;
      }
      return result;
    },
  },
  // au: {
  //   id: "au",
  //   name: "All Upper",
  //   apply: (str = "") => str.toUpperCase(),
  // },
  // al: {
  //   id: "al",
  //   name: "All Lower",
  //   apply: (str = "") => str.toLowerCase(),
  // },
  awsu: {
    id: "awsu",
    name: "Alternating: words start upper",
    apply: (str = "") => {
      return str
        .split(" ")
        .map((str) => mockTypes.asu.apply(str))
        .join(" ");
    },
  },
  awsl: {
    id: "awsl",
    name: "Alternating: words start lower",
    apply: (str = "") => {
      return str
        .split(" ")
        .map((str) => mockTypes.asl.apply(str))
        .join(" ");
    },
  },
  ar: {
    id: "ar",
    name: "All Random",
    apply: (str = "") => {
      let result = "";
      let lower = Math.random() < 0.5;
      for (let c of str) {
        result += lower ? c.toLowerCase() : c.toUpperCase();
        if (c.match(/[a-z]/i)) lower = Math.random() < 0.5;
      }
      return result;
    },
  },
  rsu: {
    id: "rsu",
    name: "Random: starting upper",
    apply: (str = "") => {
      let result = "";
      let lower = false;
      for (let c of str) {
        result += lower ? c.toLowerCase() : c.toUpperCase();
        if (c.match(/[a-z]/i)) lower = Math.random() < 0.5;
      }
      return result;
    },
  },
  rsl: {
    id: "rsl",
    name: "Random: starting lower",
    apply: (str = "") => {
      let result = "";
      let lower = true;
      for (let c of str) {
        result += lower ? c.toLowerCase() : c.toUpperCase();
        if (c.match(/[a-z]/i)) lower = Math.random() < 0.5;
      }
      return result;
    },
  },
  rwsu: {
    id: "rwsu",
    name: "Random: words start upper",
    apply: (str = "") => {
      return str
        .split(" ")
        .map((str) => {
          return mockTypes.rsu.apply(str);
        })
        .join(" ");
    },
  },
  rwsl: {
    id: "rwsl",
    name: "Random: words start lower",
    apply: (str = "") => {
      return str
        .split(" ")
        .map((str) => mockTypes.rsl.apply(str))
        .join(" ");
    },
  },
}