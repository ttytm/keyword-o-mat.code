import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

export type Keyword<T = any> = { [key: string]: T };

const getUserKeywords = (reverse: boolean) => {
	const results: string[] = vscode.workspace.getConfiguration().get("keyword-o-mat.keywords");
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

// Create keywordmaps
const createKeywordMap = (lists: string[][]) => {
	const keywords: Keyword<string> = {};

	lists.forEach((pair) => { pair.forEach((value, index) => (keywords[value] = pair[index + 1] || pair[0])); });

	return keywords;
};

export const keywords = {
	global: createKeywordMap(getDefaultKeywords(false, "./keywords/global.json")),
	user: createKeywordMap(getUserKeywords(false)),
};
export const keywordsReversed = {
	global: createKeywordMap(getDefaultKeywords(true, "./keywords/global.json")),
	user: createKeywordMap(getUserKeywords(true)),
};
