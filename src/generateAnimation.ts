import "animate.css";
import "./css/animate.delays.css";

const INIT_VAL = 0.25;
const MAX_STEPS = 10;

export function generateAnimation(className: string, increment = 0.5) {
	let delay = INIT_VAL;
	const animateClass = `animate__animated animate__${className}`;
	const gen = (function* () {
		while (delay <= MAX_STEPS) {
			if (delay != 0) {
				yield animateClass +
					` animate__delay-${delay.toString().replace(".", "-")}s`;
			} else {
				yield animateClass;
			}
			delay += increment;
		}
		return "";
	})();

	//TOOD: Remove that : double call on first render
	const cache = {} as { [id: string]: string };
	return (id: string) => {
		if (cache[id]) {
			return cache[id];
		}
		return (cache[id] = gen.next().value);
	};
}
