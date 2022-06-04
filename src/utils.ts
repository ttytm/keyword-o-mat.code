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

// TODO: use array of keywords instead of two sperate objects
export const getKeywords = (defaultEnabled: boolean, reverse: boolean) => {
	let keywords = {};

	if (!reverse) {
		keywords = { user: createKeywordMap(getUserKeywords(reverse)) };
		// TODO: remove need to reload window on setting change
		if (!defaultEnabled) return keywords;
		keywords = { ...keywords, global: createKeywordMap(getDefaultKeywords(reverse, "./keywords/global.json")) };
		return keywords;
	}

	keywords = { user: createKeywordMap(getUserKeywords(reverse)) };
	if (!defaultEnabled) return keywords;
	keywords = { ...keywords, global: createKeywordMap(getDefaultKeywords(reverse, "./keywords/global.json")) };
	return keywords;

};