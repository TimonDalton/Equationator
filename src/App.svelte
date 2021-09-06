<script>
	import nerdamer from "nerdamer/nerdamer.core.js";
	import "nerdamer/Solve";
	import { System_Of_Equations } from "./classes/systemOfEquationsClass";

	let sys = new System_Of_Equations();
	let eqStrs = [];
	let varStrs = [];
	function alterSys(func) {
		func();
		sys = sys;
	}

	function addEquationInputBoxClick() {
		sys.addEmptyEquation();
		eqStrs.push("");
		sys = sys;
	}
	function deleteEquationAtIndex(index) {
		sys.deleteEqAtIndex(index);
		eqStrs.splice(index, 1);
		eqStrs = eqStrs;
		varStrs = sys.vars_obj.getValStrs();
		sys = sys;
		console.log(eqStrs);
		console.log(sys.vars_obj.varNames);
	}

	function solveEquationsClick() {
		sys.solveAndUpdate();
		varStrs = sys.vars_obj.getValStrs();
		console.log(varStrs);
		sys = sys;
	}
	function eqInputStringUpdate(eqIndex) {
		console.log("eqIndex: " + eqIndex + "; eqStrs:");
		console.log(eqStrs);
		sys.editEqInputStr(eqStrs[eqIndex], eqIndex);
		varStrs = sys.vars_obj.getValStrs();
		sys = sys;
	}

	function varValStrUpdateByInput(varIndex) {
		sys.setVarByInput(varIndex, varStrs[varIndex]);
		sys = sys;
	}
	function clearVarValAtIndex(varIndex) {
		sys.clearVarAtIndex(varIndex);
		varStrs[varIndex] = sys.vars_obj.variables[varIndex].value;
		sys = sys;
	}
</script>

<head>
	<script
		src="https://kit.fontawesome.com/509944f454.js"
		crossorigin="anonymous"></script>
	<script src="nerdamer.core.js"></script>
	<script src="all.min.js"></script>
</head>

<main>
	<h1 class="heading">Equationator</h1>
	<button on:click={addEquationInputBoxClick}> Add Equation </button>
	<button on:click={solveEquationsClick}> Solve </button>
	<div class="layout-div">
		<div id="variablesDiv">
			{#each sys.vars_obj.varNames as variableName, varIndex}
				<div id="varContainer">
					<p>{variableName}</p>
					<i
						class="fa fa-trash-o"
						style="font-size:24px;"
						on:click={function () {
							clearVarValAtIndex(varIndex);
						}}
					/>
					<input
						type="text"
						bind:value={varStrs[varIndex]}
						on:input={() => varValStrUpdateByInput(varIndex)}
					/>
				</div>
			{/each}
		</div>

		<div class="equationsDiv">
			{#each sys.eqs as eq, eqIndex}
				<div>
					<i
						class="fa fa-trash-o"
						style="font-size:24px; color:black;"
						on:click={function () {
							deleteEquationAtIndex(eqIndex);
						}}
					/>
					<input
						type="text"
						bind:value={eqStrs[eqIndex]}
						on:input={() => eqInputStringUpdate(eqIndex)}
					/>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.heading {
		text-align: left;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.equationsDiv {
		color: rgb(255, 255, 255);
	}

	.layout-div {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: 1fr 4fr;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
