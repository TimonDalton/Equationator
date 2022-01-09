import App from './App.svelte';

import nerdamer from'nerdamer/nerdamer.core.js';
// import 'nerdamer/Solve';
// import './solver/equationClass';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;

/*
TODO log:

8/28:

	Okay so lyk my dat die idee om eers 'n system of equations class te maak was eintlik 'n goeie idee
	Ek implementeer dit eerder perongeluk deur die web app klaar te maak of aspris in sy eie file

	As ek methods het vir elke soort aksie wat ek net hoef te call dan gaan die app self easy wees en die equations gaan op hulle eie uitgesorteer kan word.

9/13:

	Johann is 20. Ek het nie meer 'n dom tiener wat my help code nie. Ek het 'n dom 20 jarige.
*/