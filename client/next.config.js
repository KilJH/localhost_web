module.exports = {
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: 'https://localhost:5000/api/:slug*',
			},
		];
	},
};
