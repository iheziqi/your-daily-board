export type Mensa = {
	id: string;
	name: string;
	url: string;
};

export const mensaList: Mensa[] = [
	{
		id: 'sued',
		name: 'Mensa TechFack',
		url: 'https://www.werkswelt.de/index.php?id=sued',
	},
	{
		id: 'lmpl',
		name: 'Mensa Langemarckplatz Erlangen',
		url: 'https://www.werkswelt.de/index.php?id=lmpl',
	},
	{
		id: 'mohm',
		name: 'Mensa Ohm Nürnberg',
		url: 'https://www.werkswelt.de/index.php?id=mohm',
	},
	{
		id: 'isch',
		name: 'Mensa Insel Schütt',
		url: 'https://www.werkswelt.de/index.php?id=isch',
	},
];