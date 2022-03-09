const textBorder = (size: number, color: string) => {
  return `${size}px 0 0 ${color},
	-${size}px 0 0 ${color},
	0 ${size}px 0 ${color},
	0 -${size}px 0 ${color},
	${size / 2}px ${size / 2}px ${color},
	-${size / 2}px -${size / 2}px 0 ${color},
	${size / 2}px -1px 0 ${color},
	-${size / 2}px ${size / 2}px 0 ${color};`;
};

export default textBorder;
