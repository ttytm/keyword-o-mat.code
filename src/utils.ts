import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

export type Keyword<T = any> = { [key: string]: T };

const getUserKeywords = (reverse: boolean) => {
	const results: string[] = vscode.workspace.getConfiguration("keyword-o-mat").get("customKeywords");
	if (!results) return;

	const lists: string[][] = JSON.parse(JSON.stringify(results));
	if (reverse) lists.map((row: Keyword) => row.reverse()).reverse();

	return lists;
};

// Load json files 
const getDefaultKeywords = (reverse: boolean, ...pathnames: string[]) => {
	let lists: string[][];

	pathnames.forEach((pathname) => {
		lists = JSON.parse(readFileSync(join(__dirname, pathname), "utf-8"));
		if (reverse) lists.map((row: Keyword) => row.reverse()).reverse();
	});

	return lists;
};

// Create keyword maps
const createKeywordMap = (lists: string[][]) => {
	const keywords = {};

	lists.forEach((pair) => { pair.forEach((value, index) => (keywords[value] = pair[index + 1] || pair[0])); });

	return keywords;
};

export const getKeywords = (defaultEnabled: boolean) => {
	let adders = { user: createKeywordMap(getUserKeywords(false)) };
	let substractors = { user: createKeywordMap(getUserKeywords(true)) };

	if (defaultEnabled) {
		Object.assign(adders, { global: createKeywordMap(getDefaultKeywords(false, "./keywords/global.json")) });
		Object.assign(substractors, { global: createKeywordMap(getDefaultKeywords(true, "./keywords/global.json")) });
	}

	const keywords = {
		adders: { ...adders },
		substractors: { ...substractors }
	};

	return keywords;
};
