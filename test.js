const css = (delay) => `.animate__animated.animate__delay-${delay
	.toString()
	.replace(".", "-")}s {
	-webkit-animation-delay: calc(1s * ${delay});
	animation-delay: calc(1s * ${delay});
	-webkit-animation-delay: calc(var(--animate-delay) * ${delay});
	animation-delay: calc(var(--animate-delay) * ${delay});
}`;
let dump = "";
for (let i = 0.25; i <= 10; i += 0.25) {
	if ([1, 2, 3, 4, 5].includes(i)) {
		continue;
	}

	dump += css(i) + "\n";
}
console.log(dump);
