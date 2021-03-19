const complexityCheck = (password: string) => {
	const numReg = /[0-9]/;
	const lowerReg = /[a-z]/;
	const upperReg = /[A-Z]/;
	const specReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

	if (password === '') return 0;

	const cpxLvl: number =
		(numReg.test(password) ? 1 : 0) +
		(lowerReg.test(password) ? 1 : 0) +
		(upperReg.test(password) ? 1 : 0) +
		(specReg.test(password) ? 1 : 0);

	if (password.length > 8) {
		return cpxLvl;
	} else {
		return 1;
	}
};

export default complexityCheck;
